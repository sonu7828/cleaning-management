import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaBuilding, FaPlus, FaCheckCircle, FaTimesCircle, FaGlobe, FaUserShield, FaBoxes } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const CompaniesPage = () => {
    const { companies, addCompany } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        owner: '',
        plan: 'Professional',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addCompany(formData);
        setFormData({ name: '', owner: '', plan: 'Professional' });
        setShowModal(false);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaBuilding className="text-purple-500" />
                        SaaS Tenants / Companies
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Provision and configure active enterprise client environments.</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                    <FaPlus className="text-xs" />
                    <span>Provision Tenant</span>
                </Button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Active Tenants</div>
                    <div className="text-4xl font-black text-purple-400">{companies.length}</div>
                    <div className="text-xs text-slate-500 font-medium">B2B client platforms instances</div>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Recurring Revenue</div>
                    <div className="text-4xl font-black text-emerald-400">
                        ${companies.reduce((sum, c) => sum + (c.plan === 'Enterprise' ? 249 : c.plan === 'Professional' ? 149 : 49), 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">SaaS plan subscription total</div>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Global System Health</div>
                    <div className="text-4xl font-black text-blue-400">99.98%</div>
                    <div className="text-xs text-slate-500 font-medium">All database nodes online</div>
                </div>
            </div>

            {/* Companies Table */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                <th className="py-4 px-3">Company Details</th>
                                <th className="py-4 px-3">SaaS Subscription</th>
                                <th className="py-4 px-3">System Administrator</th>
                                <th className="py-4 px-3">Registered On</th>
                                <th className="py-4 px-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-300">
                            {companies.map((company) => (
                                <tr key={company.id} className="hover:bg-[#1E293B]/10 transition duration-150">
                                    <td className="py-4 px-3 flex items-center space-x-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-black text-base shrink-0">
                                            {company.logo || company.name[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-sm">{company.name}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                                                <FaGlobe className="text-[9px]" /> tenant_{company.id}.cleancrm.com
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-3">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                            company.plan === 'Enterprise' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                            company.plan === 'Professional' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                            'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                            <FaBoxes className="text-[8px]" />
                                            {company.plan}
                                        </span>
                                    </td>
                                    <td className="py-4 px-3">
                                        <div className="text-slate-200">{company.owner}</div>
                                        <div className="text-[10px] text-slate-500 font-semibold uppercase flex items-center gap-1 mt-0.5">
                                            <FaUserShield className="text-[8px]" /> Account Owner
                                        </div>
                                    </td>
                                    <td className="py-4 px-3 text-slate-400 font-semibold">{company.registeredOn}</td>
                                    <td className="py-4 px-3 text-right">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                                            company.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            company.status === 'Trial' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                            'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                        }`}>
                                            {company.status === 'Active' ? <FaCheckCircle /> : company.status === 'Trial' ? <FaCheckCircle /> : <FaTimesCircle />}
                                            {company.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Provision Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Provision New SaaS Tenant">
                <form onSubmit={handleSubmit} className="space-y-4 min-w-[320px]">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Company / Group Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                            placeholder="e.g. Apex Cleaning Group"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Admin Owner Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.owner}
                            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                            placeholder="e.g. Robert Smith"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Select Subscription Plan</label>
                        <select
                            value={formData.plan}
                            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        >
                            <option>Starter</option>
                            <option>Professional</option>
                            <option>Enterprise</option>
                        </select>
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
                            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition"
                        >
                            Create Tenant
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default CompaniesPage;
