// Icon references are resolved via iconLookup in LandingPage.jsx

export const navLinks = [
    { label: 'Operational Workflow', href: '#workflow' },
    { label: 'Core Modules', href: '#modules' },
    { label: 'AMC & Quotations', href: '#amc' },
    { label: 'Scheduling', href: '#scheduling' },
    { label: 'Field Operations', href: '#mobile' },
];

export const workflowSteps = [
    { title: 'Inquiry Logged', desc: 'Capture customer details & service requirements', icon: 'FaSearchDollar' },
    { title: 'Draft Quotation', desc: 'Create quote with predefined services & VAT', icon: 'FaFileContract' },
    { title: 'Email Approval', desc: 'Client reviews and approves via email link', icon: 'FaEnvelopeOpenText' },
    { title: 'Convert to AMC', desc: 'Approved quote becomes an active contract', icon: 'FaHandshake' },
    { title: 'Dispatch & Schedule', desc: 'Assign driver and technician to daily route', icon: 'FaCalendarCheck' },
    { title: 'Field Execution', desc: 'Photos, checklists, and digital sign-off', icon: 'FaMobileAlt' },
    { title: 'Generate Invoice', desc: 'Auto-generate tax invoice with TRN', icon: 'FaFileInvoiceDollar' },
    { title: 'Payment Collection', desc: 'Track outstanding balance and collections', icon: 'FaChartLine' },
    { title: 'Renewal Alert', desc: 'Automated reminders before AMC expiry', icon: 'FaBell' },
];

export const moduleCards = [
    { title: 'CRM Follow-Up System', desc: 'Track all customer communications, activity logs, lead follow-up reminders, and sales pipeline updates in one operational dashboard.', icon: 'FaUsers', color: 'cyan' },
    { title: 'Service Management Setup', desc: 'Configure operational services (Deep Cleaning, Pest Control, Office Cleaning, AMC) with pricing, VAT, and predefined visit durations.', icon: 'FaCogs', color: 'indigo' },
    { title: 'Quotation & Template Builder', desc: 'Generate professional quotations with custom logo branding, editable Terms & Conditions, and automatic UAE VAT calculations.', icon: 'FaFileContract', color: 'emerald' },
    { title: 'Recurring AMC Automation', desc: 'Automatically generate recurring service visits based on AMC contract frequency schedules (weekly, monthly).', icon: 'FaHandshake', color: 'blue' },
    { title: 'Visual Dispatch Calendar', desc: 'Daily, weekly, and monthly operational scheduling board for technician assignments, routes, and AMC visit dispatching.', icon: 'FaCalendarCheck', color: 'amber' },
    { title: 'Mobile Field Operations', desc: 'Empower field teams with a mobile interface for job details, before/after photos, checklists, and digital customer signatures.', icon: 'FaMobileAlt', color: 'purple' },
    { title: 'Centralized Document Management', desc: 'Store and manage quotations, AMC contracts, invoices, technician uploads, customer attachments, and PDFs in one secure location.', icon: 'FaFolderOpen', color: 'teal' },
    { title: 'Client Self-Service Portal', desc: 'Allow clients to raise service requests, view AMC status, access invoices, review visit history, and track approvals directly.', icon: 'FaUserCheck', color: 'rose' },
    { title: 'Business Settings & Permissions', desc: 'Configure company branding, operational workflow settings, user access control, and granular role-based permissions.', icon: 'FaShieldAlt', color: 'slate' },
];

export const emailApprovalSteps = [
    { status: 'Drafted', desc: 'Quote prepared with VAT & TRN', icon: 'FaEdit', color: 'text-slate-400' },
    { status: 'Sent via Email', desc: 'PDF emailed directly to client', icon: 'FaPaperPlane', color: 'text-blue-400' },
    { status: 'Viewed by Client', desc: 'Track when the client opens the quote', icon: 'FaEye', color: 'text-amber-400' },
    { status: 'Approved', desc: 'Digital approval recorded in system', icon: 'FaCheckCircle', color: 'text-emerald-400' },
];

export const roleCards = [
    { title: 'Admin', desc: 'Full operational control, CRM management, reports, and workflow settings', color: 'purple' },
    { title: 'Sales Team', desc: 'Manage customers, draft quotations, and track approval workflows', color: 'blue' },
    { title: 'Dispatch Team', desc: 'Daily scheduling, technician assignment, and route coordination', color: 'amber' },
    { title: 'Technician', desc: 'View assigned jobs, upload photos, complete checklists, and capture signatures', color: 'emerald' },
    { title: 'Accounts Team', desc: 'Generate invoices, track payments, monitor outstanding balances, and financial reports', color: 'rose' },
    { title: 'Client Portal', desc: 'Clients can view/approve quotations, check invoices, and raise service requests', color: 'cyan' },
];

export const problemsSolved = [
    { problem: 'Manual Word/Excel Quotations', solution: 'Branded digital quotations with automated UAE VAT calculation' },
    { problem: 'Missed Contract Renewals', solution: 'Proactive dashboard alerts for expiring AMC contracts' },
    { problem: 'Scattered Field Coordination', solution: 'Visual dispatch board for technicians and vehicle routes' },
    { problem: 'Lost Paper Service Reports', solution: 'Paperless digital sign-offs and centralized document records' },
    { problem: 'Uncertain Quote Status', solution: 'Email tracking: Sent → Viewed → Approved workflow' },
    { problem: 'Disorganized Customer History', solution: 'Centralized CRM profiles with complete service and activity logs' },
];

export const trustBadges = [
    { label: 'UAE Operations Expertise', icon: 'FaMapMarkedAlt' },
    { label: 'Trained Technicians', icon: 'FaUsers' },
    { label: 'Paperless Workflows', icon: 'FaClipboardList' },
    { label: 'AMC Management', icon: 'FaHandshake' },
    { label: 'Operational Transparency', icon: 'FaSearchDollar' },
    { label: 'Professional Reporting', icon: 'FaChartPie' },
    { label: 'Fast Response', icon: 'FaClock' },
];

export const servicesWeProvide = [
    { title: 'Deep Cleaning', desc: 'Thorough top-to-bottom cleaning for residential and commercial spaces.', icon: 'FaBroom', freq: 'One-Time / Quarterly' },
    { title: 'Office Cleaning', desc: 'Daily or weekly janitorial services to keep your workplace pristine.', icon: 'FaBuilding', freq: 'Daily / Weekly' },
    { title: 'Pest Control', desc: 'Professional extermination and preventative pest management.', icon: 'FaShieldAlt', freq: 'Bi-Monthly / AMC' },
    { title: 'Sofa Cleaning', desc: 'Specialized fabric and upholstery shampooing and stain removal.', icon: 'FaCheckCircle', freq: 'On-Demand' },
    { title: 'Tank Cleaning', desc: 'Water tank sanitation and disinfection meeting UAE standards.', icon: 'FaTimesCircle', freq: 'Bi-Annual' },
    { title: 'Glass Cleaning', desc: 'Interior and exterior window and facade washing.', icon: 'FaEye', freq: 'Monthly' },
    { title: 'AMC Maintenance', desc: 'Annual Maintenance Contracts for year-round peace of mind.', icon: 'FaHandshake', freq: 'Annual' },
    { title: 'Facility Support', desc: 'Comprehensive soft services and building management support.', icon: 'FaTools', freq: 'Ongoing' },
];

export const industryCards = [
    { title: 'Cleaning Companies', desc: 'Manage commercial and residential cleaning crews', icon: 'FaBroom' },
    { title: 'Facility Management', desc: 'Coordinate multi-site facility maintenance schedules', icon: 'FaBuilding' },
    { title: 'AMC Service Providers', desc: 'Track recurring annual maintenance contracts', icon: 'FaHandshake' },
    { title: 'Maintenance Teams', desc: 'Dispatch technicians for specialized service calls', icon: 'FaTools' },
];

export const dashboardMetrics = [
    { label: 'Active AMC Contracts', value: '142', change: '8 expiring this month', color: 'cyan' },
    { label: 'Pending Approvals', value: '18', change: 'Awaiting client sign-off', color: 'amber' },
    { label: 'Field Jobs Today', value: '45', change: '32 completed, 13 pending', color: 'emerald' },
    { label: 'Outstanding Invoices', value: 'AED 42,500', change: 'Across 15 clients', color: 'rose' },
];

export const futureRoadmap = [
    { title: 'Automated Reminders', desc: 'System-generated reminders for optimal customer follow-up timing.', icon: 'FaClock' },
    { title: 'WhatsApp Integration', desc: 'Automated quotation links and service visit reminders via WhatsApp.', icon: 'FaWhatsapp' },
    { title: 'Operational Reporting', desc: 'Detailed insights on team productivity and completed service trends.', icon: 'FaChartPie' },
    { title: 'GPS Fleet Tracking', desc: 'Live location tracking for driver routes and vehicle management.', icon: 'FaMapMarkedAlt' },
];

export const mockCrmLogs = [
    { date: 'Today, 10:30 AM', user: 'Sarah (Sales)', action: 'Logged call with client regarding AMC renewal.' },
    { date: 'Yesterday, 2:15 PM', user: 'System', action: 'Sent deep cleaning quotation PDF via email.' },
    { date: 'Oct 12, 09:00 AM', user: 'Client', action: 'Approved quotation via email link.' },
];

export const mockScheduleTasks = [
    { time: '09:00 AM - 11:00 AM', job: 'Office Deep Clean', tech: 'Team A (Ali, Kumar)', status: 'In Progress', color: 'bg-blue-500/20 border-blue-500/30 text-blue-400' },
    { time: '12:30 PM - 02:00 PM', job: 'Pest Control', tech: 'Team B (Ravi)', status: 'Assigned', color: 'bg-amber-500/20 border-amber-500/30 text-amber-400' },
    { time: '03:00 PM - 05:00 PM', job: 'AMC Maintenance', tech: 'Team A (Ali, Kumar)', status: 'Pending', color: 'bg-slate-500/20 border-slate-500/30 text-slate-400' },
];

export const communicationWorkflows = [
    {
        title: 'Quotation Workflow',
        icon: 'FaFileContract',
        color: 'cyan',
        steps: ['Draft PDF', 'Sent via Email', 'Viewed by Client', 'Approved / Rejected', 'Expired']
    },
    {
        title: 'AMC Contract Workflow',
        icon: 'FaHandshake',
        color: 'blue',
        steps: ['Contract Generated', 'PDF Sent via Email', 'Client Review', 'Digital Signature', 'Contract Active']
    },
    {
        title: 'Invoicing & Payments',
        icon: 'FaFileInvoiceDollar',
        color: 'emerald',
        steps: ['Invoice Drafted', 'Emailed to Client', 'Due Reminder Sent', 'Partial Payment', 'Fully Paid']
    }
];

export const mockFinanceInvoices = [
    { id: 'INV-2026-089', client: 'Al Habtoor Towers', amount: 'AED 12,500', status: 'Paid', date: 'Oct 12' },
    { id: 'INV-2026-090', client: 'Marina Plaza', amount: 'AED 4,200', status: 'Partially Paid', date: 'Oct 14' },
    { id: 'INV-2026-091', client: 'Blue Waters Res.', amount: 'AED 8,900', status: 'Overdue', date: 'Oct 01' },
];

export const mockCustomerProfile = {
    name: 'Al Habtoor Enterprises',
    id: 'CUST-8091',
    tags: ['VIP Client', 'Active AMC'],
    tabs: ['Activity Timeline', 'Quotations (3)', 'AMC Contracts (1)', 'Invoices (12)', 'Service History', 'Documents'],
    recentActivity: [
        { title: 'AMC Renewal Approved', date: 'Oct 15, 2026', type: 'contract' },
        { title: 'Payment Received: AED 12,500', date: 'Oct 12, 2026', type: 'invoice' },
        { title: 'Deep Cleaning Visit Completed', date: 'Oct 08, 2026', type: 'service' }
    ]
};

export const mockOperationalReports = [
    { metric: 'Monthly AMC Revenue', value: 'AED 184,500', trend: '+12%', color: 'text-emerald-400' },
    { metric: 'Tech Productivity (Jobs/Day)', value: '4.8 Avg', trend: 'Stable', color: 'text-blue-400' },
    { metric: 'Overdue Invoices', value: 'AED 31,200', trend: '-5%', color: 'text-rose-400' },
];

export const mockSettingsToggles = [
    { label: 'Auto-Send AMC Renewal Reminders (30 Days Before)', active: true },
    { label: 'Require Technician Digital Signature on Job Card', active: true },
    { label: 'Enable Client Self-Service Portal Access', active: false },
    { label: 'Apply 5% UAE VAT to all Quotations by default', active: true },
];
