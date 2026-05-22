import React from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaFileDownload, FaMoneyBillWave, FaBalanceScale, FaPercentage } from 'react-icons/fa';
import Button from '../../components/ui/Button';

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const AccountsReportsPage = () => {
    const handleDownloadReport = (format) => {
        alert(`Compiling and exporting financial dashboard summaries to ${format}. (Mock Export)`);
    };

    return (
        <motion.div 
            className="space-y-6 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <div className="p-2 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                            <FaChartBar className="text-rose-500 text-lg" />
                        </div>
                        Financial Reports
                    </h1>
                    <p className="text-slate-400 text-sm mt-1.5 ml-0 sm:ml-11">Consolidated balance sheets, margin indicators, and cash reconciliations.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button 
                        onClick={() => handleDownloadReport('PDF')} 
                        className="bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 text-xs w-full sm:w-auto justify-center shadow-lg shadow-rose-500/10 hover:shadow-rose-500/20 transition-all"
                    >
                        <FaFileDownload /> PDF Summary
                    </Button>
                    <Button 
                        onClick={() => handleDownloadReport('XLS')} 
                        variant="secondary" 
                        className="flex items-center gap-1.5 text-xs w-full sm:w-auto justify-center border-white/10 hover:bg-white/5 transition-all"
                    >
                        <FaFileDownload /> Excel Sheet
                    </Button>
                </div>
            </motion.div>

            {/* Profit Margin Progress Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Net Profit & Gross Revenue Ratios */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 shadow-xl hover:border-rose-500/20 hover:bg-white/[0.03] transition-all duration-300 group"
                >
                    <div className="mb-6">
                        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                            <FaBalanceScale className="text-rose-400" /> 
                            Revenue vs Expenditures
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Monthly operational margin allocations.</p>
                    </div>

                    <div className="space-y-5">
                        {[
                            { label: 'B2B Cleaning Contracts', value: '$24,000.00', pct: 75, color: 'bg-emerald-500', glow: 'shadow-emerald-500/20' },
                            { label: 'One-off Deep Clean Quotes', value: '$5,550.00', pct: 18, color: 'bg-blue-500', glow: 'shadow-blue-500/20' },
                            { label: 'Driver Squad Petty Cash', value: '$239.50', pct: 1.5, color: 'bg-rose-500', glow: 'shadow-rose-500/20' },
                            { label: 'Administrative Overheads', value: '$1,800.00', pct: 5.5, color: 'bg-amber-500', glow: 'shadow-amber-500/20' },
                        ].map((item, idx) => (
                            <div key={idx} className="space-y-2 group/item hover:bg-white/[0.02] p-2 -m-2 rounded-xl transition-colors duration-200">
                                <div className="flex justify-between font-semibold text-slate-300 text-xs">
                                    <span>{item.label}</span>
                                    <span className="text-white font-bold">{item.value} <span className="text-slate-400 font-medium">({item.pct}%)</span></span>
                                </div>
                                <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden border border-white/[0.04]">
                                    <motion.div 
                                        className={`h-full rounded-full ${item.color} shadow-md ${item.glow}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.pct}%` }}
                                        transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Profit Ratios */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 shadow-xl hover:border-rose-500/20 hover:bg-white/[0.03] transition-all duration-300 group"
                >
                    <div className="mb-6">
                        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                            <FaPercentage className="text-rose-400" /> 
                            Margin Analysis Tiers
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Quarterly profit ratio analysis.</p>
                    </div>

                    <div className="space-y-3">
                        {[
                            { margin: 'Gross Operational Margin', pct: '88.4%', desc: 'Sales minus crew wages', color: 'text-emerald-400' },
                            { margin: 'Net Profit Margin Ratio', pct: '74.2%', desc: 'After billing overhead taxes', color: 'text-rose-400' },
                            { margin: 'Staff Utilization Return', pct: '92.5%', desc: 'Roster active duty ratios', color: 'text-blue-400' },
                        ].map((m, idx) => (
                            <motion.div 
                                key={idx} 
                                className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200 cursor-default"
                                whileHover={{ x: 4 }}
                            >
                                <div className="space-y-0.5 overflow-hidden mr-4">
                                    <div className="text-sm font-bold text-white truncate">{m.margin}</div>
                                    <div className="text-[11px] text-slate-400">{m.desc}</div>
                                </div>
                                <div className={`text-2xl font-black ${m.color} tabular-nums tracking-tight`}>{m.pct}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Financial summaries */}
            <motion.div 
                variants={itemVariants}
                className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 shadow-xl hover:border-rose-500/20 transition-all duration-300"
            >
                <div className="flex items-center gap-2 font-bold text-sm text-white pb-4 mb-4 border-b border-white/5">
                    <FaMoneyBillWave className="text-rose-400" />
                    <span>Quarterly Income & Expense Statement</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Fiscal Quarter', value: 'Q2 2026', isBadge: false, color: 'text-white' },
                        { label: 'Gross Invoicing', value: '$32,050.00', isBadge: false, color: 'text-emerald-400' },
                        { label: 'Approved Reclaims', value: '$239.50', isBadge: false, color: 'text-rose-400' },
                        { label: 'Audit Status', value: 'UNAUDITED', isBadge: true, color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200"
                            whileHover={{ y: -2 }}
                        >
                            <span className="text-slate-400 block uppercase font-bold tracking-wider text-[10px] mb-2">
                                {item.label}
                            </span>
                            {item.isBadge ? (
                                <span className={`px-3 py-1 rounded-full text-[11px] font-black border ${item.color} inline-block`}>
                                    {item.value}
                                </span>
                            ) : (
                                <span className={`font-extrabold text-lg ${item.color} tracking-tight`}>
                                    {item.value}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AccountsReportsPage;
