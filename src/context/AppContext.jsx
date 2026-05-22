import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

// Helper to check/set localStorage safety
const getStorage = (key, initial) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initial;
    } catch (e) {
        return initial;
    }
};

const setStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
};

export const AppProvider = ({ children }) => {
    // Auth and Role states
    const [isAuthenticated, setIsAuthenticated] = useState(() => getStorage('isAuthenticated', false));
    const [userRole, setUserRole] = useState(() => getStorage('userRole', 'admin'));
    const [user, setUser] = useState(() => getStorage('user', {
        name: 'John Doe',
        email: 'admin@cleancrm.com',
        phone: '+1 (555) 019-2831',
        address: '742 Evergreen Terrace, Springfield'
    }));

    // Seeds
    const initialCompanies = [
        { id: 'c1', name: 'Apex Cleaning Solutions', owner: 'Alice Vance', status: 'Active', plan: 'Enterprise', registeredOn: '2024-11-12', logo: 'A' },
        { id: 'c2', name: 'Sparkle Corp Facility Management', owner: 'Robert Downey', status: 'Active', plan: 'Professional', registeredOn: '2025-01-20', logo: 'S' },
        { id: 'c3', name: 'CleanCity Franchise Group', owner: 'Clara Oswald', status: 'Trial', plan: 'Starter', registeredOn: '2026-05-02', logo: 'C' },
        { id: 'c4', name: 'EcoShine Commercial Cleaners', owner: 'Bruce Banner', status: 'Suspended', plan: 'Professional', registeredOn: '2025-08-14', logo: 'E' },
    ];

    const initialClients = [
        { id: '1', name: 'Grand Central Plaza', email: 'operations@grandcentral.com', phone: '212-555-0190', address: '89 Main St, Manhattan, NY', createdAt: '2024-05-10' },
        { id: '2', name: 'TechLabs Headquarters', email: 'facilities@techlabs.io', phone: '415-555-9832', address: '456 Silicon Valley Blvd, San Jose, CA', createdAt: '2025-02-15' },
        { id: '3', name: 'Metro Health Clinic', email: 'admin@metrohealth.org', phone: '312-555-4421', address: '789 Medical Plaza, Chicago, IL', createdAt: '2025-08-20' },
        { id: '4', name: 'Downtown Penthouse Suites', email: 'hoa@downtownpenthouse.com', phone: '702-555-7811', address: '555 Skyline Ave, Las Vegas, NV', createdAt: '2026-01-08' },
    ];

    const initialQuotes = [
        { id: 'q1', clientName: 'Summit Tower LLC', email: 'billing@summit.com', serviceType: 'Post-Construction Deep Clean', areaSqFt: 25000, value: 4800, status: 'Approved', date: '2026-05-18' },
        { id: 'q2', clientName: 'GreenTree Daycare', email: 'manager@greentree.org', serviceType: 'Bi-Weekly Disinfection', areaSqFt: 5000, value: 750, status: 'Pending', date: '2026-05-20' },
        { id: 'q3', clientName: 'WestEnd Warehouse', email: 'logistics@westend.com', serviceType: 'Industrial Floor Stripping', areaSqFt: 80000, value: 12500, status: 'Draft', date: '2026-05-21' },
    ];

    const initialContracts = [
        { id: 'ctr1', clientName: 'Grand Central Plaza', title: 'Annual Facility Maintenance Contract', value: 24000, billingCycle: 'Monthly', startDate: '2026-01-01', endDate: '2026-12-31', status: 'Active', scope: 'Daily office cleaning, weekend exterior wash, monthly window wash' },
        { id: 'ctr2', clientName: 'TechLabs Headquarters', title: 'IT Campus Clean Contract', value: 18500, billingCycle: 'Quarterly', startDate: '2025-06-01', endDate: '2026-05-31', status: 'Active', scope: 'Clean room sanitization, carpet washing' },
        { id: 'ctr3', clientName: 'Metro Health Clinic', title: 'SLA Disinfection Contract', value: 9600, billingCycle: 'Monthly', startDate: '2026-03-01', endDate: '2027-02-28', status: 'Pending Approval', scope: 'Grade A medical disinfection' },
    ];

    const initialJobs = [
        { id: 'j1', title: 'Standard Office Mopping & Waste', employeeName: 'Sarah Jenkins', clientName: 'Grand Central Plaza', status: 'Completed', date: '2026-05-21', time: '09:00 AM', priority: 'Medium', beforePhoto: null, afterPhoto: null, signature: null },
        { id: 'j2', title: 'Deep Carpet Washing & Scrubbing', employeeName: 'Michael Chang', clientName: 'TechLabs Headquarters', status: 'In Progress', date: '2026-05-21', time: '11:30 AM', priority: 'High', beforePhoto: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=60', afterPhoto: null, signature: null },
        { id: 'j3', title: 'Post-Construction Cleanup Stage 1', employeeName: 'Emma Watson', clientName: 'Summit Tower LLC', status: 'Scheduled', date: '2026-05-21', time: '02:00 PM', priority: 'High', beforePhoto: null, afterPhoto: null, signature: null },
        { id: 'j4', title: 'HVAC Air Duct Sanitization', employeeName: 'Sarah Jenkins', clientName: 'WestEnd Warehouse', status: 'Scheduled', date: '2026-05-22', time: '10:00 AM', priority: 'Low', beforePhoto: null, afterPhoto: null, signature: null },
    ];

    const initialExpenses = [
        { id: 'exp1', driverName: 'Dave Driver', category: 'Fuel Reimbursement', amount: 85.50, status: 'Approved', date: '2026-05-19', receipt: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=150&auto=format&fit=crop&q=60', notes: 'Tank refuel for van #4' },
        { id: 'exp2', driverName: 'Dave Driver', category: 'Materials Purchase', amount: 142.00, status: 'Pending', date: '2026-05-21', receipt: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=150&auto=format&fit=crop&q=60', notes: 'Chlorine detergents from wholesale' },
        { id: 'exp3', driverName: 'Dave Driver', category: 'Parking Fees', amount: 12.00, status: 'Approved', date: '2026-05-20', receipt: null, notes: 'Plaza basement parking' },
    ];

    const initialInvoices = [
        { id: 'inv-101', clientId: '1', clientName: 'Grand Central Plaza', amount: 2000.00, status: 'Paid', dueDate: '2026-05-01', createdDate: '2026-04-15' },
        { id: 'inv-102', clientId: '2', clientName: 'TechLabs Headquarters', amount: 4625.00, status: 'Pending', dueDate: '2026-06-01', createdDate: '2026-05-15' },
        { id: 'inv-103', clientId: '3', clientName: 'Metro Health Clinic', amount: 800.00, status: 'Paid', dueDate: '2026-05-10', createdDate: '2026-04-20' },
        { id: 'inv-104', clientId: '4', clientName: 'Downtown Penthouse Suites', amount: 1200.00, status: 'Pending', dueDate: '2026-05-28', createdDate: '2026-05-10' },
    ];

    const initialComplaints = [
        { id: 'cmp1', clientName: 'TechLabs Headquarters', subject: 'Streak marks left on window glass', priority: 'Medium', status: 'Investigating', date: '2026-05-19', resolution: '' },
        { id: 'cmp2', clientName: 'Grand Central Plaza', subject: 'Missed sanitization of Conference Room B', priority: 'High', status: 'Resolved', date: '2026-05-20', resolution: 'Sent backup squad to sanitize immediately.' },
    ];

    const initialLogs = [
        { id: 'l1', user: 'Admin', action: 'Created AMC Contract -Summit Tower', time: '2026-05-21 11:30 AM' },
        { id: 'l2', user: 'Dave Driver', action: 'Uploaded Fuel Receipt - $85.50', time: '2026-05-21 11:15 AM' },
        { id: 'l3', user: 'Sarah Jenkins', action: 'Completed Daily Job #j1', time: '2026-05-21 10:45 AM' },
        { id: 'l4', user: 'System', action: 'Auto-generated invoice inv-104', time: '2026-05-21 08:00 AM' },
    ];

    // Data States
    const [companies, setCompanies] = useState(() => getStorage('erp_companies', initialCompanies));
    const [clients, setClients] = useState(() => getStorage('erp_clients', initialClients));
    const [quotations, setQuotations] = useState(() => getStorage('erp_quotes', initialQuotes));
    const [contracts, setContracts] = useState(() => getStorage('erp_contracts', initialContracts));
    const [jobs, setJobs] = useState(() => getStorage('erp_jobs', initialJobs));
    const [expenses, setExpenses] = useState(() => getStorage('erp_expenses', initialExpenses));
    const [invoices, setInvoices] = useState(() => getStorage('erp_invoices', initialInvoices));
    const [complaints, setComplaints] = useState(() => getStorage('erp_complaints', initialComplaints));
    const [logs, setLogs] = useState(() => getStorage('erp_logs', initialLogs));

    // Save states on updates
    useEffect(() => setStorage('isAuthenticated', isAuthenticated), [isAuthenticated]);
    useEffect(() => setStorage('userRole', userRole), [userRole]);
    useEffect(() => setStorage('user', user), [user]);
    useEffect(() => setStorage('erp_companies', companies), [companies]);
    useEffect(() => setStorage('erp_clients', clients), [clients]);
    useEffect(() => setStorage('erp_quotes', quotations), [quotations]);
    useEffect(() => setStorage('erp_contracts', contracts), [contracts]);
    useEffect(() => setStorage('erp_jobs', jobs), [jobs]);
    useEffect(() => setStorage('erp_expenses', expenses), [expenses]);
    useEffect(() => setStorage('erp_invoices', invoices), [invoices]);
    useEffect(() => setStorage('erp_complaints', complaints), [complaints]);
    useEffect(() => setStorage('erp_logs', logs), [logs]);

    // Role Mapping for Easy Auth Mocking
    const roleProfiles = {
        superadmin: { name: 'Alice Super', email: 'superadmin@cleancrm.com', phone: '+1 (555) 999-0000', address: 'Platform Headquarters, Sector 5' },
        admin: { name: 'John Doe', email: 'admin@cleancrm.com', phone: '+1 (555) 019-2831', address: '742 Evergreen Terrace, Springfield' },
        technician: { name: 'Sarah Jenkins', email: 'sarah.tech@cleancrm.com', phone: '+1 (555) 304-9844', address: 'Staff Quarters, Sector 2' },
        driver: { name: 'Dave Driver', email: 'dave.driver@cleancrm.com', phone: '+1 (555) 441-2090', address: 'Logistics Depot, Bay 4' },
        accounts: { name: 'Gary Goldman', email: 'gary.accounts@cleancrm.com', phone: '+1 (555) 728-1122', address: 'Finance Office, Suite A' },
        client: { name: 'TechLabs Facilities', email: 'facilities@techlabs.io', phone: '+1 (555) 880-9900', address: '456 Silicon Valley Blvd, San Jose, CA' }
    };

    const loginAsRole = (role) => {
        setIsAuthenticated(true);
        setUserRole(role);
        const profile = roleProfiles[role] || roleProfiles.admin;
        setUser(profile);
        
        // Log action
        const newLog = {
            id: String(Date.now()),
            user: profile.name,
            action: `Logged in statefully as ${role.toUpperCase()}`,
            time: new Date().toLocaleString()
        };
        setLogs(prev => [newLog, ...prev]);
        return true;
    };

    // Get the dashboard path for a given role
    const getRoleDashboardPath = (role) => {
        const rolePaths = {
            superadmin: '/dashboard',
            admin: '/dashboard',
            technician: '/dashboard',
            driver: '/dashboard',
            accounts: '/dashboard',
            client: '/dashboard',
        };
        return rolePaths[role] || '/dashboard';
    };

    const login = (email, password) => {
        // Validate inputs
        if (!email || !password) return false;

        // Auto-detect role by email (case-insensitive)
        const emailLower = email.toLowerCase().trim();
        let role = 'admin';
        if (emailLower.includes('super')) role = 'superadmin';
        else if (emailLower.includes('tech')) role = 'technician';
        else if (emailLower.includes('driver')) role = 'driver';
        else if (emailLower.includes('account')) role = 'accounts';
        else if (emailLower.includes('client')) role = 'client';

        return loginAsRole(role);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole('admin');
        setUser({
            name: 'John Doe',
            email: 'admin@cleancrm.com',
            phone: '+1 (555) 019-2831',
            address: '742 Evergreen Terrace, Springfield'
        });
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user');
    };

    const updateUser = (profileData) => {
        setUser(prev => {
            const updated = { ...prev, ...profileData };
            setStorage('user', updated);
            return updated;
        });
        logActivity(user.name, `Updated user profile details`);
    };

    // --- Actions ---

    // Global Logger
    const logActivity = (userName, actionText) => {
        const newLog = {
            id: String(Date.now()),
            user: userName,
            action: actionText,
            time: new Date().toLocaleTimeString()
        };
        setLogs(prev => [newLog, ...prev]);
    };

    // Client CRUD
    const addClient = (clientData) => {
        const newClient = {
            id: String(Date.now()),
            ...clientData,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setClients(prev => [...prev, newClient]);
        logActivity(user.name, `Added Client "${newClient.name}"`);
    };

    const deleteClient = (id) => {
        const target = clients.find(c => c.id === id);
        setClients(prev => prev.filter(c => c.id !== id));
        // clean invoices too
        setInvoices(prev => prev.filter(inv => inv.clientId !== id));
        logActivity(user.name, `Deleted Client "${target?.name || id}"`);
    };

    // Quotation CRUD
    const addQuote = (quoteData) => {
        const newQuote = {
            id: 'q' + Date.now().toString().slice(-6),
            ...quoteData,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending'
        };
        setQuotations(prev => [...prev, newQuote]);
        logActivity(user.name, `Generated Quotation for "${newQuote.clientName}" - $${newQuote.value}`);
    };

    const approveQuote = (id) => {
        setQuotations(prev => prev.map(q => q.id === id ? { ...q, status: 'Approved' } : q));
        const quote = quotations.find(q => q.id === id);
        if (quote) {
            logActivity(user.name, `Approved Quotation "${id}"`);
            // Convert to Contract automatically
            const newContract = {
                id: 'ctr' + Date.now().toString().slice(-6),
                clientName: quote.clientName,
                title: `${quote.serviceType} Contract`,
                value: quote.value * 12,
                billingCycle: 'Monthly',
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                status: 'Active',
                scope: `Scope based on quote ${id}: Area size ${quote.areaSqFt} SqFt.`
            };
            setContracts(prev => [...prev, newContract]);
            logActivity('System', `Auto-created Contract from approved quote "${id}"`);
        }
    };

    // AMC Contract CRUD
    const renewContract = (id) => {
        setContracts(prev => prev.map(c => {
            if (c.id === id) {
                // extend 1 year
                const newEnd = new Date(c.endDate);
                newEnd.setFullYear(newEnd.getFullYear() + 1);
                return { ...c, status: 'Active', endDate: newEnd.toISOString().split('T')[0] };
            }
            return c;
        }));
        logActivity(user.name, `Renewed AMC Contract "${id}"`);
    };

    const addContract = (contractData) => {
        const newContract = {
            id: 'ctr' + Date.now().toString().slice(-6),
            ...contractData,
            status: 'Active'
        };
        setContracts(prev => [...prev, newContract]);
        logActivity(user.name, `Manually created Contract for "${newContract.clientName}"`);
    };

    // Scheduling Job CRUD
    const addJob = (jobData) => {
        const newJob = {
            id: 'j' + Date.now().toString().slice(-6),
            ...jobData,
            status: 'Scheduled',
            beforePhoto: null,
            afterPhoto: null,
            signature: null
        };
        setJobs(prev => [...prev, newJob]);
        logActivity(user.name, `Scheduled Daily Job: "${newJob.title}" for ${newJob.employeeName}`);
    };

    const deleteJob = (id) => {
        setJobs(prev => prev.filter(j => j.id !== id));
        logActivity(user.name, `Cancelled and deleted Scheduled Job "${id}"`);
    };

    const updateJobStatus = (id, newStatus, extraData = {}) => {
        setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus, ...extraData } : j));
        logActivity(user.name, `Updated job "${id}" status to "${newStatus}"`);
    };

    // Expense CRUD (Driver Petty Cash)
    const addExpense = (expenseData) => {
        const newExp = {
            id: 'exp' + Date.now().toString().slice(-6),
            driverName: user.name,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
            ...expenseData
        };
        setExpenses(prev => [...prev, newExp]);
        logActivity(user.name, `Logged Petty Cash Expense - $${newExp.amount} (${newExp.category})`);
    };

    const approveExpense = (id) => {
        setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'Approved' } : e));
        logActivity(user.name, `Approved Expense request "${id}"`);
    };

    // Invoice Actions
    const addInvoice = (invoiceData) => {
        const newInv = {
            id: 'inv-' + Date.now().toString().slice(-6),
            status: 'Pending',
            createdDate: new Date().toISOString().split('T')[0],
            ...invoiceData
        };
        setInvoices(prev => [...prev, newInv]);
        logActivity(user.name, `Generated Invoice "${newInv.id}" - $${newInv.amount}`);
    };

    const payInvoice = (id) => {
        setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'Paid' } : inv));
        const inv = invoices.find(i => i.id === id);
        logActivity(inv?.clientName || 'Client', `Settle payment for invoice "${id}" - amount $${inv?.amount || 0}`);
    };

    // Complaints
    const addComplaint = (complaintData) => {
        const newCmp = {
            id: 'cmp' + Date.now().toString().slice(-6),
            clientName: user.name === 'facilities@techlabs.io' ? 'TechLabs Headquarters' : user.name,
            status: 'Pending Review',
            date: new Date().toISOString().split('T')[0],
            ...complaintData,
            resolution: ''
        };
        setComplaints(prev => [...prev, newCmp]);
        logActivity(user.name, `Filed service complaint: "${newCmp.subject}"`);
    };

    const resolveComplaint = (id, resolutionText) => {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved', resolution: resolutionText } : c));
        logActivity(user.name, `Resolved Complaint ticket "${id}"`);
    };

    // Super Admin: Register new company Group
    const addCompany = (companyData) => {
        const newC = {
            id: 'c' + Date.now().toString().slice(-6),
            registeredOn: new Date().toISOString().split('T')[0],
            status: 'Active',
            logo: (companyData.name || 'C')[0].toUpperCase(),
            ...companyData
        };
        setCompanies(prev => [...prev, newC]);
        logActivity('Super Admin', `Provisioned new SaaS Company tenant: "${newC.name}"`);
    };

    return (
        <AppContext.Provider value={{
            isAuthenticated,
            userRole,
            user,
            loginAsRole,
            login,
            logout,
            updateUser,
            getRoleDashboardPath,

            // Core State Database
            companies,
            clients,
            quotations,
            contracts,
            jobs,
            expenses,
            invoices,
            complaints,
            logs,

            // Actions
            addClient,
            deleteClient,
            addQuote,
            approveQuote,
            renewContract,
            addContract,
            addJob,
            deleteJob,
            updateJobStatus,
            addExpense,
            approveExpense,
            addInvoice,
            payInvoice,
            addComplaint,
            resolveComplaint,
            addCompany
        }}>
            {children}
        </AppContext.Provider>
    );
};
