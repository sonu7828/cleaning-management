import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaTruck, FaCheck, FaMapMarkerAlt, FaFileInvoiceDollar, FaRegEnvelope } from 'react-icons/fa';

const DriversPage = () => {
    const { expenses, approveExpense } = useContext(AppContext);

    // List of static drivers
    const drivers = [
        { name: 'Dave Driver', email: 'dave.driver@cleancrm.com', phone: '+1 (555) 441-2090', route: 'Bay 4, Logistics Center', status: 'In Transit' },
        { name: 'Carl Carter', email: 'carl.c@cleancrm.com', phone: '+1 (555) 129-4322', route: 'Bay 1, East Depot', status: 'Idle' },
    ];

    const pendingExpenses = expenses.filter(e => e.status === 'Pending');

    const handleApprove = (id) => {
        approveExpense(id);
        alert('Petty cash expense successfully approved and added to accounting ledgers!');
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaTruck className="text-emerald-500" />
                    Drivers & Logistics
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Manage delivery logistics fleet operations, active transits, and petty cash logs.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Fleet Directory Card */}
                <div className="lg:col-span-6 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-4">
                    <h3 className="text-sm font-bold text-slate-300">Fleet Drivers Directory</h3>
                    <div className="divide-y divide-[#1E293B]/20">
                        {drivers.map(driver => (
                            <div key={driver.email} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-black text-sm">
                                        {driver.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{driver.name}</h4>
                                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                            <FaRegEnvelope className="text-[8px]" /> {driver.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right sm:text-right">
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                        driver.status === 'In Transit' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                        'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                    }`}>
                                        {driver.status}
                                    </span>
                                    <p className="text-[10px] text-slate-500 mt-1 font-semibold flex items-center gap-1">
                                        <FaMapMarkerAlt className="text-[8px]" /> {driver.route}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Approvals Queue Card */}
                <div className="lg:col-span-6 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-4">
                    <h3 className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                        <FaFileInvoiceDollar className="text-blue-500 text-xs" /> Petty Cash Approvals ({pendingExpenses.length})
                    </h3>
                    
                    <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                        {pendingExpenses.length === 0 ? (
                            <div className="text-center py-12 text-slate-500 text-xs font-semibold">No pending reimbursement requests in queue.</div>
                        ) : (
                            pendingExpenses.map(exp => (
                                <div key={exp.id} className="p-3.5 bg-[#0B1120]/60 border border-[#1E293B]/20 rounded-xl flex justify-between items-center gap-4">
                                    <div>
                                        <div className="font-bold text-slate-200 text-xs">{exp.driverName} - <span className="text-slate-400">{exp.category}</span></div>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Date: {exp.date} | Notes: {exp.notes || 'None'}</p>
                                        <div className="text-xs font-black text-emerald-400 mt-1.5">${exp.amount?.toFixed(2)}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleApprove(exp.id)}
                                            className="w-8 h-8 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-400 flex items-center justify-center transition"
                                            title="Approve Voucher"
                                        >
                                            <FaCheck className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriversPage;
