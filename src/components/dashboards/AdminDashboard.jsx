import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import {
    FaUsers, FaFileSignature, FaCheckCircle, FaFileContract,
    FaArrowRight, FaClipboardList, FaUserFriends,
    FaCalendarAlt, FaFileInvoiceDollar, FaMoneyBillWave, FaClock,
    FaTools, FaMapMarkerAlt, FaSyncAlt
} from 'react-icons/fa';

const AdminDashboard = () => {
    const { clients, leads, quotations, contracts, workOrders, invoices, payments, userRole } = useContext(AppContext);
    const navigate = useNavigate();

    // CRM / Operations Calculations
    const totalLeads = leads.length;
    const activeContracts = contracts.filter(c => c.status === 'Active').length;
    const pendingInvoices = invoices.filter(i => ['Sent', 'Overdue'].includes(i.status)).length;
    const totalRevenue = payments.reduce((acc, pay) => acc + pay.amountPaid, 0);

    const statusColors = {
        Draft: 'bg-slate-500/10 text-slate-350 border-slate-500/20',
        Sent: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        Viewed: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        Approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        Rejected: 'bg-rose-500/10 text-rose-450 border-rose-500/20',
        Expired: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        Paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        Overdue: 'bg-rose-500/10 text-rose-450 border-rose-500/20',
        'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    };

    const getDashboardHeader = () => {
        return (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-base sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaClipboardList className="text-blue-500 shrink-0" />
                        <span>{userRole === 'admin' ? 'Central Operations Dashboard' : 'Service Management Hub'}</span>
                    </h1>
                    <p className="hidden sm:block text-slate-400 text-xs mt-1">Track cleaning service execution, client pipelines, and contract cycles.</p>
                </div>
                {userRole === 'admin' && (
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate('/crm/leads')} className="flex-1 sm:flex-initial px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 font-bold rounded-xl active:scale-[0.98] transition-all text-[10px] sm:text-xs">
                            + Add Lead
                        </button>
                        <button onClick={() => navigate('/crm/quotations')} className="flex-1 sm:flex-initial px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl active:scale-[0.98] transition-all text-[10px] sm:text-xs shadow-md shadow-blue-600/10">
                            + Create Quotation
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            {getDashboardHeader()}

            {/* ═══════════ SERVICE DELIVERY LIFECYCLE ═══════════ */}
            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 shadow-sm space-y-4">
                <div>
                    <h3 className="text-sm font-black text-white tracking-tight">Standard Operational Flow</h3>
                    <p className="text-[11px] text-slate-400">The lifecycle of every cleaning contract. Click any step to manage the respective module.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    {[
                        { label: '1. Lead Capture', value: `${totalLeads}`, path: '/crm/leads', color: '#60A5FA', desc: 'Inquiries logged' },
                        { label: '2. Quotation', value: `${quotations.length}`, path: '/crm/quotations', color: '#22D3EE', desc: 'Drafts & VAT' },
                        { label: '3. Approval', value: `${quotations.filter(q => q.status === 'Approved').length}`, path: '/crm/quotations', color: '#34D399', desc: 'Signed quotes' },
                        { label: '4. Active AMC', value: `${activeContracts}`, path: '/crm/contracts', color: '#C084FC', desc: 'Running contracts' },
                        { label: '5. Scheduling', value: `${workOrders.filter(w => w.status === 'Pending').length}`, path: '/crm/scheduling', color: '#FBBF24', desc: 'Visits lined up' },
                        { label: '6. Dispatch', value: `${workOrders.filter(w => w.status === 'In Progress').length}`, path: '/crm/work-orders', color: '#38BDF8', desc: 'Crew in field' },
                        { label: '7. VAT Invoice', value: `${pendingInvoices}`, path: '/crm/invoices', color: '#FB7185', desc: 'Unpaid invoices' },
                        { label: '8. Payment', value: `AED ${totalRevenue.toLocaleString()}`, path: '/crm/payments', color: '#2DD4BF', desc: 'Collected so far' },
                    ].map((step, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => navigate(step.path)}
                            className="bg-[#1E293B] border border-white/5 rounded-2xl p-5 text-center cursor-pointer transition-all hover:bg-[#25334b] hover:-translate-y-1 shadow-sm group"
                        >
                            <div 
                                className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-90 group-hover:opacity-100 transition-opacity"
                                style={{ color: step.color }}
                            >
                                {step.label}
                            </div>
                            <div className="text-2xl font-black text-slate-800">{step.value}</div>
                            <div className="text-[11px] font-medium text-slate-400 mt-1.5">{step.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Secondary Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column: Work Order Dispatch Board */}
                <div className="lg:col-span-8 bg-slate-900/60 border border-white/5 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-black text-white tracking-tight">Active Field Dispatch Queue</h3>
                            <p className="text-[11px] text-slate-400">Real-time status of schedules dispatched to cleaning teams.</p>
                        </div>
                        <button onClick={() => navigate('/crm/work-orders')} className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
                            Dispatch Board <FaArrowRight className="text-[10px]" />
                        </button>
                    </div>

                    <div className="divide-y divide-white/5">
                        {workOrders.map((wo) => (
                            <div key={wo.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-extrabold text-blue-400">{wo.id}</span>
                                        <span className="text-slate-600 font-bold">•</span>
                                        <span className="font-black text-slate-800">{wo.customerName}</span>
                                    </div>
                                    <div className="text-slate-300 flex items-center gap-1.5">
                                        <FaMapMarkerAlt className="text-blue-400 text-[10px]" />
                                        <span>{wo.address}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold mt-1">
                                        <span className="flex items-center gap-1 text-slate-300"><FaClock className="text-slate-400" /> {wo.timeSlot}</span>
                                        <span className="flex items-center gap-1 text-slate-300"><FaTools className="text-slate-400" /> Crew: {wo.assignedTechnician || 'Unassigned'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black border ${statusColors[wo.status]}`}>
                                        {wo.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: AMC Renewal Alerts & Latest Collection Logs */}
                <div className="lg:col-span-4 space-y-6">
                    {/* AMC Expiry Reminders */}
                    <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                                    <FaSyncAlt className="text-amber-500 text-xs" />
                                    <span>AMC Renewal Actions</span>
                                </h3>
                                <p className="text-[11px] text-slate-400">Contracts requiring immediate sales follow-up.</p>
                            </div>
                            <button onClick={() => navigate('/crm/contracts')} className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                AMC Desk <FaArrowRight className="text-[10px]" />
                            </button>
                        </div>
                        
                        <div className="space-y-3">
                            {contracts.map(contract => (
                                <div key={contract.id} className="p-3 bg-[#1E293B]/50 border border-white/5 rounded-xl space-y-1.5 text-xs">
                                    <div className="flex justify-between items-start">
                                        <span className="font-black text-slate-800 truncate max-w-[150px]">{contract.clientName}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black border ${statusColors[contract.status]}`}>
                                            {contract.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-slate-300 font-bold">
                                        <span>Ends: {contract.endDate}</span>
                                        <span className="text-blue-400 font-black">AED {contract.value.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Payments received */}
                    {['admin', 'accounts'].includes(userRole) && (
                        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-black text-white tracking-tight">Collection Logs</h3>
                                    <p className="text-[11px] text-slate-400">Last received invoice payments.</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                {payments.slice(0, 3).map(pay => (
                                    <div key={pay.id} className="flex justify-between items-center text-xs p-3 bg-[#1E293B]/50 border border-white/5 rounded-xl">
                                        <div>
                                            <div className="font-bold text-slate-800 truncate max-w-[140px]">{pay.customerName}</div>
                                            <div className="text-[9px] text-slate-300 font-bold mt-0.5">{pay.paymentMethod} • Ref {pay.referenceNo}</div>
                                        </div>
                                        <span className="font-black text-emerald-400 shrink-0">AED {pay.amountPaid.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
