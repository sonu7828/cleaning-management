import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
    FaFileInvoice, FaPlus, FaCheck, FaTrash, FaClock, FaEye, FaPrint, 
    FaBuilding, FaUserCheck, FaChevronRight, FaTimes, FaSearch, FaFilter,
    FaArrowRight, FaPercent, FaCoins, FaPaperclip, FaPlusCircle, FaTimesCircle,
    FaClipboardList
} from 'react-icons/fa';

const QuotationsPage = () => {
    const { 
        quotations, addQuote, updateQuoteStatus, clients, addClient, services, 
        convertQuoteToContract, convertQuoteToInvoice, convertQuoteToJobCard, settings,
        contracts, invoices, workOrders
    } = useContext(AppContext);
    
    const [showForm, setShowForm] = useState(false);
    const [previewQuote, setPreviewQuote] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    
    // Approval/Rejection Modal state
    const [notesModal, setNotesModal] = useState({ isOpen: false, quoteId: null, nextStatus: '' });
    const [approvalNotesText, setApprovalNotesText] = useState('');

    // Inline Customer Modal state
    const [isNewClientOpen, setIsNewClientOpen] = useState(false);
    const [newClientForm, setNewClientForm] = useState({
        name: '', contactPerson: '', email: '', phone: '', address: '', trn: '', customerType: 'Commercial', emirate: 'Dubai'
    });

    // Form fields
    const [selectedClient, setSelectedClient] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientTrn, setClientTrn] = useState('');
    const [clientAddress, setClientAddress] = useState('');
    const [clientContact, setClientContact] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    
    const [validUntil, setValidUntil] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 30);
        return d.toISOString().split('T')[0];
    });
    const [salesperson, setSalesperson] = useState('Sales Rep A');
    const [termsText, setTermsText] = useState(settings?.quotationTerms || '1. Standard terms of clean services apply.\n2. Payment: Net 30 days from Invoice Date.\n3. All figures mentioned are in UAE Dirhams (AED) and subject to 5% VAT.');
    const [internalNotes, setInternalNotes] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [attachmentInput, setAttachmentInput] = useState('');

    const [items, setItems] = useState([
        { serviceName: '', description: '', unitPrice: 0, qty: 1, discount: 0, discountType: 'Percent', vatPercent: 5 }
    ]);

    const handleClientChange = (e) => {
        const clientName = e.target.value;
        setSelectedClient(clientName);
        const match = clients.find(c => c.name === clientName);
        if (match) {
            setClientEmail(match.email || '');
            setClientTrn(match.trn || '');
            setClientAddress(match.address || '');
            setClientContact(match.contactPerson || '');
            setClientPhone(match.phone || '');
        }
    };

    const handleItemChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        
        // If they select a pre-defined service, fill default rate
        if (field === 'serviceName') {
            const matchSvc = services.find(s => s.name === value);
            if (matchSvc) {
                updated[index].unitPrice = matchSvc.price;
                updated[index].description = matchSvc.description;
                updated[index].vatPercent = matchSvc.vatPercent || 5;
            }
        }
        setItems(updated);
    };

    const addItemRow = () => {
        setItems([...items, { serviceName: '', description: '', unitPrice: 0, qty: 1, discount: 0, discountType: 'Percent', vatPercent: 5 }]);
    };

    const removeItemRow = (index) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const handleAddAttachment = (e) => {
        e.preventDefault();
        if (attachmentInput) {
            setAttachments([...attachments, attachmentInput]);
            setAttachmentInput('');
        }
    };

    const handleRemoveAttachment = (idx) => {
        setAttachments(attachments.filter((_, i) => i !== idx));
    };

    const handleCreateClientInline = (e) => {
        e.preventDefault();
        addClient(newClientForm);
        // Pre-fill quotation form with this newly added client
        setSelectedClient(newClientForm.name);
        setClientEmail(newClientForm.email);
        setClientTrn(newClientForm.trn);
        setClientAddress(newClientForm.address);
        setClientContact(newClientForm.contactPerson);
        setClientPhone(newClientForm.phone);
        
        setIsNewClientOpen(false);
        setNewClientForm({ name: '', contactPerson: '', email: '', phone: '', address: '', trn: '', customerType: 'Commercial', emirate: 'Dubai' });
    };

    // Calculate totals
    const calculateItemSubtotal = (item) => {
        const base = Number(item.unitPrice) * Number(item.qty);
        let disc = 0;
        if (item.discountType === 'Percent') {
            disc = base * (Number(item.discount) / 100);
        } else {
            disc = Number(item.discount);
        }
        return Math.max(0, base - disc);
    };

    const calculateItemVat = (item) => {
        const sub = calculateItemSubtotal(item);
        return sub * (Number(item.vatPercent) / 100);
    };

    const subtotal = items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0);
    const vatTotal = items.reduce((sum, item) => sum + calculateItemVat(item), 0);
    const grandTotal = subtotal + vatTotal;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedClient || items.some(item => !item.serviceName)) {
            alert('Please select a customer and choose a service for each line item.');
            return;
        }

        const newQuote = {
            clientName: selectedClient,
            email: clientEmail,
            trn: clientTrn,
            address: clientAddress,
            contactPerson: clientContact,
            phone: clientPhone,
            validUntil,
            salesperson,
            terms: termsText,
            notes: internalNotes,
            attachments,
            lineItems: items.map(item => ({
                service: item.serviceName,
                description: item.description,
                unitPrice: Number(item.unitPrice),
                qty: Number(item.qty),
                discount: Number(item.discount),
                discountType: item.discountType,
                vatPercent: Number(item.vatPercent),
                total: calculateItemSubtotal(item)
            })),
            subtotal,
            vatAmount: vatTotal,
            grandTotal,
            status: 'Draft',
            createdDate: new Date().toISOString().split('T')[0]
        };

        addQuote(newQuote);
        
        // Reset form
        setSelectedClient('');
        setClientEmail('');
        setClientTrn('');
        setClientAddress('');
        setClientContact('');
        setClientPhone('');
        setItems([{ serviceName: '', description: '', unitPrice: 0, qty: 1, discount: 0, discountType: 'Percent', vatPercent: 5 }]);
        setAttachments([]);
        setInternalNotes('');
        setShowForm(false);
    };

    const openNotesModal = (id, nextStatus) => {
        setNotesModal({ isOpen: true, quoteId: id, nextStatus });
        setApprovalNotesText('');
    };

    const handleStatusTransition = () => {
        updateQuoteStatus(notesModal.quoteId, notesModal.nextStatus, approvalNotesText);
        setNotesModal({ isOpen: false, quoteId: null, nextStatus: '' });
    };

    // Dashboard metrics
    const totalQuotes = quotations.length;
    const pendingQuotes = quotations.filter(q => q.status === 'Draft' || q.status === 'Sent' || q.status === 'Viewed').length;
    const approvedQuotes = quotations.filter(q => q.status === 'Approved').length;
    const rejectedQuotes = quotations.filter(q => q.status === 'Rejected').length;
    const expiredQuotes = quotations.filter(q => {
        if (q.status === 'Approved') return false;
        return q.validUntil && new Date(q.validUntil) < new Date();
    }).length;

    // Search and Status filters
    const filteredQuotes = quotations.filter(q => {
        const matchesSearch = 
            q.refNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (q.phone && q.phone.includes(searchQuery));
            
        const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statusColors = {
        Draft: 'bg-slate-50 text-slate-700 border-slate-200',
        Sent: 'bg-blue-50 text-blue-700 border-blue-100',
        Viewed: 'bg-cyan-50 text-cyan-700 border-cyan-100',
        Approved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        Rejected: 'bg-rose-50 text-rose-700 border-rose-100',
        Expired: 'bg-amber-50 text-amber-700 border-amber-100'
    };

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaFileInvoice className="text-blue-600" />
                        Quotations Board
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Draft professional, UAE-compliant cleaning estimates with automated 5% VAT calculations.</p>
                </div>
                <button 
                    onClick={() => {
                        setTermsText(settings?.quotationTerms || '');
                        setShowForm(!showForm);
                    }} 
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/10"
                >
                    <FaPlus className="text-[10px]" /> {showForm ? 'Back to Board' : 'New Estimate Draft'}
                </button>
            </div>

            {/* Quotation Summary Metrics (Missing Item 8) */}
            {!showForm && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">Total Estimates</div>
                        <div className="text-lg font-black text-slate-800 mt-1">{totalQuotes}</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">Pending Quotes</div>
                        <div className="text-lg font-black text-blue-600 mt-1">{pendingQuotes}</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Approved Quotes</div>
                        <div className="text-lg font-black text-emerald-600 mt-1">{approvedQuotes}</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="text-[10px] text-rose-700 font-bold uppercase tracking-wider">Rejected Quotes</div>
                        <div className="text-lg font-black text-rose-600 mt-1">{rejectedQuotes}</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Expired Quotes</div>
                        <div className="text-lg font-black text-amber-600 mt-1">{expiredQuotes}</div>
                    </div>
                </div>
            )}

            {showForm ? (
                /* UAE Quote Creator Form */
                <motion.div 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-4xl mx-auto space-y-5 text-xs"
                >
                    <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                        <h3 className="text-sm font-black text-slate-850">Draft New Quote</h3>
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">Reference: Auto Generated</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Customer Information (with Add Customer inline - Missing Item 9) */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="font-bold text-slate-500">Select Customer *</label>
                                <button 
                                    type="button" 
                                    onClick={() => setIsNewClientOpen(true)}
                                    className="text-blue-600 hover:text-blue-700 font-bold text-[10px] flex items-center gap-1"
                                >
                                    <FaPlusCircle /> Add New Customer Inline
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <select 
                                        required 
                                        value={selectedClient} 
                                        onChange={handleClientChange}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    >
                                        <option value="">Choose Customer...</option>
                                        {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <input 
                                        type="email" 
                                        value={clientEmail} 
                                        onChange={e => setClientEmail(e.target.value)} 
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500" 
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <input 
                                        type="text" 
                                        value={clientTrn} 
                                        onChange={e => setClientTrn(e.target.value)} 
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500" 
                                        placeholder="TRN (UAE VAT Tax No)"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <input 
                                        type="text" 
                                        value={clientAddress} 
                                        onChange={e => setClientAddress(e.target.value)} 
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500" 
                                        placeholder="Site Service Address"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Customer Contact Details display (Missing Item 10) */}
                        {selectedClient && (
                            <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex flex-wrap gap-4 text-[10px] text-slate-500 font-bold">
                                <div>Contact Manager: <span className="text-slate-700">{clientContact || 'N/A'}</span></div>
                                <div>Mobile Phone: <span className="text-slate-700">{clientPhone || 'N/A'}</span></div>
                            </div>
                        )}

                        {/* Metadata fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Estimate Validity Expiry *</label>
                                <input 
                                    required
                                    type="date"
                                    value={validUntil}
                                    onChange={e => setValidUntil(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Assigned Salesperson *</label>
                                <select 
                                    value={salesperson} 
                                    onChange={e => setSalesperson(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                >
                                    <option value="Sales Rep A">Sales Rep A</option>
                                    <option value="Sales Rep B">Sales Rep B</option>
                                    <option value="Admin / Management">Admin / Management</option>
                                </select>
                            </div>
                        </div>

                        {/* Line Items Table */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="font-black text-slate-800">Quotation Line Items</h4>
                                <button 
                                    type="button" 
                                    onClick={addItemRow}
                                    className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg font-bold transition flex items-center gap-1"
                                >
                                    <FaPlus className="text-[8px]" /> Add Line Item
                                </button>
                            </div>

                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                                            <th className="py-2.5 px-3">Service Name</th>
                                            <th className="py-2.5 px-3">Scope Description</th>
                                            <th className="py-2.5 px-3 w-24">Rate (AED)</th>
                                            <th className="py-2.5 px-3 w-16">Qty</th>
                                            <th className="py-2.5 px-3 w-28">Discount</th>
                                            <th className="py-2.5 px-3 w-16">VAT %</th>
                                            <th className="py-2.5 px-3 text-right w-24">Total (AED)</th>
                                            <th className="py-2.5 px-2 text-center w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-150">
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="p-2">
                                                    <select 
                                                        required
                                                        value={item.serviceName} 
                                                        onChange={e => handleItemChange(index, 'serviceName', e.target.value)}
                                                        className="w-full p-1.5 border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500"
                                                    >
                                                        <option value="">Select Service...</option>
                                                        {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                                    </select>
                                                </td>
                                                <td className="p-2">
                                                    <input 
                                                        type="text" 
                                                        value={item.description} 
                                                        onChange={e => handleItemChange(index, 'description', e.target.value)} 
                                                        className="w-full p-1.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500" 
                                                        placeholder="Service coverage details..."
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input 
                                                        type="number" 
                                                        min="0" 
                                                        step="0.01"
                                                        value={item.unitPrice} 
                                                        onChange={e => handleItemChange(index, 'unitPrice', e.target.value)} 
                                                        className="w-full p-1.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500" 
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input 
                                                        type="number" 
                                                        min="1" 
                                                        value={item.qty} 
                                                        onChange={e => handleItemChange(index, 'qty', e.target.value)} 
                                                        className="w-full p-1.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500" 
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <div className="flex items-center gap-1">
                                                        <input 
                                                            type="number" 
                                                            min="0" 
                                                            value={item.discount} 
                                                            onChange={e => handleItemChange(index, 'discount', e.target.value)} 
                                                            className="w-16 p-1.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500" 
                                                        />
                                                        <select 
                                                            value={item.discountType}
                                                            onChange={e => handleItemChange(index, 'discountType', e.target.value)}
                                                            className="p-1.5 border border-slate-200 bg-slate-50 rounded-lg text-[9px] font-bold"
                                                        >
                                                            <option value="Percent">%</option>
                                                            <option value="Flat">Flat</option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <input 
                                                        type="number" 
                                                        min="0" 
                                                        max="100"
                                                        value={item.vatPercent} 
                                                        onChange={e => handleItemChange(index, 'vatPercent', e.target.value)} 
                                                        className="w-full p-1.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500" 
                                                    />
                                                </td>
                                                <td className="p-2 text-right font-bold text-slate-800">
                                                    AED {calculateItemSubtotal(item).toLocaleString()}
                                                </td>
                                                <td className="p-2 text-center">
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeItemRow(index)}
                                                        disabled={items.length === 1}
                                                        className="text-slate-400 hover:text-rose-600 disabled:opacity-30"
                                                    >
                                                        <FaTrash className="text-xs" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Terms, Internal Notes & Attachments */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Terms & Conditions editor</label>
                                <textarea 
                                    rows="4"
                                    value={termsText}
                                    onChange={e => setTermsText(e.target.value)}
                                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-mono text-[10px]"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Internal Remarks / Notes</label>
                                <textarea 
                                    rows="4"
                                    value={internalNotes}
                                    onChange={e => setInternalNotes(e.target.value)}
                                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                                    placeholder="Enter instructions invisible to the client..."
                                />
                            </div>
                            <div className="space-y-2 bg-slate-50/50 p-3.5 border border-slate-100 rounded-2xl flex flex-col justify-between">
                                <label className="font-bold text-slate-500 flex items-center gap-1"><FaPaperclip /> Site Attachments</label>
                                {attachments.length > 0 && (
                                    <div className="space-y-1 my-1 max-h-[80px] overflow-y-auto pr-1">
                                        {attachments.map((file, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-white p-1.5 border border-slate-150 rounded-lg text-[9px]">
                                                <span className="truncate">{file}</span>
                                                <button type="button" onClick={() => handleRemoveAttachment(idx)} className="text-rose-500 hover:text-rose-700"><FaTimesCircle /></button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-1.5 mt-2">
                                    <input 
                                        type="text" 
                                        value={attachmentInput}
                                        onChange={e => setAttachmentInput(e.target.value)}
                                        placeholder="Add photo filename..."
                                        className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={handleAddAttachment}
                                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Totals Summary */}
                        <div className="flex justify-end pt-3">
                            <div className="w-80 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                                <div className="flex justify-between font-bold text-slate-500">
                                    <span>Net Subtotal:</span>
                                    <span>AED {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-slate-500">
                                    <span>VAT Tax (5%):</span>
                                    <span>AED {vatTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm font-black text-emerald-600 pt-2 border-t border-slate-200">
                                    <span>Grand Total:</span>
                                    <span>AED {grandTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                            <button 
                                type="button" 
                                onClick={() => setShowForm(false)} 
                                className="px-4 py-2 border border-slate-200 rounded-xl font-bold hover:bg-slate-50"
                            >
                                Cancel Draft
                            </button>
                            <button 
                                type="submit" 
                                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
                            >
                                Generate UAE Estimate
                            </button>
                        </div>
                    </form>
                </motion.div>
            ) : (
                /* Board/List View */
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                    
                    {/* Search & Filter bar */}
                    <div className="flex flex-col sm:flex-row justify-between gap-3 pb-3 border-b border-slate-100">
                        <div className="relative w-full sm:max-w-xs">
                            <FaSearch className="absolute left-3 top-3 text-slate-400 text-[10px]" />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search by Quote No, Customer Name..."
                                className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                        </div>
                        <select 
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-slate-200 rounded-xl bg-white font-semibold text-slate-700"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Draft">Draft</option>
                            <option value="Sent">Sent</option>
                            <option value="Viewed">Viewed</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-450 font-extrabold uppercase tracking-wider">
                                    <th className="py-3 px-2">Ref Code</th>
                                    <th className="py-3 px-2">Customer Company</th>
                                    <th className="py-3 px-2">Salesperson</th>
                                    <th className="py-3 px-2">Validity Limit</th>
                                    <th className="py-3 px-2">Grand Total</th>
                                    <th className="py-3 px-2">Status</th>
                                    <th className="py-3 px-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                {filteredQuotes.map(quote => {
                                    const isExpired = quote.status !== 'Approved' && quote.validUntil && new Date(quote.validUntil) < new Date();
                                    return (
                                        <tr key={quote.id} className="hover:bg-slate-50 transition">
                                            <td className="py-3 px-2 font-bold text-slate-800">{quote.refNumber}</td>
                                            <td className="py-3 px-2">
                                                <div className="font-bold text-slate-800">{quote.clientName}</div>
                                                <div className="text-[10px] text-slate-400 mt-0.5">{quote.email}</div>
                                            </td>
                                            <td className="py-3 px-2">{quote.salesperson || 'Admin'}</td>
                                            <td className={`py-3 px-2 ${isExpired ? 'text-rose-500 font-bold' : ''}`}>
                                                {quote.validUntil || 'N/A'}
                                                {isExpired && <span className="text-[8px] bg-rose-50 border border-rose-100 text-rose-600 px-1 rounded ml-1">Expired</span>}
                                            </td>
                                            <td className="py-3 px-2 font-black text-emerald-600">AED {quote.grandTotal.toLocaleString()}</td>
                                            <td className="py-3 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${statusColors[isExpired ? 'Expired' : quote.status]}`}>
                                                    {isExpired ? 'Expired' : quote.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button 
                                                        onClick={() => setPreviewQuote(quote)}
                                                        className="p-1.5 hover:bg-slate-50 text-slate-500 border border-slate-200 rounded-lg text-[10px] font-bold flex items-center gap-1"
                                                        title="Preview Estimate"
                                                    >
                                                        <FaEye /> PDF
                                                    </button>
                                                    {quote.status !== 'Approved' && quote.status !== 'Rejected' && !isExpired && (
                                                        <>
                                                            <button 
                                                                onClick={() => openNotesModal(quote.id, 'Approved')}
                                                                className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 rounded-lg text-[10px] font-bold flex items-center gap-1"
                                                                title="Approve estimate"
                                                            >
                                                                <FaCheck /> Approve
                                                            </button>
                                                            <button 
                                                                onClick={() => openNotesModal(quote.id, 'Rejected')}
                                                                className="p-1.5 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-lg text-[10px] font-bold flex items-center gap-1"
                                                                title="Reject estimate"
                                                            >
                                                                ✕ Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    {quote.status === 'Approved' && (
                                                        <div className="flex items-center gap-1">
                                                            {quote.convertedToContract && contracts.some(c => c.quotationRef === quote.refNumber || c.title.includes(quote.refNumber)) ? (
                                                                 <span className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[9px] font-bold flex items-center gap-0.5" title="Converted to active AMC Contract">
                                                                     <FaCheck /> AMC Active
                                                                 </span>
                                                             ) : (
                                                                 <button 
                                                                     onClick={() => {
                                                                         convertQuoteToContract(quote.id);
                                                                     }}
                                                                     className="p-1.5 bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 rounded-lg text-[9px] font-bold flex items-center gap-0.5"
                                                                     title="Convert quote to AMC Contract"
                                                                 >
                                                                     <FaChevronRight /> AMC
                                                                 </button>
                                                             )}

                                                             {quote.convertedToInvoice && invoices.some(i => i.refQuote === quote.refNumber) ? (
                                                                 <span className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[9px] font-bold flex items-center gap-0.5" title="Converted to direct Invoice">
                                                                     <FaCheck /> Invoiced
                                                                 </span>
                                                             ) : (
                                                                 <button 
                                                                     onClick={() => {
                                                                         convertQuoteToInvoice(quote.id);
                                                                         alert('Successfully converted to direct Invoice!');
                                                                     }}
                                                                     className="p-1.5 bg-teal-50 text-teal-600 border border-teal-100 hover:bg-teal-100 rounded-lg text-[9px] font-bold flex items-center gap-0.5"
                                                                     title="Convert to direct Invoice"
                                                                 >
                                                                     <FaFileInvoice /> Invoice
                                                                 </button>
                                                             )}

                                                             {quote.convertedToJobCard && workOrders.some(w => w.refQuote === quote.refNumber || w.id.includes(quote.refNumber)) ? (
                                                                 <span className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[9px] font-bold flex items-center gap-0.5" title="Converted to operational Work Order">
                                                                     <FaCheck /> Job Card
                                                                 </span>
                                                             ) : (
                                                                 <button 
                                                                     onClick={() => {
                                                                         convertQuoteToJobCard(quote.id);
                                                                         alert('Successfully converted to operational Work Order!');
                                                                     }}
                                                                     className="p-1.5 bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100 rounded-lg text-[9px] font-bold flex items-center gap-0.5"
                                                                     title="Convert to direct Job Card (Work Order)"
                                                                 >
                                                                     <FaClipboardList /> Job Card
                                                                 </button>
                                                             )}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredQuotes.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-10 text-slate-400 font-bold italic">No quotations registered.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* UAE style PDF Print Preview Overlay */}
            {previewQuote && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="relative bg-white rounded-2xl shadow-2xl z-10 w-full max-w-3xl overflow-hidden flex flex-col" style={{ maxHeight: '85vh' }}>
                        <div className="flex justify-between items-center p-4 border-b bg-slate-50 text-slate-800">
                            <h3 className="font-black text-sm">Official UAE Quotation Layout</h3>
                            <div className="flex gap-2">
                                <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition">
                                    <FaPrint /> Print Quote
                                </button>
                                <button onClick={() => setPreviewQuote(null)} className="p-1.5 text-slate-400 hover:text-slate-650"><FaTimes /></button>
                            </div>
                        </div>

                        <div className="p-8 overflow-y-auto bg-white text-slate-800 flex-1 font-medium" id="printable-document">
                            {/* Company Logo Header */}
                            <div className="flex justify-between items-start pb-6 border-b border-slate-200">
                                <div>
                                    <h3 className="text-sm font-black text-slate-800 tracking-wider">TEAM ENVIRO CLEANING SERVICES LLC</h3>
                                    <div className="text-[9px] text-slate-400 mt-1">TRN: {settings?.trn || '100349827400003'} • Dubai, UAE</div>
                                    <div className="text-[9px] text-slate-400">{settings?.address || 'Business Bay, Dubai'}</div>
                                </div>
                                <div className="text-right">
                                    <h2 className="text-xl font-black text-blue-600 tracking-tight">QUOTATION</h2>
                                    <div className="text-xs font-bold text-slate-800 mt-1">Ref: {previewQuote.refNumber}</div>
                                    <div className="text-[10px] text-slate-450 mt-0.5">Date: {previewQuote.createdDate}</div>
                                    <div className="text-[10px] text-slate-450 mt-0.5">Valid Until: {previewQuote.validUntil || 'N/A'}</div>
                                    <div className="text-[9px] text-slate-400 mt-0.5 italic">Salesperson: {previewQuote.salesperson || 'Admin'}</div>
                                </div>
                            </div>

                            {/* Client & Billing Info */}
                            <div className="grid grid-cols-2 gap-6 my-6 text-xs">
                                <div>
                                    <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block mb-1">CLIENT BILLING DETAILS</span>
                                    <div className="font-extrabold text-slate-800 text-sm">{previewQuote.clientName}</div>
                                    <div className="text-slate-600 mt-0.5">Email: {previewQuote.email}</div>
                                    {previewQuote.phone && <div className="text-slate-605">Phone: {previewQuote.phone}</div>}
                                    {previewQuote.contactPerson && <div className="text-slate-605">Attn: {previewQuote.contactPerson}</div>}
                                    {previewQuote.trn && <div className="text-slate-700 font-bold mt-0.5">TRN: {previewQuote.trn}</div>}
                                </div>
                                <div>
                                    <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block mb-1">SITE SERVICE ADDRESS</span>
                                    <div className="text-slate-650 leading-relaxed font-semibold">{previewQuote.address || 'Dubai, UAE'}</div>
                                </div>
                            </div>

                            {/* Line Items Table */}
                            <table className="w-full text-left border-collapse text-xs my-6">
                                <thead>
                                    <tr className="bg-slate-100 border-y border-slate-200 text-slate-600 font-bold">
                                        <th className="py-2.5 px-3">Service & Cleaning Scope</th>
                                        <th className="py-2.5 px-3 text-right">Unit Rate</th>
                                        <th className="py-2.5 px-3 text-center">Qty</th>
                                        <th className="py-2.5 px-3 text-center">Discount</th>
                                        <th className="py-2.5 px-3 text-center">VAT %</th>
                                        <th className="py-2.5 px-3 text-right">Net Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-150">
                                    {previewQuote.lineItems ? (
                                        previewQuote.lineItems.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="py-3 px-3">
                                                    <div className="font-bold text-slate-800">{item.service}</div>
                                                    <div className="text-[10px] text-slate-550 mt-0.5">{item.description}</div>
                                                </td>
                                                <td className="py-3 px-3 text-right text-slate-650">AED {(item.unitPrice ?? item.rate ?? 0).toLocaleString()}</td>
                                                <td className="py-3 px-3 text-center text-slate-650">{item.qty}</td>
                                                <td className="py-3 px-3 text-center text-slate-650">{item.discount || 0} {item.discountType === 'Percent' ? '%' : 'AED'}</td>
                                                <td className="py-3 px-3 text-center text-slate-650">{item.vatPercent}%</td>
                                                <td className="py-3 px-3 text-right font-bold text-slate-800">AED {(item.total ?? (item.qty * (item.unitPrice ?? item.rate ?? 0)) ?? 0).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="py-3 px-3">
                                                <div className="font-bold text-slate-800">{previewQuote.serviceType}</div>
                                                <div className="text-[10px] text-slate-500 mt-0.5">Area Size: {previewQuote.areaSqFt?.toLocaleString()} SqFt</div>
                                            </td>
                                            <td className="py-3 px-3 text-right text-slate-650">AED {(previewQuote.value || 0).toLocaleString()}</td>
                                            <td className="py-3 px-3 text-center text-slate-650">1</td>
                                            <td className="py-3 px-3 text-center text-slate-650">-</td>
                                            <td className="py-3 px-3 text-center text-slate-650">5%</td>
                                            <td className="py-3 px-3 text-right font-bold text-slate-800">AED {(previewQuote.value || 0).toLocaleString()}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Attachments Section if exists */}
                            {previewQuote.attachments && previewQuote.attachments.length > 0 && (
                                <div className="space-y-1.5 my-3.5 bg-slate-50 p-3.5 border border-slate-150 rounded-xl">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">SUPPORTING SITE DOCUMENTATION</span>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {previewQuote.attachments.map((file, idx) => (
                                            <div key={idx} className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1 rounded-lg text-[9px] text-slate-600 font-bold shadow-sm">
                                                <FaPaperclip className="text-slate-400 text-[8px]" /> {file}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Calculation Totals */}
                            <div className="flex justify-end my-6 text-xs">
                                <div className="w-72 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                                    <div className="flex justify-between font-bold text-slate-500">
                                        <span>Subtotal (Net):</span>
                                        <span>AED {previewQuote.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-slate-500">
                                        <span>VAT Amount (5%):</span>
                                        <span>AED {previewQuote.vatAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-black text-emerald-600 border-t border-slate-200 pt-2">
                                        <span>Grand Total:</span>
                                        <span>AED {previewQuote.grandTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Approval Audit Trail */}
                            {previewQuote.approvalNotes && (
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-600 my-4">
                                    <strong className="text-slate-700 block">Approval/Rejection remarks:</strong>
                                    <div className="italic mt-0.5">"{previewQuote.approvalNotes}"</div>
                                </div>
                            )}

                            {/* Terms & Signatures */}
                            <div className="grid grid-cols-2 gap-10 mt-10 pt-6 border-t border-slate-100 text-[10px] text-slate-500">
                                <div className="space-y-1.5 whitespace-pre-line">
                                    <div className="font-bold text-slate-800">TERMS & CONDITIONS:</div>
                                    {previewQuote.terms || termsText}
                                </div>
                                <div className="flex flex-col justify-end items-end">
                                    <div className="border-t border-slate-300 w-48 text-center pt-1 font-bold text-slate-700">AUTHORIZED SIGNATORY</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Approval / Rejection Modal (Missing Item 11) */}
            {notesModal.isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-xs text-slate-700">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-800">Transition Estimate Status to {notesModal.nextStatus}</h3>
                            <button onClick={() => setNotesModal({ isOpen: false, quoteId: null, nextStatus: '' })} className="text-slate-400 hover:text-slate-650 font-bold">✕</button>
                        </div>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Approval / Rejection Remarks *</label>
                                <textarea 
                                    rows="4" 
                                    value={approvalNotesText} 
                                    onChange={e => setApprovalNotesText(e.target.value)} 
                                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none"
                                    placeholder="Enter reasons, budget caps, or custom feedback from the client..."
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setNotesModal({ isOpen: false, quoteId: null, nextStatus: '' })} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-55 font-bold">Cancel</button>
                                <button 
                                    onClick={handleStatusTransition}
                                    className={`px-4 py-2 text-white font-bold rounded-xl transition ${
                                        notesModal.nextStatus === 'Approved' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                                    }`}
                                >
                                    Confirm {notesModal.nextStatus}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Inline Add Customer Modal (Missing Item 9) */}
            {isNewClientOpen && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4 text-xs text-slate-700">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-800">Add Customer On-The-Fly</h3>
                            <button onClick={() => setIsNewClientOpen(false)} className="text-slate-400 hover:text-slate-650 font-bold">✕</button>
                        </div>
                        <form onSubmit={handleCreateClientInline} className="space-y-3">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Customer Company Name *</label>
                                <input required type="text" value={newClientForm.name} onChange={e => setNewClientForm({...newClientForm, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Majid Al Futtaim" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Contact Person *</label>
                                    <input required type="text" value={newClientForm.contactPerson} onChange={e => setNewClientForm({...newClientForm, contactPerson: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">TRN (VAT Tax No)</label>
                                    <input type="text" value={newClientForm.trn} onChange={e => setNewClientForm({...newClientForm, trn: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="15 Digit TRN" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Phone Mobile *</label>
                                    <input required type="text" value={newClientForm.phone} onChange={e => setNewClientForm({...newClientForm, phone: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="+971 50..." />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Email Address *</label>
                                    <input required type="email" value={newClientForm.email} onChange={e => setNewClientForm({...newClientForm, email: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="att@client.com" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Site/Billing Address</label>
                                <textarea rows="2" value={newClientForm.address} onChange={e => setNewClientForm({...newClientForm, address: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none" placeholder="Service Site Location..." />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsNewClientOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Add & Select</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuotationsPage;
