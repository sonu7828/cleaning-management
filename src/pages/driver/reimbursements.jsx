import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaFileInvoiceDollar, FaPlus, FaCheckCircle, FaHourglassHalf, FaCamera, FaReceipt } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const DriverReimbursementsPage = () => {
    const { expenses, addExpense, user } = useContext(AppContext);
    
    // Filter expenses filed by this driver
    const myExpenses = expenses.filter(e => e.driverName === user.name);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        category: 'Fuel Reimbursement',
        amount: '',
        notes: '',
        receipt: null
    });

    const handleMockReceipt = () => {
        setFormData(prev => ({
            ...prev,
            receipt: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=300&auto=format&fit=crop&q=60'
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense({
            category: formData.category,
            amount: Number(formData.amount) || 0,
            notes: formData.notes,
            receipt: formData.receipt
        });
        setFormData({ category: 'Fuel Reimbursement', amount: '', notes: '', receipt: null });
        setShowModal(false);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaReceipt className="text-emerald-500" />
                        Petty Cash & Vouchers
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Submit expense claims for fuel refuels, parking, or site detergents.</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/10">
                    <FaPlus className="text-xs" />
                    <span>Log Expense Voucher</span>
                </Button>
            </div>

            {/* Expenses List */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-300 pb-2 border-b border-[#1E293B]/20">
                    <FaFileInvoiceDollar className="text-emerald-400 text-xs" />
                    <span>Logged Expense Claims ({myExpenses.length})</span>
                </div>

                <div className="space-y-4">
                    {myExpenses.length === 0 ? (
                        <div className="text-center py-10 text-slate-500 text-sm">No expenses filed yet.</div>
                    ) : (
                        myExpenses.map((exp) => (
                            <div key={exp.id} className="flex flex-col sm:flex-row justify-between p-4 bg-[#0B1120]/60 hover:bg-[#0B1120] border border-[#1E293B]/25 rounded-2xl gap-4 transition">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm shrink-0">
                                        $
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-bold text-white">{exp.category}</div>
                                        <div className="text-xs text-slate-400 font-semibold">{exp.notes || 'No description provided'}</div>
                                        <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                                            <span>Filed on {exp.date}</span>
                                            {exp.receipt && (
                                                <a href={exp.receipt} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-0.5">
                                                    • View Receipt Image
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                                    <div className="text-lg font-black text-white">${exp.amount.toFixed(2)}</div>
                                    <div>
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase ${
                                            exp.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                            'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                        }`}>
                                            {exp.status === 'Approved' ? <FaCheckCircle /> : <FaHourglassHalf />}
                                            {exp.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Expense Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Log Petty Cash Expense">
                <form onSubmit={handleSubmit} className="space-y-4 min-w-[320px]">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Expense Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        >
                            <option>Fuel Reimbursement</option>
                            <option>Parking Fees</option>
                            <option>Materials Purchase</option>
                            <option>Other Operational Costs</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Amount Spent ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            placeholder="e.g. 85.50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Explanation Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 h-20 resize-none"
                            placeholder="e.g. Refueling diesel tank for van #4 stop #2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Receipt Attachment</label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleMockReceipt}
                                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-200 border border-[#1E293B]/50 rounded-xl text-xs transition"
                            >
                                <FaCamera /> Mock Receipt Image
                            </button>
                            {formData.receipt && (
                                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                                    <FaCheckCircle /> Mock_receipt.jpg loaded
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="pt-2 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2.5 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-semibold rounded-xl text-sm transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition"
                        >
                            Submit Claim
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DriverReimbursementsPage;
