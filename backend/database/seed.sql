-- ============================================
-- GRX10 Books - Database Seed Data
-- ============================================
-- Comprehensive seed data for all configuration tables
-- Run this after setup.sql
-- ============================================

-- ============================================
-- Organizations
-- ============================================
INSERT INTO "Organizations" ("id", "name", "code", "address", "phone", "email", "website", "taxId", "isActive", "createdAt", "updatedAt") VALUES
('org-001', 'GRX10 Systems Pvt Ltd', 'GRX10', '123 Tech Park, Sector 5, Bangalore, Karnataka 560001', '+91-80-12345678', 'info@grx10.com', 'https://www.grx10.com', '29AABCG1234H1Z5', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('org-002', 'GRX10 Solutions', 'GRX10-SOL', '456 Business Center, Andheri East, Mumbai, Maharashtra 400069', '+91-22-98765432', 'solutions@grx10.com', 'https://solutions.grx10.com', '27AABCG5678K1Z9', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Departments
-- ============================================
INSERT INTO "Departments" ("id", "name", "code", "description", "isActive", "createdAt", "updatedAt") VALUES
('dept-001', 'Human Resources', 'HR', 'Manages employee relations, recruitment, and HR policies', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dept-002', 'Engineering', 'ENG', 'Software development and technical operations', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dept-003', 'Finance', 'FIN', 'Financial management, accounting, and budgeting', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dept-004', 'Sales', 'SALES', 'Sales operations and customer acquisition', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dept-005', 'Marketing', 'MKT', 'Brand management, digital marketing, and communications', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dept-006', 'Operations', 'OPS', 'Business operations and process management', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dept-007', 'Customer Support', 'CS', 'Customer service and technical support', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dept-008', 'Quality Assurance', 'QA', 'Software testing and quality control', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dept-009', 'Product Management', 'PM', 'Product strategy and roadmap management', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dept-010', 'Administration', 'ADMIN', 'Administrative and facilities management', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Positions
-- ============================================
INSERT INTO "Positions" ("id", "name", "code", "description", "isActive", "createdAt", "updatedAt") VALUES
('pos-001', 'Chief Executive Officer', 'CEO', 'Top executive responsible for overall company strategy', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-002', 'Chief Technology Officer', 'CTO', 'Leads technology strategy and development', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-003', 'Chief Financial Officer', 'CFO', 'Manages financial operations and strategy', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-004', 'VP Engineering', 'VP-ENG', 'Senior engineering leadership role', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-005', 'VP Sales', 'VP-SALES', 'Senior sales leadership role', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-006', 'HR Manager', 'HR-MGR', 'Manages HR operations and policies', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-007', 'Engineering Manager', 'ENG-MGR', 'Manages engineering team and projects', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-008', 'Finance Manager', 'FIN-MGR', 'Manages finance and accounting operations', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-009', 'Sales Manager', 'SALES-MGR', 'Manages sales team and targets', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-010', 'Tech Lead', 'TECH-LEAD', 'Technical leadership for development teams', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-011', 'Senior Software Engineer', 'SSE', 'Senior developer role', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-012', 'Software Engineer', 'SE', 'Mid-level developer role', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-013', 'Junior Software Engineer', 'JSE', 'Entry-level developer role', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-014', 'HR Executive', 'HR-EXEC', 'HR operations and support', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-015', 'Accountant', 'ACC', 'Accounting and bookkeeping', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-016', 'Sales Executive', 'SALES-EXEC', 'Sales and business development', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-017', 'Business Analyst', 'BA', 'Business analysis and requirements', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-018', 'QA Engineer', 'QA-ENG', 'Quality assurance and testing', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-019', 'Product Manager', 'PM', 'Product management and strategy', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('pos-020', 'Designer', 'DESIGN', 'UI/UX design', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- HRMS Roles (Business Roles)
-- ============================================
INSERT INTO "HRMSRoles" ("id", "name", "code", "description", "permissions", "isActive", "createdAt", "updatedAt") VALUES
('hrms-role-001', 'HR', 'HR', 'Human Resources role with access to employee data and HR functions', '["employees.view", "employees.edit", "leaves.approve", "attendance.view"]', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hrms-role-002', 'Manager', 'MGR', 'Manager role with team management capabilities', '["employees.view", "leaves.approve", "attendance.view"]', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hrms-role-003', 'Employee', 'EMP', 'Standard employee role', '["employees.view.own", "leaves.request", "attendance.log"]', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hrms-role-004', 'Finance', 'FIN', 'Finance role with access to payroll and financial data', '["payroll.view", "payroll.edit", "employees.view"]', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hrms-role-005', 'Admin', 'ADMIN', 'Administrator with full access', '["*"]', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Employee Types
-- ============================================
INSERT INTO "EmployeeTypes" ("id", "name", "code", "description", "isActive", "createdAt", "updatedAt") VALUES
('emp-type-001', 'Full Time', 'FT', 'Full-time permanent employee', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('emp-type-002', 'Part Time', 'PT', 'Part-time employee', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('emp-type-003', 'Contract', 'CONTRACT', 'Contract-based employee', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('emp-type-004', 'Intern', 'INTERN', 'Internship position', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('emp-type-005', 'Consultant', 'CONSULT', 'Consultant or freelancer', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('emp-type-006', 'Temporary', 'TEMP', 'Temporary employee', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Holidays (Indian Holidays for 2024-2025)
-- ============================================
INSERT INTO "Holidays" ("id", "name", "date", "type", "description", "isActive", "createdAt", "updatedAt") VALUES
('hol-001', 'Republic Day', '2024-01-26', 'National', 'Republic Day of India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-002', 'Holi', '2024-03-25', 'National', 'Festival of Colors', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-003', 'Good Friday', '2024-03-29', 'National', 'Good Friday', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-004', 'Eid ul-Fitr', '2024-04-11', 'National', 'Eid ul-Fitr', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-005', 'Independence Day', '2024-08-15', 'National', 'Independence Day of India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-006', 'Ganesh Chaturthi', '2024-09-07', 'Regional', 'Ganesh Chaturthi (Mumbai/Pune)', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-007', 'Dussehra', '2024-10-12', 'National', 'Dussehra', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-008', 'Diwali', '2024-10-31', 'National', 'Diwali - Festival of Lights', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-009', 'Christmas', '2024-12-25', 'National', 'Christmas Day', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-010', 'New Year', '2025-01-01', 'National', 'New Year Day', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-011', 'Republic Day', '2025-01-26', 'National', 'Republic Day of India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-012', 'Holi', '2025-03-14', 'National', 'Festival of Colors', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-013', 'Good Friday', '2025-04-18', 'National', 'Good Friday', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-014', 'Independence Day', '2025-08-15', 'National', 'Independence Day of India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-015', 'Ganesh Chaturthi', '2025-08-27', 'Regional', 'Ganesh Chaturthi (Mumbai/Pune)', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-016', 'Dussehra', '2025-10-02', 'National', 'Dussehra', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-017', 'Diwali', '2025-10-20', 'National', 'Diwali - Festival of Lights', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-018', 'Christmas', '2025-12-25', 'National', 'Christmas Day', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-019', 'Company Foundation Day', '2024-06-15', 'Company', 'GRX10 Foundation Day', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('hol-020', 'Company Foundation Day', '2025-06-15', 'Company', 'GRX10 Foundation Day', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Leave Types (Indian Leave Types)
-- ============================================
INSERT INTO "LeaveTypes" ("id", "name", "code", "description", "maxDays", "isPaid", "requiresApproval", "isActive", "createdAt", "updatedAt") VALUES
('leave-001', 'Casual Leave', 'CL', 'Casual leave for personal work', 12, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('leave-002', 'Sick Leave', 'SL', 'Medical leave for illness', 12, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('leave-003', 'Earned Leave', 'EL', 'Earned/Privilege leave', 15, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('leave-004', 'Compensatory Off', 'CO', 'Compensatory leave for working on holidays', 5, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('leave-005', 'Leave Without Pay', 'LWP', 'Unpaid leave', 30, false, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('leave-006', 'Maternity Leave', 'ML', 'Maternity leave for female employees', 180, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('leave-007', 'Paternity Leave', 'PL', 'Paternity leave for male employees', 7, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('leave-008', 'Bereavement Leave', 'BL', 'Leave for family member death', 5, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('leave-009', 'Marriage Leave', 'MAR', 'Leave for own marriage', 3, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('leave-010', 'Sabbatical', 'SAB', 'Extended leave for personal development', 90, false, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Work Locations
-- ============================================
INSERT INTO "WorkLocations" ("id", "name", "code", "address", "city", "state", "country", "isActive", "createdAt", "updatedAt") VALUES
('loc-001', 'Bangalore HQ', 'BLR-HQ', '123 Tech Park, Sector 5', 'Bangalore', 'Karnataka', 'India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('loc-002', 'Mumbai Office', 'MUM-OFF', '456 Business Center, Andheri East', 'Mumbai', 'Maharashtra', 'India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('loc-003', 'Delhi Office', 'DEL-OFF', '789 Corporate Tower, Connaught Place', 'New Delhi', 'Delhi', 'India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('loc-004', 'Hyderabad Office', 'HYD-OFF', '321 IT Park, Hitech City', 'Hyderabad', 'Telangana', 'India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('loc-005', 'Pune Office', 'PUN-OFF', '654 Software Park, Hinjewadi', 'Pune', 'Maharashtra', 'India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('loc-006', 'Chennai Office', 'CHE-OFF', '987 Tech Hub, OMR', 'Chennai', 'Tamil Nadu', 'India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('loc-007', 'Remote', 'REMOTE', 'Work from Home', 'Various', 'Various', 'India', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Skills
-- ============================================
INSERT INTO "Skills" ("id", "name", "category", "description", "isActive", "createdAt", "updatedAt") VALUES
-- Technical Skills
('skill-001', 'JavaScript', 'Technical', 'JavaScript programming language', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-002', 'TypeScript', 'Technical', 'TypeScript programming language', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-003', 'React', 'Technical', 'React.js framework', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-004', 'Node.js', 'Technical', 'Node.js runtime environment', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-005', 'Python', 'Technical', 'Python programming language', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-006', 'Java', 'Technical', 'Java programming language', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-007', 'SQL', 'Technical', 'Structured Query Language', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-008', 'MongoDB', 'Technical', 'MongoDB database', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-009', 'PostgreSQL', 'Technical', 'PostgreSQL database', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-010', 'AWS', 'Technical', 'Amazon Web Services', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-011', 'Docker', 'Technical', 'Docker containerization', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-012', 'Kubernetes', 'Technical', 'Kubernetes orchestration', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-013', 'Git', 'Technical', 'Version control with Git', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-014', 'CI/CD', 'Technical', 'Continuous Integration/Deployment', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-015', 'REST API', 'Technical', 'RESTful API development', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Soft Skills
('skill-016', 'Communication', 'Soft', 'Effective communication skills', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-017', 'Leadership', 'Soft', 'Leadership and team management', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-018', 'Problem Solving', 'Soft', 'Analytical problem-solving abilities', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-019', 'Teamwork', 'Soft', 'Collaboration and teamwork', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-020', 'Time Management', 'Soft', 'Effective time management', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-021', 'Project Management', 'Soft', 'Project planning and execution', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-022', 'Agile/Scrum', 'Soft', 'Agile methodology and Scrum framework', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Domain Skills
('skill-023', 'Financial Accounting', 'Domain', 'Financial accounting and reporting', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-024', 'GST Compliance', 'Domain', 'GST filing and compliance', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-025', 'HR Management', 'Domain', 'Human resource management', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-026', 'Payroll Processing', 'Domain', 'Payroll calculation and processing', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-027', 'Sales & Marketing', 'Domain', 'Sales and marketing strategies', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('skill-028', 'Customer Relations', 'Domain', 'Customer relationship management', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Languages
-- ============================================
INSERT INTO "Languages" ("id", "name", "code", "isActive", "createdAt", "updatedAt") VALUES
('lang-001', 'English', 'en', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-002', 'Hindi', 'hi', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-003', 'Kannada', 'kn', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-004', 'Tamil', 'ta', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-005', 'Telugu', 'te', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-006', 'Marathi', 'mr', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-007', 'Bengali', 'bn', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-008', 'Gujarati', 'gu', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-009', 'Malayalam', 'ml', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-010', 'Punjabi', 'pa', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-011', 'Urdu', 'ur', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-012', 'Sanskrit', 'sa', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-013', 'French', 'fr', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-014', 'Spanish', 'es', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-015', 'German', 'de', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-016', 'Japanese', 'ja', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('lang-017', 'Chinese', 'zh', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Chart of Accounts
-- ============================================
INSERT INTO "ChartOfAccounts" ("id", "code", "name", "type", "parentId", "description", "isActive", "createdAt", "updatedAt") VALUES
-- Assets
('coa-001', '1000', 'Assets', 'Asset', NULL, 'All asset accounts', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-002', '1100', 'Current Assets', 'Asset', 'coa-001', 'Current assets', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-003', '1110', 'Cash and Cash Equivalents', 'Asset', 'coa-002', 'Cash in hand and bank', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-004', '1111', 'Cash in Hand', 'Asset', 'coa-003', 'Physical cash', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-005', '1112', 'Bank Account - HDFC', 'Asset', 'coa-003', 'HDFC Bank current account', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-006', '1113', 'Bank Account - ICICI', 'Asset', 'coa-003', 'ICICI Bank savings account', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-007', '1120', 'Accounts Receivable', 'Asset', 'coa-002', 'Money owed by customers', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-008', '1130', 'Inventory', 'Asset', 'coa-002', 'Stock and inventory', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-009', '1140', 'Prepaid Expenses', 'Asset', 'coa-002', 'Prepaid expenses', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-010', '1200', 'Fixed Assets', 'Asset', 'coa-001', 'Fixed assets', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-011', '1210', 'Property, Plant & Equipment', 'Asset', 'coa-010', 'PP&E', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-012', '1220', 'Accumulated Depreciation', 'Asset', 'coa-010', 'Depreciation on fixed assets', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Liabilities
('coa-013', '2000', 'Liabilities', 'Liability', NULL, 'All liability accounts', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-014', '2100', 'Current Liabilities', 'Liability', 'coa-013', 'Current liabilities', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-015', '2110', 'Accounts Payable', 'Liability', 'coa-014', 'Money owed to vendors', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-016', '2120', 'Short-term Loans', 'Liability', 'coa-014', 'Short-term borrowings', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-017', '2130', 'Accrued Expenses', 'Liability', 'coa-014', 'Accrued expenses', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-018', '2140', 'GST Payable', 'Liability', 'coa-014', 'GST liability', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-019', '2141', 'CGST Payable', 'Liability', 'coa-018', 'Central GST payable', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-020', '2142', 'SGST Payable', 'Liability', 'coa-018', 'State GST payable', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-021', '2143', 'IGST Payable', 'Liability', 'coa-018', 'Integrated GST payable', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-022', '2200', 'Long-term Liabilities', 'Liability', 'coa-013', 'Long-term liabilities', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-023', '2210', 'Long-term Loans', 'Liability', 'coa-022', 'Long-term borrowings', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Equity
('coa-024', '3000', 'Equity', 'Equity', NULL, 'All equity accounts', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-025', '3100', 'Share Capital', 'Equity', 'coa-024', 'Share capital', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-026', '3200', 'Retained Earnings', 'Equity', 'coa-024', 'Retained earnings', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-027', '3300', 'Current Year Profit', 'Equity', 'coa-024', 'Current year profit/loss', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Income
('coa-028', '4000', 'Income', 'Income', NULL, 'All income accounts', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-029', '4100', 'Sales Revenue', 'Income', 'coa-028', 'Revenue from sales', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-030', '4110', 'Product Sales', 'Income', 'coa-029', 'Product sales revenue', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-031', '4120', 'Service Revenue', 'Income', 'coa-029', 'Service revenue', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-032', '4200', 'Other Income', 'Income', 'coa-028', 'Other income sources', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-033', '4210', 'Interest Income', 'Income', 'coa-032', 'Interest earned', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-034', '4220', 'Discount Received', 'Income', 'coa-032', 'Discounts received', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Expenses
('coa-035', '5000', 'Expenses', 'Expense', NULL, 'All expense accounts', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-036', '5100', 'Cost of Goods Sold', 'Expense', 'coa-035', 'COGS', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-037', '5200', 'Operating Expenses', 'Expense', 'coa-035', 'Operating expenses', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-038', '5210', 'Salaries and Wages', 'Expense', 'coa-037', 'Employee salaries', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-039', '5220', 'Rent', 'Expense', 'coa-037', 'Office rent', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-040', '5230', 'Utilities', 'Expense', 'coa-037', 'Electricity, water, internet', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-041', '5240', 'Marketing Expenses', 'Expense', 'coa-037', 'Marketing and advertising', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-042', '5250', 'Travel Expenses', 'Expense', 'coa-037', 'Travel and conveyance', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-043', '5260', 'Professional Fees', 'Expense', 'coa-037', 'Legal, audit, consulting fees', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-044', '5270', 'Depreciation', 'Expense', 'coa-037', 'Depreciation expense', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-045', '5280', 'GST Input Credit', 'Expense', 'coa-037', 'GST input tax credit', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-046', '5300', 'Financial Expenses', 'Expense', 'coa-035', 'Financial expenses', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-047', '5310', 'Interest Expense', 'Expense', 'coa-046', 'Interest paid', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('coa-048', '5320', 'Bank Charges', 'Expense', 'coa-046', 'Bank service charges', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Sample Ledgers (Legacy - for backward compatibility)
-- ============================================
INSERT INTO "Ledgers" ("id", "name", "type", "balance", "createdAt", "updatedAt") VALUES
('ledger-001', 'Cash', 'Asset', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ledger-002', 'Bank Account', 'Asset', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ledger-003', 'Accounts Receivable', 'Asset', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ledger-004', 'Sales Revenue', 'Income', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ledger-005', 'Cost of Goods Sold', 'Expense', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ledger-006', 'Operating Expenses', 'Expense', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Sample Customers
-- ============================================
INSERT INTO "Customers" ("id", "name", "gstin", "email", "balance", "createdAt", "updatedAt") VALUES
('cust-001', 'Acme Corporation', '29AABCU9603R1ZX', 'contact@acme.com', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('cust-002', 'Tech Solutions Ltd', '27AABCT1234M1Z5', 'info@techsolutions.com', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('cust-003', 'Global Industries', '19AABCG5678K1Z9', 'sales@globalind.com', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('cust-004', 'Digital Ventures Pvt Ltd', '29AABCD1234E1Z5', 'info@digitalventures.com', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('cust-005', 'Innovation Labs', '27AABCI5678L1Z9', 'contact@innovationlabs.com', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Sample Employees (for attendance records)
-- ============================================
INSERT INTO "Employees" ("id", "name", "email", "role", "department", "designation", "joinDate", "status", "password", "enableEmailLogin", "managerId", "createdAt", "updatedAt") VALUES
('admin-001', 'Administrator', 'admin@grx10.com', 'Admin', 'Administration', 'System Administrator', '2020-01-01', 'Active', 'admin123', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EMP001', 'Alice Carter', 'alice@grx10.com', 'HR', 'Human Resources', 'HR Manager', '2022-01-15', 'Active', 'admin-001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EMP002', 'Bob Smith', 'bob@grx10.com', 'Manager', 'Engineering', 'Tech Lead', '2021-05-20', 'Active', 'admin-001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EMP003', 'Charlie Davis', 'charlie@grx10.com', 'Employee', 'Engineering', 'Frontend Engineer', '2023-02-10', 'Active', 'EMP002', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EMP004', 'Diana Evans', 'diana@grx10.com', 'Finance', 'Finance', 'Payroll Specialist', '2022-08-01', 'Active', 'admin-001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EMP005', 'Ethan Hunt', 'ethan@grx10.com', 'Employee', 'Sales', 'Sales Executive', '2023-06-15', 'Active', 'admin-001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Sample Attendance Records (Last 30 days)
-- ============================================
-- Note: These dates are relative - adjust based on current date
-- Employee EMP001 (Alice) - HR Manager
INSERT INTO "AttendanceRecords" ("id", "employeeId", "date", "checkIn", "checkOut", "status", "durationHours", "createdAt", "updatedAt") VALUES
('ATT-001-001', 'EMP001', '2024-07-01', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-002', 'EMP001', '2024-07-02', '09:15', '18:15', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-003', 'EMP001', '2024-07-03', '09:00', '17:45', 'Present', 8.75, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-004', 'EMP001', '2024-07-04', '09:30', '18:30', 'Late', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-005', 'EMP001', '2024-07-05', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-006', 'EMP001', '2024-07-08', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-007', 'EMP001', '2024-07-09', '09:10', '18:10', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-008', 'EMP001', '2024-07-10', '09:00', '17:30', 'Present', 8.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-009', 'EMP001', '2024-07-11', '09:20', '18:20', 'Late', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-010', 'EMP001', '2024-07-12', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-011', 'EMP001', '2024-07-15', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-012', 'EMP001', '2024-07-16', '09:05', '18:05', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-013', 'EMP001', '2024-07-17', '09:00', '17:45', 'Present', 8.75, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-014', 'EMP001', '2024-07-18', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-015', 'EMP001', '2024-07-19', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-016', 'EMP001', '2024-07-22', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-017', 'EMP001', '2024-07-23', '09:15', '18:15', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-018', 'EMP001', '2024-07-24', '09:00', '17:30', 'Present', 8.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-019', 'EMP001', '2024-07-25', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-001-020', 'EMP001', '2024-07-26', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Employee EMP002 (Bob) - Tech Lead
INSERT INTO "AttendanceRecords" ("id", "employeeId", "date", "checkIn", "checkOut", "status", "durationHours", "createdAt", "updatedAt") VALUES
('ATT-002-001', 'EMP002', '2024-07-01', '09:30', '18:30', 'Late', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-002', 'EMP002', '2024-07-02', '09:00', '19:00', 'Present', 10.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-003', 'EMP002', '2024-07-03', '09:15', '18:45', 'Present', 9.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-004', 'EMP002', '2024-07-04', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-005', 'EMP002', '2024-07-05', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-006', 'EMP002', '2024-07-08', '09:00', '19:30', 'Present', 10.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-007', 'EMP002', '2024-07-09', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-008', 'EMP002', '2024-07-10', '09:20', '18:20', 'Late', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-009', 'EMP002', '2024-07-11', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-010', 'EMP002', '2024-07-12', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-011', 'EMP002', '2024-07-15', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-012', 'EMP002', '2024-07-16', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-013', 'EMP002', '2024-07-17', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-014', 'EMP002', '2024-07-18', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-015', 'EMP002', '2024-07-19', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-016', 'EMP002', '2024-07-22', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-017', 'EMP002', '2024-07-23', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-018', 'EMP002', '2024-07-24', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-019', 'EMP002', '2024-07-25', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-002-020', 'EMP002', '2024-07-26', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Employee EMP003 (Charlie) - Frontend Engineer
INSERT INTO "AttendanceRecords" ("id", "employeeId", "date", "checkIn", "checkOut", "status", "durationHours", "createdAt", "updatedAt") VALUES
('ATT-003-001', 'EMP003', '2024-07-01', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-002', 'EMP003', '2024-07-02', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-003', 'EMP003', '2024-07-03', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-004', 'EMP003', '2024-07-04', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-005', 'EMP003', '2024-07-05', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-006', 'EMP003', '2024-07-08', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-007', 'EMP003', '2024-07-09', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-008', 'EMP003', '2024-07-10', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-009', 'EMP003', '2024-07-11', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-010', 'EMP003', '2024-07-12', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-011', 'EMP003', '2024-07-15', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-012', 'EMP003', '2024-07-16', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-013', 'EMP003', '2024-07-17', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-014', 'EMP003', '2024-07-18', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-015', 'EMP003', '2024-07-19', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-016', 'EMP003', '2024-07-22', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-017', 'EMP003', '2024-07-23', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-018', 'EMP003', '2024-07-24', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-019', 'EMP003', '2024-07-25', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-003-020', 'EMP003', '2024-07-26', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Employee EMP004 (Diana) - Payroll Specialist
INSERT INTO "AttendanceRecords" ("id", "employeeId", "date", "checkIn", "checkOut", "status", "durationHours", "createdAt", "updatedAt") VALUES
('ATT-004-001', 'EMP004', '2024-07-01', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-002', 'EMP004', '2024-07-02', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-003', 'EMP004', '2024-07-03', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-004', 'EMP004', '2024-07-04', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-005', 'EMP004', '2024-07-05', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-006', 'EMP004', '2024-07-08', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-007', 'EMP004', '2024-07-09', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-008', 'EMP004', '2024-07-10', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-009', 'EMP004', '2024-07-11', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-010', 'EMP004', '2024-07-12', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-011', 'EMP004', '2024-07-15', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-012', 'EMP004', '2024-07-16', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-013', 'EMP004', '2024-07-17', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-014', 'EMP004', '2024-07-18', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-015', 'EMP004', '2024-07-19', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-016', 'EMP004', '2024-07-22', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-017', 'EMP004', '2024-07-23', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-018', 'EMP004', '2024-07-24', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-019', 'EMP004', '2024-07-25', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-004-020', 'EMP004', '2024-07-26', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Employee EMP005 (Ethan) - Sales Executive
INSERT INTO "AttendanceRecords" ("id", "employeeId", "date", "checkIn", "checkOut", "status", "durationHours", "createdAt", "updatedAt") VALUES
('ATT-005-001', 'EMP005', '2024-07-01', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-002', 'EMP005', '2024-07-02', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-003', 'EMP005', '2024-07-03', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-004', 'EMP005', '2024-07-04', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-005', 'EMP005', '2024-07-05', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-006', 'EMP005', '2024-07-08', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-007', 'EMP005', '2024-07-09', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-008', 'EMP005', '2024-07-10', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-009', 'EMP005', '2024-07-11', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-010', 'EMP005', '2024-07-12', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-011', 'EMP005', '2024-07-15', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-012', 'EMP005', '2024-07-16', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-013', 'EMP005', '2024-07-17', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-014', 'EMP005', '2024-07-18', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-015', 'EMP005', '2024-07-19', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-016', 'EMP005', '2024-07-22', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-017', 'EMP005', '2024-07-23', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-018', 'EMP005', '2024-07-24', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-019', 'EMP005', '2024-07-25', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATT-005-020', 'EMP005', '2024-07-26', '09:00', '18:00', 'Present', 9.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- Success Message
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ Seed data inserted successfully!';
    RAISE NOTICE '📊 Organizations: 2';
    RAISE NOTICE '📊 Departments: 10';
    RAISE NOTICE '📊 Positions: 20';
    RAISE NOTICE '📊 HRMS Roles: 5';
    RAISE NOTICE '📊 Employee Types: 6';
    RAISE NOTICE '📊 Holidays: 20 (2024-2025)';
    RAISE NOTICE '📊 Leave Types: 10';
    RAISE NOTICE '📊 Work Locations: 7';
    RAISE NOTICE '📊 Skills: 28';
    RAISE NOTICE '📊 Languages: 17';
    RAISE NOTICE '📊 Chart of Accounts: 48';
    RAISE NOTICE '📊 Customers: 5';
    RAISE NOTICE '📊 Employees: 5';
    RAISE NOTICE '📊 Attendance Records: ~100 (last 30 days)';
END $$;
