import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
    FaPlus, FaTrash, FaEdit, FaUser, FaBuilding, FaPhoneAlt, 
    FaEnvelope, FaReceipt, FaFileContract, FaClipboardList, FaFileInvoiceDollar, 
    FaCheckCircle, FaWhatsapp, FaMapMarkerAlt, FaCalendarAlt, FaExclamationTriangle, 
    FaHistory, FaClock, FaRegCommentDots, FaFileAlt, FaMoneyBillWave, FaExchangeAlt,
    FaSearch, FaFilter, FaListAlt, FaArrowRight, FaCalendarCheck
} from 'react-icons/fa';

const ClientsPage = () => {
    const { 
        clients, addClient, updateClient, deleteClient, 
        quotations, contracts, workOrders, invoices, payments,
        complaints, addComplaint, addCommunicationLog, addCustomerDocument, recordCustomerRefund
    } = useContext(AppContext);
    
    const [selectedClient, setSelectedClient] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    
    // Search and Filter States
    const [searchName, setSearchName] = useState('');
    const [searchMobile, setSearchMobile] = useState('');
    const [searchInvoice, setSearchInvoice] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterContract, setFilterContract] = useState('All');
    const [filterPaymentStatus, setFilterPaymentStatus] = useState('All');

    // Refund State
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const [refundForm, setRefundForm] = useState({ amount: '', reason: '' });

    // Document Upload State
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);
    const [docForm, setDocForm] = useState({ name: '', type: 'Trade License', expiryDate: '' });

    // Communication Log State
    const [isCommModalOpen, setIsCommModalOpen] = useState(false);
    const [commForm, setCommForm] = useState({ type: 'Call', staff: '', notes: '' });

    // Complaint Form State
    const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
    const [complaintForm, setComplaintForm] = useState({ complaintType: 'Service Issue', priority: 'Medium', description: '', amcRef: '' });

    // Notes Editor State
    const [notesText, setNotesText] = useState('');

    const [clientForm, setClientForm] = useState({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        whatsapp: '',
        address: '',
        trn: '',
        notes: '',
        emirate: 'Dubai',
        city: 'Dubai',
        buildingName: '',
        officeVilla: '',
        googleMapLink: '',
        gpsCoordinates: '',
        landmark: '',
        customerType: 'Commercial',
        industry: '',
        source: 'Website',
        website: '',
        landline: '',
        creditLimit: '',
        advanceBalance: '0',
        paymentTerms: 'COD',
        preferredTiming: 'Morning',
        priorityLevel: 'Medium'
    });

    const handleCreateClient = (e) => {
        e.preventDefault();
        const formattedData = {
            ...clientForm,
            creditLimit: Number(clientForm.creditLimit) || 0,
            advanceBalance: Number(clientForm.advanceBalance) || 0,
            refundHistory: [],
            tags: [clientForm.customerType, clientForm.priorityLevel + ' Priority'],
            documents: [],
            communications: []
        };
        addClient(formattedData);
        resetForm();
        setIsAddOpen(false);
    };

    const handleEditClientSubmit = (e) => {
        e.preventDefault();
        if (selectedClient) {
            const formattedData = {
                ...clientForm,
                creditLimit: Number(clientForm.creditLimit) || 0,
                advanceBalance: Number(clientForm.advanceBalance) || 0
            };
            updateClient(selectedClient.id, formattedData);
            setIsEditOpen(false);
            // Refresh detail view
            setSelectedClient(prev => ({ ...prev, ...formattedData }));
        }
    };

    const startEdit = () => {
        if (selectedClient) {
            setClientForm({
                name: selectedClient.name || '',
                contactPerson: selectedClient.contactPerson || '',
                email: selectedClient.email || '',
                phone: selectedClient.phone || '',
                whatsapp: selectedClient.whatsapp || '',
                address: selectedClient.address || '',
                trn: selectedClient.trn || '',
                notes: selectedClient.notes || '',
                emirate: selectedClient.emirate || 'Dubai',
                city: selectedClient.city || 'Dubai',
                buildingName: selectedClient.buildingName || '',
                officeVilla: selectedClient.officeVilla || '',
                googleMapLink: selectedClient.googleMapLink || '',
                gpsCoordinates: selectedClient.gpsCoordinates || '',
                landmark: selectedClient.landmark || '',
                customerType: selectedClient.customerType || 'Commercial',
                industry: selectedClient.industry || '',
                source: selectedClient.source || 'Website',
                website: selectedClient.website || '',
                landline: selectedClient.landline || '',
                creditLimit: String(selectedClient.creditLimit || ''),
                advanceBalance: String(selectedClient.advanceBalance || '0'),
                paymentTerms: selectedClient.paymentTerms || 'COD',
                preferredTiming: selectedClient.preferredTiming || 'Morning',
                priorityLevel: selectedClient.priorityLevel || 'Medium'
            });
            setIsEditOpen(true);
        }
    };

    const resetForm = () => {
        setClientForm({
            name: '',
            contactPerson: '',
            email: '',
            phone: '',
            whatsapp: '',
            address: '',
            trn: '',
            notes: '',
            emirate: 'Dubai',
            city: 'Dubai',
            buildingName: '',
            officeVilla: '',
            googleMapLink: '',
            gpsCoordinates: '',
            landmark: '',
            customerType: 'Commercial',
            industry: '',
            source: 'Website',
            website: '',
            landline: '',
            creditLimit: '',
            advanceBalance: '0',
            paymentTerms: 'COD',
            preferredTiming: 'Morning',
            priorityLevel: 'Medium'
        });
    };

    const handleRecordRefund = (e) => {
        e.preventDefault();
        if (selectedClient && refundForm.amount) {
            recordCustomerRefund(selectedClient.id, {
                amount: Number(refundForm.amount),
                reason: refundForm.reason
            });
            // Update UI state
            setSelectedClient(prev => ({
                ...prev,
                advanceBalance: Math.max(0, (prev.advanceBalance || 0) - Number(refundForm.amount)),
                refundHistory: [...(prev.refundHistory || []), {
                    id: 'ref-' + Date.now(),
                    date: new Date().toISOString().split('T')[0],
                    amount: Number(refundForm.amount),
                    reason: refundForm.reason
                }]
            }));
            setIsRefundModalOpen(false);
            setRefundForm({ amount: '', reason: '' });
        }
    };

    const handleAddDocument = (e) => {
        e.preventDefault();
        if (selectedClient && docForm.name) {
            addCustomerDocument(selectedClient.id, docForm);
            setSelectedClient(prev => ({
                ...prev,
                documents: [...(prev.documents || []), docForm]
            }));
            setIsDocModalOpen(false);
            setDocForm({ name: '', type: 'Trade License', expiryDate: '' });
        }
    };

    const handleAddCommunication = (e) => {
        e.preventDefault();
        if (selectedClient && commForm.notes) {
            addCommunicationLog(selectedClient.id, commForm);
            setSelectedClient(prev => ({
                ...prev,
                communications: [...(prev.communications || []), {
                    id: 'comm-' + Date.now(),
                    date: new Date().toLocaleString(),
                    ...commForm
                }]
            }));
            setIsCommModalOpen(false);
            setCommForm({ type: 'Call', staff: '', notes: '' });
        }
    };

    const handleAddComplaintSubmit = (e) => {
        e.preventDefault();
        if (selectedClient) {
            const newComplaint = addComplaint({
                customerId: selectedClient.id,
                customerName: selectedClient.name,
                complaintType: complaintForm.complaintType,
                priority: complaintForm.priority,
                description: complaintForm.description,
                amcRef: complaintForm.amcRef,
                slaHours: complaintForm.priority === 'Emergency' ? 4 : complaintForm.priority === 'High' ? 12 : 24
            });
            setIsComplaintModalOpen(false);
            setComplaintForm({ complaintType: 'Service Issue', priority: 'Medium', description: '', amcRef: '' });
            alert(`Complaint raised successfully: ${newComplaint.complaintNumber}`);
        }
    };

    const handleSaveNotes = () => {
        if (selectedClient) {
            updateClient(selectedClient.id, { notes: notesText });
            setSelectedClient(prev => ({ ...prev, notes: notesText }));
            alert('Customer remarks/notes updated successfully.');
        }
    };

    // Client Filter Logic
    const filteredClients = clients.filter(client => {
        if (searchName && !client.name.toLowerCase().includes(searchName.toLowerCase())) return false;
        
        if (searchMobile && 
            !client.phone.includes(searchMobile) && 
            !(client.whatsapp && client.whatsapp.includes(searchMobile))) return false;
        
        if (searchInvoice) {
            const clientInvoices = invoices.filter(inv => inv.customerName === client.name);
            const matchesInvoice = clientInvoices.some(inv => inv.id.toLowerCase().includes(searchInvoice.toLowerCase()));
            if (!matchesInvoice) return false;
        }

        if (filterType !== 'All' && client.customerType !== filterType) return false;

        if (filterContract !== 'All') {
            const clientContracts = contracts.filter(c => c.clientName === client.name);
            const hasActiveContract = clientContracts.some(c => c.status === 'Active');
            if (filterContract === 'Active' && !hasActiveContract) return false;
            if (filterContract === 'One-Time' && hasActiveContract) return false;
        }

        if (filterPaymentStatus !== 'All') {
            const clientInvoices = invoices.filter(inv => inv.customerName === client.name);
            const hasOverdue = clientInvoices.some(inv => inv.status === 'Overdue');
            const hasPending = clientInvoices.some(inv => inv.status === 'Sent' || inv.status === 'Partially Paid');
            if (filterPaymentStatus === 'Late' && !hasOverdue) return false;
            if (filterPaymentStatus === 'Pending' && !hasPending) return false;
        }

        return true;
    });

    // Helper to render client details
    const renderClientDetails = (client) => {
        const clientQuotes = quotations.filter(q => q.clientName === client.name);
        const clientContracts = contracts.filter(c => c.clientName === client.name);
        const clientWorkOrders = workOrders.filter(w => w.customerName === client.name);
        const clientInvoices = invoices.filter(i => i.customerName === client.name);
        const clientPayments = payments.filter(p => p.customerName === client.name);
        const clientComplaints = complaints.filter(comp => comp.customerId === client.id);

        // Timeline events assembly
        const timelineEvents = [];
        timelineEvents.push({ type: 'System', date: client.createdAt || '2026-01-01', text: 'Customer Profile Registered in CRM.' });
        clientQuotes.forEach(q => {
            timelineEvents.push({ type: 'Quote', date: q.createdDate, text: `Quotation ${q.refNumber} generated (AED ${q.grandTotal.toLocaleString()}). Status: ${q.status}` });
            if (q.approvedDate) {
                timelineEvents.push({ type: 'Quote', date: q.approvedDate, text: `Quotation ${q.refNumber} approved by customer.` });
            }
        });
        clientContracts.forEach(c => {
            timelineEvents.push({ type: 'Contract', date: c.startDate, text: `AMC Contract "${c.title}" activated. End date: ${c.endDate}` });
        });
        clientWorkOrders.forEach(w => {
            timelineEvents.push({ type: 'Job', date: w.date, text: `Job card ${w.id} (${w.serviceType}) created. Status: ${w.status}.` });
        });
        clientInvoices.forEach(i => {
            timelineEvents.push({ type: 'Invoice', date: i.date, text: `Invoice ${i.id} generated for AED ${i.amount.toLocaleString()}. Status: ${i.status}.` });
        });
        clientPayments.forEach(p => {
            timelineEvents.push({ type: 'Payment', date: p.date, text: `Payment of AED ${p.amountPaid.toLocaleString()} received via ${p.paymentMethod} (Ref: ${p.referenceNo}).` });
        });
        clientComplaints.forEach(comp => {
            timelineEvents.push({ type: 'Complaint', date: comp.date, text: `Complaint raised: ${comp.complaintNumber} (${comp.complaintType}). Status: ${comp.status}` });
        });
        (client.refundHistory || []).forEach(ref => {
            timelineEvents.push({ type: 'Refund', date: ref.date, text: `Refund of AED ${ref.amount} issued. Reason: ${ref.reason}` });
        });
        (client.communications || []).forEach(comm => {
            timelineEvents.push({ type: 'Communication', date: comm.date.split(' ')[0], text: `${comm.type} logged by ${comm.staff || 'System'}: ${comm.notes}` });
        });

        const sortedTimeline = timelineEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Financial stats
        const totalInvoiced = clientInvoices.reduce((acc, curr) => acc + curr.amount, 0);
        const totalPaid = clientPayments.reduce((acc, curr) => acc + curr.amountPaid, 0);
        const pendingAmount = Math.max(0, totalInvoiced - totalPaid);
        const lastPayment = clientPayments.length > 0 ? clientPayments.sort((a, b) => new Date(b.date) - new Date(a.date))[0] : null;

        return (
            <div className="space-y-4 flex-1 flex flex-col text-slate-800">
                {/* Selected Info Header */}
                <div className="flex justify-between items-start pb-4 border-b border-slate-100 shrink-0">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-base font-black text-slate-800">{client.name}</h2>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                client.customerType === 'VIP' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                client.customerType === 'Commercial' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}>
                                {client.customerType || 'Standard'}
                            </span>
                            <span className={`w-2.5 h-2.5 rounded-full ${client.status === 'Inactive' ? 'bg-rose-500' : 'bg-emerald-500'}`} title={client.status} />
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Registered since {client.createdAt || 'N/A'} • ID: {client.id}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={startEdit} className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-xl transition">
                            <FaEdit className="text-xs" />
                        </button>
                        <button 
                            onClick={() => {
                                if (window.confirm('Delete this customer profile?')) {
                                    deleteClient(client.id);
                                    setSelectedClient(null);
                                }
                            }} 
                            className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-xl transition"
                        >
                            <FaTrash className="text-xs" />
                        </button>
                    </div>
                </div>

                {/* Tabs Navigation (10 Tabs) */}
                <div className="flex flex-wrap gap-1 border-b border-slate-150 pb-2 shrink-0">
                    {[
                        { id: 'profile', label: 'Overview', icon: <FaUser /> },
                        { id: 'history', label: `Jobs (${clientWorkOrders.length})`, icon: <FaClipboardList /> },
                        { id: 'invoices', label: `Invoices (${clientInvoices.length})`, icon: <FaFileInvoiceDollar /> },
                        { id: 'payments', label: 'Payments', icon: <FaMoneyBillWave /> },
                        { id: 'reminders', label: 'Reminders', icon: <FaClock /> },
                        { id: 'complaints', label: `Complaints (${clientComplaints.length})`, icon: <FaExclamationTriangle /> },
                        { id: 'documents', label: `Docs (${(client.documents || []).length})`, icon: <FaFileAlt /> },
                        { id: 'communication', label: 'Comm Log', icon: <FaRegCommentDots /> },
                        { id: 'notes', label: 'Notes', icon: <FaListAlt /> },
                        { id: 'timeline', label: 'Timeline', icon: <FaHistory /> }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                if (tab.id === 'notes') setNotesText(client.notes || '');
                            }}
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border transition-all ${
                                activeTab === tab.id 
                                    ? 'bg-blue-600 border-blue-600 text-white shadow shadow-blue-600/10' 
                                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Dynamic Tab Body */}
                <div className="flex-1 overflow-y-auto max-h-[380px] pt-1 text-xs">
                    
                    {/* 1. Overview */}
                    {activeTab === 'profile' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3 bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
                                    <h4 className="font-black text-slate-800 flex items-center gap-1.5"><FaBuilding className="text-blue-500" /> Basic Details</h4>
                                    <div className="space-y-2 text-slate-600">
                                        <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Contact Person:</span> <span className="font-semibold text-slate-800">{client.contactPerson}</span></div>
                                        <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Phone:</span> <span className="font-semibold text-slate-800">{client.phone}</span></div>
                                        {client.whatsapp && <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">WhatsApp:</span> <span className="font-semibold text-slate-800 flex items-center gap-1"><FaWhatsapp className="text-emerald-500" /> {client.whatsapp}</span></div>}
                                        {client.landline && <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Landline:</span> <span className="font-semibold text-slate-800">{client.landline}</span></div>}
                                        <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Email:</span> <span className="font-semibold text-slate-800 break-all">{client.email}</span></div>
                                        {client.website && <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Website:</span> <span className="font-semibold text-slate-800 break-all">{client.website}</span></div>}
                                        <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">TRN Tax No:</span> <span className="font-mono font-bold text-slate-800">{client.trn || 'Not Registered'}</span></div>
                                        {client.industry && <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Industry:</span> <span className="font-semibold text-slate-800">{client.industry}</span></div>}
                                        {client.source && <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Source:</span> <span className="font-semibold text-slate-800">{client.source}</span></div>}
                                    </div>
                                </div>

                                <div className="space-y-3 bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
                                    <h4 className="font-black text-slate-800 flex items-center gap-1.5"><FaMapMarkerAlt className="text-blue-500" /> Location Details</h4>
                                    <div className="space-y-2 text-slate-600">
                                        <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Emirate:</span> <span className="font-semibold text-slate-800">{client.emirate || 'Dubai'}</span></div>
                                        <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">City:</span> <span className="font-semibold text-slate-800">{client.city || 'Dubai'}</span></div>
                                        {client.buildingName && <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Building:</span> <span className="font-semibold text-slate-800">{client.buildingName}</span></div>}
                                        {client.officeVilla && <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Office/Villa No:</span> <span className="font-semibold text-slate-800">{client.officeVilla}</span></div>}
                                        {client.landmark && <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Landmark:</span> <span className="font-semibold text-slate-800">{client.landmark}</span></div>}
                                        {client.gpsCoordinates && <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">GPS Coordinates:</span> <span className="font-mono font-semibold text-slate-800">{client.gpsCoordinates}</span></div>}
                                        {client.googleMapLink && (
                                            <div className="pt-1.5 border-t border-slate-200 flex justify-end">
                                                <a href={client.googleMapLink} target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">Open Google Map <FaArrowRight className="text-[10px]" /></a>
                                            </div>
                                        )}
                                        <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Pref. Timing:</span> <span className="font-semibold text-slate-800">{client.preferredTiming || 'N/A'}</span></div>
                                        <div className="flex justify-between gap-2"><span className="text-slate-400 font-bold shrink-0">Priority Level:</span> <span className="font-semibold text-slate-800">{client.priorityLevel || 'Medium'}</span></div>
                                    </div>
                                </div>
                            </div>

                            {/* Financial Overview & Refund Tracking */}
                            <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-2xl space-y-3">
                                <h4 className="font-black text-slate-800 flex items-center gap-1.5"><FaMoneyBillWave className="text-blue-500" /> Financial Dashboard</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">Total Invoiced</div>
                                        <div className="text-sm font-black text-slate-800 mt-0.5">AED {totalInvoiced.toLocaleString()}</div>
                                    </div>
                                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">Total Paid</div>
                                        <div className="text-sm font-black text-emerald-600 mt-0.5">AED {totalPaid.toLocaleString()}</div>
                                    </div>
                                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">Pending Balance</div>
                                        <div className="text-sm font-black text-rose-600 mt-0.5">AED {pendingAmount.toLocaleString()}</div>
                                    </div>
                                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">Advance Balance</div>
                                        <div className="text-sm font-black text-blue-600 mt-0.5">AED {(client.advanceBalance || 0).toLocaleString()}</div>
                                    </div>
                                </div>

                                <div className="space-y-2.5 text-slate-600 text-[11px] pt-1">
                                    <div className="flex justify-between"><span className="text-slate-400 font-bold">Credit Limit:</span> <span className="font-bold text-slate-800">AED {(client.creditLimit || 0).toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-400 font-bold">Payment Terms:</span> <span className="font-bold text-slate-800">{client.paymentTerms || 'COD'}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-400 font-bold">Last Payment Date:</span> <span className="font-bold text-slate-800">{lastPayment ? `${lastPayment.date} (AED ${lastPayment.amountPaid})` : 'No payments logged'}</span></div>
                                </div>

                                {/* Refund History */}
                                <div className="pt-3 border-t border-slate-200 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-bold text-slate-700">Advance Refunds</h5>
                                        <button 
                                            disabled={!(client.advanceBalance > 0)}
                                            onClick={() => setIsRefundModalOpen(true)}
                                            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[9px] disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            Record Refund
                                        </button>
                                    </div>
                                    {(!client.refundHistory || client.refundHistory.length === 0) ? (
                                        <div className="text-[10px] text-slate-400 italic">No refund transactions recorded.</div>
                                    ) : (
                                        <div className="space-y-1.5">
                                            {client.refundHistory.map(ref => (
                                                <div key={ref.id} className="p-2 bg-white border border-slate-150 rounded-lg flex justify-between items-center">
                                                    <div>
                                                        <div className="font-bold text-slate-800">AED {ref.amount}</div>
                                                        <div className="text-[9px] text-slate-400">{ref.reason}</div>
                                                    </div>
                                                    <span className="text-[9px] text-slate-400 font-medium">{ref.date}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. Work Orders (Jobs) */}
                    {activeTab === 'history' && (
                        <div className="space-y-2">
                            {clientWorkOrders.length === 0 ? (
                                <div className="text-center py-10 text-slate-400 font-bold">No cleaning work orders found.</div>
                            ) : (
                                clientWorkOrders.map(wo => (
                                    <div key={wo.id} className="p-3 border border-slate-200 rounded-xl space-y-1.5 bg-slate-50/50">
                                        <div className="flex justify-between items-center">
                                            <div className="font-bold text-slate-800">{wo.id} — {wo.serviceType}</div>
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                                                wo.status === 'Completed' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                                wo.status === 'In Progress' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-slate-50 border-slate-150 text-slate-500'
                                            }`}>{wo.status}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                                            <span>Visit Date: {wo.date} ({wo.timeSlot})</span>
                                            <span>Staff: {wo.assignedTechnician}</span>
                                        </div>
                                        {wo.completionNotes && (
                                            <div className="p-2 bg-white border border-slate-100 rounded-lg text-[10px] text-slate-500">
                                                Notes: {wo.completionNotes}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* 3. Invoices */}
                    {activeTab === 'invoices' && (
                        <div className="space-y-2">
                            {clientInvoices.length === 0 ? (
                                <div className="text-center py-10 text-slate-400 font-bold">No generated invoice history.</div>
                            ) : (
                                clientInvoices.map(inv => (
                                    <div key={inv.id} className="p-3 border border-slate-200 rounded-xl flex items-center justify-between bg-slate-50/50">
                                        <div>
                                            <div className="font-bold text-slate-800">{inv.id}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">Due Date: {inv.dueDate}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-black text-slate-800">AED {inv.amount.toLocaleString()}</div>
                                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded mt-1 inline-block border ${
                                                inv.status === 'Paid' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                                            }`}>
                                                {inv.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* 4. Payments */}
                    {activeTab === 'payments' && (
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex justify-between items-center">
                                <div>
                                    <div className="text-[10px] text-blue-500 font-bold uppercase">Advance Balance</div>
                                    <div className="text-base font-black text-blue-700 mt-0.5">AED {(client.advanceBalance || 0).toLocaleString()}</div>
                                </div>
                                <FaMoneyBillWave className="text-blue-400 text-2xl opacity-50" />
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-bold text-slate-700">Receipts History</h4>
                                {clientPayments.length === 0 ? (
                                    <div className="text-center py-8 text-slate-400 font-bold">No payments logged yet.</div>
                                ) : (
                                    clientPayments.map(pay => (
                                        <div key={pay.id} className="p-3 border border-slate-200 rounded-xl flex items-center justify-between bg-slate-50/50">
                                            <div>
                                                <div className="font-bold text-slate-800">Receipt: {pay.id}</div>
                                                <div className="text-[9px] text-slate-400 mt-0.5">Invoice: {pay.invoiceId} • Method: {pay.paymentMethod}</div>
                                                {pay.referenceNo && <div className="text-[9px] text-slate-400">Ref: {pay.referenceNo}</div>}
                                            </div>
                                            <div className="text-right">
                                                <div className="font-black text-emerald-600">AED {pay.amountPaid.toLocaleString()}</div>
                                                <span className="text-[9px] text-slate-400 block mt-1">{pay.date}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* 5. Reminders */}
                    {activeTab === 'reminders' && (
                        <div className="space-y-3.5">
                            {/* Service Due reminders */}
                            <div className="space-y-2">
                                <h4 className="font-black text-slate-850 flex items-center gap-1.5 text-[11px]"><FaCalendarCheck className="text-blue-500" /> Scheduled Services Due</h4>
                                {clientWorkOrders.filter(w => w.status === 'Pending').length === 0 ? (
                                    <div className="text-[10px] text-slate-400 italic bg-slate-50 p-2.5 rounded-lg">No pending clean schedules scheduled.</div>
                                ) : (
                                    clientWorkOrders.filter(w => w.status === 'Pending').map(wo => (
                                        <div key={wo.id} className="p-2.5 border border-slate-200 bg-white rounded-lg flex items-center justify-between">
                                            <div>
                                                <span className="font-bold text-slate-800">{wo.serviceType}</span>
                                                <div className="text-[9px] text-slate-400 mt-0.5">Time: {wo.timeSlot}</div>
                                            </div>
                                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{wo.date}</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Overdue Payments reminders */}
                            <div className="space-y-2">
                                <h4 className="font-black text-slate-850 flex items-center gap-1.5 text-[11px]"><FaExclamationTriangle className="text-rose-500" /> Overdue Invoices</h4>
                                {clientInvoices.filter(i => i.status === 'Overdue').length === 0 ? (
                                    <div className="text-[10px] text-slate-400 italic bg-slate-50 p-2.5 rounded-lg">No overdue invoices found. Excellent.</div>
                                ) : (
                                    clientInvoices.filter(i => i.status === 'Overdue').map(inv => (
                                        <div key={inv.id} className="p-2.5 border border-rose-200 bg-rose-50/20 rounded-lg flex items-center justify-between">
                                            <div>
                                                <span className="font-bold text-rose-800">{inv.id}</span>
                                                <div className="text-[9px] text-rose-500 mt-0.5">Due Date: {inv.dueDate}</div>
                                            </div>
                                            <span className="text-xs font-black text-rose-600">AED {inv.amount.toLocaleString()}</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Contract Renewals reminders */}
                            <div className="space-y-2">
                                <h4 className="font-black text-slate-850 flex items-center gap-1.5 text-[11px]"><FaFileContract className="text-amber-500" /> AMC Contracts Expiring / Renewal Due</h4>
                                {clientContracts.map(c => {
                                    const diff = new Date(c.endDate) - new Date();
                                    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                                    const isSoon = days <= 30 && days > 0;
                                    const isExpired = days <= 0;
                                    if (!isSoon && !isExpired) return null;
                                    return (
                                        <div key={c.id} className={`p-2.5 border rounded-lg flex items-center justify-between ${
                                            isExpired ? 'border-rose-200 bg-rose-50/20' : 'border-amber-200 bg-amber-50/20'
                                        }`}>
                                            <div>
                                                <span className="font-bold text-slate-850">{c.title}</span>
                                                <div className="text-[9px] text-slate-400 mt-0.5">Expires: {c.endDate}</div>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                                isExpired ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {isExpired ? 'Expired' : `${days} Days Left`}
                                            </span>
                                        </div>
                                    );
                                })}
                                {clientContracts.length === 0 && <div className="text-[10px] text-slate-400 italic bg-slate-50 p-2.5 rounded-lg">No contracts logged.</div>}
                            </div>

                            {/* Complaint Follow-up reminders (Missing Item 5) */}
                            <div className="space-y-2">
                                <h4 className="font-black text-slate-850 flex items-center gap-1.5 text-[11px]"><FaExclamationTriangle className="text-orange-500" /> Active Complaints Pending</h4>
                                {clientComplaints.filter(c => c.status === 'Open').length === 0 ? (
                                    <div className="text-[10px] text-slate-400 italic bg-slate-50 p-2.5 rounded-lg">No open customer complaints registered.</div>
                                ) : (
                                    clientComplaints.filter(c => c.status === 'Open').map(comp => (
                                        <div key={comp.id} className="p-2.5 border border-orange-200 bg-orange-50/20 rounded-lg flex items-center justify-between">
                                            <div>
                                                <span className="font-bold text-orange-800">{comp.complaintNumber}</span>
                                                <div className="text-[9px] text-orange-600 mt-0.5">{comp.complaintType} • SLA: {comp.slaHours} hrs</div>
                                            </div>
                                            <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded">{comp.priority}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* 6. Complaints */}
                    {activeTab === 'complaints' && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold text-slate-700">Complaint Register</h4>
                                <button 
                                    onClick={() => setIsComplaintModalOpen(true)}
                                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[9px] transition inline-flex items-center gap-1"
                                >
                                    <FaPlus /> Raise Complaint
                                </button>
                            </div>

                            {clientComplaints.length === 0 ? (
                                <div className="text-center py-10 text-slate-400 font-bold bg-slate-50 rounded-xl">No complaints filed for this customer.</div>
                            ) : (
                                <div className="space-y-2.5">
                                    {clientComplaints.map(comp => (
                                        <div key={comp.id} className="p-3 border border-slate-200 rounded-xl bg-slate-50/50 space-y-1.5">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="font-bold text-slate-800">{comp.complaintNumber}</span>
                                                    <span className="text-[10px] text-slate-400 block mt-0.5">Date Raised: {comp.date}</span>
                                                </div>
                                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                                                    comp.status === 'Resolved' ? 'bg-emerald-50 border border-emerald-100 text-emerald-600' : 'bg-rose-50 border border-rose-100 text-rose-600'
                                                }`}>
                                                    {comp.status}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-bold border-t border-b border-slate-100 py-1.5">
                                                <div>Type: <span className="text-slate-700">{comp.complaintType}</span></div>
                                                <div>Priority: <span className="text-slate-700">{comp.priority}</span></div>
                                                {comp.assignedTeam && <div>Team: <span className="text-slate-700">{comp.assignedTeam}</span></div>}
                                                <div>SLA Limit: <span className="text-slate-700">{comp.slaHours} Hours</span></div>
                                            </div>
                                            {comp.description && <div className="text-[10px] text-slate-500"><strong className="text-slate-600">Issue:</strong> {comp.description}</div>}
                                            {comp.resolutionNotes && <div className="text-[10px] text-slate-500"><strong className="text-emerald-600">Resolution:</strong> {comp.resolutionNotes}</div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 7. Documents */}
                    {activeTab === 'documents' && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold text-slate-700">Trade Licenses & Site Files</h4>
                                <button 
                                    onClick={() => setIsDocModalOpen(true)}
                                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[9px] transition inline-flex items-center gap-1"
                                >
                                    <FaPlus /> Upload Document
                                </button>
                            </div>

                            {(!client.documents || client.documents.length === 0) ? (
                                <div className="text-center py-10 text-slate-400 font-bold bg-slate-50 rounded-xl">No documentation logs uploaded.</div>
                            ) : (
                                <div className="space-y-2">
                                    {client.documents.map((doc, idx) => {
                                        const isExpired = doc.expiryDate && new Date(doc.expiryDate) < new Date();
                                        return (
                                            <div key={idx} className="p-3 border border-slate-200 rounded-xl flex items-center justify-between bg-slate-50/50">
                                                <div className="flex items-center gap-2.5">
                                                    <FaFileAlt className="text-blue-500 text-base shrink-0" />
                                                    <div>
                                                        <div className="font-bold text-slate-800">{doc.name}</div>
                                                        <div className="text-[9px] text-slate-400 mt-0.5">Category: {doc.type}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {doc.expiryDate ? (
                                                        <>
                                                            <div className="text-[9px] text-slate-400">Expires: {doc.expiryDate}</div>
                                                            {isExpired && <span className="text-[8px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100 block mt-1">EXPIRED</span>}
                                                        </>
                                                    ) : (
                                                        <span className="text-[9px] text-slate-400">No Expiry Limit</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 8. Communication Log */}
                    {activeTab === 'communication' && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold text-slate-700">Communication Activity Feed</h4>
                                <button 
                                    onClick={() => setIsCommModalOpen(true)}
                                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[9px] transition inline-flex items-center gap-1"
                                >
                                    <FaPlus /> Log Interaction
                                </button>
                            </div>

                            {(!client.communications || client.communications.length === 0) ? (
                                <div className="text-center py-10 text-slate-400 font-bold bg-slate-50 rounded-xl">No communication logs recorded.</div>
                            ) : (
                                <div className="space-y-2">
                                    {client.communications.map((comm, idx) => (
                                        <div key={idx} className="p-3 border border-slate-200 rounded-xl bg-slate-50/50 space-y-1">
                                            <div className="flex justify-between items-center text-[9px] text-slate-400">
                                                <span className="font-bold text-blue-600 uppercase tracking-wider">{comm.type}</span>
                                                <span>{comm.date}</span>
                                            </div>
                                            <p className="font-medium text-slate-700 text-xs">{comm.notes}</p>
                                            <div className="text-[9px] text-slate-400 italic">Logged by: {comm.staff || 'Manager'}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 9. Notes */}
                    {activeTab === 'notes' && (
                        <div className="space-y-3">
                            <h4 className="font-bold text-slate-700">Special Site Instructions & Remarks</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed">Write specific instructions that dispatch staff and technicians must check before going to the client's premises.</p>
                            <textarea 
                                rows="6" 
                                value={notesText} 
                                onChange={e => setNotesText(e.target.value)} 
                                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none font-medium text-slate-700 bg-slate-50/30"
                                placeholder="e.g. Needs high pressure spray. Always call John before visiting. TRN details required in Arabic..."
                            />
                            <div className="flex justify-end">
                                <button 
                                    onClick={handleSaveNotes}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs active:scale-[0.98] transition"
                                >
                                    Save Remarks
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 10. Timeline */}
                    {activeTab === 'timeline' && (
                        <div className="space-y-3 relative pl-4 border-l border-slate-150 ml-1 py-1">
                            {sortedTimeline.map((evt, idx) => (
                                <div key={idx} className="relative space-y-1 mb-4">
                                    {/* Event Node bullet */}
                                    <div className="absolute -left-[20.5px] top-1.5 w-3 h-3 rounded-full border-2 border-white bg-blue-500 shadow-sm" />
                                    <div className="flex justify-between items-center text-[9px] text-slate-400">
                                        <span className="font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{evt.type}</span>
                                        <span>{evt.date}</span>
                                    </div>
                                    <p className="font-semibold text-slate-700 text-[11px]">{evt.text}</p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Customer Management</h1>
                    <p className="text-slate-500 text-xs mt-0.5">Manage cleaning customers, TRN details, AMC histories, and work order records.</p>
                </div>
                <button 
                    onClick={() => {
                        resetForm();
                        setIsAddOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl active:scale-[0.98] transition text-xs shadow-lg shadow-blue-600/10"
                >
                    <FaPlus className="text-[10px]" /> Add Customer Profile
                </button>
            </div>

            {/* Premium Multi-Parameter Search & Filter Bar (Missing Item 6) */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3.5">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100 text-slate-800">
                    <FaFilter className="text-[11px] text-blue-500" />
                    <h3 className="text-xs font-black uppercase tracking-wider">Search & Filtering Engine</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3 text-slate-400 text-[11px]" />
                        <input 
                            type="text" 
                            value={searchName} 
                            onChange={e => setSearchName(e.target.value)} 
                            placeholder="Search by Customer Name..." 
                            className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <FaPhoneAlt className="absolute left-3 top-3 text-slate-400 text-[10px]" />
                        <input 
                            type="text" 
                            value={searchMobile} 
                            onChange={e => setSearchMobile(e.target.value)} 
                            placeholder="Search by Mobile/WhatsApp..." 
                            className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <FaFileInvoiceDollar className="absolute left-3 top-3 text-slate-400 text-[11px]" />
                        <input 
                            type="text" 
                            value={searchInvoice} 
                            onChange={e => setSearchInvoice(e.target.value)} 
                            placeholder="Search by Invoice Number..." 
                            className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Customer Type</label>
                        <select 
                            value={filterType} 
                            onChange={e => setFilterType(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white font-semibold text-slate-700"
                        >
                            <option value="All">All Types</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Residential">Residential</option>
                            <option value="VIP">VIP</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Contract Status</label>
                        <select 
                            value={filterContract} 
                            onChange={e => setFilterContract(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white font-semibold text-slate-700"
                        >
                            <option value="All">All Contract Types</option>
                            <option value="Active">Has Active AMC</option>
                            <option value="One-Time">One-Time (No active contract)</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Outstanding Bills</label>
                        <select 
                            value={filterPaymentStatus} 
                            onChange={e => setFilterPaymentStatus(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white font-semibold text-slate-700"
                        >
                            <option value="All">All Invoicing Statuses</option>
                            <option value="Late">Has Overdue Invoices (Late)</option>
                            <option value="Pending">Has Unpaid/Pending Bills</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Split Screen Explorer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Customers Master List */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <h3 className="text-sm font-black text-slate-800">All Customers ({filteredClients.length})</h3>
                    </div>
                    <div className="space-y-2 lg:max-h-[600px] lg:overflow-y-auto pr-1">
                        {filteredClients.map(client => {
                            const isSelected = selectedClient?.id === client.id;
                            const clientInvoices = invoices.filter(i => i.customerName === client.name);
                            const overdue = clientInvoices.some(i => i.status === 'Overdue');
                            return (
                                <div key={client.id} className="space-y-2">
                                    <div 
                                        onClick={() => {
                                            if (isSelected) {
                                                setSelectedClient(null);
                                            } else {
                                                setSelectedClient(client);
                                                setActiveTab('profile');
                                            }
                                        }}
                                        className={`p-3.5 border rounded-xl cursor-pointer transition flex items-center justify-between text-xs ${
                                            isSelected 
                                                ? 'border-blue-500 bg-blue-50/20 ring-2 ring-blue-500/10' 
                                                : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70'
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5">
                                                <div className="font-extrabold text-slate-800">{client.name}</div>
                                                {overdue && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" title="Overdue Payment Alert" />}
                                            </div>
                                            <div className="text-[10px] text-slate-500 font-bold">{client.contactPerson} • {client.emirate || 'Dubai'}</div>
                                            <div className="text-[9px] text-slate-400">TRN: {client.trn || 'N/A'} • {client.phone}</div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <span className="text-[9px] font-black text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded">
                                                {client.id}
                                            </span>
                                            {client.customerType === 'VIP' && (
                                                <span className="text-[7.5px] font-bold tracking-wider uppercase bg-amber-50 border border-amber-200 text-amber-700 px-1 rounded">VIP</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mobile Inline Details: Expand directly below card */}
                                    {isSelected && (
                                        <div className="block lg:hidden bg-white border border-slate-200 rounded-xl p-4 shadow-inner space-y-3">
                                            {renderClientDetails(client)}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {filteredClients.length === 0 && (
                            <div className="text-center py-10 text-slate-400 italic">No customers match the current search filters.</div>
                        )}
                    </div>
                </div>

                {/* Customer Detail Drawer with History Tabs */}
                <div className="hidden lg:flex lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex-col min-h-[400px]">
                    {selectedClient ? (
                        renderClientDetails(selectedClient)
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-400 text-center">
                            <FaUser className="text-4xl opacity-20 mb-2" />
                            <p className="text-xs font-bold px-8">Select a customer from the left sidebar panel to manage their billing, AMC contracts, invoices, and service histories.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Customer Modal */}
            {isAddOpen && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-2xl w-full my-8 space-y-4 text-xs text-slate-700">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-800">Add New Customer Profile</h3>
                            <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                        </div>
                        <form onSubmit={handleCreateClient} className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                            
                            {/* Section 1: Basic Info */}
                            <h4 className="font-black text-blue-600 uppercase border-b border-slate-100 pb-1 text-[10px] tracking-wider">1. Basic Information</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Customer Company Name *</label>
                                    <input required type="text" value={clientForm.name} onChange={e => setClientForm({...clientForm, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Al Futtaim LLC" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Contact Person Name *</label>
                                    <input required type="text" value={clientForm.contactPerson} onChange={e => setClientForm({...clientForm, contactPerson: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. John Smith" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Phone *</label>
                                    <input required type="text" value={clientForm.phone} onChange={e => setClientForm({...clientForm, phone: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. +971 50..." />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">WhatsApp Number</label>
                                    <input type="text" value={clientForm.whatsapp} onChange={e => setClientForm({...clientForm, whatsapp: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="WhatsApp number" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Landline</label>
                                    <input type="text" value={clientForm.landline} onChange={e => setClientForm({...clientForm, landline: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="Landline number" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Email Address *</label>
                                    <input required type="email" value={clientForm.email} onChange={e => setClientForm({...clientForm, email: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. john@email.com" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">TRN (VAT Tax No)</label>
                                    <input type="text" value={clientForm.trn} onChange={e => setClientForm({...clientForm, trn: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="15 Digit TRN" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Website</label>
                                    <input type="text" value={clientForm.website} onChange={e => setClientForm({...clientForm, website: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="www.website.com" />
                                </div>
                            </div>

                            {/* Section 2: Address & Location */}
                            <h4 className="font-black text-blue-600 uppercase border-b border-slate-100 pb-1 text-[10px] tracking-wider pt-2">2. Address & Location Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Emirate/State *</label>
                                    <select value={clientForm.emirate} onChange={e => setClientForm({...clientForm, emirate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Abu Dhabi">Abu Dhabi</option>
                                        <option value="Dubai">Dubai</option>
                                        <option value="Sharjah">Sharjah</option>
                                        <option value="Ajman">Ajman</option>
                                        <option value="Umm Al Quwain">Umm Al Quwain</option>
                                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                        <option value="Fujairah">Fujairah</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">City *</label>
                                    <input required type="text" value={clientForm.city} onChange={e => setClientForm({...clientForm, city: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Dubai Marina" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Building Name</label>
                                    <input type="text" value={clientForm.buildingName} onChange={e => setClientForm({...clientForm, buildingName: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="Building name" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Office/Villa Number</label>
                                    <input type="text" value={clientForm.officeVilla} onChange={e => setClientForm({...clientForm, officeVilla: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Office 504 / Villa 12" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Landmark (Missing Item 1)</label>
                                    <input type="text" value={clientForm.landmark} onChange={e => setClientForm({...clientForm, landmark: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Near Mall Metro" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">GPS Coordinates</label>
                                    <input type="text" value={clientForm.gpsCoordinates} onChange={e => setClientForm({...clientForm, gpsCoordinates: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="25.1972, 55.2744" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Google Map Link</label>
                                    <input type="text" value={clientForm.googleMapLink} onChange={e => setClientForm({...clientForm, googleMapLink: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="https://maps.google.com/?q=..." />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Full Service Address *</label>
                                <textarea required rows="2" value={clientForm.address} onChange={e => setClientForm({...clientForm, address: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none" placeholder="Enter complete service address detail..." />
                            </div>

                            {/* Section 3: Profile Settings & Financials */}
                            <h4 className="font-black text-blue-600 uppercase border-b border-slate-100 pb-1 text-[10px] tracking-wider pt-2">3. Profile & Financial Configuration</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Customer Type *</label>
                                    <select value={clientForm.customerType} onChange={e => setClientForm({...clientForm, customerType: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Commercial">Commercial</option>
                                        <option value="Residential">Residential</option>
                                        <option value="VIP">VIP</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Industry</label>
                                    <input type="text" value={clientForm.industry} onChange={e => setClientForm({...clientForm, industry: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Retail, Real Estate" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Source dropdown</label>
                                    <select value={clientForm.source} onChange={e => setClientForm({...clientForm, source: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Website">Website</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Cold Call">Cold Call</option>
                                        <option value="Exhibition">Exhibition</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Credit Limit (AED)</label>
                                    <input type="number" value={clientForm.creditLimit} onChange={e => setClientForm({...clientForm, creditLimit: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. 50000" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Initial Advance Balance (AED)</label>
                                    <input type="number" value={clientForm.advanceBalance} onChange={e => setClientForm({...clientForm, advanceBalance: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Payment Terms</label>
                                    <select value={clientForm.paymentTerms} onChange={e => setClientForm({...clientForm, paymentTerms: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="COD">COD</option>
                                        <option value="15 Days">15 Days</option>
                                        <option value="30 Days">30 Days</option>
                                        <option value="45 Days">45 Days</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Preferred Timing (Missing Item 2)</label>
                                    <select value={clientForm.preferredTiming} onChange={e => setClientForm({...clientForm, preferredTiming: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Morning">Morning (08:00 AM - 12:00 PM)</option>
                                        <option value="Afternoon">Afternoon (12:00 PM - 04:00 PM)</option>
                                        <option value="Evening">Evening (04:00 PM - 09:00 PM)</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Priority Level (Missing Item 3)</label>
                                    <select value={clientForm.priorityLevel} onChange={e => setClientForm({...clientForm, priorityLevel: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Low">Low Priority</option>
                                        <option value="Medium">Medium Priority</option>
                                        <option value="High">High Priority</option>
                                        <option value="VIP">VIP Customer Priority</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Internal Cleaning Instructions & Notes</label>
                                <textarea rows="2" value={clientForm.notes} onChange={e => setClientForm({...clientForm, notes: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none" placeholder="Special requirements, specific chemicals requested..." />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Create Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Customer Modal */}
            {isEditOpen && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-2xl w-full my-8 space-y-4 text-xs text-slate-700">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-800">Edit Customer Info</h3>
                            <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                        </div>
                        <form onSubmit={handleEditClientSubmit} className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                            
                            <h4 className="font-black text-blue-600 uppercase border-b border-slate-100 pb-1 text-[10px] tracking-wider">1. Basic Information</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Customer Company Name *</label>
                                    <input required type="text" value={clientForm.name} onChange={e => setClientForm({...clientForm, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Contact Person Name *</label>
                                    <input required type="text" value={clientForm.contactPerson} onChange={e => setClientForm({...clientForm, contactPerson: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Phone *</label>
                                    <input required type="text" value={clientForm.phone} onChange={e => setClientForm({...clientForm, phone: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">WhatsApp Number</label>
                                    <input type="text" value={clientForm.whatsapp} onChange={e => setClientForm({...clientForm, whatsapp: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Landline</label>
                                    <input type="text" value={clientForm.landline} onChange={e => setClientForm({...clientForm, landline: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Email Address *</label>
                                    <input required type="email" value={clientForm.email} onChange={e => setClientForm({...clientForm, email: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">TRN (VAT Tax No)</label>
                                    <input type="text" value={clientForm.trn} onChange={e => setClientForm({...clientForm, trn: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Website</label>
                                    <input type="text" value={clientForm.website} onChange={e => setClientForm({...clientForm, website: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                            </div>

                            <h4 className="font-black text-blue-600 uppercase border-b border-slate-100 pb-1 text-[10px] tracking-wider pt-2">2. Address & Location Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Emirate/State *</label>
                                    <select value={clientForm.emirate} onChange={e => setClientForm({...clientForm, emirate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Abu Dhabi">Abu Dhabi</option>
                                        <option value="Dubai">Dubai</option>
                                        <option value="Sharjah">Sharjah</option>
                                        <option value="Ajman">Ajman</option>
                                        <option value="Umm Al Quwain">Umm Al Quwain</option>
                                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                        <option value="Fujairah">Fujairah</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">City *</label>
                                    <input required type="text" value={clientForm.city} onChange={e => setClientForm({...clientForm, city: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Building Name</label>
                                    <input type="text" value={clientForm.buildingName} onChange={e => setClientForm({...clientForm, buildingName: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Office/Villa Number</label>
                                    <input type="text" value={clientForm.officeVilla} onChange={e => setClientForm({...clientForm, officeVilla: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Landmark (Missing Item 1)</label>
                                    <input type="text" value={clientForm.landmark} onChange={e => setClientForm({...clientForm, landmark: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">GPS Coordinates</label>
                                    <input type="text" value={clientForm.gpsCoordinates} onChange={e => setClientForm({...clientForm, gpsCoordinates: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Google Map Link</label>
                                    <input type="text" value={clientForm.googleMapLink} onChange={e => setClientForm({...clientForm, googleMapLink: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Full Service Address *</label>
                                <textarea required rows="2" value={clientForm.address} onChange={e => setClientForm({...clientForm, address: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none" />
                            </div>

                            <h4 className="font-black text-blue-600 uppercase border-b border-slate-100 pb-1 text-[10px] tracking-wider pt-2">3. Profile & Financial Configuration</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Customer Type *</label>
                                    <select value={clientForm.customerType} onChange={e => setClientForm({...clientForm, customerType: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Commercial">Commercial</option>
                                        <option value="Residential">Residential</option>
                                        <option value="VIP">VIP</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Industry</label>
                                    <input type="text" value={clientForm.industry} onChange={e => setClientForm({...clientForm, industry: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Source</label>
                                    <select value={clientForm.source} onChange={e => setClientForm({...clientForm, source: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Website">Website</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Cold Call">Cold Call</option>
                                        <option value="Exhibition">Exhibition</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Credit Limit (AED)</label>
                                    <input type="number" value={clientForm.creditLimit} onChange={e => setClientForm({...clientForm, creditLimit: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Advance Balance (AED)</label>
                                    <input type="number" value={clientForm.advanceBalance} onChange={e => setClientForm({...clientForm, advanceBalance: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Payment Terms</label>
                                    <select value={clientForm.paymentTerms} onChange={e => setClientForm({...clientForm, paymentTerms: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="COD">COD</option>
                                        <option value="15 Days">15 Days</option>
                                        <option value="30 Days">30 Days</option>
                                        <option value="45 Days">45 Days</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Preferred Timing (Missing Item 2)</label>
                                    <select value={clientForm.preferredTiming} onChange={e => setClientForm({...clientForm, preferredTiming: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Morning">Morning (08:00 AM - 12:00 PM)</option>
                                        <option value="Afternoon">Afternoon (12:00 PM - 04:00 PM)</option>
                                        <option value="Evening">Evening (04:00 PM - 09:00 PM)</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Priority Level (Missing Item 3)</label>
                                    <select value={clientForm.priorityLevel} onChange={e => setClientForm({...clientForm, priorityLevel: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Low">Low Priority</option>
                                        <option value="Medium">Medium Priority</option>
                                        <option value="High">High Priority</option>
                                        <option value="VIP">VIP Customer Priority</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Internal Cleaning Instructions & Notes</label>
                                <textarea rows="2" value={clientForm.notes} onChange={e => setClientForm({...clientForm, notes: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none" />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Record Refund Modal */}
            {isRefundModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-xs text-slate-700">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-800">Record Advance Payment Refund</h3>
                            <button onClick={() => setIsRefundModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                        </div>
                        <form onSubmit={handleRecordRefund} className="space-y-3">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Refund Amount (AED) * (Max: AED {selectedClient?.advanceBalance})</label>
                                <input required type="number" max={selectedClient?.advanceBalance} value={refundForm.amount} onChange={e => setRefundForm({...refundForm, amount: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. 500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Reason for Refund *</label>
                                <input required type="text" value={refundForm.reason} onChange={e => setRefundForm({...refundForm, reason: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Service cancelled by client request" />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsRefundModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700">Issue Refund</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Document Upload Modal */}
            {isDocModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-xs text-slate-700">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-800">Upload Site File / License</h3>
                            <button onClick={() => setIsDocModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                        </div>
                        <form onSubmit={handleAddDocument} className="space-y-3">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Document / File Name *</label>
                                <input required type="text" value={docForm.name} onChange={e => setDocForm({...docForm, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Trade License 2026.pdf" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Category *</label>
                                <select value={docForm.type} onChange={e => setDocForm({...docForm, type: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                    <option value="Trade License">Trade License</option>
                                    <option value="Contract">SLA Agreement/Contract</option>
                                    <option value="Site Photo">Premises Site Photos</option>
                                    <option value="Receipt">Payment Receipt</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Document Expiry Date</label>
                                <input type="date" value={docForm.expiryDate} onChange={e => setDocForm({...docForm, expiryDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsDocModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Attach Document</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Log Communication Modal */}
            {isCommModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-xs text-slate-700">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-800">Log Interaction / Conversation</h3>
                            <button onClick={() => setIsCommModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                        </div>
                        <form onSubmit={handleAddCommunication} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Interaction Type *</label>
                                    <select value={commForm.type} onChange={e => setCommForm({...commForm, type: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Call">Phone Call</option>
                                        <option value="WhatsApp">WhatsApp Chat</option>
                                        <option value="Email">Email Thread</option>
                                        <option value="Meeting">Direct Meeting</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Staff In-Charge *</label>
                                    <input required type="text" value={commForm.staff} onChange={e => setCommForm({...commForm, staff: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="Your name" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Staff Conversation Notes *</label>
                                <textarea required rows="4" value={commForm.notes} onChange={e => setCommForm({...commForm, notes: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none" placeholder="Provide a summary of what was discussed..." />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsCommModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Save Log</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Raise Complaint Modal */}
            {isComplaintModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-xs text-slate-700">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-800">Raise Customer Complaint</h3>
                            <button onClick={() => setIsComplaintModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                        </div>
                        <form onSubmit={handleAddComplaintSubmit} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Category *</label>
                                    <select value={complaintForm.complaintType} onChange={e => setComplaintForm({...complaintForm, complaintType: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Service Issue">Service Quality Issue</option>
                                        <option value="Breakdown">Breakdown</option>
                                        <option value="Damage">Damage reported</option>
                                        <option value="Delay">Delay in schedule</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Priority Level *</label>
                                    <select value={complaintForm.priority} onChange={e => setComplaintForm({...complaintForm, priority: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Low">Low (24hr SLA)</option>
                                        <option value="Medium">Medium (24hr SLA)</option>
                                        <option value="High">High (12hr SLA)</option>
                                        <option value="Emergency">Emergency (4hr SLA)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Linked Contract/AMC (Ref No)</label>
                                <input type="text" value={complaintForm.amcRef} onChange={e => setComplaintForm({...complaintForm, amcRef: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. ctr1" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Issue Description *</label>
                                <textarea required rows="4" value={complaintForm.description} onChange={e => setComplaintForm({...complaintForm, description: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none" placeholder="Provide full details of the customer complaint..." />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsComplaintModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700">File Complaint</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ClientsPage;
