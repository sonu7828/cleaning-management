import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import { getClients, getInvoices, getJobs } from '../../services/api';

const Widgets = () => {
    const [stats, setStats] = useState({
        clients: 0,
        revenue: 0,
        jobs: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [clientsList, invoicesList, jobsList] = await Promise.all([
                    getClients(),
                    getInvoices(),
                    getJobs()
                ]);

                const paidRevenue = invoicesList
                    .filter(inv => inv.status === 'Paid')
                    .reduce((sum, inv) => sum + Number(inv.amount), 0);

                setStats({
                    clients: clientsList.length,
                    revenue: paidRevenue,
                    jobs: jobsList.length
                });
            } catch (e) {
                console.error('Error loading widget stats:', e);
            }
        };
        fetchStats();
    }, []);

    const widgets = [
        {
            title: 'Total Clients',
            value: stats.clients,
            icon: <FaUsers className="text-3xl text-blue-500"/>,
        },
        {
            title: 'Total Revenue',
            value: `$${stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: <FaDollarSign className="text-3xl text-emerald-500"/>,
        },
        {
            title: 'Active Scheduled Jobs',
            value: stats.jobs,
            icon: <FaCalendarAlt className="text-3xl text-amber-500"/>,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {widgets.map((widget, index) => (
                <motion.div 
                    key={index} 
                    className="bg-[#111827]/85 backdrop-blur-md shadow-lg border border-[#1E293B]/30 rounded-2xl p-6 flex items-center justify-between hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300" 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{widget.title}</h3>
                        <p className="text-3xl font-black text-white mt-2">{widget.value}</p>
                    </div>
                    <div className="p-3 bg-[#0B1120] rounded-2xl border border-[#1E293B]/40">
                        {widget.icon}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Widgets;
