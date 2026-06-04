import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

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
    const [user, setUser] = useState(() => getStorage('user_v7', {
        name: 'ADMIN / OWNER',
        email: 'admin@teamenviro.ae',
        phone: '1234567890',
        address: 'HQ Office, Dubai'
    }));

    // Custom Alert Overlay State
    const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: '' });

    useEffect(() => {
        const handleAlert = (msg) => {
            setAlertConfig({ isOpen: true, message: String(msg) });
        };
        window.alert = handleAlert;
    }, []);

    // ══════════════════════════════════════════
    // OPERATIONAL SEED DATA
    // ══════════════════════════════════════════

    const initialClients = [
        { 
            id: 'c1', 
            name: 'Al Ghurair Centre', 
            contactPerson: 'John Miller', 
            email: 'operations@alghurair.com', 
            phone: '+971 4 555 0190', 
            whatsapp: '+971 4 555 0190',
            address: 'Deira, Dubai', 
            trn: '100123456700001', 
            notes: 'Tier-1 commercial retail plaza', 
            createdAt: '2026-01-10',
            emirate: 'Dubai',
            city: 'Dubai',
            buildingName: 'Al Ghurair Mall',
            officeVilla: 'Suite 402',
            googleMapLink: 'https://maps.google.com/?q=25.2678,55.3188',
            gpsCoordinates: '25.2678, 55.3188',
            landmark: 'Near Union Metro Station',
            customerType: 'Commercial',
            industry: 'Retail',
            source: 'Referral',
            website: 'www.alghurair.com',
            landline: '+971 4 555 0100',
            status: 'Active',
            creditLimit: 50000,
            advanceBalance: 2500,
            paymentTerms: '30 Days',
            preferredTiming: 'Morning',
            priorityLevel: 'High',
            refundHistory: [],
            tags: ['Contract Customer', 'High Priority'],
            documents: [
                { name: 'Trade License.pdf', type: 'Trade License', expiryDate: '2027-05-30' },
                { name: 'SLA Agreement.pdf', type: 'Contract', expiryDate: '2026-12-31' }
            ],
            communications: [
                { type: 'Call', date: '2026-05-25 10:00 AM', staff: 'Sales Exec', notes: 'Discussed routine AC check timing.' }
            ]
        },
        { 
            id: 'c2', 
            name: 'TechLabs DIFC HQ', 
            contactPerson: 'David Chen', 
            email: 'facilities@techlabs.io', 
            phone: '+971 4 555 9832', 
            whatsapp: '+971 4 555 9832',
            address: 'The Gate District, DIFC, Dubai', 
            trn: '100234567800002', 
            notes: 'Corporate office - cleaning on weekends', 
            createdAt: '2026-02-15',
            emirate: 'Dubai',
            city: 'Dubai',
            buildingName: 'The Gate District',
            officeVilla: 'Level 15, Tower 2',
            googleMapLink: 'https://maps.google.com/?q=25.2152,55.2804',
            gpsCoordinates: '25.2152, 55.2804',
            landmark: 'Near DIFC Gate Building',
            customerType: 'Commercial',
            industry: 'Technology',
            source: 'Website',
            website: 'www.techlabs.io',
            landline: '+971 4 555 9800',
            status: 'Active',
            creditLimit: 20000,
            advanceBalance: 0,
            paymentTerms: '15 Days',
            preferredTiming: 'Afternoon',
            priorityLevel: 'Medium',
            refundHistory: [],
            tags: ['Contract Customer'],
            documents: [
                { name: 'Trade License.pdf', type: 'Trade License', expiryDate: '2026-11-20' }
            ],
            communications: [
                { type: 'Email', date: '2026-05-21 02:30 PM', staff: 'Admin', notes: 'Sent deep cleaning proposal.' }
            ]
        },
        { 
            id: 'c3', 
            name: 'Metro Health Clinic', 
            contactPerson: 'Dr. Sarah Wilson', 
            email: 'admin@metrohealth.org', 
            phone: '+971 4 555 4421', 
            whatsapp: '+971 4 555 4421',
            address: 'Healthcare City, Dubai', 
            trn: '100345678900003', 
            notes: 'Medical grade deep sanitization', 
            createdAt: '2026-03-20',
            emirate: 'Dubai',
            city: 'Dubai',
            buildingName: 'Clinic Block A',
            officeVilla: 'Unit 102',
            googleMapLink: 'https://maps.google.com/?q=25.2304,55.3218',
            gpsCoordinates: '25.2304, 55.3218',
            landmark: 'Opposite City Centre Deira',
            customerType: 'Commercial',
            industry: 'Healthcare',
            source: 'Cold Call',
            website: 'www.metrohealth.org',
            landline: '+971 4 555 4400',
            status: 'Active',
            creditLimit: 15000,
            advanceBalance: 500,
            paymentTerms: '15 Days',
            preferredTiming: 'Evening',
            priorityLevel: 'High',
            refundHistory: [],
            tags: ['Contract Customer', 'VIP'],
            documents: [
                { name: 'Municipality Permit.pdf', type: 'Site Photo', expiryDate: '2027-01-15' }
            ],
            communications: [
                { type: 'Meeting', date: '2026-05-24 11:00 AM', staff: 'Sales Mgr', notes: 'Agreed on medical disinfection frequency.' }
            ]
        },
        { 
            id: 'c4', 
            name: 'Palm Jumeirah Signature Villa', 
            contactPerson: 'Elena Rostova', 
            email: 'owner@palmvilla.com', 
            phone: '+971 4 555 7811', 
            whatsapp: '+971 4 555 7811',
            address: 'Frond D, Palm Jumeirah, Dubai', 
            trn: '100456789000004', 
            notes: 'VIP high-end deep cleaning request', 
            createdAt: '2026-04-08',
            emirate: 'Dubai',
            city: 'Dubai',
            buildingName: 'Signature Villa 18',
            officeVilla: 'Villa 18',
            googleMapLink: 'https://maps.google.com/?q=25.1147,55.1389',
            gpsCoordinates: '25.1147, 55.1389',
            landmark: 'Frond D Entrance',
            customerType: 'VIP',
            industry: 'Residential',
            source: 'Referral',
            website: '',
            landline: '',
            status: 'Active',
            creditLimit: 100000,
            advanceBalance: 12000,
            paymentTerms: 'COD',
            preferredTiming: 'Morning',
            priorityLevel: 'VIP',
            refundHistory: [],
            tags: ['VIP', 'One-Time Customer'],
            documents: [
                { name: 'Site Layout.jpg', type: 'Site Photo', expiryDate: '2030-01-01' }
            ],
            communications: [
                { type: 'WhatsApp', date: '2026-05-25 09:15 AM', staff: 'Sales Exec', notes: 'Client confirmed Friday clean.' }
            ]
        },
        { 
            id: 'c5', 
            name: 'Emaar Square Bldg 3', 
            contactPerson: 'Hassan Al Yousuf', 
            email: 'building3@emaarsquare.ae', 
            phone: '+971 4 332 9988', 
            whatsapp: '+971 4 332 9988',
            address: 'Downtown Dubai', 
            trn: '100567890100005', 
            notes: 'Full tower external glass washing contract', 
            createdAt: '2026-04-12',
            emirate: 'Dubai',
            city: 'Dubai',
            buildingName: 'Emaar Square Building 3',
            officeVilla: 'Suite 901',
            googleMapLink: 'https://maps.google.com/?q=25.1996,55.2758',
            gpsCoordinates: '25.1996, 55.2758',
            landmark: 'Near Dubai Mall Metro',
            customerType: 'Commercial',
            industry: 'Real Estate',
            source: 'Website',
            website: 'www.emaarsquare.ae',
            landline: '+971 4 332 9900',
            status: 'Active',
            creditLimit: 75000,
            advanceBalance: 0,
            paymentTerms: '30 Days',
            preferredTiming: 'Morning',
            priorityLevel: 'High',
            refundHistory: [],
            tags: ['Contract Customer', 'High Priority'],
            documents: [
                { name: 'Trade License 2026.pdf', type: 'Trade License', expiryDate: '2026-09-30' }
            ],
            communications: [
                { type: 'Call', date: '2026-05-22 04:00 PM', staff: 'Sales Exec', notes: 'Followed up on glass wash feedback.' }
            ]
        }
    ];

    const initialLeads = [
        { id: 'ld1', name: 'Al Wasl Properties', contactPerson: 'Ahmed Al Maktoum', email: 'ahmed@alwasl.ae', phone: '+971 50 111 2233', source: 'Website', status: 'New Lead', notes: 'Interested in annual maintenance for 3 residential blocks.', followUps: [{ date: '2026-05-20', note: 'Initial inquiry received via website contact form.' }], createdAt: '2026-05-18' },
        { id: 'ld2', name: 'Marina Bay Premium Towers', contactPerson: 'Sarah Johnson', email: 'sarah@marinabay.ae', phone: '+971 55 222 3344', source: 'Referral', status: 'Contacted', notes: 'Referred by Al Ghurair management. Wants deep cleaning quotes.', followUps: [{ date: '2026-05-19', note: 'Called and discussed sofa & floor deep cleaning requirements.' }, { date: '2026-05-21', note: 'Scheduled general site inspection.' }], createdAt: '2026-05-15' },
        { id: 'ld3', name: 'JBR Beachfront Hotel', contactPerson: 'Mohammed Rashid', email: 'rashid@jbrhotel.ae', phone: '+971 56 333 4455', source: 'Cold Call', status: 'Site Survey', notes: 'Requires quarterly deep kitchen sanitization for 3 restaurants.', followUps: [{ date: '2026-05-16', note: 'Cold call - operations manager shared email for quote.' }, { date: '2026-05-22', note: 'Site survey completed by Ali Hassan.' }], createdAt: '2026-05-10' },
        { id: 'ld4', name: 'Silicon Oasis Office Park', contactPerson: 'Priya Sharma', email: 'priya@siliconoasis.ae', phone: '+971 52 444 5566', source: 'Exhibition', status: 'Quoted', notes: 'Met at FM Expo 2026. Quote sent for office routine disinfection AMC.', followUps: [{ date: '2026-05-12', note: 'Met at exhibition booth.' }, { date: '2026-05-15', note: 'Sent quotation QT-2026-002 for routine cleaning.' }], createdAt: '2026-05-08' },
        { id: 'ld5', name: 'Creek Harbour Residences', contactPerson: 'Omar Hassan', email: 'omar@creekharbour.ae', phone: '+971 58 555 6677', source: 'Website', status: 'Approved', notes: 'Negotiation completed. Contract approved, ready for AMC setup.', followUps: [{ date: '2026-05-10', note: 'Website inquiry.' }, { date: '2026-05-14', note: 'Site inspection completed.' }, { date: '2026-05-20', note: 'Client approved pricing via signed letter.' }], createdAt: '2026-05-05' },
        { id: 'ld6', name: 'Burj Khalifa Corporate Lounge', contactPerson: 'Tariq Al Mansoor', email: 'lounge@burjkhalifa.ae', phone: '+971 50 999 8877', source: 'Cold Call', status: 'New Lead', notes: 'Urgently needs high-pressure steam cleaning for carpet tiles.', followUps: [], createdAt: '2026-05-24' },
        { id: 'ld7', name: 'Damac Hills Residential Complex', contactPerson: 'William Croft', email: 'wcroft@damachills.com', phone: '+971 52 777 6655', source: 'Referral', status: 'Contacted', notes: 'Requesting villa external window cleaning proposal.', followUps: [{ date: '2026-05-23', note: 'Spoke over call, client wants quotation by tomorrow.' }], createdAt: '2026-05-22' }
    ];

    const initialServices = [
        { id: 's1', name: 'Deep Cleaning & Sanitization', category: 'Deep Cleaning', price: 1500, unit: 'per session', vatPercent: 5, frequency: 'One-time', duration: '4 Hours', description: 'Comprehensive deep cleaning with high-pressure steamers and disinfectants.' },
        { id: 's2', name: 'Standard Office Cleaning', category: 'Office Cleaning', price: 150, unit: 'per visit', vatPercent: 5, frequency: 'Daily', duration: '3 Hours', description: 'Regular office maintenance, dusting, mopping, trash disposal.' },
        { id: 's3', name: 'Pest Control Treatment', category: 'Pest Control', price: 800, unit: 'per service', vatPercent: 5, frequency: 'Quarterly', duration: '2 Hours', description: 'General pest control covering cockroach, bedbug, and rodent protection.' },
        { id: 's4', name: 'Sofa & Upholstery Shampooing', category: 'Sofa Cleaning', price: 500, unit: 'per set', vatPercent: 5, frequency: 'One-time', duration: '2 Hours', description: 'Fabric sofa extraction cleaning and sanitization.' },
        { id: 's5', name: 'Water Tank Sanitization', category: 'Tank Cleaning', price: 2000, unit: 'per tank', vatPercent: 5, frequency: 'Annual', duration: '5 Hours', description: 'Municipality-approved water tank cleaning, disinfection, and certification.' },
        { id: 's6', name: 'Annual Maintenance Package (AMC)', category: 'AMC Maintenance', price: 12000, unit: 'per year', vatPercent: 5, frequency: 'Annual', duration: 'Multiple', description: 'Combined package including regular disinfection, pest control, and AC filters check.' },
    ];

    const initialQuotes = [
        {
            id: 'q1', refNumber: 'QT-2026-001', clientName: 'Al Ghurair Centre', clientEmail: 'operations@alghurair.com',
            lineItems: [
                { service: 'Deep Cleaning & Sanitization', description: 'Common lobby deep cleaning', qty: 2, rate: 1500, vatPercent: 5 },
                { service: 'Sofa & Upholstery Shampooing', description: 'Reception sofas (10 seats)', qty: 10, rate: 50, vatPercent: 5 }
            ],
            subtotal: 3500, vatAmount: 175, discount: 200, grandTotal: 3475,
            terms: 'Payment: 50% Advance, 50% upon completion. Subject to 5% VAT.',
            notes: 'Client requires service on Friday morning.',
            revisions: [{ date: '2026-05-18', action: 'Created', user: 'Sales Exec' }],
            status: 'Approved', createdDate: '2026-05-18', approvedDate: '2026-05-19', sentDate: '2026-05-18'
        },
        {
            id: 'q2', refNumber: 'QT-2026-002', clientName: 'TechLabs DIFC HQ', clientEmail: 'facilities@techlabs.io',
            lineItems: [
                { service: 'Standard Office Cleaning', description: 'Monthly subscription - Daily visits', qty: 1, rate: 4500, vatPercent: 5 },
                { service: 'Pest Control Treatment', description: 'Quarterly general treatment', qty: 1, rate: 800, vatPercent: 5 }
            ],
            subtotal: 5300, vatAmount: 265, discount: 0, grandTotal: 5565,
            terms: 'Payment within 30 days of invoice. Standard AMC contract.',
            notes: 'Requires weekend scheduling only.',
            revisions: [{ date: '2026-05-20', action: 'Created', user: 'Admin' }],
            status: 'Sent', createdDate: '2026-05-20', approvedDate: null, sentDate: '2026-05-21'
        },
    ];

    const initialContracts = [
        { 
            id: 'ctr1', clientName: 'Al Ghurair Centre', title: 'Grand Central AMC 2026', 
            value: 41700, billingCycle: 'Monthly', startDate: '2026-01-01', endDate: '2026-12-31', 
            status: 'Active', visitFrequency: 'Monthly', 
            includedServices: ['Deep Cleaning & Sanitization', 'Pest Control Treatment'], 
            scope: 'Includes monthly lobby deep cleans and quarterly pest control services.',
            renewalAlert: false 
        },
        { 
            id: 'ctr2', clientName: 'Metro Health Clinic', title: 'Clinic Medical Disinfection AMC', 
            value: 24000, billingCycle: 'Quarterly', startDate: '2026-04-01', endDate: '2027-03-31', 
            status: 'Active', visitFrequency: 'Weekly', 
            includedServices: ['Deep Cleaning & Sanitization'], 
            scope: 'Medical grade clinic sanitization every Thursday night.',
            renewalAlert: false 
        }
    ];

    const initialWorkOrders = [
        { 
            id: 'wo-101', 
            customerName: 'Al Ghurair Centre', 
            address: 'Deira, Dubai', 
            serviceType: 'Deep Cleaning & Sanitization', 
            timeSlot: '09:00 AM - 01:00 PM', 
            date: '2026-05-26',
            assignedTechnician: 'CLEANING TECH', 
            assignedDriver: 'DRIVER LOGISTICS', 
            vehicleInfo: 'Toyota Hiace - Van #04',
            instructions: 'Report to security gate 2. Carry full deep-clean extraction gear.', 
            status: 'Pending',
            beforePhotos: [],
            afterPhotos: [],
            customerSignature: null,
            completionNotes: ''
        },
        { 
            id: 'wo-102', 
            customerName: 'Metro Health Clinic', 
            address: 'Healthcare City, Dubai', 
            serviceType: 'Deep Cleaning & Sanitization', 
            timeSlot: '10:00 PM - 02:00 AM', 
            date: '2026-05-26',
            assignedTechnician: 'CLEANING TECH', 
            assignedDriver: 'DRIVER LOGISTICS', 
            vehicleInfo: 'Nissan Urvan - Van #08',
            instructions: 'Clinic sanitization. Double check pharmacy storage room disinfection.', 
            status: 'In Progress',
            beforePhotos: ['/placeholder-before.jpg'],
            afterPhotos: [],
            customerSignature: null,
            completionNotes: ''
        },
        { 
            id: 'wo-103', 
            customerName: 'Palm Jumeirah Signature Villa', 
            address: 'Frond D, Palm Jumeirah, Dubai', 
            serviceType: 'Sofa & Upholstery Shampooing', 
            timeSlot: '02:00 PM - 04:00 PM', 
            date: '2026-05-25',
            assignedTechnician: 'CLEANING TECH', 
            assignedDriver: 'DRIVER LOGISTICS', 
            vehicleInfo: 'Toyota Hiace - Van #04',
            instructions: 'Be extra careful with velvet fabric material sofa.', 
            status: 'Completed',
            beforePhotos: ['/placeholder-before.jpg'],
            afterPhotos: ['/placeholder-after.jpg'],
            customerSignature: 'Elena Rostova',
            completionNotes: 'All fabric stains successfully extracted.'
        }
    ];

    const initialInvoices = [
        { id: 'inv-2001', customerName: 'Al Ghurair Centre', refQuote: 'QT-2026-001', amount: 3475, vatAmount: 175, date: '2026-05-19', dueDate: '2026-06-19', status: 'Sent' },
        { id: 'inv-2002', customerName: 'Palm Jumeirah Signature Villa', refQuote: 'QT-2026-003', amount: 42680, vatAmount: 2080, date: '2026-05-25', dueDate: '2026-06-09', status: 'Paid' },
        { id: 'inv-2003', customerName: 'Metro Health Clinic', refQuote: 'AMC-CTR2', amount: 6000, vatAmount: 300, date: '2026-05-01', dueDate: '2026-05-31', status: 'Overdue' }
    ];

    const initialPayments = [
        { id: 'pay-5001', customerName: 'Palm Jumeirah Signature Villa', invoiceId: 'inv-2002', amountPaid: 42680, paymentMethod: 'Bank Transfer', referenceNo: 'DXB-9874102', date: '2026-05-25' },
        { id: 'pay-5002', customerName: 'Al Ghurair Centre', invoiceId: 'inv-2001', amountPaid: 1500, paymentMethod: 'Cash', referenceNo: 'CSH-02298', date: '2026-05-20' }
    ];

    const initialLogs = [
        { id: 'l1', user: 'Ali Hassan', action: 'Uploaded Work Order wo-103 completion details', time: '2026-05-25 04:30 PM' },
        { id: 'l2', user: 'Admin', action: 'Approved Quotation QT-2026-001', time: '2026-05-21 11:30 AM' },
        { id: 'l3', user: 'Dispatch Team', action: 'Scheduled AMC Work Order for Metro Health Clinic', time: '2026-05-20 02:15 PM' },
        { id: 'l4', user: 'Sales', action: 'Converted Lead Al Wasl Properties to Contacted', time: '2026-05-20 10:45 AM' },
    ];

    const initialNotifications = [
        { 
            id: '1', 
            category: 'amc',
            title: 'AMC Contract Expiring in 30 Days (Al Ghurair Centre)', 
            body: 'The annual maintenance contract for Al Ghurair Commercial Block B is expiring in 30 days. Renewal proposal is pending dispatch.', 
            time: '15 mins ago', 
            type: 'error', 
            read: false,
            badgeText: 'Urgent AMC'
        },
        { 
            id: '2', 
            category: 'quotes',
            title: 'Quote Approved: Q-9024 (EMAAR Square Offices)', 
            body: 'Client approved deep cleaning quotation Q-9024 for EMAAR Square Tower 3. Approved value: AED 12,500.', 
            time: '45 mins ago', 
            type: 'success', 
            read: false,
            badgeText: 'Quote Approved'
        },
        { 
            id: '3', 
            category: 'scheduling',
            title: 'Technician Assigned to Work Order #WO-802', 
            body: 'Lead Supervisor Ali Hassan has been assigned to the Marina Heights Penthouse deep extraction sanitization job.', 
            time: '2 hours ago', 
            type: 'info', 
            read: false,
            badgeText: 'Scheduled'
        },
        { 
            id: '4', 
            category: 'payments',
            title: 'Payment Received: Invoice #INV-109', 
            body: 'AED 8,400 payment successfully cleared for Downtown Mall Office Clean invoice from EMAAR Properties.', 
            time: '3 hours ago', 
            type: 'success', 
            read: true,
            badgeText: 'Paid'
        },
        { 
            id: '5', 
            category: 'followup',
            title: 'Lead Follow-Up Due: Majid Al Futtaim Rep', 
            body: 'Scheduled follow-up due with Majed regarding commercial office cleaning inquiry. Status: Nurture.', 
            time: '5 hours ago', 
            type: 'warning', 
            read: false,
            badgeText: 'Follow-Up'
        },
        { 
            id: '6', 
            category: 'amc',
            title: 'AMC Renewal Pending: Executive Villa (Palm Jumeirah)', 
            body: 'Annual Maintenance Contract for Signature Villa Palm Jumeirah is pending renewal. Roster expires on 15-Jun-2026.', 
            time: '1 day ago', 
            type: 'error', 
            read: true,
            badgeText: 'AMC Renewal'
        },
        { 
            id: '7', 
            category: 'quotes',
            title: 'Quote Viewed: Q-9028 (Damac Hills Sofa Sanitization)', 
            body: 'Client viewed deep sofa dry vacuum quotation Q-9028. Total: AED 3,200.', 
            time: '1 day ago', 
            type: 'info', 
            read: true,
            badgeText: 'Quote Viewed'
        },
        { 
            id: '8', 
            category: 'quotes',
            title: 'Quote Rejected: Q-9021 (Marina Plaza Window Wash)', 
            body: 'Client rejected quotation Q-9021. Reason: Competitor price matching requested. Budget: AED 4,800.', 
            time: '2 days ago', 
            type: 'warning', 
            read: true,
            badgeText: 'Quote Rejected'
        },
        { 
            id: '9', 
            category: 'scheduling',
            title: 'Bi-Weekly Deep Kitchen Roster Scheduled', 
            body: 'Standard bi-weekly deep grease trap kitchen cleaning roster scheduled for Burj Khalifa Residence #401.', 
            time: '2 days ago', 
            type: 'info', 
            read: true,
            badgeText: 'Scheduled'
        },
        { 
            id: '10', 
            category: 'scheduling',
            title: 'Upcoming Site Survey: Dubai Hills Estate', 
            body: 'Technical supervisor field audit scheduled tomorrow at 10:00 AM for commercial site survey at Dubai Hills Estate.', 
            time: '3 days ago', 
            type: 'info', 
            read: true,
            badgeText: 'Site Survey'
        },
        { 
            id: '11', 
            category: 'payments',
            title: 'Invoice Overdue: #INV-102 (Al Barsha Villa)', 
            body: 'Invoice #INV-102 for Al Barsha Residential Post-Construction Clean (AED 2,100) is overdue by 7 days.', 
            time: '4 days ago', 
            type: 'error', 
            read: false,
            badgeText: 'Overdue'
        },
        { 
            id: '12', 
            category: 'followup',
            title: 'Site Survey Pending: JLT Cluster Y Kitchen', 
            body: 'Site survey and grease trap dimensions audit pending for JLT Cluster Y Commercial Kitchen.', 
            time: '5 days ago', 
            type: 'warning', 
            read: true, 
            badgeText: 'Survey Pending'
        }
    ];

    const initialComplaints = [
        { id: 'comp-101', complaintNumber: 'TEC-COMP-2026-001', date: '2026-05-24', customerId: 'c1', customerName: 'Al Ghurair Centre', amcRef: 'ctr1', complaintType: 'Delay', priority: 'High', assignedTeam: 'Cleaning Crew A', slaHours: 24, resolutionNotes: '', status: 'Open' },
        { id: 'comp-102', complaintNumber: 'TEC-COMP-2026-002', date: '2026-05-20', customerId: 'c3', customerName: 'Metro Health Clinic', amcRef: 'ctr2', complaintType: 'Service Issue', priority: 'Emergency', assignedTeam: 'Sanitization Techs', slaHours: 4, resolutionNotes: 'Re-disinfected pharmacy storage room. Client satisfied.', status: 'Resolved' }
    ];

    const initialVehicles = [
        { id: 'v1', plateNumber: 'DXB-A-12345', type: 'Toyota Hiace - Van #04', status: 'Available' },
        { id: 'v2', plateNumber: 'DXB-B-98765', type: 'Nissan Urvan - Van #08', status: 'Active' },
        { id: 'v3', plateNumber: 'SHJ-C-54321', type: 'Ford Transit - Van #12', status: 'Maintenance' }
    ];

    const initialDriverTrips = [
        { 
            id: 'trip-9001', 
            driverId: 'drv1', 
            driverName: 'Mohammed Tariq', 
            vehicleNumber: 'DXB-A-12345', 
            tripStartTime: '2026-05-25 08:00 AM', 
            tripEndTime: '2026-05-25 05:00 PM', 
            odometerStart: 124500, 
            odometerEnd: 124620, 
            fuelExpense: 150, 
            routeDetails: 'Dubai Marina to Deira', 
            vehicleCondition: 'Good', 
            remarks: 'Smooth trip, no delays.', 
            status: 'Completed', 
            linkedWorkOrderId: 'wo-101' 
        }
    ];

    const initialSettings = {
        companyName: 'Team Enviro Cleaning Services LLC',
        trn: '100349827400003',
        address: 'P.O. Box 12345, Business Bay, Dubai, UAE',
        phone: '+971 4 123 4567',
        email: 'info@teamenviro.ae',
        website: 'www.teamenviro.ae',
        logo: '/images/team-enviro-logo.png',
        quotationTerms: '1. Standard terms of clean services apply.\n2. Payment: Net 30 days from Invoice Date.\n3. All figures mentioned are in UAE Dirhams (AED) and subject to 5% VAT.',
        amcTerms: '1. Roster schedule agreed cannot be changed within 24 hours.\n2. Invoicing quarterly in advance.\n3. Term: 1 year recurring.',
        smtpHost: 'smtp.teamenviro.ae',
        smtpPort: '587',
        smtpUser: 'notifications@teamenviro.ae',
        smtpPass: 'EnviroSecure2026'
    };

    const roleProfiles = {
        admin: { name: 'ADMIN / OWNER', email: 'admin@teamenviro.ae', phone: '1234567890', address: 'HQ Office, Dubai', role: 'admin' },
        sales: { name: 'SALES REP', email: 'sales@teamenviro.ae', phone: '1234567890', address: 'HQ Office, Dubai', role: 'sales' },
        dispatch: { name: 'DISPATCH TEAM', email: 'dispatch@teamenviro.ae', phone: '1234567890', address: 'Operations Desk, Dubai', role: 'dispatch' },
        technician: { name: 'CLEANING TECH', email: 'technician@teamenviro.ae', phone: '1234567890', address: 'Field Operations Van #4', role: 'technician' },
        accounts: { name: 'ACCOUNTS DEPT', email: 'accounts@teamenviro.ae', phone: '1234567890', address: 'Finance Dept, Dubai', role: 'accounts' },
        driver: { name: 'DRIVER LOGISTICS', email: 'driver@teamenviro.ae', phone: '1234567890', address: 'Field Logistics Van #4', role: 'driver' }
    };

    const initialInventory = [
        { id: 'inv-1', name: 'AC Filter 24x24', category: 'HVAC', quantity: 45, unit: 'pcs', minStock: 10 },
        { id: 'inv-2', name: 'Sanitization Liquid (5L)', category: 'Chemicals', quantity: 8, unit: 'cans', minStock: 15 },
        { id: 'inv-3', name: 'AC Compressor 1.5Ton', category: 'HVAC Parts', quantity: 3, unit: 'pcs', minStock: 5 },
        { id: 'inv-4', name: 'Sofa Cleaning Agent (1L)', category: 'Chemicals', quantity: 24, unit: 'bottles', minStock: 8 },
        { id: 'inv-5', name: 'Microfiber Towel Pack', category: 'Cleaning Tools', quantity: 50, unit: 'packs', minStock: 12 },
        { id: 'inv-6', name: 'AC Fan Motor', category: 'HVAC Parts', quantity: 1, unit: 'pcs', minStock: 3 }
    ];

    const initialPartsRequests = [
        { id: 'req-9001', workOrderId: 'wo-101', customerName: 'Al Ghurair Centre', partsRequested: [{ name: 'AC Filter 24x24', qty: 2 }], status: 'Pending', date: '2026-05-25' }
    ];

    // States with upgraded localStorage keys to force re-population
    const [clients, setClients] = useState(() => getStorage('crm_clients_v3', initialClients));
    const [leads, setLeads] = useState(() => getStorage('crm_leads_v2', initialLeads));
    const [services, setServices] = useState(() => getStorage('crm_services_v2', initialServices));
    const [quotations, setQuotations] = useState(() => getStorage('crm_quotes_v2', initialQuotes));
    const [contracts, setContracts] = useState(() => getStorage('crm_contracts_v2', initialContracts));
    const [workOrders, setWorkOrders] = useState(() => getStorage('crm_work_orders_v5', initialWorkOrders));
    const [invoices, setInvoices] = useState(() => getStorage('crm_invoices_v2', initialInvoices));
    const [payments, setPayments] = useState(() => getStorage('crm_payments_v2', initialPayments));
    const [complaints, setComplaints] = useState(() => getStorage('crm_complaints_v3', initialComplaints));
    const [vehicles, setVehicles] = useState(() => getStorage('crm_vehicles_v3', initialVehicles));
    const [driverTrips, setDriverTrips] = useState(() => getStorage('crm_driver_trips_v3', initialDriverTrips));
    const [inventory, setInventory] = useState(() => getStorage('crm_inventory_v3', initialInventory));
    const [partsRequests, setPartsRequests] = useState(() => getStorage('crm_parts_requests_v3', initialPartsRequests));
    const [logs, setLogs] = useState(() => getStorage('crm_logs_v2', initialLogs));
    const [settings, setSettings] = useState(() => getStorage('crm_settings_v2', initialSettings));
    const [notifications, setNotifications] = useState(() => getStorage('crm_notifications_v2', initialNotifications));

    // Save states on updates
    useEffect(() => setStorage('isAuthenticated', isAuthenticated), [isAuthenticated]);
    useEffect(() => setStorage('userRole', userRole), [userRole]);
    useEffect(() => setStorage('user_v7', user), [user]);
    useEffect(() => setStorage('crm_clients_v3', clients), [clients]);
    useEffect(() => setStorage('crm_leads_v2', leads), [leads]);
    useEffect(() => setStorage('crm_services_v2', services), [services]);
    useEffect(() => setStorage('crm_quotes_v2', quotations), [quotations]);
    useEffect(() => setStorage('crm_contracts_v2', contracts), [contracts]);
    useEffect(() => setStorage('crm_work_orders_v5', workOrders), [workOrders]);
    useEffect(() => setStorage('crm_invoices_v2', invoices), [invoices]);
    useEffect(() => setStorage('crm_payments_v2', payments), [payments]);
    useEffect(() => setStorage('crm_complaints_v3', complaints), [complaints]);
    useEffect(() => setStorage('crm_vehicles_v3', vehicles), [vehicles]);
    useEffect(() => setStorage('crm_driver_trips_v3', driverTrips), [driverTrips]);
    useEffect(() => setStorage('crm_inventory_v3', inventory), [inventory]);
    useEffect(() => setStorage('crm_parts_requests_v3', partsRequests), [partsRequests]);
    useEffect(() => setStorage('crm_logs_v2', logs), [logs]);
    useEffect(() => setStorage('crm_settings_v2', settings), [settings]);
    useEffect(() => setStorage('crm_notifications_v2', notifications), [notifications]);

    const loginAsRole = (role) => {
        if (!roleProfiles[role]) return false;
        setIsAuthenticated(true);
        setUserRole(role);
        const profile = roleProfiles[role];
        setUser(profile);
        logActivity(profile.name, `Logged in as ${role.toUpperCase()}`);
        return true;
    };

    const getRoleDashboardPath = () => '/dashboard';

    const login = (email, password) => {
        if (!email) return false;
        const emailLower = email.toLowerCase().trim();
        let role = 'admin';
        if (emailLower.includes('sales')) role = 'sales';
        else if (emailLower.includes('dispatch')) role = 'dispatch';
        else if (emailLower.includes('technician') || emailLower.includes('ali')) role = 'technician';
        else if (emailLower.includes('accounts') || emailLower.includes('finance')) role = 'accounts';
        else if (emailLower.includes('driver')) role = 'driver';
        return loginAsRole(role);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole('admin');
        setUser(roleProfiles.admin);
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
        logActivity(user.name, 'Updated profile details');
    };

    const logActivity = (userName, actionText) => {
        const newLog = {
            id: String(Date.now()),
            user: userName,
            action: actionText,
            time: new Date().toLocaleString()
        };
        setLogs(prev => [newLog, ...prev]);
    };

    // ══════════════════════════════════════════
    // OPERATIONAL WORKFLOW ACTIONS
    // ══════════════════════════════════════════

    // 1. Convert Lead to Customer
    const convertLeadToCustomer = (leadId) => {
        const lead = leads.find(l => l.id === leadId);
        if (!lead) return;
        const newCustomer = {
            id: 'c' + Date.now().toString().slice(-6),
            name: lead.name,
            contactPerson: lead.contactPerson,
            email: lead.email,
            phone: lead.phone,
            address: lead.address || 'Dubai, UAE',
            trn: '100' + Math.floor(Math.random()*9000000000+1000000000),
            notes: lead.notes,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setClients(prev => [...prev, newCustomer]);
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: 'Approved' } : l));
        logActivity(user.name, `Converted Lead "${lead.name}" to Customer`);
    };

    // 2. Add / Edit Lead
    const addLead = (leadData) => {
        const newLead = {
            id: 'ld' + Date.now().toString().slice(-6),
            ...leadData,
            status: leadData.status || 'New Lead',
            followUps: leadData.followUps || [],
            createdAt: new Date().toISOString().split('T')[0]
        };
        setLeads(prev => [...prev, newLead]);
        logActivity(user.name, `Added Lead "${newLead.name}"`);
    };

    const updateLead = (id, leadData) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, ...leadData } : l));
        logActivity(user.name, `Updated Lead "${leadData.name || id}"`);
    };

    const deleteLead = (id) => {
        const target = leads.find(l => l.id === id);
        setLeads(prev => prev.filter(l => l.id !== id));
        logActivity(user.name, `Deleted Lead "${target?.name || id}"`);
    };

    const addFollowUp = (leadId, note) => {
        setLeads(prev => prev.map(l => {
            if (l.id === leadId) {
                const followUps = [...(l.followUps || []), { date: new Date().toISOString().split('T')[0], note }];
                return { ...l, followUps, status: 'Contacted' };
            }
            return l;
        }));
        logActivity(user.name, `Added follow-up notes to Lead "${leadId}"`);
    };

    // 3. Customer CRUD
    const addClient = (clientData) => {
        const newClient = {
            id: 'c' + Date.now().toString().slice(-6),
            ...clientData,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setClients(prev => [...prev, newClient]);
        logActivity(user.name, `Created Customer profile "${newClient.name}"`);
    };

    const updateClient = (id, clientData) => {
        setClients(prev => prev.map(c => c.id === id ? { ...c, ...clientData } : c));
        logActivity(user.name, `Updated Customer "${clientData.name || id}"`);
    };

    const deleteClient = (id) => {
        const target = clients.find(c => c.id === id);
        setClients(prev => prev.filter(c => c.id !== id));
        logActivity(user.name, `Deleted Customer Profile "${target?.name || id}"`);
    };

    const addCommunicationLog = (clientId, logEntry) => {
        setClients(prev => prev.map(c => {
            if (c.id === clientId) {
                const communications = [...(c.communications || []), {
                    id: 'comm-' + Date.now(),
                    date: new Date().toLocaleString(),
                    ...logEntry
                }];
                return { ...c, communications };
            }
            return c;
        }));
        logActivity(user.name, `Logged communication for client ID: ${clientId}`);
    };

    const addCustomerDocument = (clientId, doc) => {
        setClients(prev => prev.map(c => {
            if (c.id === clientId) {
                const documents = [...(c.documents || []), {
                    id: 'doc-' + Date.now(),
                    ...doc
                }];
                return { ...c, documents };
            }
            return c;
        }));
        logActivity(user.name, `Added document "${doc.name}" for client ID: ${clientId}`);
    };

    const recordCustomerRefund = (clientId, refundObj) => {
        setClients(prev => prev.map(c => {
            if (c.id === clientId) {
                const refundHistory = [...(c.refundHistory || []), {
                    id: 'ref-' + Date.now(),
                    date: new Date().toISOString().split('T')[0],
                    ...refundObj
                }];
                const newBalance = Math.max(0, (c.advanceBalance || 0) - refundObj.amount);
                return { ...c, refundHistory, advanceBalance: newBalance };
            }
            return c;
        }));
        logActivity(user.name, `Recorded refund of AED ${refundObj.amount} for client ID: ${clientId}`);
    };

    // 4. Services CRUD
    const addService = (serviceData) => {
        const newService = {
            id: 's' + Date.now().toString().slice(-6),
            ...serviceData
        };
        setServices(prev => [...prev, newService]);
        logActivity(user.name, `Added Cleaning Service "${newService.name}"`);
    };

    const updateService = (id, serviceData) => {
        setServices(prev => prev.map(s => s.id === id ? { ...s, ...serviceData } : s));
        logActivity(user.name, `Updated Service details "${serviceData.name || id}"`);
    };

    const deleteService = (id) => {
        const target = services.find(s => s.id === id);
        setServices(prev => prev.filter(s => s.id !== id));
        logActivity(user.name, `Removed Cleaning Service "${target?.name || id}"`);
    };

    // 5. Quotation Actions & Approval Flow
    const addQuote = (quoteData) => {
        const count = quotations.length + 1;
        const newQuote = {
            id: 'q' + Date.now().toString().slice(-6),
            refNumber: `QT-2026-${String(count).padStart(3, '0')}`,
            ...quoteData,
            revisions: [{ date: new Date().toISOString().split('T')[0], action: 'Draft Created', user: user.name }],
            status: 'Draft',
            createdDate: new Date().toISOString().split('T')[0],
            approvedDate: null,
            sentDate: null
        };
        setQuotations(prev => [...prev, newQuote]);
        logActivity(user.name, `Created Quotation Draft ${newQuote.refNumber} for "${newQuote.clientName}"`);
    };

    const updateQuote = (id, quoteData) => {
        setQuotations(prev => prev.map(q => {
            if (q.id === id) {
                const revisions = [...(q.revisions || []), { date: new Date().toISOString().split('T')[0], action: 'Revised details', user: user.name }];
                return { ...q, ...quoteData, revisions };
            }
            return q;
        }));
        logActivity(user.name, `Updated Quotation details "${id}"`);
    };

    const updateQuoteStatus = (id, newStatus, approvalNotes = '') => {
        setQuotations(prev => prev.map(q => {
            if (q.id === id) {
                const updates = { status: newStatus, approvalNotes };
                if (newStatus === 'Approved') {
                    updates.approvedDate = new Date().toISOString().split('T')[0];
                    // Automatically generate AMC contract or schedule work orders when quotation is approved
                    autoGenerateAMCFromQuote(q);
                }
                if (newStatus === 'Sent') updates.sentDate = new Date().toISOString().split('T')[0];
                const revisions = [...(q.revisions || []), { date: new Date().toISOString().split('T')[0], action: `Status updated to ${newStatus}`, user: user.name }];
                return { ...q, ...updates, revisions };
            }
            return q;
        }));
        logActivity(user.name, `Quotation "${id}" status changed to ${newStatus} with remarks: "${approvalNotes}"`);
    };

    const convertQuoteToInvoice = (quoteId) => {
        const quote = quotations.find(q => q.id === quoteId);
        if (!quote) return;

        const newInvoice = {
            id: 'inv-' + Math.floor(Math.random()*9000+1000),
            customerName: quote.clientName,
            refQuote: quote.refNumber,
            amount: quote.subtotal,
            vatAmount: quote.vatAmount || quote.vatTotal || (quote.subtotal * 0.05),
            date: new Date().toISOString().split('T')[0],
            dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
            status: 'Sent'
        };

        setInvoices(prev => [...prev, newInvoice]);
        setQuotations(prev => prev.map(q => q.id === quoteId ? { ...q, status: 'Approved', approvedDate: new Date().toISOString().split('T')[0], convertedToInvoice: true } : q));
        logActivity(user.name, `Converted Quotation ${quote.refNumber} to Invoice ${newInvoice.id}`);
        addNotification({
            category: 'payments',
            title: `Invoice Generated: ${newInvoice.id}`,
            body: `Direct invoice created from Quote ${quote.refNumber} for ${quote.clientName}. Value: AED ${newInvoice.amount}`,
            type: 'success',
            badgeText: 'Invoice'
        });
    };

    const convertQuoteToJobCard = (quoteId) => {
        const quote = quotations.find(q => q.id === quoteId);
        if (!quote) return;

        const serviceType = quote.lineItems && quote.lineItems.length > 0 
            ? quote.lineItems[0].service 
            : (quote.serviceType || 'Deep Cleaning & Sanitization');

        const newWO = {
            id: 'wo-' + Math.floor(Math.random()*900+100),
            customerName: quote.clientName,
            address: quote.address || 'Dubai, UAE',
            serviceType,
            timeSlot: '09:00 AM - 01:00 PM',
            date: new Date().toISOString().split('T')[0],
            assignedTechnician: 'CLEANING TECH',
            assignedDriver: 'DRIVER LOGISTICS',
            vehicleInfo: 'Toyota Hiace - Van #04',
            instructions: quote.notes || 'Operational cleaning scheduled via direct quote conversion.',
            status: 'Pending',
            beforePhotos: [],
            afterPhotos: [],
            customerSignature: null,
            completionNotes: '',
            refQuote: quote.refNumber
        };

        setWorkOrders(prev => [...prev, newWO]);
        setQuotations(prev => prev.map(q => q.id === quoteId ? { ...q, status: 'Approved', approvedDate: new Date().toISOString().split('T')[0], convertedToJobCard: true } : q));
        logActivity(user.name, `Converted Quotation ${quote.refNumber} to Job Card ${newWO.id}`);
        addNotification({
            category: 'scheduling',
            title: `Job Scheduled: ${newWO.id}`,
            body: `Work order scheduled from Quote ${quote.refNumber} for ${quote.clientName}.`,
            type: 'info',
            badgeText: 'Scheduled'
        });
    };

    const autoGenerateAMCFromQuote = (quote) => {
        const newContract = {
            id: 'ctr' + Date.now().toString().slice(-6),
            clientName: quote.clientName,
            title: `AMC from Quote ${quote.refNumber}`,
            value: quote.grandTotal,
            billingCycle: 'Monthly',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            status: 'Active',
            visitFrequency: 'Monthly',
            includedServices: quote.lineItems.map(item => item.service),
            scope: quote.notes || 'Cleaning & maintenance as per quote line items.',
            renewalAlert: false,
            quotationRef: quote.refNumber
        };
        setContracts(prev => [...prev, newContract]);
        logActivity('System Automation', `Auto-generated AMC Contract for "${quote.clientName}" based on approved Quotation ${quote.refNumber}`);
    };

    const convertQuoteToContract = (quoteId) => {
        const quote = quotations.find(q => q.id === quoteId);
        if (!quote) return;
        
        // Update quote status to Approved and mark as converted to Contract
        setQuotations(prev => prev.map(q => q.id === quoteId ? { ...q, status: 'Approved', approvedDate: new Date().toISOString().split('T')[0], convertedToContract: true } : q));
        
        // Generate contract
        const newContract = {
            id: 'ctr' + Date.now().toString().slice(-6),
            clientName: quote.clientName,
            title: `Annual Maintenance Contract - ${quote.refNumber}`,
            value: quote.grandTotal,
            billingCycle: 'Monthly',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            status: 'Active',
            visitFrequency: 'Monthly',
            includedServices: quote.items ? quote.items.map(item => item.serviceName) : [quote.serviceType],
            scope: quote.notes || 'All facilities cleaning and recurring maintenance visits as detailed in quote line items.',
            renewalAlert: false,
            trn: quote.trn || '',
            address: quote.address || '',
            quotationRef: quote.refNumber
        };
        setContracts(prev => [...prev, newContract]);
        logActivity(user.name, `Approved & Converted Quotation ${quote.refNumber} to active AMC Contract`);
        alert(`Quotation ${quote.refNumber} successfully approved and converted to active AMC Contract!`);
    };

    const generateWorkOrdersFromContract = (contractId) => {
        const contract = contracts.find(c => c.id === contractId);
        if (!contract) return;
        
        // Generate 12 monthly visits for this AMC contract
        const generated = [];
        const baseDate = new Date(contract.startDate);
        
        for (let i = 1; i <= 12; i++) {
            const visitDate = new Date(baseDate);
            visitDate.setMonth(baseDate.getMonth() + i - 1);
            
            const newWO = {
                id: `wo-amc-${contractId.slice(-3)}-${String(i).padStart(2, '0')}`,
                customerName: contract.clientName,
                address: contract.address || 'Dubai, UAE',
                serviceType: contract.includedServices[0] || 'AMC Maintenance Service',
                timeSlot: '09:00 AM - 01:00 PM',
                date: visitDate.toISOString().split('T')[0],
                assignedTechnician: 'Ali Hassan',
                assignedDriver: 'Mohammed Tariq',
                vehicleInfo: 'Hiace Van #04',
                instructions: `AMC Visit #${i} of 12. Complete full cleaning schedule checklist.`,
                status: 'Pending',
                beforePhotos: [],
                afterPhotos: [],
                customerSignature: null,
                completionNotes: ''
            };
            generated.push(newWO);
        }
        
        setWorkOrders(prev => [...prev, ...generated]);
        logActivity('System Automation', `Scheduled 12 recurring SLA cleaning visits for "${contract.clientName}" under AMC Contract`);
        alert(`12 AMC cleaning visits successfully scheduled in scheduler!`);
    };


    // 6. AMC Contract CRUD & Renewal Flow
    const addContract = (contractData) => {
        const newContract = {
            id: 'ctr' + Date.now().toString().slice(-6),
            ...contractData,
            status: contractData.status || 'Pending',
            renewalAlert: false
        };
        setContracts(prev => [...prev, newContract]);
        logActivity(user.name, `Manually created AMC Contract for "${newContract.clientName}"`);
    };

    const updateContract = (id, contractData) => {
        setContracts(prev => prev.map(c => c.id === id ? { ...c, ...contractData } : c));
        logActivity(user.name, `Updated AMC Contract details "${id}"`);
    };

    const deleteContract = (id) => {
        const target = contracts.find(c => c.id === id);
        setContracts(prev => prev.filter(c => c.id !== id));
        logActivity(user.name, `Deleted AMC Contract "${target?.title || id}"`);
        
        // Reset quote conversion if linked
        if (target) {
            setQuotations(prev => prev.map(q => {
                if (target.title.includes(q.refNumber) || target.quotationRef === q.refNumber) {
                    return { ...q, convertedToContract: false };
                }
                return q;
            }));
        }
    };

    const addEquipmentToContract = (contractId, equipment) => {
        setContracts(prev => prev.map(c => {
            if (c.id === contractId) {
                const equipmentAssets = [...(c.equipmentAssets || []), {
                    id: 'eq-' + Date.now(),
                    ...equipment
                }];
                return { ...c, equipmentAssets };
            }
            return c;
        }));
        logActivity(user.name, `Added equipment "${equipment.name}" to AMC Contract ID: ${contractId}`);
    };

    const createRenewalQuote = (contractId) => {
        const contract = contracts.find(c => c.id === contractId);
        if (!contract) return;

        const count = quotations.length + 1;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        const newQuote = {
            id: 'q' + Date.now().toString().slice(-6),
            refNumber: `QT-2026-${String(count).padStart(3, '0')}`,
            clientName: contract.clientName,
            email: contract.email || '',
            trn: contract.trn || '',
            address: contract.address || '',
            contactPerson: contract.contactPerson || '',
            phone: contract.phone || '',
            validUntil: expiryDate.toISOString().split('T')[0],
            salesperson: contract.assignedManager || 'Sales Rep A',
            terms: settings?.quotationTerms || '',
            notes: `AMC Contract Renewal Quote for ID: ${contractId}. Previously titled: ${contract.title}`,
            lineItems: (contract.includedServices || []).map(svc => ({
                service: svc,
                description: `AMC Roster service: ${svc}`,
                unitPrice: Math.round(contract.value / (contract.includedServices.length || 1)),
                qty: 1,
                discount: 0,
                discountType: 'Percent',
                vatPercent: 5,
                total: Math.round(contract.value / (contract.includedServices.length || 1))
            })),
            subtotal: contract.value,
            vatAmount: Math.round(contract.value * 0.05 * 100) / 100,
            grandTotal: Math.round(contract.value * 1.05 * 100) / 100,
            status: 'Draft',
            createdDate: new Date().toISOString().split('T')[0],
            approvedDate: null,
            sentDate: null,
            revisions: [{ date: new Date().toISOString().split('T')[0], action: 'Renewal Draft Created', user: user.name }]
        };

        setQuotations(prev => [...prev, newQuote]);
        logActivity(user.name, `Created Renewal Quote Draft ${newQuote.refNumber} for AMC Contract ${contractId}`);
        addNotification({
            category: 'quotes',
            title: `Renewal Quote Created: ${newQuote.refNumber}`,
            body: `Draft renewal quote created for contract ${contract.title} (${contract.clientName}).`,
            type: 'info',
            badgeText: 'Renewal Quote'
        });
        alert(`Renewal Quotation ${newQuote.refNumber} successfully drafted! You can find it on the Quotations board.`);
    };

    const renewContract = (id, newPeriodYears = 1, triggerAutoInvoice = true) => {
        setContracts(prev => prev.map(c => {
            if (c.id === id) {
                const newEnd = new Date(c.endDate);
                newEnd.setFullYear(newEnd.getFullYear() + newPeriodYears);
                const updated = { 
                    ...c, 
                    status: 'Active', 
                    endDate: newEnd.toISOString().split('T')[0], 
                    renewalAlert: false,
                    visitsCompleted: 0
                };
                if (triggerAutoInvoice) {
                    const newInvoice = {
                        id: 'inv-' + Math.floor(Math.random()*9000+1000),
                        customerName: c.clientName,
                        refQuote: `AMC-RENEW-${c.id}`,
                        amount: c.value,
                        vatAmount: Math.round(c.value * 0.05 * 100) / 100,
                        date: new Date().toISOString().split('T')[0],
                        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
                        status: 'Sent'
                    };
                    setInvoices(prev => [...prev, newInvoice]);
                }
                return updated;
            }
            return c;
        }));
        logActivity(user.name, `Renewed AMC Contract "${id}" for ${newPeriodYears} year(s). Auto-invoiced renewal amount.`);
        alert(`AMC Contract renewed successfully! ${triggerAutoInvoice ? 'A renewal invoice has also been generated.' : ''}`);
    };

    // 7 & 8. Scheduling & Dispatch Actions
    const addWorkOrder = (woData) => {
        const newWO = {
            id: 'wo-' + Math.floor(Math.random()*900+100),
            status: 'Pending',
            beforePhotos: [],
            afterPhotos: [],
            customerSignature: null,
            completionNotes: '',
            ...woData
        };
        setWorkOrders(prev => [...prev, newWO]);
        logActivity(user.name, `Scheduled new Work Order ${newWO.id} for "${newWO.customerName}"`);
    };

    const deleteWorkOrder = (id) => {
        setWorkOrders(prev => prev.filter(wo => wo.id !== id));
        logActivity(user.name, `Cancelled and deleted Work Order "${id}"`);
    };


    const dispatchWorkOrder = (id, dispatcherDetails) => {
        setWorkOrders(prev => prev.map(wo => {
            if (wo.id === id) {
                return { 
                    ...wo, 
                    ...dispatcherDetails, 
                    status: 'In Progress' 
                };
            }
            return wo;
        }));
        logActivity(user.name, `Dispatched Work Order ${id} to technician.`);
    };

    const updateWorkOrderStatus = (id, status, extraFields = {}) => {
        setWorkOrders(prev => prev.map(wo => wo.id === id ? { ...wo, status, ...extraFields } : wo));
        logActivity(user.name, `Work Order ${id} status set to ${status}`);
    };

    const requestPartsFromWarehouse = (workOrderId, customerName, partsRequested) => {
        const newRequest = {
            id: 'req-' + Date.now().toString().slice(-6),
            workOrderId,
            customerName,
            partsRequested,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0]
        };
        setPartsRequests(prev => [newRequest, ...prev]);
        logActivity(user.name, `Requested parts for Work Order ${workOrderId}`);
        addNotification({
            category: 'scheduling',
            title: `Parts Requested for ${workOrderId}`,
            body: `${partsRequested.map(p => `${p.qty}x ${p.name}`).join(', ')} requested.`,
            type: 'warning',
            badgeText: 'Parts Request'
        });
    };

    const allocatePartsToJob = (requestId) => {
        const req = partsRequests.find(r => r.id === requestId);
        if (!req) return;

        let allAvailable = true;
        setInventory(prevInv => {
            const updated = prevInv.map(item => {
                const part = req.partsRequested.find(p => p.name === item.name);
                if (part) {
                    if (item.quantity < part.qty) {
                        allAvailable = false;
                    }
                    return { ...item, quantity: Math.max(0, item.quantity - part.qty) };
                }
                return item;
            });
            return updated;
        });

        setPartsRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Approved' } : r));
        logActivity('Warehouse Admin', `Approved parts request ${requestId} for job ${req.workOrderId}`);
        alert('Parts allocated and deducted from inventory!');
    };

    const rejectPartsRequest = (requestId) => {
        setPartsRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Rejected' } : r));
        logActivity('Warehouse Admin', `Rejected parts request ${requestId}`);
    };

    // 9 & 10. Technician Job Completion Actions
    const completeTechnicianJob = (id, completionData) => {
        setWorkOrders(prev => prev.map(wo => {
            if (wo.id === id) {
                const completedWO = { 
                    ...wo, 
                    status: 'Completed',
                    afterPhotos: completionData.afterPhotos || ['/placeholder-after.jpg'],
                    customerSignature: completionData.customerSignature || 'Customer Signature Received',
                    completionNotes: completionData.completionNotes || 'Job completed successfully.'
                };
                // Automatically generate Invoice when Work Order is completed
                autoGenerateInvoiceFromWO(completedWO);
                return completedWO;
            }
            return wo;
        }));
        logActivity(user.name, `Technician uploaded completion details and signature for Work Order ${id}`);
    };

    const autoGenerateInvoiceFromWO = (wo) => {
        const matchedService = services.find(s => s.name.toLowerCase() === wo.serviceType.toLowerCase());
        const servicePrice = matchedService ? matchedService.price : 1500;
        const vat = Math.round(servicePrice * 0.05 * 100) / 100;

        const newInvoice = {
            id: 'inv-' + Math.floor(Math.random()*9000+1000),
            customerName: wo.customerName,
            refQuote: wo.id,
            amount: servicePrice,
            vatAmount: vat,
            date: new Date().toISOString().split('T')[0],
            dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
            status: 'Sent'
        };
        setInvoices(prev => [...prev, newInvoice]);
        logActivity('System Automation', `Auto-generated Invoice ${newInvoice.id} for "${wo.customerName}" (AED ${servicePrice} + AED ${vat} VAT) upon Work Order ${wo.id} completion`);
    };

    // 12. Invoice CRUD
    const addInvoice = (invoiceData) => {
        const newInvoice = {
            id: 'inv-' + Math.floor(Math.random()*9000+1000),
            date: new Date().toISOString().split('T')[0],
            status: 'Draft',
            ...invoiceData
        };
        setInvoices(prev => [...prev, newInvoice]);
        logActivity(user.name, `Created Invoice Draft ${newInvoice.id}`);
    };

    const updateInvoiceStatus = (id, status) => {
        setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
        logActivity(user.name, `Invoice ${id} status set to ${status}`);
    };

    // 13. Payments Actions
    const recordPayment = (paymentData) => {
        const newPayment = {
            id: 'pay-' + Math.floor(Math.random()*9000+1000),
            date: new Date().toISOString().split('T')[0],
            ...paymentData
        };
        setPayments(prev => [...prev, newPayment]);
        
        // Update Invoice status and balance to support partial payments
        setInvoices(prev => prev.map(inv => {
            if (inv.id === paymentData.invoiceId) {
                const currentOutstanding = inv.outstandingBalance !== undefined ? inv.outstandingBalance : inv.amount;
                const newOutstanding = Math.max(0, currentOutstanding - paymentData.amountPaid);
                const newStatus = newOutstanding <= 0.01 ? 'Paid' : 'Partially Paid';
                
                const partialPayments = [...(inv.partialPayments || []), {
                    id: newPayment.id,
                    amount: paymentData.amountPaid,
                    date: newPayment.date,
                    method: paymentData.paymentMethod,
                    reference: paymentData.referenceNo
                }];

                return { 
                    ...inv, 
                    outstandingBalance: newOutstanding, 
                    status: newStatus,
                    partialPayments
                };
            }
            return inv;
        }));
        logActivity(user.name, `Recorded payment of AED ${paymentData.amountPaid} for Invoice ${paymentData.invoiceId}`);
    };

    // Complaint Actions
    const addComplaint = (complaintData) => {
        const count = complaints.length + 1;
        const newComplaint = {
            id: 'comp-' + Date.now().toString().slice(-6),
            complaintNumber: `TEC-COMP-2026-${String(count).padStart(3, '0')}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Open',
            resolutionNotes: '',
            ...complaintData
        };
        setComplaints(prev => [...prev, newComplaint]);
        logActivity(user.name, `Raised Complaint ${newComplaint.complaintNumber} for "${newComplaint.customerName}"`);
        addNotification({
            category: 'amc',
            title: `Complaint Raised: ${newComplaint.complaintNumber}`,
            body: `New complaint for ${newComplaint.customerName}. Priority: ${newComplaint.priority}`,
            type: 'error',
            badgeText: 'Complaint'
        });
        return newComplaint;
    };

    const updateComplaint = (id, complaintData) => {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, ...complaintData } : c));
        logActivity(user.name, `Updated Complaint details for ID: ${id}`);
    };

    const resolveComplaint = (id, resolutionNotes) => {
        setComplaints(prev => prev.map(c => {
            if (c.id === id) {
                return { ...c, status: 'Resolved', resolutionNotes };
            }
            return c;
        }));
        const target = complaints.find(c => c.id === id);
        logActivity(user.name, `Resolved Complaint ${target?.complaintNumber || id}`);
        addNotification({
            category: 'amc',
            title: `Complaint Resolved: ${target?.complaintNumber || id}`,
            body: `Complaint resolved successfully. Notes: ${resolutionNotes}`,
            type: 'success',
            badgeText: 'Resolved'
        });
    };

    // Driver Trips Actions
    const addDriverTrip = (tripData) => {
        const newTrip = {
            id: 'trip-' + Math.floor(Math.random()*9000+1000),
            status: 'Pending',
            ...tripData
        };
        setDriverTrips(prev => [...prev, newTrip]);
        logActivity(user.name, `Created Driver Trip ${newTrip.id} for driver ${newTrip.driverName}`);
        return newTrip;
    };

    const updateDriverTrip = (id, tripData) => {
        setDriverTrips(prev => prev.map(t => t.id === id ? { ...t, ...tripData } : t));
        logActivity(user.name, `Updated Driver Trip ${id}`);
    };

    const completeDriverTrip = (id, completionData) => {
        setDriverTrips(prev => prev.map(t => {
            if (t.id === id) {
                const completed = {
                    ...t,
                    status: 'Completed',
                    tripEndTime: new Date().toLocaleString(),
                    odometerEnd: Number(completionData.odometerEnd),
                    fuelExpense: Number(completionData.fuelExpense),
                    vehicleCondition: completionData.vehicleCondition,
                    remarks: completionData.remarks
                };
                // Set corresponding vehicle status back to Available
                setVehicles(prevV => prevV.map(v => v.plateNumber === t.vehicleNumber ? { ...v, status: 'Available' } : v));
                return completed;
            }
            return t;
        }));
        logActivity(user.name, `Driver completed trip ${id}`);
    };

    // 15. Settings
    const updateSettings = (newSettings) => {
        setSettings(prev => {
            const updated = { ...prev, ...newSettings };
            setStorage('crm_settings', updated);
            return updated;
        });
        logActivity(user.name, 'Updated company settings');
    };

    // 16. Notifications Actions
    const markAllNotificationsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    const toggleNotificationRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const addNotification = (notif) => {
        setNotifications(prev => [
            {
                id: Date.now().toString(),
                read: false,
                time: 'Just now',
                ...notif
            },
            ...prev
        ]);
    };

    return (
        <AppContext.Provider value={{
            isAuthenticated,
            alertConfig,
            setAlertConfig,
            userRole,
            user,
            loginAsRole,
            login,
            logout,
            updateUser,
            getRoleDashboardPath,

            // Core States
            clients,
            leads,
            services,
            quotations,
            contracts,
            workOrders,
            invoices,
            payments,
            complaints,
            vehicles,
            driverTrips,
            inventory,
            partsRequests,
            logs,
            settings,
            roleProfiles,
            notifications,

            // Core Actions / Workflows
            convertLeadToCustomer,
            addLead,
            updateLead,
            deleteLead,
            addFollowUp,
            addClient,
            updateClient,
            deleteClient,
            addCommunicationLog,
            addCustomerDocument,
            recordCustomerRefund,
            addService,
            updateService,
            deleteService,
            addQuote,
            updateQuote,
            updateQuoteStatus,
            convertQuoteToContract,
            convertQuoteToInvoice,
            convertQuoteToJobCard,
            generateWorkOrdersFromContract,
            addContract,
            updateContract,
            deleteContract,
            addEquipmentToContract,
            createRenewalQuote,
            renewContract,
            addWorkOrder,
            deleteWorkOrder,
            dispatchWorkOrder,
            updateWorkOrderStatus,
            completeTechnicianJob,
            addInvoice,
            updateInvoiceStatus,
            recordPayment,
            addComplaint,
            updateComplaint,
            resolveComplaint,
            addDriverTrip,
            updateDriverTrip,
            completeDriverTrip,
            requestPartsFromWarehouse,
            allocatePartsToJob,
            rejectPartsRequest,
            updateSettings,
            logActivity,

            // Notifications
            markAllNotificationsRead,
            clearAllNotifications,
            toggleNotificationRead,
            deleteNotification,
            addNotification
        }}>
            {children}
        </AppContext.Provider>
    );
};
