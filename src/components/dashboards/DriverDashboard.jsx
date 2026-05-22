import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
    FaTruck, FaPlus, FaRoute, FaReceipt, 
    FaMapMarkerAlt, FaCheckCircle, FaClock, FaEye 
} from 'react-icons/fa';

const DriverDashboard = () => {
    const { expenses, addExpense, jobs } = useContext(AppContext);
    
    // Roster of locations to visit (derived from scheduled daily jobs)
    const activeRoutes = jobs.filter(j => j.status === 'Scheduled' || j.status === 'In Progress');

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Fuel Reimbursement');
    const [notes, setNotes] = useState('');
    const [receipt, setReceipt] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const [viewReceipt, setViewReceipt] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount) return;

        addExpense({
            category,
            amount: Number(amount),
            notes,
            receipt: receipt || 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=300&auto=format&fit=crop&q=60'
        });

        setAmount('');
        setCategory('Fuel Reimbursement');
        setNotes('');
        setReceipt(null);
        setShowFormModal(false);
    };

    const simulateReceiptUpload = () => {
        setReceipt('https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=300&auto=format&fit=crop&q=60');
    };

    return (
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaTruck className="text-emerald-400" />
                        Logistics & Expenses Desk
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Submit driver travel logs, petty cash vouchers, and upload fuel vouchers.</p>
                </div>
                
                <button
                    onClick={() => setShowFormModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all text-sm"
                >
                    <FaPlus className="text-xs" />
                    Log Expense
                </button>
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Roster Routes */}
                <div className="lg:col-span-4 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-4 backdrop-blur-sm">
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                            <FaRoute className="text-slate-400" />
                            Dispatch Routes
                        </h3>
                        <p className="text-xs text-slate-400">Roster of client locations for team transport today.</p>
                    </div>

                    <div className="space-y-3">
                        {activeRoutes.length > 0 ? (
                            activeRoutes.map((route) => (
                                <div key={route.id} className="p-3 bg-white/5 rounded-xl border border-[#1E293B]/20 space-y-2 text-xs">
                                    <div className="flex justify-between items-center">
                                        <span className="font-extrabold text-white">{route.clientName}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                            route.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 animate-pulse' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                        }`}>{route.status}</span>
                                    </div>
                                    <div className="space-y-1 text-slate-300 font-semibold">
                                        <div className="flex items-center gap-1">
                                            <FaMapMarkerAlt className="text-slate-400 text-[10px]" />
                                            <span>Staff Transport Roster</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                            <FaClock className="text-slate-400 text-[10px]" />
                                            <span>Schedule Arrival: {route.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 text-xs text-slate-400 font-medium">No active logistics routes today.</div>
                        )}
                    </div>
                </div>

                {/* 2. Expenses Log Table */}
                <div className="lg:col-span-8 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-4 backdrop-blur-sm">
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                            <FaReceipt className="text-slate-400" />
                            Petty Cash History
                        </h3>
                        <p className="text-xs text-slate-400">Track and review logged expenses, mileage, and voucher status.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                    <th className="py-3 px-2">Expense Details</th>
                                    <th className="py-3 px-2">Category</th>
                                    <th className="py-3 px-2">Amount</th>
                                    <th className="py-3 px-2">Date</th>
                                    <th className="py-3 px-2">Voucher</th>
                                    <th className="py-3 px-2 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-300">
                                {expenses.map((exp) => (
                                    <tr key={exp.id} className="hover:bg-white/5 transition">
                                        <td className="py-3.5 px-2">
                                            <div className="font-bold text-white">{exp.notes || 'Reimbursement Request'}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">ID: {exp.id}</div>
                                        </td>
                                        <td className="py-3.5 px-2 text-slate-300 font-semibold">{exp.category}</td>
                                        <td className="py-3.5 px-2 font-extrabold text-white">${exp.amount.toFixed(2)}</td>
                                        <td className="py-3.5 px-2 text-slate-400">{exp.date}</td>
                                        <td className="py-3.5 px-2">
                                            {exp.receipt ? (
                                                <button 
                                                    onClick={() => setViewReceipt(exp.receipt)}
                                                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline transition"
                                                >
                                                    <FaEye /> View Voucher
                                                </button>
                                            ) : (
                                                <span className="text-slate-500 italic">No receipt</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-2 text-right">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                                exp.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                                'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                            }`}>
                                                {exp.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Petty Cash Form Modal */}
            {showFormModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm" onClick={() => setShowFormModal(false)}></div>
                    <motion.div 
                        className="relative bg-[#111827] border border-[#1E293B]/50 rounded-3xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-white"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div>
                            <h3 className="text-lg font-black text-white">Submit Petty Cash Voucher</h3>
                            <p className="text-xs text-slate-400">Request voucher reimbursement for operational costs.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Amount ($) *</label>
                                    <input 
                                        type="number" 
                                        step="0.01" 
                                        required 
                                        value={amount} 
                                        onChange={(e) => setAmount(e.target.value)} 
                                        placeholder="e.g. 85.50" 
                                        className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Category</label>
                                    <select 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)} 
                                        className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white focus:border-blue-500 focus:outline-none [&>option]:bg-[#111827]"
                                    >
                                        <option>Fuel Reimbursement</option>
                                        <option>Materials Purchase</option>
                                        <option>Parking Fees</option>
                                        <option>Meals / Travel Costs</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Detailed Notes</label>
                                <textarea 
                                    value={notes} 
                                    onChange={(e) => setNotes(e.target.value)} 
                                    placeholder="Explain expense details (e.g. diesel refill for Van #4)" 
                                    className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none h-20 resize-none" 
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Receipt Voucher Proof</label>
                                <div className="flex items-center gap-3">
                                    <button 
                                        type="button" 
                                        onClick={simulateReceiptUpload}
                                        className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-[#1E293B]/30 rounded-xl font-bold text-slate-200 flex items-center gap-1.5 transition"
                                    >
                                        <FaReceipt /> Simulate Receipt Upload
                                    </button>
                                    {receipt ? (
                                        <span className="text-emerald-400 font-bold flex items-center gap-1"><FaCheckCircle /> Uploaded</span>
                                    ) : (
                                        <span className="text-slate-500 italic">No receipt attached</span>
                                    )}
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end space-x-2">
                                <button type="button" onClick={() => setShowFormModal(false)} className="px-3 py-2 text-slate-400 hover:text-white transition">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition">Submit Voucher</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* View Receipt Popover */}
            {viewReceipt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm" onClick={() => setViewReceipt(null)}></div>
                    <motion.div 
                        className="relative bg-[#111827] border border-[#1E293B]/50 rounded-3xl p-4 w-full max-w-sm shadow-2xl z-10 space-y-3 text-white"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="flex justify-between items-center pb-2 border-b border-[#1E293B]/20">
                            <h3 className="font-extrabold text-sm text-white">Receipt Voucher Proof</h3>
                            <button onClick={() => setViewReceipt(null)} className="text-xs text-rose-400 font-bold hover:underline transition">Close</button>
                        </div>
                        <div className="h-64 rounded-2xl overflow-hidden border border-[#1E293B]/20">
                            <img src={viewReceipt} alt="Receipt Proof" className="w-full h-full object-cover" />
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default DriverDashboard;
