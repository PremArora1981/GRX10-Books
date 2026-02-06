/**
 * HRMS Authorization Middleware
 *
 * Provides role-based access control for HRMS endpoints.
 * Uses the Employee.role field ('Admin', 'HR', 'Manager', 'Employee', 'Finance')
 */

// Role hierarchy for HRMS
export const HRMSRoles = {
    ADMIN: 'Admin',
    HR: 'HR',
    MANAGER: 'Manager',
    EMPLOYEE: 'Employee',
    FINANCE: 'Finance'
};

// Sensitive fields that should be filtered based on role
const SENSITIVE_FIELDS = [
    'salary', 'salaryBreakdown', 'bankAccountNumber', 'bankIFSC', 'bankName', 'bankBranch',
    'pan', 'aadhar', 'pfNumber', 'taxDeclarations', 'password'
];

/**
 * Middleware to require authentication
 * Must be applied before any HRMS route
 */
export const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    next();
};

/**
 * Middleware to require specific HRMS roles
 * Usage: requireHRMSRole(['Admin', 'HR'])
 *
 * @param {string[]} allowedRoles - Array of roles that can access the endpoint
 */
export const requireHRMSRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};

/**
 * Middleware to check if user can access a specific employee's data
 * - Admin/HR can access anyone
 * - Manager can access their direct reportees
 * - Employee can only access themselves
 * - Finance can access salary-related data for payroll
 *
 * @param {Function} getEmployeeId - Function to extract target employee ID from request
 */
export const requireEmployeeAccess = (getEmployeeId) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const userRole = req.user.role;
        const userId = req.user.id;
        const targetEmployeeId = getEmployeeId(req);

        // Admin and HR can access anyone
        if (userRole === HRMSRoles.ADMIN || userRole === HRMSRoles.HR) {
            return next();
        }

        // Finance can access for payroll purposes
        if (userRole === HRMSRoles.FINANCE) {
            return next();
        }

        // Employee accessing their own data
        if (targetEmployeeId === userId) {
            return next();
        }

        // Manager accessing reportee's data - need to check manager relationship
        if (userRole === HRMSRoles.MANAGER) {
            // Import Employee model dynamically to avoid circular dependency
            const { Employee } = await import('../../config/database.js');

            const targetEmployee = await Employee.findByPk(targetEmployeeId);
            if (targetEmployee && targetEmployee.managerId === userId) {
                return next();
            }
        }

        return res.status(403).json({ error: 'Access denied. You can only access your own data or your direct reportees.' });
    };
};

/**
 * Filter sensitive fields from employee data based on user role
 *
 * @param {Object} employeeData - Employee data object
 * @param {Object} reqUser - Authenticated user from request
 * @param {string} targetEmployeeId - ID of the employee whose data is being accessed
 * @returns {Object} Filtered employee data
 */
export const filterSensitiveData = (employeeData, reqUser, targetEmployeeId = null) => {
    if (!employeeData) return employeeData;

    const userRole = reqUser?.role;
    const userId = reqUser?.id;

    // Admin, HR, Finance can see all data
    if (userRole === HRMSRoles.ADMIN || userRole === HRMSRoles.HR || userRole === HRMSRoles.FINANCE) {
        // Still remove password
        const { password, ...dataWithoutPassword } = employeeData;
        return dataWithoutPassword;
    }

    // User viewing their own data can see most things
    if (targetEmployeeId === userId || employeeData.id === userId) {
        const { password, ...dataWithoutPassword } = employeeData;
        return dataWithoutPassword;
    }

    // Manager viewing reportee or others - filter sensitive fields
    const filteredData = { ...employeeData };
    SENSITIVE_FIELDS.forEach(field => {
        delete filteredData[field];
    });

    return filteredData;
};

/**
 * Filter an array of employees based on user role
 *
 * @param {Array} employees - Array of employee data
 * @param {Object} reqUser - Authenticated user from request
 * @returns {Array} Filtered array of employees
 */
export const filterEmployeeList = (employees, reqUser) => {
    if (!Array.isArray(employees)) return employees;

    return employees.map(emp => filterSensitiveData(emp, reqUser, emp.id));
};

/**
 * Middleware to handle manager-scoped data access
 * For list endpoints, filters data to only show relevant records
 * - Admin/HR: All records
 * - Manager: Only direct reportees
 * - Employee: Only own records
 * - Finance: All records (for payroll)
 *
 * Adds `req.hrmsScope` with { type: 'all' | 'manager' | 'self', employeeIds: [] }
 */
export const scopeByRole = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    const userRole = req.user.role;
    const userId = req.user.id;

    // Admin, HR, Finance can see all
    if (userRole === HRMSRoles.ADMIN || userRole === HRMSRoles.HR || userRole === HRMSRoles.FINANCE) {
        req.hrmsScope = { type: 'all', employeeIds: null };
        return next();
    }

    // Manager can see their direct reportees
    if (userRole === HRMSRoles.MANAGER) {
        const { Employee } = await import('../../config/database.js');

        const reportees = await Employee.findAll({
            where: { managerId: userId },
            attributes: ['id']
        });

        const reporteeIds = reportees.map(r => r.id);
        // Manager can also see their own data
        reporteeIds.push(userId);

        req.hrmsScope = { type: 'manager', employeeIds: reporteeIds };
        return next();
    }

    // Employee can only see their own data
    req.hrmsScope = { type: 'self', employeeIds: [userId] };
    next();
};

/**
 * Role groups for convenience
 */
export const RoleGroups = {
    // Can manage all employees
    FULL_ACCESS: [HRMSRoles.ADMIN, HRMSRoles.HR],

    // Can view/manage team data
    TEAM_ACCESS: [HRMSRoles.ADMIN, HRMSRoles.HR, HRMSRoles.MANAGER],

    // Can access payroll data
    PAYROLL_ACCESS: [HRMSRoles.ADMIN, HRMSRoles.HR, HRMSRoles.FINANCE],

    // All authenticated users
    ALL_AUTHENTICATED: [HRMSRoles.ADMIN, HRMSRoles.HR, HRMSRoles.MANAGER, HRMSRoles.EMPLOYEE, HRMSRoles.FINANCE]
};
