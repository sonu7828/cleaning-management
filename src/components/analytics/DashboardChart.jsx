import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const DashboardChart = () => {
    return (
        <div className="bg-[#111827]/85 backdrop-blur-md border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl w-full h-[360px] flex flex-col justify-between">
            <h2 className="text-xl font-bold text-slate-200 mb-4">Monthly Analytics</h2>
            <div className="w-full h-full min-h-0 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" strokeOpacity={0.2} />
                        <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0c102b', borderColor: '#1E293B', color: '#f1f5f9', borderRadius: '12px' }} />
                        <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                        <Line type="monotone" dataKey="pv" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} name="Gross Revenue" />
                        <Line type="monotone" dataKey="uv" stroke="#10b981" strokeWidth={2} name="Net Revenue" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardChart;
