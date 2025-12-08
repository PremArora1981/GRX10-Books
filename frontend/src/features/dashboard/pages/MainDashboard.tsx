import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  FileText, 
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Briefcase,
  Receipt,
  BarChart3,
  ArrowRight,
  UserPlus,
  CalendarCheck,
  Wallet
} from 'lucide-react';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { View } from '../../../shared/types';

interface DashboardStats {
  hrms: {
    totalEmployees: number;
    newEmployeesThisMonth: number;
    attendanceRate: number;
    presentCount: number;
    absentCount: number;
    pendingLeaves: number;
    totalGrossSalary: number;
    totalNetPay: number;
    totalDeductions: number;
    payslipCount: number;
  };
  financial: {
    totalInvoices: number;
    paidInvoices: number;
    pendingInvoices: number;
    overdueInvoices: number;
    totalReceivables: number;
    revenueThisMonth: number;
  };
  os: {
    totalGoals: number;
    completedGoals: number;
    inProgressGoals: number;
    goalCompletionRate: number;
    totalMemos: number;
    pendingMemos: number;
  };
  recentActivity: {
    leaves: Array<{
      id: string;
      employeeName: string;
      type: string;
      startDate: string;
      endDate: string;
      status: string;
      createdAt: string;
    }>;
    attendance: Array<{
      id: string;
      employeeName: string;
      date: string;
      status: string;
      checkIn: string;
      checkOut: string;
    }>;
  };
}

interface MainDashboardProps {
  onChangeView: (view: View) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ onChangeView }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('/api/dashboard/summary', {
        credentials: 'include' // Include cookies for session
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Dashboard API error:', res.status, errorData);
        // Don't set stats to null, show error message instead
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  // Determine user role for UI customization
  const userRole = user?.role || 'Employee';
  const isAdmin = userRole === 'Admin' || userRole === 'HR' || userRole === 'Finance';
  const isManager = userRole === 'Manager';
  const isEmployee = userRole === 'Employee';

  // Role-specific header messages
  const getHeaderMessage = () => {
    if (isAdmin) return "Here's what's happening with your business today";
    if (isManager) return "Here's what's happening with your team today";
    return "Here's your personal dashboard";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-400 dark:text-slate-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-400">Failed to load dashboard data</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{getHeaderMessage()}</p>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Key Metrics Grid - Role-based */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Employees - Only for Admin/HR/Manager */}
        {isAdmin || isManager ? (
          <div 
            className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onChangeView(View.EMPLOYEES)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {isManager ? 'Team Members' : 'Total Employees'}
                </p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{stats.hrms.totalEmployees}</h3>
              </div>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
            </div>
            <div className="flex items-center text-xs text-slate-400 dark:text-slate-500">
              <UserPlus size={12} className="mr-1" />
              <span>{stats.hrms.newEmployeesThisMonth} new this month</span>
            </div>
          </div>
        ) : null}

        {/* Attendance Rate - All roles, different labels */}
        <div 
          className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group"
          onClick={() => onChangeView(View.ATTENDANCE)}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {isEmployee ? 'My Attendance' : isManager ? 'Team Attendance' : 'Attendance Rate'}
              </p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{stats.hrms.attendanceRate}%</h3>
            </div>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <CalendarCheck size={20} />
            </div>
          </div>
          <div className="flex items-center text-xs text-slate-400 dark:text-slate-500">
            <CheckCircle size={12} className="mr-1 text-emerald-500" />
            <span>{stats.hrms.presentCount} present, {stats.hrms.absentCount} absent</span>
          </div>
        </div>

        {/* Total Receivables - Only for Admin/Finance */}
        {isAdmin ? (
          <div 
            className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onChangeView(View.INVOICES)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Receivables</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{formatINR(stats.financial.totalReceivables)}</h3>
              </div>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <Receipt size={20} />
              </div>
            </div>
            <div className="flex items-center text-xs text-slate-400 dark:text-slate-500">
              <AlertCircle size={12} className="mr-1 text-amber-500" />
              <span>{stats.financial.overdueInvoices} overdue invoices</span>
            </div>
          </div>
        ) : null}

        {/* Revenue This Month - Only for Admin/Finance */}
        {isAdmin ? (
          <div 
            className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onChangeView(View.ACCOUNTING)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Revenue (This Month)</p>
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatINR(stats.financial.revenueThisMonth)}</h3>
              </div>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="flex items-center text-xs text-slate-400 dark:text-slate-500">
              <BarChart3 size={12} className="mr-1" />
              <span>{stats.financial.paidInvoices} paid invoices</span>
            </div>
          </div>
        ) : null}

        {/* My Leave Balance - For Employee */}
        {isEmployee ? (
          <div 
            className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onChangeView(View.LEAVES)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">My Leave Balance</p>
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.hrms.pendingLeaves}</h3>
              </div>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Calendar size={20} />
              </div>
            </div>
            <div className="flex items-center text-xs text-slate-400 dark:text-slate-500">
              <Clock size={12} className="mr-1" />
              <span>Pending requests</span>
            </div>
          </div>
        ) : null}

        {/* My Payroll - For Employee */}
        {isEmployee ? (
          <div 
            className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onChangeView(View.PAYROLL)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">My Payroll</p>
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatINR(stats.hrms.totalNetPay)}</h3>
              </div>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <Wallet size={20} />
              </div>
            </div>
            <div className="flex items-center text-xs text-slate-400 dark:text-slate-500">
              <span>This month</span>
            </div>
          </div>
        ) : null}
      </div>

      {/* Secondary Metrics - Role-based */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pending Leaves - Different labels for different roles */}
        {(isAdmin || isManager) && (
          <div 
            className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onChangeView(View.LEAVES)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {isManager ? 'Team Leave Requests' : 'Pending Leave Requests'}
                </p>
                <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{stats.hrms.pendingLeaves}</h3>
              </div>
              <div className="p-2.5 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                <Clock size={20} />
              </div>
            </div>
          </div>
        )}

        {/* Payroll This Month - Only for Admin/HR/Finance/Manager */}
        {(isAdmin || isManager) && (
          <div 
            className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onChangeView(View.PAYROLL)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {isManager ? 'Team Payroll' : 'Payroll (This Month)'}
                </p>
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{formatINR(stats.hrms.totalNetPay)}</h3>
              </div>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Wallet size={20} />
              </div>
            </div>
            <div className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              {stats.hrms.payslipCount} payslips processed
            </div>
          </div>
        )}

        {/* Goal Completion - All roles, different labels */}
        <div 
          className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group"
          onClick={() => onChangeView(View.GOALS)}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {isEmployee ? 'My Goals' : isManager ? 'Team Goals' : 'Goal Completion'}
              </p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{stats.os.goalCompletionRate}%</h3>
            </div>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Target size={20} />
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            {stats.os.completedGoals} of {stats.os.totalGoals} completed
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Activity</h3>
            <Clock size={18} className="text-slate-400 dark:text-slate-500" />
          </div>
          
          <div className="space-y-3">
            {/* Recent Leaves */}
            {stats.recentActivity.leaves.slice(0, 3).map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                      {leave.employeeName} - {leave.type}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  leave.status === 'Approved' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                    : leave.status === 'Pending'
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {leave.status}
                </span>
              </div>
            ))}

            {stats.recentActivity.leaves.length === 0 && (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm">
                No recent leave requests
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Quick Actions</h3>
            <Briefcase size={18} className="text-slate-400 dark:text-slate-500" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Add Employee - Only for Admin/HR */}
            {isAdmin && (
              <button
                onClick={() => onChangeView(View.EMPLOYEES)}
                className="p-4 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg text-left transition-colors group"
              >
                <UserPlus size={20} className="text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Add Employee</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Onboard new team member</p>
              </button>
            )}

            {/* Create Invoice - Only for Admin/Finance */}
            {isAdmin && (
              <button
                onClick={() => onChangeView(View.INVOICES)}
                className="p-4 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg text-left transition-colors group"
              >
                <FileText size={20} className="text-purple-600 dark:text-purple-400 mb-2" />
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Create Invoice</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Generate new invoice</p>
              </button>
            )}

            {/* Check Attendance - All roles */}
            <button
              onClick={() => onChangeView(View.ATTENDANCE)}
              className="p-4 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg text-left transition-colors group"
            >
              <CalendarCheck size={20} className="text-emerald-600 dark:text-emerald-400 mb-2" />
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                {isEmployee ? 'My Attendance' : 'Check Attendance'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">View attendance logs</p>
            </button>

            {/* Request Leave - For Employee */}
            {isEmployee && (
              <button
                onClick={() => onChangeView(View.LEAVES)}
                className="p-4 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-lg text-left transition-colors group"
              >
                <Calendar size={20} className="text-amber-600 dark:text-amber-400 mb-2" />
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Request Leave</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Apply for leave</p>
              </button>
            )}

            {/* Set Goals - All roles */}
            <button
              onClick={() => onChangeView(View.GOALS)}
              className="p-4 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg text-left transition-colors group"
            >
              <Target size={20} className="text-indigo-600 dark:text-indigo-400 mb-2" />
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Set Goals</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Create new goals</p>
            </button>

            {/* View Team - For Manager */}
            {isManager && (
              <button
                onClick={() => onChangeView(View.EMPLOYEES)}
                className="p-4 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg text-left transition-colors group"
              >
                <Users size={20} className="text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">View Team</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage team members</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;

