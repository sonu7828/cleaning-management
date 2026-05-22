import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaShieldAlt, FaTrashAlt, FaFilter, FaSearch, FaHistory } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const LogsPage = () => {
    const { logs, logActivity, user } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterUser, setFilterUser] = useState('All');

    // Filter logic
    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              log.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterUser === 'All' || log.user === filterUser;
        return matchesSearch && matchesFilter;
    });

    // Unique user lists for filters
    const usersList = ['All', ...new Set(logs.map(log => log.user))];

    const handleClearLogs = () => {
        if (window.confirm('Are you sure you want to clear system audit logs? (Mock Action)')) {
            logActivity(user.name, 'Cleared Platform Audit Logs history');
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaShieldAlt className="text-purple-500" />
                        System Audit Logs
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Real-time immutable security logs across all multi-tenant node clusters.</p>
                </div>
                <Button onClick={handleClearLogs} variant="danger" className="flex items-center gap-2">
                    <FaTrashAlt className="text-xs" />
                    <span>Clear Logs History</span>
                </Button>
            </div>

            {/* Filter Panel */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute left-4 top-3.5 text-slate-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search logs by action or user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1 uppercase">
                        <FaFilter className="text-[10px]" /> User Role:
                    </span>
                    <select
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                        className="bg-[#0B1120] border border-[#1E293B]/40 text-slate-200 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                        {usersList.map((usr) => (
                            <option key={usr} value={usr}>{usr}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Logs List Container */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-300 pb-2 border-b border-[#1E293B]/20">
                    <FaHistory className="text-purple-400 text-xs" />
                    <span>Audit Trail Log Entries ({filteredLogs.length})</span>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {filteredLogs.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 text-sm">No security log entries match your filters.</div>
                    ) : (
                        filteredLogs.map((log) => {
                            const isSystem = log.user === 'System';
                            return (
                                <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#0B1120]/60 hover:bg-[#0B1120] border border-[#1E293B]/25 rounded-xl gap-2 transition">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 uppercase tracking-widest ${
                                            isSystem ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                            log.user.includes('Super') ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        }`}>
                                            {log.user.slice(0, 2)}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-100">{log.action}</div>
                                            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Executor: <span className="text-slate-300">{log.user}</span></div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-bold sm:text-right shrink-0">{log.time}</div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default LogsPage;
