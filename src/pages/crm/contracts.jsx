import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
    FaBuilding, FaFilePdf, FaRedo, FaReceipt, FaPrint, 
    FaCheckCircle, FaCalendarPlus, FaTimes, FaMapMarkerAlt, FaFileContract,
    FaBoxOpen, FaUserCog, FaCalendarCheck, FaExclamationTriangle, FaHourglassHalf,
    FaPlusCircle, FaTrash, FaCheck
} from 'react-icons/fa';

const ContractsPage = () => {
    const { 
        contracts, renewContract, addContract, updateContract, deleteContract, addInvoice, 
        generateWorkOrdersFromContract, quotations, complaints, workOrders,
        addEquipmentToContract, createRenewalQuote, clients, settings 
    } = useContext(AppContext);
    
    const [selectedContractId, setSelectedContractId] = useState(null);
    const [showPdf, setShowPdf] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Custom Confirm Modals
    const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, contractId: null, contractTitle: '' });
    const [renewConfirm, setRenewConfirm] = useState({ isOpen: false, contractId: null, contractTitle: '' });

    // Inline Equipment Modal/Form state
    const [isEqOpen, setIsEqOpen] = useState(false);
    const [eqForm, setEqForm] = useState({
        name: '', modelNumber: '', serialNumber: '', quantity: '1', installDate: '', warrantyExpiry: '', siteLocation: '', status: 'Active'
    });

    // Form fields for new contract
    const [contractForm, setContractForm] = useState({
        clientName: '',
        title: '',
        value: '',
        contractType: 'Comprehensive',
        billingCycle: 'Monthly',
        startDate: '',
        endDate: '',
        visitFrequency: 'Monthly',
        totalVisits: '12',
        paymentTerms: 'COD',
        assignedManager: 'Supervisor Ali',
        scope: '',
        quotationRef: ''
    });

    const activeContract = contracts.find(c => c.id === selectedContractId);

    const handleCreateContract = (e) => {
        e.preventDefault();
        const formattedData = {
            ...contractForm,
            value: Number(contractForm.value) || 0,
            totalVisits: Number(contractForm.totalVisits) || 12,
            visitsCompleted: 0,
            equipmentAssets: [],
            status: 'Active'
        };
        addContract(formattedData);
        setIsAddOpen(false);
        setContractForm({
            clientName: '', title: '', value: '', contractType: 'Comprehensive', billingCycle: 'Monthly',
            startDate: '', endDate: '', visitFrequency: 'Monthly', totalVisits: '12', paymentTerms: 'COD',
            assignedManager: 'Supervisor Ali', scope: '', quotationRef: ''
        });
    };

    const handleRenew = (id) => {
        if (window.confirm('Renew this contract for another 12 months and trigger renewal invoicing?')) {
            renewContract(id, 1, true);
        }
    };

    const handleCreateInvoice = (contract) => {
        const monthlyValue = Math.round(contract.value / 12);
        addInvoice({
            clientId: contract.id,
            customerName: contract.clientName,
            amount: monthlyValue,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0]
        });
        alert('Installment Invoice Generated successfully!');
    };

    const handleAutoGenerateJobs = (contract) => {
        generateWorkOrdersFromContract(contract.id);
    };

    const handleAddEquipmentSubmit = (e) => {
        e.preventDefault();
        if (activeContract) {
            addEquipmentToContract(activeContract.id, {
                ...eqForm,
                quantity: Number(eqForm.quantity) || 1
            });
            setIsEqOpen(false);
            setEqForm({
                name: '', modelNumber: '', serialNumber: '', quantity: '1', installDate: '', warrantyExpiry: '', siteLocation: '', status: 'Active'
            });
        }
    };

    const handleCreateRenewalQuoteAction = (ctrId) => {
        createRenewalQuote(ctrId);
    };

    // Calculate Dashboard metrics (Missing Item 12)
    const activeAMCs = contracts.filter(c => c.status === 'Active').length;
    const expiringAMCs = contracts.filter(c => {
        if (c.status !== 'Active') return false;
        const diff = new Date(c.endDate) - new Date();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days <= 30 && days > 0;
    }).length;
    
    const serviceDueToday = workOrders.filter(w => {
        const today = new Date().toISOString().split('T')[0];
        return w.date === today;
    }).length;

    const openComplaints = complaints.filter(comp => comp.status === 'Open' || comp.status === 'In Progress').length;
    const ytdAMCRevenue = contracts.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.value, 0);

    const statusColors = {
        Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        Pending: 'bg-amber-50 text-amber-700 border-amber-100',
        Expired: 'bg-rose-50 text-rose-700 border-rose-100'
    };

    // Helper to render contract details
    const renderContractDetails = (ctr) => {
        const linkedQuote = quotations.find(q => q.refNumber === ctr.quotationRef);
        const relatedJobs = workOrders.filter(w => w.customerName === ctr.clientName);
        const completedJobs = relatedJobs.filter(w => w.status === 'Completed').length;
        const totalScheduledJobs = relatedJobs.length;

        // Expiry calculation
        const diff = new Date(ctr.endDate) - new Date();
        const daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const isExpiringSoon = daysRemaining <= 30 && daysRemaining > 0;

        return (
            <div className="space-y-5 text-xs text-slate-800 flex-1 flex flex-col overflow-y-auto pr-1">
                {/* Title & Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-slate-150">
                    <div>
                        <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">Annual SLA Agreement</span>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                                ctr.contractType === 'Comprehensive' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}>
                                {ctr.contractType || 'Comprehensive'} Type
                            </span>
                            {isExpiringSoon && (
                                <span className="text-[9px] font-black uppercase tracking-wider bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.5 rounded animate-pulse">
                                    Expires in {daysRemaining} Days
                                </span>
                            )}
                        </div>
                        <h2 className="text-base font-black text-slate-800 mt-2">{ctr.title}</h2>
                        <p className="text-[10px] text-slate-500 mt-0.5">Agreement ID: <span className="font-mono font-bold text-slate-700">{ctr.id}</span></p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap shrink-0">
                        <button
                            onClick={() => setShowPdf(true)}
                            className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl font-bold transition flex items-center gap-1.5"
                        >
                            <FaPrint /> Print Layout
                        </button>
                        <button
                            onClick={() => handleCreateRenewalQuoteAction(ctr.id)}
                            className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 rounded-xl font-bold transition flex items-center gap-1.5"
                        >
                            <FaReceipt /> Create Renewal Quote
                        </button>
                        <button
                            onClick={() => setRenewConfirm({ isOpen: true, contractId: ctr.id, contractTitle: ctr.title })}
                            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 rounded-xl font-bold transition flex items-center gap-1.5"
                        >
                            <FaRedo className="text-[10px]" /> Renew & Invoice
                        </button>
                        <button
                            onClick={() => setDeleteConfirm({ isOpen: true, contractId: ctr.id, contractTitle: ctr.title })}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl font-bold transition flex items-center gap-1.5"
                            title="Delete AMC Contract"
                        >
                            <FaTrash className="text-[10px]" /> Delete
                        </button>
                    </div>
                </div>

                {/* Contract Range & Usage Metrics Progress (Missing Item 25) */}
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-2.5">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                        <span>AMC SERVICE COMPLIANCE PROGRESS</span>
                        <span className="text-slate-800 font-extrabold">{completedJobs} / {ctr.totalVisits || 12} Visited</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, (completedJobs / (ctr.totalVisits || 12)) * 100)}%` }}
                        />
                    </div>
                </div>

                {/* Info Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                        <h4 className="font-black text-slate-850 flex items-center gap-1.5">Client & Reference Details</h4>
                        <div className="space-y-1.5 text-slate-600">
                            <div className="flex justify-between"><span>Customer Name:</span> <strong className="text-slate-800">{ctr.clientName}</strong></div>
                            {ctr.trn && <div className="flex justify-between"><span>TRN Tax ID:</span> <strong className="text-slate-800 font-mono">{ctr.trn}</strong></div>}
                            <div className="flex justify-between"><span>Service Address:</span> <strong className="text-slate-800 text-right">{ctr.address || 'Dubai, UAE'}</strong></div>
                            {ctr.quotationRef && <div className="flex justify-between"><span>Quotation Ref:</span> <strong className="text-blue-600 font-mono">{ctr.quotationRef}</strong></div>}
                        </div>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                        <h4 className="font-black text-slate-850 flex items-center gap-1.5">Contract Settings</h4>
                        <div className="space-y-1.5 text-slate-600">
                            <div className="flex justify-between"><span>Annual Value:</span> <strong className="text-slate-800">AED {ctr.value.toLocaleString()}</strong></div>
                            <div className="flex justify-between"><span>Service Frequency:</span> <strong className="text-slate-800">{ctr.visitFrequency}</strong></div>
                            <div className="flex justify-between"><span>Payment Terms:</span> <strong className="text-slate-800">{ctr.paymentTerms || 'COD'}</strong></div>
                            <div className="flex justify-between"><span>Assigned Manager:</span> <strong className="text-slate-800">{ctr.assignedManager || 'Supervisor Ali'}</strong></div>
                            <div className="flex justify-between"><span>Contract Period:</span> <strong className="text-slate-805">{ctr.startDate} to {ctr.endDate}</strong></div>
                        </div>
                    </div>
                </div>

                {/* Equipment / Asset Details Table (Missing Item AMC Equipment Tracking) */}
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="flex justify-between items-center">
                        <h4 className="font-black text-slate-850 flex items-center gap-1.5">
                            <FaBoxOpen className="text-indigo-500" /> Equipment & Site Assets Covered ({(ctr.equipmentAssets || []).length})
                        </h4>
                        <button 
                            onClick={() => setIsEqOpen(true)}
                            className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[9px] flex items-center gap-1"
                        >
                            <FaPlusCircle /> Add Equipment
                        </button>
                    </div>

                    {(!ctr.equipmentAssets || ctr.equipmentAssets.length === 0) ? (
                        <div className="text-[10px] text-slate-400 italic bg-white p-3 border border-slate-150 rounded-xl text-center">
                            No machinery or site assets covered under this AMC contract yet. Click "Add Equipment" to link assets.
                        </div>
                    ) : (
                        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                            <table className="w-full text-left text-[10px] border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                                        <th className="py-2 px-2.5">Asset Name</th>
                                        <th className="py-2 px-2.5">Model / Serial</th>
                                        <th className="py-2 px-2.5">Location</th>
                                        <th className="py-2 px-2.5 text-center">Qty</th>
                                        <th className="py-2 px-2.5">Warranty Expiry</th>
                                        <th className="py-2 px-2.5">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-150 font-medium text-slate-700">
                                    {ctr.equipmentAssets.map(eq => (
                                        <tr key={eq.id} className="hover:bg-slate-50">
                                            <td className="py-2 px-2.5 font-bold text-slate-800">{eq.name}</td>
                                            <td className="py-2 px-2.5 font-mono">{eq.modelNumber || 'N/A'} <div className="text-[8px] text-slate-400">S/N: {eq.serialNumber || 'N/A'}</div></td>
                                            <td className="py-2 px-2.5">{eq.siteLocation || 'General site'}</td>
                                            <td className="py-2 px-2.5 text-center font-bold text-slate-800">{eq.quantity}</td>
                                            <td className="py-2 px-2.5 text-slate-500">{eq.warrantyExpiry || 'No Warranty'}</td>
                                            <td className="py-2 px-2.5">
                                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                                    eq.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                                }`}>{eq.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Job Auto Scheduling dispatch trigger */}
                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <h4 className="font-black text-slate-850 flex items-center gap-1.5"><FaCalendarPlus className="text-blue-600" /> Automated Job Dispatch</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Auto-schedule cleaning technicians, Van routes, and drivers based on AMC SLA terms.</p>
                    </div>
                    <button
                        onClick={() => handleAutoGenerateJobs(ctr)}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-600/10 shrink-0"
                    >
                        Auto-Schedule Visits
                    </button>
                </div>

                {/* Periodic recurring billing issuance */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <h4 className="font-black text-slate-855 flex items-center gap-1.5"><FaReceipt className="text-emerald-600" /> Generate Recurring Invoice</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Create billing invoice for this month's installment: AED {Math.round(ctr.value / 12).toLocaleString()}/month</p>
                    </div>
                    <button
                        onClick={() => handleCreateInvoice(ctr)}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-600/10 shrink-0"
                    >
                        Issue Installment Invoice
                    </button>
                </div>

                {/* Agreement Life Timeline */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="font-black text-slate-850">Agreement Operational Logs</h4>
                    <div className="relative pl-5 border-l border-slate-200 space-y-3 text-[11px] text-slate-500 font-bold">
                        <div className="relative">
                            <div className="absolute -left-[25px] top-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></div>
                            <div className="text-slate-800">SLA Contract Registered</div>
                            <p className="text-[9px] text-slate-400 mt-0.5">Approved on {ctr.startDate} with {ctr.visitFrequency} frequency parameters.</p>
                        </div>
                        {totalScheduledJobs > 0 && (
                            <div className="relative">
                                <div className="absolute -left-[25px] top-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
                                <div className="text-slate-800">Scheduled visits generated</div>
                                <p className="text-[9px] text-slate-400 mt-0.5">{totalScheduledJobs} work order tickets active in operations database.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaFileContract className="text-blue-600" />
                        AMC Service Contracts
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Manage Annual Maintenance Contracts (AMC), roster scheduling, and recurring billing terms.</p>
                </div>
                <button 
                    onClick={() => setIsAddOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl active:scale-[0.98] transition text-xs shadow-lg shadow-blue-600/10"
                >
                    <FaPlusCircle className="text-[10px]" /> Create Contract Manually
                </button>
            </div>

            {/* AMC Dashboard Metric Cards (Missing Item 12) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active AMCs</div>
                    <div className="text-lg font-black text-emerald-600 mt-1">{activeAMCs}</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-rose-500">Expiring (30 Days)</div>
                    <div className="text-lg font-black text-rose-600 mt-1">{expiringAMCs}</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-blue-500">Service Due Today</div>
                    <div className="text-lg font-black text-blue-600 mt-1">{serviceDueToday}</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-orange-500">Open Complaints</div>
                    <div className="text-lg font-black text-orange-605 mt-1">{openComplaints}</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-indigo-500 font-black">YTD AMC Value</div>
                    <div className="text-lg font-black text-indigo-600 mt-1">AED {ytdAMCRevenue.toLocaleString()}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Contracts List Sidebar */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Active AMC Contracts</h3>
                    <div className="space-y-2.5 lg:max-h-[600px] lg:overflow-y-auto pr-1">
                        {contracts.map(ctr => {
                            const isSelected = selectedContractId === ctr.id;
                            // Expiry alerts warning check
                            const diff = new Date(ctr.endDate) - new Date();
                            const daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
                            const warningBorder = daysRemaining <= 30 && daysRemaining > 0;
                            return (
                                <div key={ctr.id} className="space-y-2">
                                    <div
                                        onClick={() => {
                                            if (isSelected) {
                                                setSelectedContractId(null);
                                            } else {
                                                setSelectedContractId(ctr.id);
                                            }
                                        }}
                                        className={`p-3.5 rounded-xl border cursor-pointer transition text-xs ${
                                            isSelected
                                                ? 'border-blue-500 bg-blue-50/20 ring-2 ring-blue-500/10'
                                                : warningBorder 
                                                ? 'border-rose-350 bg-rose-50/20 hover:bg-rose-50/30'
                                                : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <h4 className="font-extrabold text-slate-800">{ctr.clientName}</h4>
                                                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{ctr.title}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${statusColors[ctr.status]}`}>
                                                {ctr.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-200 text-[10px] text-slate-500 font-bold">
                                            <span>Value: <strong className="text-slate-800">AED {ctr.value.toLocaleString()}</strong></span>
                                            <span>Freq: <strong className="text-slate-800">{ctr.visitFrequency}</strong></span>
                                        </div>
                                        {warningBorder && (
                                            <div className="mt-2 text-[8px] bg-rose-100 border border-rose-200 text-rose-700 font-black rounded px-1.5 py-0.5 text-center">
                                                RENEWAL DUE: EXPIRES IN {daysRemaining} DAYS
                                            </div>
                                        )}
                                    </div>

                                    {/* Mobile Inline Details: Expand directly below card */}
                                    {isSelected && (
                                        <div className="block lg:hidden bg-white border border-slate-200 rounded-xl p-4 shadow-inner space-y-3">
                                            {renderContractDetails(ctr)}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contract Detailed Display Card */}
                <div className="hidden lg:flex lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex-col min-h-[400px]">
                    {activeContract ? (
                        renderContractDetails(activeContract)
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-400 text-center">
                            <FaFileContract className="text-4xl opacity-20 mb-2" />
                            <p className="text-xs font-bold px-8">Select an AMC contract from the left sidebar panel to manage SLA rosters, monthly invoices, linked machinery equipment covered, and client signatures.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Contract Modal (Manually) */}
            {isAddOpen && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-xl w-full my-8 space-y-4 text-xs text-slate-700">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-800">Draft AMC Contract</h3>
                            <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-650 font-bold">✕</button>
                        </div>
                        <form onSubmit={handleCreateContract} className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Customer *</label>
                                    <select 
                                        required 
                                        value={contractForm.clientName}
                                        onChange={e => setContractForm({...contractForm, clientName: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    >
                                        <option value="">Select Customer...</option>
                                        {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Contract Reference Title *</label>
                                    <input required type="text" value={contractForm.title} onChange={e => setContractForm({...contractForm, title: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Burj Khalifa Penthouse Roster" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Annual Value (AED) *</label>
                                    <input required type="number" value={contractForm.value} onChange={e => setContractForm({...contractForm, value: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. 24000" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Contract Type *</label>
                                    <select value={contractForm.contractType} onChange={e => setContractForm({...contractForm, contractType: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Comprehensive">Comprehensive</option>
                                        <option value="Non-Comprehensive">Non-Comprehensive</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Link Quotation (Ref No)</label>
                                    <select 
                                        value={contractForm.quotationRef}
                                        onChange={e => setContractForm({...contractForm, quotationRef: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    >
                                        <option value="">No Quotation Link</option>
                                        {quotations.filter(q => q.status === 'Approved').map(q => <option key={q.id} value={q.refNumber}>{q.refNumber} ({q.clientName})</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Start Date *</label>
                                    <input required type="date" value={contractForm.startDate} onChange={e => setContractForm({...contractForm, startDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">End Date *</label>
                                    <input required type="date" value={contractForm.endDate} onChange={e => setContractForm({...contractForm, endDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Service Freq</label>
                                    <select value={contractForm.visitFrequency} onChange={e => setContractForm({...contractForm, visitFrequency: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Weekly">Weekly</option>
                                        <option value="Bi-Weekly">Bi-Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Annual">Annual</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Total Visits *</label>
                                    <input required type="number" value={contractForm.totalVisits} onChange={e => setContractForm({...contractForm, totalVisits: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Billing Cycle</label>
                                    <select value={contractForm.billingCycle} onChange={e => setContractForm({...contractForm, billingCycle: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option value="Monthly">Monthly in Advance</option>
                                        <option value="Quarterly">Quarterly in Advance</option>
                                        <option value="One-Time">One-Time upfront</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Assigned Manager</label>
                                    <input type="text" value={contractForm.assignedManager} onChange={e => setContractForm({...contractForm, assignedManager: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Contract Scope / Service Instructions</label>
                                <textarea rows="3" value={contractForm.scope} onChange={e => setContractForm({...contractForm, scope: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none" placeholder="Detail AC, water tanks, cleaning checklists, tools needed..." />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-55 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Add Roster SLA</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Equipment Modal */}
            {isEqOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-xs text-slate-700">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-800">Add Machinery / Asset Covered</h3>
                            <button onClick={() => setIsEqOpen(false)} className="text-slate-400 hover:text-slate-650 font-bold">✕</button>
                        </div>
                        <form onSubmit={handleAddEquipmentSubmit} className="space-y-3">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Equipment Name *</label>
                                <input required type="text" value={eqForm.name} onChange={e => setEqForm({...eqForm, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Carrier Ducted AC Unit" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Model Number</label>
                                    <input type="text" value={eqForm.modelNumber} onChange={e => setEqForm({...eqForm, modelNumber: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="Model Ref" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Serial Number</label>
                                    <input type="text" value={eqForm.serialNumber} onChange={e => setEqForm({...eqForm, serialNumber: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="Serial Ref" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Quantity Covered *</label>
                                    <input required type="number" value={eqForm.quantity} onChange={e => setEqForm({...eqForm, quantity: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Site Location / Room</label>
                                    <input type="text" value={eqForm.siteLocation} onChange={e => setEqForm({...eqForm, siteLocation: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" placeholder="e.g. Master Bedroom Ceiling" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Warranty Expiry Date</label>
                                <input type="date" value={eqForm.warrantyExpiry} onChange={e => setEqForm({...eqForm, warrantyExpiry: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsEqOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-750">Link Machinery</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* UAE style PDF Print Preview Overlay */}
            {showPdf && activeContract && (
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print-modal-overlay" style={{ zIndex: 9999 }}>
                    <div className="relative bg-white rounded-2xl shadow-2xl z-10 w-full max-w-3xl overflow-hidden flex flex-col print-modal-content" style={{ maxHeight: '85vh' }}>
                        <div className="flex justify-between items-center p-4 border-b bg-slate-50 text-slate-800">
                            <h3 className="font-black text-sm">Official AMC Agreement Layout</h3>
                            <div className="flex gap-2">
                                <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition">
                                    <FaPrint /> Print SLA
                                </button>
                                <button onClick={() => setShowPdf(false)} className="p-1.5 text-slate-400 hover:text-slate-600"><FaTimes /></button>
                            </div>
                        </div>

                        <div className="p-8 overflow-y-auto bg-white text-slate-800 flex-1 text-xs" id="printable-document">
                            {/* Logo Header */}
                            <div className="flex justify-between items-start pb-5 border-b border-slate-200">
                                <div>
                                    <h3 className="text-sm font-black text-slate-850">TEAM ENVIRO CLEANING SERVICES LLC</h3>
                                    <div className="text-[9px] text-slate-400 mt-1">TRN: {settings?.trn || '100349827400003'} • Dubai, UAE</div>
                                    <div className="text-[9px] text-slate-400">{settings?.address || 'Dubai, UAE'}</div>
                                </div>
                                <div className="text-right">
                                    <h2 className="text-lg font-black text-blue-600 tracking-tight">ANNUAL MAINTENANCE CONTRACT (AMC)</h2>
                                    <div className="text-xs font-bold text-slate-800 mt-1">Agreement ID: {activeContract.id}</div>
                                    <div className="text-[9px] text-slate-450 mt-0.5">Start Date: {activeContract.startDate}</div>
                                    <div className="text-[9px] text-slate-450 mt-0.5">End Date: {activeContract.endDate}</div>
                                    <div className="text-[9px] text-slate-400 mt-0.5 italic">Assigned Manager: {activeContract.assignedManager || 'Supervisor Ali'}</div>
                                </div>
                            </div>

                            {/* Client & SLA Info */}
                            <div className="grid grid-cols-2 gap-6 my-6 text-xs">
                                <div>
                                    <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block mb-1">PARTNER DETAILS</span>
                                    <div className="font-extrabold text-slate-800 text-sm">{activeContract.clientName}</div>
                                    {activeContract.trn && <div className="text-slate-650 font-bold mt-0.5">TRN: {activeContract.trn}</div>}
                                    <div className="text-slate-650 mt-1 font-semibold">Address: {activeContract.address || 'Dubai, UAE'}</div>
                                </div>
                                <div>
                                    <span className="text-[9px] font-black text-slate-455 uppercase tracking-widest block mb-1">SLA SERVICE TERMS</span>
                                    <div className="space-y-1 text-slate-655 font-semibold">
                                        <div>Contract Type: {activeContract.contractType || 'Comprehensive'}</div>
                                        <div>Service Frequency: {activeContract.visitFrequency}</div>
                                        <div>Total Scheduled Visits: {activeContract.totalVisits || 12} Visits</div>
                                        {activeContract.quotationRef && <div>Quotation Ref: {activeContract.quotationRef}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Included Scope Description */}
                            <div className="my-6">
                                <h4 className="font-black text-slate-800 border-b border-slate-200 pb-1.5 mb-2">Scope of Operations</h4>
                                <div className="whitespace-pre-line text-slate-600 font-semibold leading-relaxed">
                                    {activeContract.scope || 'All facilities cleaning and recurring maintenance visits as detailed in linked quotation.'}
                                </div>
                            </div>

                            {/* Machinery Cover list */}
                            {activeContract.equipmentAssets && activeContract.equipmentAssets.length > 0 && (
                                <div className="my-6">
                                    <h4 className="font-black text-slate-800 border-b border-slate-200 pb-1.5 mb-2">Linked Machinery covered</h4>
                                    <table className="w-full text-left text-[10px] border-collapse">
                                        <thead>
                                            <tr className="bg-slate-100 border-y border-slate-200 text-slate-600 font-bold">
                                                <th className="py-2 px-2.5">Asset Name</th>
                                                <th className="py-2 px-2.5">Model / Serial</th>
                                                <th className="py-2 px-2.5">Location</th>
                                                <th className="py-2 px-2.5 text-center">Qty</th>
                                                <th className="py-2 px-2.5">Warranty</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-150">
                                            {activeContract.equipmentAssets.map(eq => (
                                                <tr key={eq.id}>
                                                    <td className="py-2 px-2.5 font-bold text-slate-850">{eq.name}</td>
                                                    <td className="py-2 px-2.5 font-mono">{eq.modelNumber} • S/N: {eq.serialNumber}</td>
                                                    <td className="py-2 px-2.5">{eq.siteLocation}</td>
                                                    <td className="py-2 px-2.5 text-center">{eq.quantity}</td>
                                                    <td className="py-2 px-2.5">{eq.warrantyExpiry || 'N/A'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Annual Value Summary */}
                            <div className="flex justify-end my-6">
                                <div className="w-80 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                                    <div className="flex justify-between font-bold text-slate-550">
                                        <span>Annual Value (AED):</span>
                                        <span>AED {activeContract.value.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-slate-550">
                                        <span>Estimated Monthly installment:</span>
                                        <span>AED {Math.round(activeContract.value / 12).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-black text-emerald-600 border-t border-slate-250 pt-2">
                                        <span>Agreement Value (VAT Inclusive):</span>
                                        <span>AED {(activeContract.value * 1.05).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Compliance terms */}
                            <div className="grid grid-cols-2 gap-10 mt-10 pt-6 border-t border-slate-100 text-[10px] text-slate-500">
                                <div className="space-y-1">
                                    <div className="font-bold text-slate-800">SLA COMPLIANCE TERMS:</div>
                                    <div>1. Scheduled rosters require 48 hours notice for any customer reschedule.</div>
                                    <div>2. Billing invoices issued monthly; payable net-15.</div>
                                </div>
                                <div className="flex justify-between items-end gap-5">
                                    <div className="border-t border-slate-300 w-28 text-center pt-1 font-bold text-slate-700">CLIENT SIGNATURE</div>
                                    <div className="border-t border-slate-300 w-28 text-center pt-1 font-bold text-slate-700">TEAM ENVIRO REP</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Premium Confirm Modal for Deletion */}
            {deleteConfirm.isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-card border border-gray-800 text-white rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-xs">
                        <div className="flex items-center gap-3 text-red-500">
                            <FaExclamationTriangle className="text-2xl shrink-0" />
                            <div>
                                <h3 className="text-sm font-black tracking-tight text-white">Delete AMC Contract</h3>
                                <p className="text-[10px] text-gray-400 mt-0.5">This action cannot be undone.</p>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed font-medium">
                            Are you sure you want to permanently delete the AMC Contract <span className="text-white font-bold">"{deleteConfirm.contractTitle}"</span>?
                        </p>
                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                            <button 
                                type="button" 
                                onClick={() => setDeleteConfirm({ isOpen: false, contractId: null, contractTitle: '' })} 
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    deleteContract(deleteConfirm.contractId);
                                    setSelectedContractId(null);
                                    setDeleteConfirm({ isOpen: false, contractId: null, contractTitle: '' });
                                }}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Premium Confirm Modal for Renewal */}
            {renewConfirm.isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-card border border-gray-800 text-white rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-xs">
                        <div className="flex items-center gap-3 text-green-500">
                            <FaCalendarCheck className="text-2xl shrink-0" />
                            <div>
                                <h3 className="text-sm font-black tracking-tight text-white">Renew AMC Contract</h3>
                                <p className="text-[10px] text-gray-400 mt-0.5">Extend agreement period</p>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed font-medium">
                            Would you like to renew <span className="text-white font-bold">"{renewConfirm.contractTitle}"</span> for another 12 months? This will automatically trigger a renewal invoice.
                        </p>
                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                            <button 
                                type="button" 
                                onClick={() => setRenewConfirm({ isOpen: false, contractId: null, contractTitle: '' })} 
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    renewContract(renewConfirm.contractId, 1, true);
                                    setRenewConfirm({ isOpen: false, contractId: null, contractTitle: '' });
                                }}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition"
                            >
                                Confirm Renewal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContractsPage;
