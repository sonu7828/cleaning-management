import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaBuilding, FaFilePdf, FaRedo, FaReceipt } from 'react-icons/fa';

const ContractsPage = () => {
    const { contracts, renewContract, addInvoice } = useContext(AppContext);
    const [selectedContractId, setSelectedContractId] = useState(null);

    const activeContract = contracts.find(c => c.id === selectedContractId) || contracts[0];

    const handleRenew = (id) => {
        renewContract(id);
        alert('AMC Contract renewed statefully for another calendar year!');
    };

    const handleCreateInvoice = (contract) => {
        addInvoice({
            clientId: contract.id,
            clientName: contract.clientName,
            amount: Math.round(contract.value / 12),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0]
        });
        alert(`Billing invoice successfully generated for ${contract.clientName}!`);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaBuilding className="text-purple-500" />
                    AMC Service Contracts
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Manage SLA contracts, recurring billing terms, and agreement renewals.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Contracts List Sidebar */}
                <div className="lg:col-span-5 space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Active SLA Agreement</h3>
                    <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                        {contracts.map((ctr) => {
                            const isSelected = activeContract?.id === ctr.id;
                            return (
                                <div
                                    key={ctr.id}
                                    onClick={() => setSelectedContractId(ctr.id)}
                                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 text-left ${
                                        isSelected
                                            ? 'bg-purple-600/10 border-purple-500 shadow-lg shadow-purple-600/5'
                                            : 'bg-[#111827]/85 border-[#1E293B]/30 hover:bg-[#1E293B]/10'
                                    }`}
                                >
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-100">{ctr.clientName}</h4>
                                            <p className="text-xs text-slate-400 mt-1 truncate max-w-[280px]">{ctr.title}</p>
                                        </div>
                                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                            ctr.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                            {ctr.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#1E293B]/20 text-[10px] text-slate-400 font-semibold">
                                        <span>Val: <strong className="text-slate-200">${ctr.value?.toLocaleString()}</strong></span>
                                        <span>Cycle: <strong className="text-slate-200">{ctr.billingCycle}</strong></span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contract Detailed Display Card */}
                {activeContract ? (
                    <div className="lg:col-span-7 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-6">
                        {/* Upper Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-5 border-b border-[#1E293B]/20">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">SLA Contract Details</span>
                                <h2 className="text-xl font-extrabold text-white mt-1.5">{activeContract.title}</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Agreement ID: <span className="font-mono text-slate-300">#{activeContract.id}</span></p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => alert('PDF export generated statefully! (Simulated download)')}
                                    className="px-3.5 py-1.5 bg-[#1E293B]/50 hover:bg-[#1E293B]/80 text-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-[#1E293B]/40"
                                >
                                    <FaFilePdf />
                                    <span>Download PDF</span>
                                </button>
                                <button
                                    onClick={() => handleRenew(activeContract.id)}
                                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-purple-600/10"
                                >
                                    <FaRedo className="text-[10px]" />
                                    <span>Renew Contract</span>
                                </button>
                            </div>
                        </div>

                        {/* Customer & Contract details grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                            <div className="space-y-2">
                                <h4 className="font-bold text-slate-400 uppercase tracking-wider">Customer Information</h4>
                                <div className="p-3 bg-[#0B1120]/60 border border-[#1E293B]/20 rounded-xl space-y-1">
                                    <div className="font-bold text-slate-200">{activeContract.clientName}</div>
                                    <div className="text-slate-400">Account Type: Commercial B2B Tenant</div>
                                    <div className="text-slate-400">Contract Value: ${activeContract.value?.toLocaleString()} / Annual</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-slate-400 uppercase tracking-wider">Contract Terms</h4>
                                <div className="p-3 bg-[#0B1120]/60 border border-[#1E293B]/20 rounded-xl space-y-1.5">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Cycle:</span>
                                        <span className="font-bold text-slate-200">{activeContract.billingCycle}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Start Date:</span>
                                        <span className="font-bold text-slate-200">{activeContract.startDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Expiration Date:</span>
                                        <span className="font-bold text-slate-200 text-purple-400">{activeContract.endDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services scope */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scope of Facility Services</h4>
                            <div className="bg-[#0B1120]/60 border border-[#1E293B]/20 rounded-xl overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse min-w-[500px] sm:min-w-0">
                                    <thead>
                                        <tr className="bg-[#1E293B]/10 border-b border-[#1E293B]/20 text-slate-400 font-extrabold uppercase tracking-wider">
                                            <th className="py-2.5 px-3">Service Scope</th>
                                            <th className="py-2.5 px-3 text-right">Frequency</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1E293B]/10 text-slate-300 font-medium">
                                        <tr>
                                            <td className="py-2.5 px-3">Regular Dusting, Mopping, and Facility Cleaning</td>
                                            <td className="py-2.5 px-3 text-right text-purple-400">Daily Operational</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2.5 px-3">Air Duct HVAC Sanitization & Vent Scrubbing</td>
                                            <td className="py-2.5 px-3 text-right text-purple-400">Quarterly SLA</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2.5 px-3">Deep Carpet Scrubbing & Hard Floor Wax Stripping</td>
                                            <td className="py-2.5 px-3 text-right text-purple-400">Semi-Annual</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Invoice actions */}
                        <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl flex items-center justify-between gap-4">
                            <div>
                                <h4 className="font-bold text-xs text-slate-200">Generate Periodic Invoice</h4>
                                <p className="text-[10px] text-slate-400 mt-0.5">Settle cycle dues. Estimated billing amount: ${Math.round(activeContract.value / 12).toLocaleString()}/month</p>
                            </div>
                            <button
                                onClick={() => handleCreateInvoice(activeContract)}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md shadow-emerald-600/10 shrink-0"
                            >
                                <FaReceipt className="text-[10px]" />
                                <span>Issue Invoice</span>
                            </button>
                        </div>

                        {/* Agreement Timeline */}
                        <div className="space-y-3.5 pt-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contract Life Activity Timeline</h4>
                            <div className="relative pl-6 border-l border-[#1E293B]/35 space-y-4 text-xs font-medium text-slate-400">
                                <div className="relative">
                                    <div className="absolute -left-[30px] top-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></div>
                                    <div className="text-slate-200 font-bold">Contract SLA Approved</div>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Approved on {activeContract.startDate} by Operations Administrator</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[30px] top-0.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
                                    <div className="text-slate-200 font-bold">Billing Cycle Setup</div>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Set to recurring {activeContract.billingCycle} structure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="lg:col-span-7 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-16 text-center shadow-xl">
                        <p className="text-slate-500 font-semibold text-sm">No contract selected. Approve estimates to generate contracts.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContractsPage;
