import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaUserShield,
    FaUserCog,
    FaTools,
    FaTruck,
    FaFileInvoiceDollar,
    FaBuilding,
    FaArrowRight,
    FaEnvelope,
    FaLock,
    FaHome
} from 'react-icons/fa';
import { FiShield, FiCpu } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

const LoginPage = () => {
    const { loginAsRole } = useContext(AppContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingRole, setLoadingRole] = useState(null);

    const roles = [
        {
            id: 'superadmin',
            title: 'Super Admin',
            borderColor: 'border-purple-500/30',
            hoverBg: 'hover:bg-purple-500/10',
            hoverBorder: 'hover:border-purple-500/50',
            iconBg: 'bg-purple-500/10',
            iconColor: 'text-purple-400',
            shadowColor: 'shadow-purple-500/10',
            icon: <FaUserShield className="text-xs" />
        },
        {
            id: 'admin',
            title: 'Admin / Agency',
            borderColor: 'border-blue-500/30',
            hoverBg: 'hover:bg-blue-500/10',
            hoverBorder: 'hover:border-blue-500/50',
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-400',
            shadowColor: 'shadow-blue-500/10',
            icon: <FaUserCog className="text-xs" />
        },
        {
            id: 'technician',
            title: 'Technician',
            borderColor: 'border-amber-500/30',
            hoverBg: 'hover:bg-amber-500/10',
            hoverBorder: 'hover:border-amber-500/50',
            iconBg: 'bg-amber-500/10',
            iconColor: 'text-amber-400',
            shadowColor: 'shadow-amber-500/10',
            icon: <FaTools className="text-xs" />
        },
        {
            id: 'driver',
            title: 'Driver Portal',
            borderColor: 'border-emerald-500/30',
            hoverBg: 'hover:bg-emerald-500/10',
            hoverBorder: 'hover:border-emerald-500/50',
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-400',
            shadowColor: 'shadow-emerald-500/10',
            icon: <FaTruck className="text-xs" />
        },
        {
            id: 'accounts',
            title: 'Accounts Dept',
            borderColor: 'border-rose-500/30',
            hoverBg: 'hover:bg-rose-500/10',
            hoverBorder: 'hover:border-rose-500/50',
            iconBg: 'bg-rose-500/10',
            iconColor: 'text-rose-400',
            shadowColor: 'shadow-rose-500/10',
            icon: <FaFileInvoiceDollar className="text-xs" />
        },
        {
            id: 'client',
            title: 'Client Portal',
            borderColor: 'border-cyan-500/30',
            hoverBg: 'hover:bg-cyan-500/10',
            hoverBorder: 'hover:border-cyan-500/50',
            iconBg: 'bg-cyan-500/10',
            iconColor: 'text-cyan-400',
            shadowColor: 'shadow-cyan-500/10',
            icon: <FaBuilding className="text-xs" />
        }
    ];

    const handleQuickLogin = (roleId) => {
        setLoadingRole(roleId);
        setTimeout(() => {
            loginAsRole(roleId);
            setLoadingRole(null);
            navigate('/dashboard');
        }, 800);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoadingRole('form');
        setTimeout(() => {
            loginAsRole('admin');
            setLoadingRole(null);
            navigate('/dashboard');
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* Decorative Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg"
            >
                {/* Logo & Heading */}
                <div className="text-center mb-10">
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl shadow-blue-600/20 mb-6 cursor-pointer border border-white/10"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                    >
                        <span className="text-2xl font-black text-white">C</span>
                    </motion.div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-slate-400 font-medium">Enter custom credentials or select a quick access desk.</p>
                </div>

                {/* Glass Card */}
                <div className="bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 rounded-[40px] border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
                    {/* Card Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-blue-600/10 blur-3xl pointer-events-none" />

                    {/* Login Form - MOVED TO TOP */}
                    <form onSubmit={handleFormSubmit} className="relative z-10 space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1">
                                Terminal Address
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/30 group-focus-within:text-blue-400 transition-colors">
                                    <FaEnvelope className="text-sm" />
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="operations@agency.com"
                                    className="w-full pl-11 pr-4 h-12 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm font-medium placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 focus:bg-white/[0.05] transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">
                                    Security Key
                                </label>
                                <button
                                    type="button"
                                    onClick={() => navigate('/forgot-password')}
                                    className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:underline"
                                >
                                    Lost Key?
                                </button>
                            </div>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/30 group-focus-within:text-blue-400 transition-colors">
                                    <FaLock className="text-sm" />
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 h-12 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm font-medium placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 focus:bg-white/[0.05] transition-all duration-300"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loadingRole !== null}
                            className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/30 active:scale-[0.98] transition-all text-sm flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loadingRole === 'form' ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Connecting...</span>
                                </>
                            ) : (
                                <>
                                    <span>Access Dashboard</span>
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative z-10 border-t border-white/5" />

                    {/* Operation Desks Grid - MOVED TO BOTTOM & MADE SMALLER */}
                    <div className="relative z-10">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1 block mb-3">
                            Quick Access Desks
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {roles.map((role) => (
                                <motion.button
                                    key={role.id}
                                    onClick={() => handleQuickLogin(role.id)}
                                    disabled={loadingRole !== null}
                                    className={`group relative p-2 rounded-xl bg-white/[0.02] border ${role.borderColor} ${role.hoverBg} ${role.hoverBorder} text-center transition-all duration-300 shadow-lg ${role.shadowColor} disabled:opacity-40 disabled:cursor-not-allowed`}
                                    whileHover={{ scale: 1.05, y: -1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className={`w-7 h-7 rounded-lg ${role.iconBg} flex items-center justify-center mx-auto mb-1.5 ${role.iconColor} transition-colors`}>
                                        {role.icon}
                                    </div>
                                    <span className="text-[9px] font-bold text-white/80 uppercase tracking-wider block leading-tight truncate">
                                        {role.title}
                                    </span>
                                    {loadingRole === role.id && (
                                        <span className="absolute top-1.5 right-1.5 w-2 h-2 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Home Link */}
                    <div className="relative z-10 flex justify-center pt-2">
                        <motion.button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-1.5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] hover:text-white/60 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaHome className="text-[10px]" />
                            Home
                        </motion.button>
                    </div>
                </div>

                {/* Bottom Security Badges */}
                <div className="mt-10 flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                        <FiShield className="text-blue-400" />
                        <span>256-bit AES</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                        <FiCpu className="text-indigo-400" />
                        <span>Edge Nodes Active</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;