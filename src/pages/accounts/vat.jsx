import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import {
    FaPercent,
    FaCoins,
    FaDownload,
    FaChartPie,
    FaFileInvoiceDollar,
    FaCalculator,
    FaBalanceScale,
    FaArrowRight,
    FaReceipt
} from 'react-icons/fa';
import Button from '../../components/ui/Button';

const AccountsVATPage = () => {
    const { invoices } = useContext(AppContext);
    
    // Tax configuration state
    const [vatRate, setVatRate] = useState(15); // Default 15% VAT

    // Calculate details from paid invoices
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
    const grossPaid = paidInvoices.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const netRevenue = grossPaid / (1 + vatRate / 100);
    const vatCollected = grossPaid - netRevenue;

    const handleExportTax = () => {
        alert(`Exporting tax sheet at ${vatRate}% VAT to PDF. (Mock Export)`);
    };

    const formatCurrency = (amount) => amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="min-h-screen w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-600/20">
                            <FaCoins className="text-white text-sm" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            VAT & Tax Returns
                        </h1>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm ml-11.5 pl-0.5">
                        Quarterly tax audit statements and VAT/GST liability summaries.
                    </p>
                </div>
                <div className="ml-11 sm:ml-0">
                    <Button 
                        onClick={handleExportTax} 
                        className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-all duration-300 hover:scale-105 active:scale-95 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-0"
                    >
                        <FaDownload className="text-xs" />
                        <span>Export Tax Sheet</span>
                    </Button>
                </div>
            </div>

            {/* Tax Settings and KPI Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
                
                {/* Rate configuration */}
                <div className="lg:col-span-4 group relative overflow-hidden bg-[#0F172A] border border-[#1E293B]/60 rounded-2xl p-5 sm:p-6 shadow-lg hover:border-rose-500/20 transition-all duration-300">
                    <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br from-rose-500/10 to-transparent blur-2xl group-hover:bg-rose-500/20 transition-all duration-500 pointer-events-none" />
                    
                    <div className="relative space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaPercent className="text-rose-400 text-xs" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                VAT Rate Selection
                            </h3>
                        </div>
                        
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                            Select standard statutory tax rates to compute liability values dynamically.
                        </p>

                        <select
                            value={vatRate}
                            onChange={(e) => setVatRate(Number(e.target.value))}
                            className="w-full bg-[#020617] border border-[#1E293B]/60 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/40 transition-all duration-200 appearance-none cursor-pointer font-semibold"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em' }}
                        >
                            <option value={5}>5% (Reduced GST Rate)</option>
                            <option value={10}>10% (Regional Service Tax)</option>
                            <option value={15}>15% (Standard VAT)</option>
                            <option value={18}>18% (Standard GST Rate)</option>
                            <option value={20}>20% (Premium VAT Rate)</option>
                        </select>

                        <div className="flex items-start gap-2 pt-2 border-t border-[#1E293B]/40">
                            <FaReceipt className="text-slate-600 text-[10px] mt-0.5 flex-shrink-0" />
                            <span className="text-[10px] text-slate-500 leading-relaxed">
                                Tax calculations are automatically derived from B2B customer payments marked as "Paid" in the core financial ledger.
                            </span>
                        </div>
                    </div>
                </div>

                {/* KPI Metrics */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    {/* Gross Collections */}
                    <div className="group relative overflow-hidden bg-[#0F172A] border border-[#1E293B]/60 rounded-2xl p-5 sm:p-6 shadow-lg hover:border-indigo-500/20 hover:shadow-indigo-500/5 transition-all duration-300 hover:scale-[1.02]">
                        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent blur-xl group-hover:bg-indigo-500/20 transition-all duration-500 pointer-events-none" />
                        <div className="relative space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gross Collections</span>
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <FaFileInvoiceDollar className="text-indigo-400 text-xs" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                ${formatCurrency(grossPaid)}
                            </div>
                            <div className="text-[10px] text-slate-500 font-semibold">
                                Total B2B client paid invoices
                            </div>
                        </div>
                    </div>

                    {/* Net Sales Revenue */}
                    <div className="group relative overflow-hidden bg-[#0F172A] border border-[#1E293B]/60 rounded-2xl p-5 sm:p-6 shadow-lg hover:border-emerald-500/20 hover:shadow-emerald-500/5 transition-all duration-300 hover:scale-[1.02]">
                        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-xl group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none" />
                        <div className="relative space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Net Revenue</span>
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <FaCalculator className="text-emerald-400 text-xs" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-slate-200 tracking-tight">
                                ${formatCurrency(netRevenue)}
                            </div>
                            <div className="text-[10px] text-slate-500 font-semibold">
                                Sales value excluding tax
                            </div>
                        </div>
                    </div>

                    {/* VAT Liability */}
                    <div className="group relative overflow-hidden bg-[#0F172A] border border-[#1E293B]/60 rounded-2xl p-5 sm:p-6 shadow-lg hover:border-rose-500/20 hover:shadow-rose-500/5 transition-all duration-300 hover:scale-[1.02] sm:col-span-1">
                        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-rose-500/10 to-transparent blur-xl group-hover:bg-rose-500/20 transition-all duration-500 pointer-events-none" />
                        <div className="relative space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">VAT ({vatRate}%)</span>
                                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <FaBalanceScale className="text-rose-400 text-xs" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-rose-400 tracking-tight">
                                ${formatCurrency(vatCollected)}
                            </div>
                            <div className="text-[10px] text-slate-500 font-semibold">
                                Accrued tax collected totals
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VAT Ledger Details Table */}
            <div className="bg-[#0F172A] border border-[#1E293B]/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                {/* Table Header */}
                <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-[#1E293B]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center">
                            <FaChartPie className="text-rose-400 text-xs" />
                        </div>
                        <span className="text-sm font-black text-white">
                            Quarterly Sales Ledger
                        </span>
                        <span className="hidden sm:inline-flex px-2.5 py-1 rounded-md bg-[#1E293B]/50 border border-[#334155]/40 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                            {paidInvoices.length} Operations
                        </span>
                    </div>
                    <div className="flex items-center gap-2 ml-9 sm:ml-0">
                        <span className="px-2 py-0.5 rounded text-[8px] font-black bg-rose-500/10 text-rose-400 border border-rose-500/20">VAT APPLIED</span>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-[#1E293B]/30 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                <th className="py-3.5 px-6">Invoice Code</th>
                                <th className="py-3.5 px-4">B2B Customer Client</th>
                                <th className="py-3.5 px-4">Net Value</th>
                                <th className="py-3.5 px-4">VAT Collected</th>
                                <th className="py-3.5 px-6 text-right">Gross Total Paid</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]/20">
                            {paidInvoices.map((inv) => {
                                const netVal = Number(inv.amount) / (1 + vatRate / 100);
                                const vatVal = Number(inv.amount) - netVal;
                                return (
                                    <tr 
                                        key={inv.id} 
                                        className="group/row hover:bg-[#1E293B]/15 border-l-2 border-l-transparent hover:border-l-rose-500 transition-all duration-200"
                                    >
                                        <td className="py-4 px-6 font-bold text-white uppercase tracking-wider group-hover/row:text-rose-300 transition-colors">
                                            {inv.id}
                                        </td>
                                        <td className="py-4 px-4 text-slate-300 font-semibold group-hover/row:text-white transition-colors">
                                            {inv.clientName || 'General Client'}
                                        </td>
                                        <td className="py-4 px-4 text-slate-400 font-medium">
                                            ${formatCurrency(netVal)}
                                        </td>
                                        <td className="py-4 px-4 text-rose-400 font-bold">
                                            ${formatCurrency(vatVal)}
                                        </td>
                                        <td className="py-4 px-6 text-right font-black text-white tracking-wide">
                                            ${formatCurrency(Number(inv.amount))}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-[#1E293B]/20">
                    {paidInvoices.map((inv) => {
                        const netVal = Number(inv.amount) / (1 + vatRate / 100);
                        const vatVal = Number(inv.amount) - netVal;
                        return (
                            <div 
                                key={inv.id} 
                                className="p-4 space-y-3 border-l-4 border-l-rose-500/40 hover:bg-[#1E293B]/10 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-black text-white uppercase tracking-wider">
                                        {inv.id}
                                    </span>
                                    <span className="text-xs font-bold text-slate-400">
                                        ${formatCurrency(Number(inv.amount))}
                                    </span>
                                </div>
                                
                                <div className="text-xs font-bold text-slate-200">
                                    {inv.clientName || 'General Client'}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1E293B]/20">
                                    <div className="bg-[#1E293B]/20 rounded-lg px-2.5 py-2 text-center">
                                        <div className="text-[8px] text-slate-500 font-black uppercase tracking-wider mb-0.5">Net</div>
                                        <div className="text-xs font-bold text-slate-300">${formatCurrency(netVal)}</div>
                                    </div>
                                    <div className="bg-rose-500/5 rounded-lg px-2.5 py-2 text-center border border-rose-500/10">
                                        <div className="text-[8px] text-rose-400/70 font-black uppercase tracking-wider mb-0.5">VAT</div>
                                        <div className="text-xs font-bold text-rose-400">${formatCurrency(vatVal)}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="px-5 sm:px-7 py-3.5 border-t border-[#1E293B]/30 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-500">
                        Displaying {paidInvoices.length} paid invoices
                    </span>
                    <button className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors">
                        View Full Ledger <FaArrowRight className="text-[8px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountsVATPage;