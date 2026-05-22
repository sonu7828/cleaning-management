import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const LeadPipeline = ({ leads = [] }) => {
    // Dynamically calculate counts based on incoming leads array
    const counts = {
        New: leads.filter(l => l.status === 'New').length,
        Contacted: leads.filter(l => l.status === 'Contacted').length,
        Converted: leads.filter(l => l.status === 'Converted').length,
    };

    const data = [
        { name: 'New Leads', count: counts.New, fill: '#3b82f6' }, // blue-500
        { name: 'Contacted', count: counts.Contacted, fill: '#f59e0b' }, // amber-500
        { name: 'Converted', count: counts.Converted, fill: '#10b981' }, // emerald-500
    ];

    const totalLeads = leads.length;

    return (
        <motion.div 
            className="p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }}
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Leads Pipeline</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Pipeline status overview of active prospects.</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-xs text-gray-500 font-semibold">
                    Total: <span className="text-gray-800 font-bold">{totalLeads}</span>
                </div>
            </div>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            stroke="#94a3b8" 
                            fontSize={12} 
                            fontWeight={600}
                            tickLine={false} 
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="#94a3b8" 
                            fontSize={12} 
                            fontWeight={600}
                            tickLine={false} 
                            axisLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip 
                            cursor={{ fill: '#f8fafc', radius: 8 }}
                            contentStyle={{ 
                                background: '#ffffff', 
                                border: '1px solid #e2e8f0', 
                                borderRadius: '12px', 
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}
                        />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default LeadPipeline;
