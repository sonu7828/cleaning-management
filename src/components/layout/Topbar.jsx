import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaEllipsisH, FaBell, FaSignOutAlt, FaUser, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../context/AppContext';

// Map routes to breadcrumb labels
const routeLabels = {
    '/dashboard': 'Dashboard',
    '/analytics': 'Analytics',
    '/crm/clients': 'Clients',
    '/crm/leads': 'Leads',
    '/crm/quotations': 'Quotations',
    '/crm/contracts': 'AMC Contracts',
    '/crm/scheduler': 'Scheduler',
    '/crm/technicians': 'Technicians',
    '/crm/drivers': 'Drivers',
    '/crm/reports': 'Reports',
    '/erp/invoices': 'Invoices',
    '/erp/operations': 'Daily Jobs',
    '/erp/payments': 'Payments',
    '/profile': 'My Profile',
    '/notifications': 'Notifications',
    '/settings': 'Settings',
    '/superadmin/companies': 'Companies',
    '/superadmin/users': 'User Management',
    '/superadmin/plans': 'Subscription Plans',
    '/superadmin/analytics': 'SaaS Analytics',
    '/superadmin/reports': 'Platform Reports',
    '/superadmin/logs': 'Activity Logs',
    '/technician/schedule': 'My Schedule',
    '/technician/history': 'Work History',
    '/technician/attendance': 'Attendance',
    '/driver/routes': 'Routes',
    '/driver/reimbursements': 'Petty Cash',
    '/driver/collections': 'Collections',
    '/accounts/vat': 'VAT / Tax',
    '/accounts/transactions': 'Transactions',
    '/accounts/reports': 'Financial Reports',
    '/client/contracts': 'My Contracts',
    '/client/billings': 'My Invoices',
    '/client/complaints': 'Support Tickets',
    '/client/history': 'Service History',
};

const Topbar = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userRole, user, logout } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const currentPageLabel = routeLabels[location.pathname] || 'Operations Console';

    // Close dropdown on outside click
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
        if (searchQuery.trim()) {
            console.log('Search query:', searchQuery);
        }
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
            case 'superadmin': return 'text-purple-400';
            case 'admin': return 'text-blue-400';
            case 'technician': return 'text-amber-400';
            case 'driver': return 'text-emerald-400';
            case 'accounts': return 'text-rose-400';
            case 'client': return 'text-cyan-400';
            default: return 'text-blue-400';
        }
    };

    const getRoleBadgeColor = () => {
        switch (userRole) {
            case 'superadmin': return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
            case 'technician': return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
            case 'driver': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
            case 'accounts': return 'bg-rose-500/10 text-rose-300 border-rose-500/20';
            case 'client': return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20';
            default: return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
        }
    };

    const getRoleLabel = () => {
        switch (userRole) {
            case 'superadmin': return 'Super Admin';
            case 'technician': return 'Technician';
            case 'driver': return 'Driver Squad';
            case 'accounts': return 'Accounts Dept.';
            case 'client': return 'Client Portal';
            default: return 'Operations Admin';
        }
    };

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#020617]/75 backdrop-blur-xl border-b border-white/5 shadow-sm gap-4">
            {/* Left: Mobile Menu Trigger + Breadcrumb */}
            <div className="flex items-center gap-4 min-w-0">
                {/* Mobile Menu Hamburger */}
                <motion.button
                    onClick={onMenuClick}
                    className="md:hidden text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-xl transition shrink-0"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Open navigation menu"
                >
                    <FaEllipsisH className="text-lg" />
                </motion.button>

                <div className="flex flex-col min-w-0">
                    <h1 className="text-base font-extrabold text-white tracking-tight truncate">{currentPageLabel}</h1>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${getRoleColor()}`}>
                        {getRoleLabel()} Console
                    </span>
                </div>
            </div>

            {/* Right: Search + Global Dashboard Actions */}
            <div className="flex items-center gap-3.5 shrink-0">
                {/* Clean spotlight search bar */}
                <form onSubmit={handleSearch} className="hidden sm:flex items-center relative group">
                    <FaSearch className="absolute left-3.5 top-3 text-slate-500 text-xs transition group-focus-within:text-blue-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search workspace..."
                        className="bg-[#0B1120] border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 w-48 md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 shadow-inner transition-all duration-300"
                    />
                </form>

                {/* Notifications Link */}
                <motion.button
                    onClick={() => navigate('/notifications')}
                    className="relative p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-white/5 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FaBell className="text-sm" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-[#020617]"></span>
                </motion.button>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <motion.button
                        id="topbar-profile-btn"
                        onClick={() => setProfileOpen((prev) => !prev)}
                        className="flex items-center gap-2 p-1.5 pl-2 pr-3 hover:bg-white/5 border border-white/5 rounded-xl transition duration-150"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaUserCircle className="text-2xl text-slate-300" />
                        <span className="hidden sm:block text-xs font-semibold text-slate-300 max-w-[90px] truncate">
                            {user?.name?.split(' ')[0] || 'Profile'}
                        </span>
                        <FaChevronDown
                            className={`text-[10px] text-slate-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                        />
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