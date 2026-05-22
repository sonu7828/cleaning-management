import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaFileContract, FaBuilding, FaRedo, FaDownload, FaCheckCircle, FaFileSignature } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const ClientContractsPage = () => {
    const { contracts, renewContract, user } = useContext(AppContext);
    
    // Match client contracts based on email/name (TechLabs)
    const myContracts = contracts.filter(c => 
        c.clientName.toLowerCase().includes('techlabs') ||
        c.clientName.toLowerCase().includes(user.name.split(' ')[0].toLowerCase())
    );

    const handleDownloadSLA = (contractId) => {
        alert(`Downloading PDF copy of SLA Contract terms for ${contractId}. (Mock Action)`);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaFileContract className="text-cyan-500" />
                    My SLA Contracts
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Active annual facility agreements, service scopes, and maintenance SLAs.</p>
            </div>

            {/* Contracts List */}
            <div className="space-y-5">
                {myContracts.length === 0 ? (
                    <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-10 text-center text-slate-500">
                        No active AMC service agreements found for your B2B account.
                    </div>
                ) : (
                    myContracts.map((contract) => (
                        <div key={contract.id} className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-5">
                            {/* Title & Status */}
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-white leading-snug">{contract.title}</h3>
                                    <span className="text-[10px] text-slate-400 font-semibold tracking-wider flex items-center gap-1 uppercase">
                                        <FaBuilding /> ID: {contract.id} • {contract.clientName}
                                    </span>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                        contract.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                        'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                    }`}>
                                        <FaCheckCircle className="text-[10px]" />
                                        {contract.status}
                                    </span>
                                </div>
                            </div>

                            {/* Service Terms */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 bg-[#0B1120]/50 p-4 border border-[#1E293B]/20 rounded-2xl">
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">AMC Annual Value</div>
                                    <div className="text-base font-black text-emerald-400 mt-1">${contract.value.toLocaleString()} / Year</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Billing Cycle</div>
                                    <div className="text-base font-black text-slate-200 mt-1">{contract.billingCycle} Runs</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Contract End Date</div>
                                    <div className="text-base font-black text-rose-400 mt-1">{contract.endDate}</div>
                                </div>
                            </div>

                            {/* Scope Box */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                    <FaFileSignature className="text-cyan-400 text-[10px]" /> Scope of Clean Works:
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed pl-1 bg-[#0B1120]/25 p-3.5 border border-[#1E293B]/10 rounded-xl">
                                    {contract.scope || 'General commercial facility cleaning including floor care and window wash.'}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-2">
                                <Button 
                                    onClick={() => handleDownloadSLA(contract.id)}
                                    className="bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-200 border border-[#1E293B]/50 flex items-center gap-1.5 text-xs font-bold"
                                >
                                    <FaDownload /> Download SLA Terms PDF
                                </Button>
                                <Button 
                                    onClick={() => renewContract(contract.id)}
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-1.5 text-xs font-bold"
                                >
                                    <FaRedo /> Renew Contract 1-Year
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ClientContractsPage;
