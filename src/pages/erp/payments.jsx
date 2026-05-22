import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaFileInvoiceDollar, FaCheck, FaRegCalendarAlt } from 'react-icons/fa';

const PaymentsPage = () => {
    const { invoices, payInvoice } = useContext(AppContext);

    const paidInvoices = invoices.filter(i => i.status === 'Paid');
    const pendingInvoices = invoices.filter(i => i.status === 'Pending');

    const totalPaid = paidInvoices.reduce((sum, i) => sum + Number(i.amount || 0), 0);
    const totalPending = pendingInvoices.reduce((sum, i) => sum + Number(i.amount || 0), 0);

    const [successMsg, setSuccessMsg] = React.useState('');

    const handleSettle = (id) => {
        payInvoice(id);
        setSuccessMsg(`Invoice #${id} has been settled successfully!`);
        setTimeout(() => setSuccessMsg(''), 3500);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaFileInvoiceDollar className="text-blue-500" />
                    Payments & Receivables
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Settle customer accounts, monitor collections, and track transaction history.</p>
            </div>

            {successMsg && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-semibold flex items-center gap-2.5">
                    <FaCheck className="text-emerald-500 text-lg shrink-0" />
                    {successMsg}
                </div>
            )}

            {/* KPI metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Settle Collections</div>
                    <div className="text-3xl font-black text-emerald-400">${totalPaid.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">Accumulated cleared cash payments</div>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Outstanding Dues</div>
                    <div className="text-3xl font-black text-amber-400">${totalPending.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">Active accounts receivables pending</div>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Collection Ratio</div>
                    <div className="text-3xl font-black text-blue-400">
                        {invoices.length > 0 ? Math.round((paidInvoices.length / invoices.length) * 100) : 0}%
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">Settled invoices percentage</div>
                </div>
            </div>

            {/* Payments Ledger */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-slate-300 mb-4">Accounts Settlement Ledger</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                <th className="py-3.5 px-3">Invoice ID</th>
                                <th className="py-3.5 px-3">Client details</th>
                                <th className="py-3.5 px-3">Due Date</th>
                                <th className="py-3.5 px-3">Amount Due</th>
                                <th className="py-3.5 px-3">Billing Status</th>
                                <th className="py-3.5 px-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]/20 text-slate-300 font-medium">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-[#1E293B]/10 transition duration-150">
                                    <td className="py-4 px-3 text-slate-500 font-mono">#{inv.id}</td>
                                    <td className="py-4 px-3">
                                        <div className="font-bold text-white text-sm">{inv.clientName}</div>
                                    </td>
                                    <td className="py-4 px-3 flex items-center gap-1.5 text-slate-400">
                                        <FaRegCalendarAlt className="text-[10px]" />
                                        <span>{inv.dueDate}</span>
                                    </td>
                                    <td className="py-4 px-3 text-white font-bold">${inv.amount?.toLocaleString()}</td>
                                    <td className="py-4 px-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                            inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-3 text-right">
                                        {inv.status === 'Pending' ? (
                                            <button
                                                onClick={() => handleSettle(inv.id)}
                                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1.5 ml-auto shadow shadow-emerald-600/10"
                                            >
                                                <FaCheck className="text-[8px]" />
                                                <span>Record Settlement</span>
                                            </button>
                                        ) : (
                                            <span className="text-[10px] text-slate-500 font-bold">Cleared</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;
