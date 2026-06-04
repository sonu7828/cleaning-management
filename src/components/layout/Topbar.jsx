import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaEllipsisH, FaBell, FaSignOutAlt, FaUser, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../context/AppContext';

const routeLabels = {
    '/crm/clients': 'Customers',
    '/crm/leads': 'Leads Pipeline',
    '/crm/quotations': 'Quotations Board',
    '/crm/contracts': 'AMC Contracts',
    '/crm/scheduling': 'Scheduling Calendar',
    '/crm/work-orders': 'Work Orders / Dispatch',
    '/crm/technicians': 'Technicians',
    '/crm/drivers': 'Drivers',
    '/crm/invoices': 'Invoices Desk',
    '/crm/payments': 'Payments',
    '/crm/vat': 'FTA VAT Returns',
    '/crm/reports': 'Reports & Analytics',
    '/settings': 'System Settings',
    '/profile': 'My Profile'
};

const Topbar = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userRole, user, logout, notifications } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const getDashboardLabel = () => {
        switch (userRole) {
            case 'admin': return 'Admin Dashboard';
            case 'sales': return 'Sales Hub';
            case 'dispatch': return 'Dispatch Desk';
            case 'technician': return 'Service Hub';
            case 'accounts': return 'Accounts Desk';
            case 'driver': return 'Logistics Hub';
            default: return 'Admin Dashboard';
        }
    };

    const currentPageLabel = location.pathname === '/dashboard' 
        ? getDashboardLabel() 
        : (routeLabels[location.pathname] || 'Admin Dashboard');

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
    };

    const handleLogout = () => {
        setProfileOpen(false);
        logout();
        navigate('/login');
    };

    const handleGoToProfile = () => {
        setProfileOpen(false);
        navigate('/profile');
    };

    const getRoleColor = () => {
        switch (userRole) {
            case 'admin': return 'text-purple-600';
            case 'sales': return 'text-blue-600';
            case 'dispatch': return 'text-emerald-600';
            case 'technician': return 'text-amber-600';
            case 'accounts': return 'text-rose-600';
            case 'driver': return 'text-indigo-600';
            default: return 'text-slate-600';
        }
    };

    const getRoleBadgeColor = () => {
        switch (userRole) {
            case 'admin': return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'sales': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'dispatch': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'technician': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'accounts': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'driver': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const getRoleLabel = () => {
        switch (userRole) {
            case 'admin': return 'Administrator';
            case 'sales': return 'Sales Team';
            case 'dispatch': return 'Dispatch Operations';
            case 'technician': return 'Cleaning Technician';
            case 'accounts': return 'Accounts Desk';
            case 'driver': return 'Logistics Driver';
            default: return 'User';
        }
    };

    return (
        <header className="relative z-50 flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/5 shadow-lg gap-4">
            {/* Left: Mobile Menu Trigger + Breadcrumb */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Mobile Menu Hamburger */}
                <motion.button
                    onClick={onMenuClick}
                    className="md:hidden text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-xl transition shrink-0"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Open navigation menu"
                >
                    <FaEllipsisH className="text-base" />
                </motion.button>
 
                <div className="flex flex-col min-w-0">
                    <h1 className="text-sm sm:text-base font-black text-white tracking-tight truncate">{currentPageLabel}</h1>
                    <span className={`hidden sm:block text-[9px] font-black uppercase tracking-widest ${getRoleColor()}`}>
                        {getRoleLabel()} Console
                    </span>
                </div>
            </div>

            {/* Right: Global Dashboard Actions */}
            <div className="flex items-center gap-3.5 shrink-0">

                {/* Notifications Link */}
                <motion.button
                    onClick={() => navigate('/notifications')}
                    className="relative p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-white/5 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FaBell className="text-base" />
                    {notifications && notifications.some(n => !n.read) && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-[#020617] animate-pulse"></span>
                    )}
                </motion.button>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <motion.button
                        id="topbar-profile-btn"
                        onClick={() => setProfileOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 p-1.5 sm:pl-2 sm:pr-3 hover:bg-white/5 border border-white/5 rounded-xl transition duration-150"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaUserCircle className="text-2xl text-slate-300" />
                        <span className="hidden sm:block text-xs font-semibold text-slate-300 max-w-[90px] truncate">
                            {user?.name?.split(' ')[0] || 'Profile'}
                        </span>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {profileOpen && (
                            <motion.div
                                id="topbar-profile-dropdown"
                                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                                className="absolute right-0 top-full mt-2 w-64 bg-[#111827] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50"
                            >
                                {/* User Info Header */}
                                <div className="px-4 py-4 bg-gradient-to-b from-[#1E293B]/80 to-transparent border-b border-white/[0.06]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg flex-shrink-0">
                                            {(user?.name || 'A')[0].toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-bold text-white truncate">{user?.name || 'Administrator'}</div>
                                            <div className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@cleancrm.com'}</div>
                                            <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[9px] font-black border ${getRoleBadgeColor()}`}>
                                                {getRoleLabel()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="p-2">
                                    <button
                                        id="topbar-profile-link"
                                        onClick={handleGoToProfile}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition duration-150"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                                            <FaUser className="text-[11px] text-blue-400" />
                                        </div>
                                        <span>My Profile</span>
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="mx-3 border-t border-white/[0.06]"></div>

                                {/* Logout Button */}
                                <div className="p-2">
                                    <button
                                        id="topbar-logout-btn"
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition duration-150 border border-transparent hover:border-rose-500/10"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                                            <FaSignOutAlt className="text-[11px] text-rose-400" />
                                        </div>
                                        <span>Log Out</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Topbar;