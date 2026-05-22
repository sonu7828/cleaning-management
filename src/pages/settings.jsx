import React, { useState } from 'react';
import { FaSlidersH, FaTools, FaDatabase, FaKey, FaShieldAlt } from 'react-icons/fa';

const SettingsPage = () => {
    const [theme, setTheme] = useState('Deep Dark Blue');
    const [taxRate, setTaxRate] = useState('15');
    const [backupInterval, setBackupInterval] = useState('Daily');
    const [smtpServer, setSmtpServer] = useState('smtp.cleancrm.com');

    const handleSave = (e) => {
        e.preventDefault();
        alert('System settings statefully saved to localStorage!');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto text-slate-100">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaSlidersH className="text-blue-500" />
                    System Settings
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Configure company-wide variables, database sharding, and communication channels.</p>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Navigation Sidebar panel */}
                <div className="md:col-span-4 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-4 shadow-xl h-fit space-y-1">
                    <div className="p-3.5 bg-blue-600/10 text-blue-400 rounded-xl font-bold text-xs flex items-center gap-2 border border-blue-500/20">
                        <FaTools className="text-xs" />
                        <span>General Settings</span>
                    </div>
                    <div className="p-3.5 text-slate-400 hover:text-white rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition">
                        <FaDatabase className="text-xs" />
                        <span>Database Nodes</span>
                    </div>
                    <div className="p-3.5 text-slate-400 hover:text-white rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition">
                        <FaShieldAlt className="text-xs" />
                        <span>Security & Access</span>
                    </div>
                    <div className="p-3.5 text-slate-400 hover:text-white rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition">
                        <FaKey className="text-xs" />
                        <span>Integration APIs</span>
                    </div>
                </div>

                {/* Configuration form */}
                <div className="md:col-span-8 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-6">
                    <h3 className="text-base font-bold text-white border-b border-[#1E293B]/20 pb-3 flex items-center gap-2">
                        <FaTools className="text-blue-500" /> ERP Core Configurations
                    </h3>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Platform Base Theme</label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                >
                                    <option>Deep Dark Blue</option>
                                    <option>Sleek Slate (Legacy)</option>
                                    <option>Light Gray Mode</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Standard VAT/GST Rate (%)</label>
                                <input
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(e.target.value)}
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Data Backup Interval</label>
                                <select
                                    value={backupInterval}
                                    onChange={(e) => setBackupInterval(e.target.value)}
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                >
                                    <option>Hourly</option>
                                    <option>Daily</option>
                                    <option>Weekly</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">SMTP Server Endpoint</label>
                                <input
                                    type="text"
                                    value={smtpServer}
                                    onChange={(e) => setSmtpServer(e.target.value)}
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-blue-600/20"
                        >
                            Save System Variables
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
