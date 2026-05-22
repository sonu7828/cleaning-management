import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { FaFileInvoice, FaPlus, FaCheck, FaCalculator, FaClock } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const QuotationsPage = () => {
    const { quotations, addQuote, approveQuote } = useContext(AppContext);
    const [showForm, setShowForm] = useState(false);
    const [clientName, setClientName] = useState('');
    const [email, setEmail] = useState('');
    const [serviceType, setServiceType] = useState('Standard Office Cleaning');
    const [areaSqFt, setAreaSqFt] = useState('');
    const [ratePerSqFt, setRatePerSqFt] = useState('0.15');

    const calculatedValue = Math.round(Number(areaSqFt || 0) * Number(ratePerSqFt || 0));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!clientName || !areaSqFt) return;

        addQuote({
            clientName,
            email,
            serviceType,
            areaSqFt: Number(areaSqFt),
            value: calculatedValue,
        });

        // Reset
        setClientName('');
        setEmail('');
        setAreaSqFt('');
        setShowForm(false);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaFileInvoice className="text-blue-500" />
                        Quotation Generator
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Generate, calculate, and approve facility service estimates.</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                    <FaPlus className="text-xs" />
                    <span>{showForm ? 'View All Quotes' : 'Create New Estimate'}</span>
                </Button>
            </div>

            {showForm ? (
                /* Generator Form */
                <motion.div 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl max-w-2xl mx-auto"
                >
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FaCalculator className="text-blue-500" /> Calculate Service Estimate
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Client Name</label>
                                <input
                                    type="text"
                                    required
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    placeholder="e.g. Grand Central Plaza"
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Client Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="e.g. operations@grandcentral.com"
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Service Category</label>
                            <select
                                value={serviceType}
                                onChange={(e) => {
                                    setServiceType(e.target.value);
                                    // Set default rates based on clean types
                                    if (e.target.value.includes('Deep')) setRatePerSqFt('0.40');
                                    else if (e.target.value.includes('Industrial')) setRatePerSqFt('0.35');
                                    else if (e.target.value.includes('Disinfection')) setRatePerSqFt('0.20');
                                    else setRatePerSqFt('0.15');
                                }}
                                className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <option value="Standard Office Cleaning">Standard Office Cleaning ($0.15/SqFt)</option>
                                <option value="Post-Construction Deep Clean">Post-Construction Deep Clean ($0.40/SqFt)</option>
                                <option value="Bi-Weekly Disinfection">Bi-Weekly Disinfection ($0.20/SqFt)</option>
                                <option value="Industrial Floor Stripping">Industrial Floor Stripping ($0.35/SqFt)</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Area Size (Sq Ft)</label>
                                <input
                                    type="number"
                                    required
                                    value={areaSqFt}
                                    onChange={(e) => setAreaSqFt(e.target.value)}
                                    placeholder="e.g. 15000"
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Rate ($ per Sq Ft)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={ratePerSqFt}
                                    onChange={(e) => setRatePerSqFt(e.target.value)}
                                    placeholder="0.15"
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                        </div>

                        {/* Summary Live Card */}
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between">
                            <div>
                                <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">Estimated Total Value</div>
                                <div className="text-[10px] text-slate-400 mt-0.5">Calculated: {areaSqFt || 0} SqFt x ${ratePerSqFt} / SqFt</div>
                            </div>
                            <div className="text-2xl font-black text-blue-400">${calculatedValue.toLocaleString()}</div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2.5 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-semibold rounded-xl text-sm transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-blue-600/20"
                            >
                                Generate Estimate
                            </button>
                        </div>
                    </form>
                </motion.div>
            ) : (
                /* List view */
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                    <th className="py-4 px-3">ID</th>
                                    <th className="py-4 px-3">Client Details</th>
                                    <th className="py-4 px-3">Service Type</th>
                                    <th className="py-4 px-3">Area Size</th>
                                    <th className="py-4 px-3">Value</th>
                                    <th className="py-4 px-3">Status</th>
                                    <th className="py-4 px-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-300">
                                {quotations.map((quote) => (
                                    <tr key={quote.id} className="hover:bg-[#1E293B]/10 transition duration-150">
                                        <td className="py-4 px-3 text-slate-500 font-mono">#{quote.id}</td>
                                        <td className="py-4 px-3">
                                            <div className="font-bold text-white text-sm">{quote.clientName}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">{quote.email}</div>
                                        </td>
                                        <td className="py-4 px-3 text-slate-200">{quote.serviceType}</td>
                                        <td className="py-4 px-3 text-slate-400 font-semibold">{quote.areaSqFt?.toLocaleString()} SqFt</td>
                                        <td className="py-4 px-3 text-emerald-400 font-bold">${quote.value?.toLocaleString()}</td>
                                        <td className="py-4 px-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                quote.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                quote.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                            }`}>
                                                {quote.status === 'Approved' ? <FaCheck className="text-[8px]" /> : <FaClock className="text-[8px]" />}
                                                {quote.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-3 text-right">
                                            {quote.status !== 'Approved' && (
                                                <button
                                                    onClick={() => approveQuote(quote.id)}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 rounded-lg text-[11px] font-bold transition"
                                                >
                                                    <FaCheck className="text-[9px]" />
                                                    <span>Approve & Contract</span>
                                                </button>
                                            )}
                                            {quote.status === 'Approved' && (
                                                <span className="text-[11px] text-slate-500 font-bold">Converted</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuotationsPage;
