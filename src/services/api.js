import { mockClients, mockInvoices, mockLeads } from './data';

const getLocalStorageData = (key, fallback) => {
    const saved = localStorage.getItem(key);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error(`Error parsing localStorage key "${key}":`, e);
        }
    }
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
};

const saveLocalStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Initial setup of Mock Data in LocalStorage
const initialJobs = [
    { id: '1', title: 'Standard House Cleaning', employeeName: 'Sarah Jenkins', date: '2026-05-25' },
    { id: '2', title: 'Office Carpet Wash', employeeName: 'Michael Chang', date: '2026-05-26' },
    { id: '3', title: 'Post-Construction Cleanup', employeeName: 'Emma Watson', date: '2026-05-28' },
];

// Load arrays
let localClients = getLocalStorageData('crm_clients', mockClients);
let localInvoices = getLocalStorageData('crm_invoices', mockInvoices);
let localLeads = getLocalStorageData('crm_leads', mockLeads);
let localJobs = getLocalStorageData('crm_jobs', initialJobs);

/* --- CLIENTS API --- */
export const getClients = async () => {
    localClients = getLocalStorageData('crm_clients', mockClients);
    return localClients;
};
export const fetchClients = getClients;

export const getClientById = async (id) => {
    localClients = getLocalStorageData('crm_clients', mockClients);
    return localClients.find(c => c.id === id) || null;
};

export const createClient = async (clientData) => {
    localClients = getLocalStorageData('crm_clients', mockClients);
    const newClient = {
        id: String(Date.now()),
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address,
        createdAt: new Date(),
    };
    localClients.push(newClient);
    saveLocalStorageData('crm_clients', localClients);
    return newClient;
};

export const updateClient = async (id, clientData) => {
    localClients = getLocalStorageData('crm_clients', mockClients);
    localClients = localClients.map(c => c.id === id ? { ...c, ...clientData } : c);
    saveLocalStorageData('crm_clients', localClients);
    return localClients.find(c => c.id === id);
};

export const deleteClient = async (id) => {
    localClients = getLocalStorageData('crm_clients', mockClients);
    localClients = localClients.filter(c => c.id !== id);
    saveLocalStorageData('crm_clients', localClients);
    
    // Also cleanup associated invoices
    localInvoices = getLocalStorageData('crm_invoices', mockInvoices);
    localInvoices = localInvoices.filter(i => i.clientId !== id);
    saveLocalStorageData('crm_invoices', localInvoices);
};


/* --- INVOICES API --- */
export const getInvoices = async () => {
    localInvoices = getLocalStorageData('crm_invoices', mockInvoices);
    return localInvoices;
};

export const createInvoice = async (invoiceData) => {
    localInvoices = getLocalStorageData('crm_invoices', mockInvoices);
    const newInvoice = {
        id: String(Date.now()),
        clientId: invoiceData.clientId,
        amount: Number(invoiceData.amount),
        status: invoiceData.status || 'Pending',
        dueDate: invoiceData.dueDate || new Date().toISOString().split('T')[0],
    };
    localInvoices.push(newInvoice);
    saveLocalStorageData('crm_invoices', localInvoices);
    return newInvoice;
};

export const updateInvoice = async (id, invoiceData) => {
    localInvoices = getLocalStorageData('crm_invoices', mockInvoices);
    localInvoices = localInvoices.map(i => i.id === id ? { ...i, ...invoiceData } : i);
    saveLocalStorageData('crm_invoices', localInvoices);
    return localInvoices.find(i => i.id === id);
};

export const deleteInvoice = async (id) => {
    localInvoices = getLocalStorageData('crm_invoices', mockInvoices);
    localInvoices = localInvoices.filter(i => i.id !== id);
    saveLocalStorageData('crm_invoices', localInvoices);
};


/* --- LEADS API --- */
export const fetchLeads = async () => {
    localLeads = getLocalStorageData('crm_leads', mockLeads);
    return localLeads;
};
export const getLeads = fetchLeads;

export const createLead = async (leadData) => {
    localLeads = getLocalStorageData('crm_leads', mockLeads);
    const newLead = {
        id: String(Date.now()),
        name: leadData.name,
        status: leadData.status || 'New',
        createdAt: new Date(),
        email: leadData.email || '',
        phone: leadData.phone || '',
    };
    localLeads.push(newLead);
    saveLocalStorageData('crm_leads', localLeads);
    return newLead;
};

export const updateLead = async (id, leadData) => {
    localLeads = getLocalStorageData('crm_leads', mockLeads);
    localLeads = localLeads.map(l => l.id === id ? { ...l, ...leadData } : l);
    saveLocalStorageData('crm_leads', localLeads);
    return localLeads.find(l => l.id === id);
};

export const deleteLead = async (id) => {
    localLeads = getLocalStorageData('crm_leads', mockLeads);
    localLeads = localLeads.filter(l => l.id !== id);
    saveLocalStorageData('crm_leads', localLeads);
};


/* --- SCHEDULING JOBS API --- */
export const getJobs = async () => {
    localJobs = getLocalStorageData('crm_jobs', initialJobs);
    return localJobs;
};

export const createJob = async (jobData) => {
    localJobs = getLocalStorageData('crm_jobs', initialJobs);
    const newJob = {
        id: String(Date.now()),
        title: jobData.title,
        employeeName: jobData.employeeName,
        date: jobData.date,
    };
    localJobs.push(newJob);
    saveLocalStorageData('crm_jobs', localJobs);
    return newJob;
};

export const deleteJob = async (id) => {
    localJobs = getLocalStorageData('crm_jobs', initialJobs);
    localJobs = localJobs.filter(j => j.id !== id);
    saveLocalStorageData('crm_jobs', localJobs);
};
