import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
    FaPercent, FaCoins, FaDownload, FaChartPie, 
    FaFileInvoiceDollar, FaCalculator, FaBalanceScale, FaArrowRight 
} from 'react-icons/fa';

const AccountsVATPage = () => {
    const { invoices, settings } = useContext(AppContext);
    
    // Tax configuration state - 5% UAE standard VAT
    const [vatRate, setVatRate] = useState(5);

    // Calculate details from paid invoices
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
    const grossPaid = paidInvoices.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const netRevenue = grossPaid / (1 + vatRate / 100);
    const vatCollected = grossPaid - netRevenue;

    const handleExportTax = () => {
        alert(`Generating FTA VAT return file based on 5% UAE VAT rate. (Mock Export)`);
    };

    const formatCurrency = (amount) => amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaPercent className="text-blue-600" />
                        FTA VAT Returns & Auditing
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">UAE standard 5% VAT calculations, corporate auditing logs, and FTA compliance sheets.</p>
                </div>
                <button 
                    onClick={handleExportTax} 
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/10"
                >
                    <FaDownload className="text-[10px]" /> Export FTA Return
                </button>
            </div>

            {/* Config & Metrics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Rate Configuration Panel */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs text-slate-550">
                    <h3 className="font-black text-slate-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                        <FaCoins className="text-blue-600" /> VAT Rate Configuration
                    </h3>
                    <p className="text-slate-500 font-semibold">Standard statutory rate set for Team Enviro accounts returns.</p>
                    
                    <select
                        value={vatRate}
                        onChange={(e) => setVatRate(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white font-bold text-slate-800"
                    >
                        <option value={5}>5% (UAE Standard VAT)</option>
                        <option value={0}>0% (Exempt / Zero-rated)</option>
                    </select>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10px] text-slate-400 font-semibold leading-relaxed">
                        TRN Number: <strong>{settings.trn}</strong><br />
                        Tax agency registration is verified in settings.
                    </div>
                </div>

                {/* KPI Metrics */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Taxable Sales</span>
                        <div className="text-xl font-black text-slate-800">AED {formatCurrency(grossPaid)}</div>
                        <span className="text-[10px] text-slate-500 font-semibold">Gross sales collected</span>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Net Revenue</span>
                        <div className="text-xl font-black text-slate-800">AED {formatCurrency(netRevenue)}</div>
                        <span className="text-[10px] text-slate-500 font-semibold">Excluding 5% VAT rate</span>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">VAT Liability</span>
                        <div className="text-xl font-black text-blue-600">AED {formatCurrency(vatCollected)}</div>
                        <span className="text-[10px] text-slate-550 font-bold">Due for FTA clearance</span>
                    </div>
                </div>
            </div>

            {/* Sales Ledger */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <FaChartPie className="text-blue-650" /> Audited VAT Sales Ledger
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 font-bold rounded text-[9px]">
                        {paidInvoices.length} Settled Invoices
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-450 font-extrabold uppercase tracking-wider">
                                <th className="py-2.5 px-2">Invoice Code</th>
                                <th className="py-2.5 px-2">B2B Customer Client</th>
                                <th className="py-2.5 px-2">Net Value</th>
                                <th className="py-2.5 px-2">VAT Collected ({vatRate}%)</th>
                                <th className="py-2.5 px-2 text-right">Gross Total Paid</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {paidInvoices.map((inv) => {
                                const netVal = Number(inv.amount) / (1 + vatRate / 100);
                                const vatVal = Number(inv.amount) - netVal;
                                return (
                                    <tr key={inv.id} className="hover:bg-slate-50 transition">
                                        <td className="py-3 px-2 text-slate-500 font-mono font-bold">#{inv.id}</td>
                                        <td className="py-3 px-2 font-bold text-slate-800">{inv.customerName}</td>
                                        <td className="py-3 px-2 text-slate-550">AED {formatCurrency(netVal)}</td>
                                        <td className="py-3 px-2 text-blue-650 font-bold">AED {formatCurrency(vatVal)}</td>
                                        <td className="py-3 px-2 text-right font-black text-slate-800">AED {formatCurrency(Number(inv.amount))}</td>
                                    </tr>
                                );
                            })}
                            {paidInvoices.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-slate-400 font-bold">No audited paid invoices available for VAT returns.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AccountsVATPage;