
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, HRMSRole as Role } from '../types';
import { MOCK_EMPLOYEES } from '../constants/app.constants';
import { useEmployees } from './EmployeeContext';

interface AuthContextType {
  user: Employee | null;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  activateAccount: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Employee | null>(null);
  const { employees, updateEmployee } = useEmployees();

  useEffect(() => {
    // Check backend session first, then local storage
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/status');
        const data = await res.json();
        if (data.isAuthenticated && data.user) {
          // Convert backend user to Employee format
          const backendUser = data.user;
          // Try to find matching employee in the employees list
          const employee = employees.find(e => e.id === backendUser.id || e.email === backendUser.email);
          if (employee) {
            setUser(employee);
            localStorage.setItem('grx10_user', JSON.stringify(employee));
          } else {
            // If employee not found in list yet, create a temporary user object
            const tempUser: Employee = {
              id: backendUser.id,
              name: backendUser.name || backendUser.displayName || 'User',
              email: backendUser.email,
              role: backendUser.role || 'Employee',
              department: '',
              designation: '',
              joinDate: '',
              status: 'Active',
              avatar: '',
              password: ''
            };
            setUser(tempUser);
            localStorage.setItem('grx10_user', JSON.stringify(tempUser));
          }
        } else {
          // Check local storage as fallback
          const savedUser = localStorage.getItem('grx10_user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // Fallback to local storage
        const savedUser = localStorage.getItem('grx10_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    };

    checkSession();
  }, [employees.length]);

  const login = async (email: string, password?: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For Direct Login
    const foundUser = employees.find(u => u.email === email);
    
    if (!foundUser) {
      throw new Error("User not found");
    }

    if (foundUser.status === 'Exited') {
      throw new Error("Access revoked. Please contact HR.");
    }

    // If password is provided (Direct Login), check it. 
    // If not (SSO Mock), skip check.
    if (password && foundUser.password !== password) {
      throw new Error("Invalid credentials");
    }

    setUser(foundUser);
    localStorage.setItem('grx10_user', JSON.stringify(foundUser));
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint to clear session
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Error logging out:', err);
    } finally {
      // Clear local state regardless of API call result
      setUser(null);
      localStorage.removeItem('grx10_user');
    }
  };

  const resetPassword = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const foundUser = employees.find(u => u.email === email);
    if (!foundUser) throw new Error("Email not found");
    // In a real app, this sends an email. Here we just succeed.
    return; 
  };

  const activateAccount = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const foundUser = employees.find(u => u.email === email);
    
    if (!foundUser) throw new Error("Email not found");
    // Only allow activation if marked as new user or if no password set
    // For this mock, we just update the password.
    
    updateEmployee(foundUser.id, { password, isNewUser: false });
    return;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, resetPassword, activateAccount, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
