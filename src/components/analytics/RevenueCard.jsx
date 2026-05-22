import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign } from 'react-icons/fa';
import { getInvoices } from '../../services/api';

const RevenueCard = ({ revenue }) => {
    const [localRevenue, setLocalRevenue] = useState(revenue !== undefined ? revenue : null);

    useEffect(() => {
        if (revenue !== undefined) {
            setLocalRevenue(revenue);
            return;
        }
        const fetchRevenue = async () => {
            try {
                const invoices = await getInvoices();
                const total = invoices
                    .filter(inv => inv.status === 'Paid')
                    .reduce((sum, inv) => sum + Number(inv.amount), 0);
                setLocalRevenue(total);
            } catch (e) {
                console.error('Error fetching revenue in RevenueCard:', e);
            }
        };
        fetchRevenue();
    }, [revenue]);

    return (
        <motion.div 
            className="bg-[#111827]/85 backdrop-blur-md shadow-xl border border-[#1E293B]/30 rounded-2xl p-6 flex items-center justify-between hover:shadow-2xl transition-all duration-200" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mr-4">
                    <FaDollarSign className="text-emerald-400 text-3xl"/>
                </div>
                <div>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Settled Revenue</h2>
                    <p className="text-3xl font-black text-white mt-1">
                        ${localRevenue !== null ? Number(localRevenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default RevenueCard;
