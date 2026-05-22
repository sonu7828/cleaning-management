import React, { useState } from 'react';
import { FaChartBar, FaFileDownload, FaBuilding, FaDollarSign, FaUserPlus, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Button from '../../components/ui/Button';

const PlatformReportsPage = () => {
    const [downloading, setDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);

    // Mock data for graphs
    const subscriptionGrowth = [
        { month: 'Jan', Starter: 8, Professional: 15, Enterprise: 3 },
        { month: 'Feb', Starter: 9, Professional: 18, Enterprise: 4 },
        { month: 'Mar', Starter: 10, Professional: 22, Enterprise: 5 },
        { month: 'Apr', Starter: 11, Professional: 25, Enterprise: 6 },
        { month: 'May', Starter: 12, Professional: 28, Enterprise: 8 },
    ];

    const revenueMetrics = [
        { month: 'Jan', revenue: 3200 },
        { month: 'Feb', revenue: 4100 },
        { month: 'Mar', revenue: 5300 },
        { month: 'Apr', revenue: 6100 },
        { month: 'May', revenue: 7600 },
    ];

    const handleDownloadReport = () => {
        setDownloading(true);
        setTimeout(() => {
            setDownloading(false);
            setDownloadSuccess(true);
            setTimeout(() => setDownloadSuccess(false), 3000);
        }, 2000);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaChartBar className="text-purple-500" />
                        Platform SaaS Reports
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Aggregate financial charts, tenant scaling indexes, and platform growth metrics.</p>
                </div>
                <Button 
                    onClick={handleDownloadReport} 
                    disabled={downloading}
                    className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 shadow-lg shadow-purple-600/10"
                >
                    <FaFileDownload className={`text-xs ${downloading ? 'animate-bounce' : ''}`} />
                    <span>{downloading ? 'Compiling PDF...' : 'Download Platform Report'}</span>
                </Button>
            </div>

            {downloadSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-semibold flex items-center gap-2.5">
                    <FaCheckCircle className="text-emerald-500 text-lg" />
                    SaaS Platform Monthly Report downloaded successfully to your local Downloads directory!
                </div>
            )}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl flex items-center space-x-4">
                    <div className="p-4 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/25">
                        <FaBuilding className="text-xl" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tenant Growth Rate</div>
                        <div className="text-2xl font-black text-white">+28.5% QoQ</div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Continuous business expansion</div>
                    </div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl flex items-center space-x-4">
                    <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/25">
                        <FaDollarSign className="text-xl" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">MRR Expansion</div>
                        <div className="text-2xl font-black text-emerald-400">+$2,450 /mo</div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Average Customer LTV increase</div>
                    </div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl flex items-center space-x-4">
                    <div className="p-4 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/25">
                        <FaUserPlus className="text-xl" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly New Registrations</div>
                        <div className="text-2xl font-black text-white">4 Companies</div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Onboarded clean facility agencies</div>
                    </div>
                </div>
            </div>

            {/* Graphs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subscription Tier Growth */}
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                    <div>
                        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                            <FaCalendarAlt className="text-purple-400" /> Active Tiers Scaling
                        </h3>
                        <p className="text-xs text-slate-400">Track how active subscription plans scale month by month.</p>
                    </div>

                    <div className="h-72 w-full pr-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={subscriptionGrowth}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B/20" opacity={0.2} />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #1E293B', borderRadius: '12px' }}
                                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="Starter" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Professional" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Enterprise" fill="#a855f7" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* MRR Scaling curve */}
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                    <div>
                        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                            <FaDollarSign className="text-purple-400" /> Platform MRR Forecast Curve
                        </h3>
                        <p className="text-xs text-slate-400">Accumulating B2B enterprise subscription revenue trend.</p>
                    </div>

                    <div className="h-72 w-full pr-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueMetrics}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B/20" opacity={0.2} />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #1E293B', borderRadius: '12px' }}
                                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlatformReportsPage;
