import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext'; // 👈 Yahan Add Kiya Hai
import {
    FaBook,
    FaArrowUp,
    FaArrowDown,
    FaCheckCircle,
    FaHourglassHalf,
    FaCalendarAlt,
    FaWallet,
    FaCreditCard,
    FaMoneyBillWave,
    FaArrowRight,
    FaDotCircle
} from 'react-icons/fa';

const AccountsTransactionsPage = () => {
    const { invoices, expenses } = useContext(AppContext);
    
    // Build a unified ledger listing credits (invoices) and debits (expenses)
    const credits = invoices.map(i => ({
        id: i.id,
        date: i.dueDate,
        desc: `Sales Invoice Settlement (${i.clientName})`,
        amount: Number(i.amount),
        type: 'Credit',
        status: i.status === 'Paid' ? 'Cleared' : 'Pending'
    }));

    const debits = expenses.map(e => ({
        id: e.id,
        date: e.date,
        desc: `Petty Cash Voucher - ${e.category} (${e.driverName})`,
        amount: Number(e.amount),
        type: 'Debit',
        status: e.status === 'Approved' ? 'Cleared' : 'Pending'
    }));

    const ledger = [...credits, ...debits].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate details
    const totalCreditsCleared = ledger.filter(l => l.type === 'Credit' && l.status === 'Cleared').reduce((sum, l) => sum + l.amount, 0);
    const totalDebitsCleared = ledger.filter(l => l.type === 'Debit' && l.status === 'Cleared').reduce((sum, l) => sum + l.amount, 0);
    const ledgerBalance = totalCreditsCleared - totalDebitsCleared;

    const formatCurrency = (amount) => amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="min-h-screen w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-600/20">
                            <FaBook className="text-white text-sm" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            Transactions Ledger
                        </h1>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm ml-11.5 pl-0.5">
                        Consolidated double-entry records tracking accounts receivables and petty expenditures.
                    </p>
                </div>
                <div className="flex items-center gap-2 ml-11 sm:ml-0">
                    <button className="px-3 py-1.5 rounded-lg bg-[#1E293B]/50 border border-[#334155]/40 text-[10px] sm:text-xs font-bold text-slate-300 flex items-center gap-1.5 hover:bg-[#1E293B] hover:border-slate-600/50 transition-all duration-200">
                        <FaCalendarAlt className="text-rose-400 text-[10px]" />
                        Export Journal
                    </button>
                </div>
            </div>

            {/* Balances Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {/* Credits Card */}
                <div className="group relative overflow-hidden bg-[#0F172A] border border-[#1E293B]/60 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/20 transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none" />
                    <div className="relative space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                <FaArrowUp className="text-emerald-500 text-[10px]" /> Total Credit
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaCreditCard className="text-emerald-400 text-xs" />
                            </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                            ${formatCurrency(totalCreditsCleared)}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FaCheckCircle className="text-emerald-500/50 text-[8px]" />
                            <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold">Cleared B2B client settlements</span>
                        </div>
                    </div>
                </div>

                {/* Debits Card */}
                <div className="group relative overflow-hidden bg-[#0F172A] border border-[#1E293B]/60 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-rose-500/5 hover:border-rose-500/20 transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-rose-500/10 to-transparent blur-2xl group-hover:bg-rose-500/20 transition-all duration-500 pointer-events-none" />
                    <div className="relative space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                <FaArrowDown className="text-rose-500 text-[10px]" /> Total Debit
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaMoneyBillWave className="text-rose-400 text-xs" />
                            </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-rose-400 tracking-tight">
                            ${formatCurrency(totalDebitsCleared)}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FaCheckCircle className="text-rose-500/50 text-[8px]" />
                            <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold">Processed staff reimbursements</span>
                        </div>
                    </div>
                </div>

                {/* Net Balance Card */}
                <div className="group relative overflow-hidden bg-[#0F172A] border border-[#1E293B]/60 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-500/20 transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500 pointer-events-none" />
                    <div className="relative space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                Net Cash Balance
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaWallet className="text-indigo-400 text-xs" />
                            </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-indigo-400 tracking-tight">
                            ${formatCurrency(ledgerBalance)}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FaDotCircle className="text-indigo-500/50 text-[8px]" />
                            <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold">Current liquidity surplus</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ledger Logs Table */}
            <div className="bg-[#0F172A] border border-[#1E293B]/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                {/* Table Header */}
                <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-[#1E293B]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center">
                            <FaCalendarAlt className="text-rose-400 text-xs" />
                        </div>
                        <span className="text-sm font-black text-white">Transaction History Journal</span>
                    </div>
                    <div className="flex items-center gap-2 ml-9 sm:ml-0">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400">CREDIT</span>
                        <span className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-black text-rose-400">DEBIT</span>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-[#1E293B]/30 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                <th className="py-3.5 px-6">Post Date</th>
                                <th className="py-3.5 px-4">Description / Transaction</th>
                                <th className="py-3.5 px-4">Type</th>
                                <th className="py-3.5 px-4">Reconciliation</th>
                                <th className="py-3.5 px-6 text-right">Amount ($)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]/20">
                            {ledger.map((entry) => (
                                <tr 
                                    key={entry.id} 
                                    className={`group/item hover:bg-[#1E293B]/15 transition-all duration-200 ${
                                        entry.type === 'Credit' ? 'hover:border-l-emerald-500' : 'hover:border-l-rose-500'
                                    } border-l-2 border-l-transparent`}
                                >
                                    <td className="py-4 px-6">
                                        <span className="text-slate-400 font-semibold">{entry.date}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-slate-200 font-bold group-hover/item:text-white transition-colors">
                                            {entry.desc}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black border uppercase inline-flex items-center gap-1 ${
                                            entry.type === 'Credit' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                        }`}>
                                            {entry.type === 'Credit' ? <FaArrowUp className="text-[8px]"/> : <FaArrowDown className="text-[8px]"/>}
                                            {entry.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                                            entry.status === 'Cleared' 
                                                ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' 
                                                : 'bg-amber-500/5 text-amber-400 border-amber-500/20'
                                        }`}>
                                            {entry.status === 'Cleared' ? <FaCheckCircle className="text-[9px]"/> : <FaHourglassHalf className="text-[9px]"/>}
                                            {entry.status}
                                        </span>
                                    </td>
                                    <td className={`py-4 px-6 text-right font-black tracking-wide ${
                                        entry.type === 'Credit' ? 'text-emerald-400' : 'text-rose-400'
                                    }`}>
                                        {entry.type === 'Credit' ? '+' : '-'}${entry.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-[#1E293B]/20">
                    {ledger.map((entry) => (
                        <div 
                            key={entry.id} 
                            className={`p-4 space-y-3 transition-colors hover:bg-[#1E293B]/10 ${
                                entry.type === 'Credit' ? 'border-l-4 border-l-emerald-500/50' : 'border-l-4 border-l-rose-500/50'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">{entry.date}</span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] font-black border ${
                                    entry.status === 'Cleared' 
                                        ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' 
                                        : 'bg-amber-500/5 text-amber-400 border-amber-500/20'
                                }`}>
                                    {entry.status === 'Cleared' ? <FaCheckCircle className="text-[7px]"/> : <FaHourglassHalf className="text-[7px]"/>}
                                    {entry.status}
                                </span>
                            </div>
                            
                            <div className="text-xs font-bold text-slate-200 leading-relaxed">
                                {entry.desc}
                            </div>
                            
                            <div className="flex items-center justify-between pt-1">
                                <span className={`px-2 py-0.5 rounded-md text-[8px] font-black border uppercase inline-flex items-center gap-1 ${
                                    entry.type === 'Credit' 
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                }`}>
                                    {entry.type === 'Credit' ? <FaArrowUp className="text-[7px]"/> : <FaArrowDown className="text-[7px]"/>}
                                    {entry.type}
                                </span>
                                <span className={`text-sm font-black tracking-wide ${
                                    entry.type === 'Credit' ? 'text-emerald-400' : 'text-rose-400'
                                }`}>
                                    {entry.type === 'Credit' ? '+' : '-'}${entry.amount.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-5 sm:px-7 py-3.5 border-t border-[#1E293B]/30 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-500">
                        Showing {ledger.length} ledger entries
                    </span>
                    <button className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors">
                        View All Entries <FaArrowRight className="text-[8px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountsTransactionsPage;