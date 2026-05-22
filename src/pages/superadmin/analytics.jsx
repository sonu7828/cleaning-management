import React from 'react';
import { FaChartLine, FaServer, FaDatabase, FaNetworkWired, FaUserCheck, FaMicrochip } from 'react-icons/fa';

const SaaSAnalyticsPage = () => {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaChartLine className="text-purple-500" />
                    SaaS Platform Analytics
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Real-time telemetries, infrastructure workloads, and system transaction rates.</p>
            </div>

            {/* Performance KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Active Socket Links</span>
                        <FaNetworkWired className="text-purple-400 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-white">412</div>
                    <div className="text-[10px] text-slate-500 font-bold">Real-time worker connections</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Database TPS</span>
                        <FaDatabase className="text-blue-400 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-white">1,280</div>
                    <div className="text-[10px] text-slate-500 font-bold">Transactions per second average</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Node CPU Load</span>
                        <FaMicrochip className="text-emerald-400 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-emerald-400">12.5%</div>
                    <div className="text-[10px] text-slate-500 font-bold">AWS Cluster auto-scaled limits</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Monthly Active Users</span>
                        <FaUserCheck className="text-indigo-400 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-white">9,842</div>
                    <div className="text-[10px] text-slate-500 font-bold">Active staff, client, and admin accounts</div>
                </div>
            </div>

            {/* Servers List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Infrastructure Nodes */}
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                    <div>
                        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                            <FaServer className="text-purple-400" /> System Clusters / Microservices
                        </h3>
                        <p className="text-xs text-slate-400">Health indicators and node memory capacities.</p>
                    </div>

                    <div className="space-y-3.5">
                        {[
                            { name: 'Gateway Proxy Node 1', status: 'Healthy', load: '18%', mem: '1.2 GB / 4 GB', color: 'bg-emerald-500' },
                            { name: 'Authentication microservice', status: 'Healthy', load: '8%', mem: '0.8 GB / 2 GB', color: 'bg-emerald-500' },
                            { name: 'Roster / Job scheduler daemon', status: 'Healthy', load: '32%', mem: '2.5 GB / 8 GB', color: 'bg-emerald-500' },
                            { name: 'Invoicing & Tax processor', status: 'Healthy', load: '14%', mem: '1.1 GB / 4 GB', color: 'bg-emerald-500' }
                        ].map((srv, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row justify-between text-xs p-3.5 bg-[#0B1120] border border-[#1E293B]/40 rounded-xl gap-2">
                                <div className="space-y-0.5">
                                    <div className="font-bold text-white">{srv.name}</div>
                                    <div className="text-[10px] text-slate-400">Memory Allocation: <span className="text-slate-300 font-semibold">{srv.mem}</span></div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end space-x-4">
                                    <div>
                                        <span className="text-[10px] text-slate-500 font-medium">Load: </span>
                                        <span className="font-bold text-slate-200">{srv.load}</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <span className={`w-2 h-2 rounded-full ${srv.color}`}></span>
                                        <span className="font-bold text-slate-300">{srv.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Database Nodes */}
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                    <div>
                        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                            <FaDatabase className="text-purple-400" /> Database Shards / Replication
                        </h3>
                        <p className="text-xs text-slate-400">Write delays and replication sync states.</p>
                    </div>

                    <div className="space-y-3.5">
                        {[
                            { shard: 'US-East-Shard-1 (Primary)', readLag: '12ms', sync: 'Synchronized', load: '24%', color: 'bg-emerald-500' },
                            { shard: 'EU-West-Shard-2 (Replica)', readLag: '45ms', sync: 'Synchronized', load: '14%', color: 'bg-emerald-500' },
                            { shard: 'AP-South-Shard-3 (Replica)', readLag: '80ms', sync: 'Replicating', load: '9%', color: 'bg-blue-500' },
                        ].map((db, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row justify-between text-xs p-3.5 bg-[#0B1120] border border-[#1E293B]/40 rounded-xl gap-2">
                                <div className="space-y-0.5">
                                    <div className="font-bold text-white">{db.shard}</div>
                                    <div className="text-[10px] text-slate-400">Avg Read Latency: <span className="text-slate-300 font-semibold">{db.readLag}</span></div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end space-x-4">
                                    <div>
                                        <span className="text-[10px] text-slate-500 font-medium">CPU: </span>
                                        <span className="font-bold text-slate-200">{db.load}</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <span className={`w-2 h-2 rounded-full ${db.color}`}></span>
                                        <span className="font-bold text-slate-300">{db.sync}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaaSAnalyticsPage;
