import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaChartBar, FaFileDownload } from 'react-icons/fa';

const CRMReportsPage = () => {
    const { contracts, invoices } = useContext(AppContext);

    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.status === 'Paid' ? inv.amount : 0), 0);
    const totalContractValue = contracts.reduce((sum, c) => sum + c.value, 0);

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaChartBar className="text-blue-500" />
                        Performance Reports
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Aggregate sales pipeline ratios, net margins, and operational performance.</p>
                </div>
                <button
                    onClick={() => alert('Compiling latest CRM & ERP operations report...')}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-blue-600/20 flex items-center gap-1.5"
                >
                    <FaFileDownload />
                    <span>Compile Global Reports</span>
                </button>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Sales Margin</div>
                    <div className="text-3xl font-black text-emerald-400">76.4%</div>
                    <p className="text-[10px] text-slate-500 font-semibold">Net cleaning services profit ratio</p>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Contract Value</div>
                    <div className="text-3xl font-black text-blue-400">${totalContractValue.toLocaleString()}</div>
                    <p className="text-[10px] text-slate-500 font-semibold">Total recurring service contracts pool</p>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cleared Billing Income</div>
                    <div className="text-3xl font-black text-purple-400">${totalRevenue.toLocaleString()}</div>
                    <p className="text-[10px] text-slate-500 font-semibold">Net collections cleared in invoices</p>
                </div>
            </div>

            {/* Detailed charts mock / listings */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Operations performance card */}
                <div className="lg:col-span-8 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-4">
                    <h3 className="text-sm font-bold text-slate-300">Sales Conversion Metrics</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs text-slate-400 font-bold mb-1">
                                <span>Corporate Office SLAs</span>
                                <span>82% Target Met</span>
                            </div>
                            <div className="w-full bg-[#0B1120] h-2.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '82%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-slate-400 font-bold mb-1">
                                <span>Residential Deep Cleanings</span>
                                <span>64% Target Met</span>
                            </div>
                            <div className="w-full bg-[#0B1120] h-2.5 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full rounded-full" style={{ width: '64%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-slate-400 font-bold mb-1">
                                <span>Post-Construction Cleanings</span>
                                <span>90% Target Met</span>
                            </div>
                            <div className="w-full bg-[#0B1120] h-2.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subsections compile card */}
                <div className="lg:col-span-4 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-slate-300">Sub-Segment Reports</h3>
                        <p className="text-xs text-slate-400 mt-1">Export filtered operational data summaries.</p>
                    </div>

                    <div className="space-y-2 text-xs">
                        <button
                            onClick={() => alert('Downloading customer profiles...')}
                            className="w-full py-2 bg-[#0B1120]/60 hover:bg-[#0B1120] border border-[#1E293B]/30 text-slate-300 font-semibold rounded-xl transition flex justify-between px-3 items-center"
                        >
                            <span>Client Demographics</span>
                            <FaFileDownload className="text-blue-500 text-[10px]" />
                        </button>
                        <button
                            onClick={() => alert('Downloading AMC contract pools...')}
                            className="w-full py-2 bg-[#0B1120]/60 hover:bg-[#0B1120] border border-[#1E293B]/30 text-slate-300 font-semibold rounded-xl transition flex justify-between px-3 items-center"
                        >
                            <span>AMC Contract Pools</span>
                            <FaFileDownload className="text-blue-500 text-[10px]" />
                        </button>
                        <button
                            onClick={() => alert('Downloading cash collections...')}
                            className="w-full py-2 bg-[#0B1120]/60 hover:bg-[#0B1120] border border-[#1E293B]/30 text-slate-300 font-semibold rounded-xl transition flex justify-between px-3 items-center"
                        >
                            <span>Collections Ledger</span>
                            <FaFileDownload className="text-blue-500 text-[10px]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CRMReportsPage;
