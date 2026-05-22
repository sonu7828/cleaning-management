import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { FaBuilding, FaDollarSign, FaServer, FaHistory, FaPlus, FaCheckCircle, FaLaptopHouse } from 'react-icons/fa';

const SuperAdminDashboard = () => {
    const { companies, logs, addCompany } = useContext(AppContext);
    
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [plan, setPlan] = useState('Professional');
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleCreateCompany = (e) => {
        e.preventDefault();
        if (!name || !owner) return;
        addCompany({ name, owner, plan });
        setName('');
        setOwner('');
        setPlan('Professional');
        setShowModal(false);
        setSuccessMessage('New SaaS Company tenant provisioned successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    // Calculate global stats
    const totalTenants = companies.length;
    const activeTenants = companies.filter(c => c.status === 'Active').length;
    const totalGlobalRevenue = companies.reduce((acc, curr) => {
        let monthlyFee = curr.plan === 'Enterprise' ? 399 : curr.plan === 'Professional' ? 149 : 49;
        return acc + monthlyFee;
    }, 0);

    return (
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaServer className="text-purple-500" />
                        Platform Control Center
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Global SaaS Admin panel monitoring tenants, billing metrics, and audit logs.</p>
                </div>
                
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/10 transition-all text-sm"
                >
                    <FaPlus className="text-xs" />
                    <span>Provision SaaS Tenant</span>
                </button>
            </div>

            {successMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-semibold flex items-center gap-2.5 shadow-sm">
                    <FaCheckCircle className="text-emerald-500 text-lg" />
                    {successMessage}
                </div>
            )}

            {/* Platform KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Total SaaS Tenants</span>
                        <FaBuilding className="text-purple-500 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-white">{totalTenants}</div>
                    <div className="text-xs text-slate-500 font-medium">Registered global accounts</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Active Organizations</span>
                        <FaLaptopHouse className="text-emerald-500 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-emerald-400">{activeTenants}</div>
                    <div className="text-xs text-slate-500 font-medium">Running operational pipelines</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">MRR Forecast</span>
                        <FaDollarSign className="text-blue-500 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-white">${totalGlobalRevenue.toLocaleString()}/mo</div>
                    <div className="text-xs text-slate-500 font-medium">Accumulated subscription base</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Platform Health</span>
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                    </div>
                    <div className="text-3xl font-black text-white">99.98%</div>
                    <div className="text-xs text-slate-500 font-medium">All services operational</div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Tenants Table */}
                <div className="lg:col-span-7 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Active Tenant Directories</h3>
                        <p className="text-xs text-slate-400">Manage client databases, active license status, and subscription tiers.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                    <th className="py-3 px-2">Company</th>
                                    <th className="py-3 px-2">Administrator</th>
                                    <th className="py-3 px-2">Reg. Date</th>
                                    <th className="py-3 px-2">License</th>
                                    <th className="py-3 px-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-300">
                                {companies.map((company) => (
                                    <tr key={company.id} className="hover:bg-[#1E293B]/10 transition">
                                        <td className="py-3.5 px-2 flex items-center space-x-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">{company.logo}</div>
                                            <span className="font-bold text-white truncate max-w-[150px]">{company.name}</span>
                                        </td>
                                        <td className="py-3.5 px-2 text-slate-400">{company.owner}</td>
                                        <td className="py-3.5 px-2 text-slate-500">{company.registeredOn}</td>
                                        <td className="py-3.5 px-2">
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#0B1120]/60 text-slate-300 border border-[#1E293B]/30">
                                                {company.plan}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                                company.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' :
                                                company.status === 'Trial' ? 'bg-blue-500/10 text-blue-400 border-blue-500/25' :
                                                'bg-rose-500/10 text-rose-400 border-rose-500/25'
                                            }`}>
                                                {company.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Audit Logs */}
                <div className="lg:col-span-5 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                            <FaHistory className="text-slate-400" />
                            System Audit Trail
                        </h3>
                        <p className="text-xs text-slate-400">Live operational events tracked across all SaaS databases.</p>
                    </div>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                        {logs.map((log) => (
                            <div key={log.id} className="p-3 bg-[#0B1120]/60 rounded-xl border border-[#1E293B]/20 space-y-1 text-xs">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-slate-300">{log.user}</span>
                                    <span className="text-slate-500">{log.time}</span>
                                </div>
                                <p className="text-slate-400 leading-normal font-semibold">{log.action}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Provision Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <motion.div 
                        className="relative bg-[#111827] rounded-3xl border border-[#1E293B]/40 p-6 w-full max-w-md shadow-2xl z-10 space-y-5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div>
                            <h3 className="text-xl font-black text-white tracking-tight">Provision SaaS Tenant</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Spin up a new client company database immediately.</p>
                        </div>

                        <form onSubmit={handleCreateCompany} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Company Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Elite Janitorial Service"
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Owner Name</label>
                                <input
                                    type="text"
                                    required
                                    value={owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                    placeholder="e.g. Richard Hendricks"
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Subscription Plan</label>
                                <select
                                    value={plan}
                                    onChange={(e) => setPlan(e.target.value)}
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                                >
                                    <option>Starter</option>
                                    <option>Professional</option>
                                    <option>Enterprise</option>
                                </select>
                            </div>

                            <div className="pt-4 flex items-center justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 transition text-xs"
                                >
                                    Provision Database
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default SuperAdminDashboard;
