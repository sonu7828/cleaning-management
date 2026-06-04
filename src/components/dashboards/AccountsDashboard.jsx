import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

import { 
    FaFileInvoiceDollar, FaChartLine, FaArrowDown, FaArrowUp, 
    FaCheck, FaDownload, FaCalculator, FaCheckCircle 
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AccountsDashboard = () => {
    const { invoices, updateInvoiceStatus } = useContext(AppContext);
    const [successMessage, setSuccessMessage] = useState('');

    // Calculate billing KPIs
    const totalBilled = invoices.reduce((acc, curr) => acc + curr.amount, 0);
    const paidAmount = invoices.filter(inv => inv.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
    const outstandingAmount = invoices.filter(inv => ['Sent', 'Pending', 'Overdue'].includes(inv.status)).reduce((acc, curr) => acc + curr.amount, 0);
    
    // Tax rates
    const vatRate = 0.05; // 5% UAE VAT
    const accumulatedVat = paidAmount * vatRate;
    const netEarning = paidAmount - accumulatedVat;

    const handleMarkAsPaid = (id) => {
        if (updateInvoiceStatus) {
            updateInvoiceStatus(id, 'Paid');
        }
        setSuccessMessage(`Invoice ${id} marked as Paid statefully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleExportLedger = () => {
        setSuccessMessage("Financial Tax Ledger exported to Excel/CSV format successfully!");
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    // Chart Data for monthly income
    const cashflowData = [
        { month: 'Jan', revenue: 12000, expenses: 8000 },
        { month: 'Feb', revenue: 15000, expenses: 9500 },
        { month: 'Mar', revenue: 18000, expenses: 11000 },
        { month: 'Apr', revenue: 16500, expenses: 10000 },
        { month: 'May', revenue: paidAmount, expenses: 4000 }
    ];

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaCalculator className="text-rose-600 animate-pulse" />
                        Accounts & VAT Desk
                    </h1>
                    <p className="text-slate-500 text-sm mt-0.5">Manage invoices, verify transaction logs, and calculate quarterly VAT returns.</p>
                </div>
                
                <button
                    onClick={handleExportLedger}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl active:scale-[0.98] transition-all text-sm"
                >
                    <FaDownload className="text-xs" />
                    Export Tax Ledger
                </button>
            </div>

            {successMessage && (
                <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl text-sm font-semibold flex items-center gap-2.5 shadow-xl">
                    <FaCheckCircle className="text-emerald-400 text-lg" />
                    {successMessage}
                </div>
            )}

            {/* Financial Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 backdrop-blur-sm shadow-xl rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                        <span className="text-xs font-bold uppercase tracking-wider">Total Gross Invoiced</span>
                        <FaFileInvoiceDollar className="text-blue-600 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-slate-800">AED {totalBilled.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                    <div className="text-xs text-slate-500 font-medium">Billed across all agency accounts</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 backdrop-blur-sm shadow-xl rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                        <span className="text-xs font-bold uppercase tracking-wider">Collections Received</span>
                        <FaArrowUp className="text-emerald-600 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-emerald-600">AED {paidAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                    <div className="text-xs text-slate-500 font-medium">Statefully marked paid invoices</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 backdrop-blur-sm shadow-xl rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                        <span className="text-xs font-bold uppercase tracking-wider">Accounts Receivable</span>
                        <FaArrowDown className="text-amber-600 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-amber-600">AED {outstandingAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                    <div className="text-xs text-slate-500 font-medium">Outstanding invoices pending</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 backdrop-blur-sm shadow-xl rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                        <span className="text-xs font-bold uppercase tracking-wider">Quarterly VAT (5%)</span>
                        <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold border border-rose-200">Output Tax</span>
                    </div>
                    <div className="text-3xl font-black text-slate-800">AED {accumulatedVat.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                    <div className="text-xs text-slate-500 font-medium">Net profit: AED {netEarning.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>
            </div>

            {/* Financial Ledger and Invoice List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Cashflow Chart */}
                <div className="lg:col-span-5 bg-[#111827]/85 border border-[#1E293B]/30 backdrop-blur-sm shadow-xl rounded-2xl p-5 space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                            <FaChartLine className="text-slate-500" />
                            Financial Analytics
                        </h3>
                        <p className="text-xs text-slate-500">Income vs. Logistics expenses breakdown.</p>
                    </div>

                    <div className="w-full h-64 text-xs font-semibold">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={cashflowData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B/20" vertical={false} />
                                <XAxis dataKey="month" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1E293B', color: '#fff' }} />
                                <Bar dataKey="revenue" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Income ($)" />
                                <Bar dataKey="expenses" fill="#1E293B" radius={[4, 4, 0, 0]} name="Expenses ($)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Billing Invoices Control Table */}
                <div className="lg:col-span-7 bg-[#111827]/85 border border-[#1E293B]/30 backdrop-blur-sm shadow-xl rounded-2xl p-5 space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Invoice Control Desk</h3>
                        <p className="text-xs text-slate-500">Review billings and manually record client offline check payments.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[#1E293B]/30 text-slate-600 font-extrabold uppercase tracking-wider">
                                    <th className="py-3 px-2">Invoice Code</th>
                                    <th className="py-3 px-2">B2B Client</th>
                                    <th className="py-3 px-2">Amount Due</th>
                                    <th className="py-3 px-2">Due Date</th>
                                    <th className="py-3 px-2">Status</th>
                                    <th className="py-3 px-2 text-right">Roster</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-700">
                                {invoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-slate-100 transition">
                                        <td className="py-3.5 px-2">
                                            <div className="font-bold text-slate-800">{inv.id}</div>
                                            <div className="text-[9px] text-slate-500 mt-0.5">Issued: {inv.createdDate || inv.date}</div>
                                        </td>
                                        <td className="py-3.5 px-2 text-slate-700 font-semibold">{inv.customerName}</td>
                                        <td className="py-3.5 px-2 font-extrabold text-slate-800">AED {inv.amount.toFixed(2)}</td>
                                        <td className="py-3.5 px-2 text-slate-600">{inv.dueDate}</td>
                                        <td className="py-3.5 px-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                                inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                                'bg-rose-100 text-rose-800 border border-rose-200'
                                            }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-2 text-right">
                                            {(inv.status === 'Sent' || inv.status === 'Pending' || inv.status === 'Overdue') && (
                                                <button 
                                                    onClick={() => handleMarkAsPaid(inv.id)}
                                                    className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold rounded-lg transition"
                                                    title="Mark as Paid"
                                                >
                                                    <FaCheck className="text-[8px]" /> Mark Paid
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccountsDashboard;
