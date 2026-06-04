import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { 
    FaSlidersH, FaBuilding, FaEnvelope, FaFileAlt, 
    FaUsers, FaSave, FaCheck, FaLock 
} from 'react-icons/fa';

const SettingsPage = () => {
    const { settings, updateSettings, userRole } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('company');
    const [form, setForm] = useState({ ...settings });
    const [saved, setSaved] = useState(false);

    const isAdmin = userRole === 'admin';

    const handleSave = () => {
        updateSettings(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { id: 'company', label: 'Company Profile', icon: <FaBuilding className="text-xs" /> },
        { id: 'templates', label: 'UAE Invoice SLA', icon: <FaFileAlt className="text-xs" /> },
        { id: 'users', label: 'Staff Roles', icon: <FaUsers className="text-xs" /> },
    ];

    if (!isAdmin) {
        return (
            <div className="text-center py-20 text-slate-400 bg-white border border-slate-200 rounded-2xl">
                <FaLock className="text-4xl mx-auto mb-3 opacity-20" />
                <p className="text-sm font-black text-slate-800">Admin Privileges Required</p>
                <p className="text-xs text-slate-500 mt-1">Please log in as an administrator to change company configs.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <FaSlidersH className="text-blue-600" />
                    Global Platform Configuration
                </h1>
                <p className="text-slate-500 text-xs mt-0.5">Customize corporate profile details, active VAT/TRN numbers, and SLA contract formats.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 flex-wrap border-b border-slate-200 pb-3">
                {tabs.map(tab => (
                    <button 
                        key={tab.id} 
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                            activeTab === tab.id 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10' 
                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                key={activeTab}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5"
            >
                {activeTab === 'company' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-slate-850">Corporate Profile Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Company Legal Name *</label>
                                <input type="text" value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">VAT Registration Number (TRN) *</label>
                                <input type="text" value={form.trn} onChange={e => setForm({ ...form, trn: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="font-bold text-slate-500">HQ Office Location *</label>
                                <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Corporate Phone *</label>
                                <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Corporate Email *</label>
                                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Website URL</label>
                                <input type="text" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Company Logo Source</label>
                                <input type="text" value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                        </div>
                    </div>
                )}


                {activeTab === 'templates' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-slate-850">Document SLA Clauses</h3>
                        <p className="text-slate-500 text-xs mt-0.5">Edit terms appended to all outgoing quotations and digital AMC contracts.</p>
                        <div className="space-y-4 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Quotation Clauses</label>
                                <textarea rows="4" value={form.quotationTerms} onChange={e => setForm({ ...form, quotationTerms: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none font-mono text-[10px] leading-relaxed text-slate-600" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">AMC Clauses</label>
                                <textarea rows="4" value={form.amcTerms} onChange={e => setForm({ ...form, amcTerms: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none font-mono text-[10px] leading-relaxed text-slate-600" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-slate-850">Staff & Roles Control</h3>
                        <div className="overflow-x-auto text-xs">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-450 font-extrabold uppercase tracking-wider">
                                        <th className="py-2.5 px-2">Account Name</th>
                                        <th className="py-2.5 px-2">Login Email</th>
                                        <th className="py-2.5 px-2">Role Access</th>
                                        <th className="py-2.5 px-2">Log Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-semibold text-slate-650">
                                    <tr className="hover:bg-slate-50 transition">
                                        <td className="py-3 px-2 text-slate-800">Administrator</td>
                                        <td className="py-3 px-2">admin@teamenviro.ae</td>
                                        <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-purple-50 text-purple-750 border border-purple-100 text-[8px] font-bold">Admin</span></td>
                                        <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-bold">Active</span></td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition">
                                        <td className="py-3 px-2 text-slate-800">Kareem Fahmi</td>
                                        <td className="py-3 px-2">sales@teamenviro.ae</td>
                                        <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-750 border border-blue-100 text-[8px] font-bold">Sales</span></td>
                                        <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-bold">Active</span></td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition">
                                        <td className="py-3 px-2 text-slate-800">Tariq Mahmood</td>
                                        <td className="py-3 px-2">dispatch@teamenviro.ae</td>
                                        <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100 text-[8px] font-bold">Dispatch Desk</span></td>
                                        <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-bold">Active</span></td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition">
                                        <td className="py-3 px-2 text-slate-800">Ali Hassan</td>
                                        <td className="py-3 px-2">ali@teamenviro.ae</td>
                                        <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-bold">Technician</span></td>
                                        <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-bold">Active</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-3 border-t border-slate-100">
                    <button 
                        onClick={handleSave}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 font-bold rounded-xl text-xs transition-all ${
                            saved 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/10 active:scale-[0.98]'
                        }`}
                    >
                        {saved ? <><FaCheck className="text-xs" /> Saved!</> : <><FaSave className="text-xs" /> Save Settings</>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default SettingsPage;
