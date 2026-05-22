import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaSignOutAlt, 
    FaTimes, 
    FaTachometerAlt, 
    FaUsers, 
    FaUserFriends, 
    FaFileInvoiceDollar, 
    FaCalendarCheck, 
    FaChartBar, 
    FaUser,
    FaShieldAlt,
    FaTools,
    FaTruck,
    FaBuilding,
    FaBell,
    FaSlidersH,
    FaReceipt,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';

const iconMap = {
    dashboard: <FaTachometerAlt className="text-base" />,
    clients: <FaUsers className="text-base" />,
    leads: <FaUserFriends className="text-base" />,
    invoices: <FaFileInvoiceDollar className="text-base" />,
    operations: <FaCalendarCheck className="text-base" />,
    analytics: <FaChartBar className="text-base" />,
    profile: <FaUser className="text-base animate-spin-slow" />,
    companies: <FaBuilding className="text-base" />,
    logs: <FaShieldAlt className="text-base" />,
    schedule: <FaCalendarCheck className="text-base" />,
    history: <FaChartBar className="text-base" />,
    routes: <FaTruck className="text-base" />,
    reimbursements: <FaFileInvoiceDollar className="text-base" />,
    vat: <FaFileInvoiceDollar className="text-base" />,
    contracts: <FaBuilding className="text-base" />,
    billings: <FaFileInvoiceDollar className="text-base" />,
    complaints: <FaTools className="text-base" />,
    plans: <FaBuilding className="text-base" />,
    notifications: <FaBell className="text-base" />,
    settings: <FaSlidersH className="text-base" />,
    quotations: <FaReceipt className="text-base" />,
    scheduler: <FaCalendarCheck className="text-base" />,
    technicians: <FaTools className="text-base" />,
    drivers: <FaTruck className="text-base" />,
    payments: <FaFileInvoiceDollar className="text-base" />,
    reports: <FaChartBar className="text-base" />,
    transactions: <FaFileInvoiceDollar className="text-base" />
};

const Sidebar = ({ isOpen, onClose, isCollapsed, setIsCollapsed }) => {
  // Close sidebar on Escape key press
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);
    const { logout, userRole, user } = useContext(AppContext);
    const location = useLocation();

    // Dynamically filter navigation items based on user role
    const getNavigationItems = () => {
        const dashboardItem = { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' };
        const profileItem = { name: 'Profile', path: '/profile', icon: 'profile' };
        const notificationsItem = { name: 'Notifications', path: '/notifications', icon: 'notifications' };

        if (userRole === 'superadmin') {
            return [
                dashboardItem,
                { name: 'Total Companies', path: '/superadmin/companies', icon: 'companies' },
                { name: 'User Management', path: '/superadmin/users', icon: 'clients' },
                { name: 'Subscription Plans', path: '/superadmin/plans', icon: 'plans' },
                { name: 'System Analytics', path: '/superadmin/analytics', icon: 'analytics' },
                { name: 'Platform Reports', path: '/superadmin/reports', icon: 'reports' },
                { name: 'Activity Logs', path: '/superadmin/logs', icon: 'logs' },
                notificationsItem,
                profileItem
            ];
        }
        if (userRole === 'technician') {
            return [
                dashboardItem,
                { name: 'Today Assigned Jobs', path: '/technician/schedule', icon: 'schedule' },
                { name: 'Job History', path: '/technician/history', icon: 'history' },
                { name: 'Attendance', path: '/technician/attendance', icon: 'schedule' },
                notificationsItem,
                profileItem
            ];
        }
        if (userRole === 'driver') {
            return [
                dashboardItem,
                { name: 'Route Details', path: '/driver/routes', icon: 'routes' },
                { name: 'Petty Cash Entry', path: '/driver/reimbursements', icon: 'reimbursements' },
                { name: 'Daily Collections', path: '/driver/collections', icon: 'payments' },
                notificationsItem,
                profileItem
            ];
        }
        if (userRole === 'client') {
            return [
                dashboardItem,
                { name: 'My Contracts', path: '/client/contracts', icon: 'contracts' },
                { name: 'My Invoices', path: '/client/billings', icon: 'billings' },
                { name: 'Service History', path: '/client/history', icon: 'history' },
                { name: 'Raise Complaint', path: '/client/complaints', icon: 'complaints' },
                notificationsItem,
                profileItem
            ];
        }
        if (userRole === 'accounts') {
            return [
                dashboardItem,
                { name: 'Invoice Management', path: '/erp/invoices', icon: 'invoices' },
                { name: 'Payments', path: '/erp/payments', icon: 'payments' },
                { name: 'Expenses', path: '/driver/reimbursements', icon: 'reimbursements' },
                { name: 'Revenue Reports', path: '/accounts/reports', icon: 'reports' },
                { name: 'VAT/GST', path: '/accounts/vat', icon: 'vat' },
                { name: 'Financial Analytics', path: '/analytics', icon: 'analytics' },
                { name: 'Transaction History', path: '/accounts/transactions', icon: 'transactions' },
                notificationsItem,
                profileItem
            ];
        }
        // Default admin / agency navigation
        return [
            dashboardItem,
            { name: 'Clients', path: '/crm/clients', icon: 'clients' },
            { name: 'Leads', path: '/crm/leads', icon: 'leads' },
            { name: 'Quotations', path: '/crm/quotations', icon: 'quotations' },
            { name: 'AMC Contracts', path: '/crm/contracts', icon: 'contracts' },
            { name: 'Scheduler', path: '/crm/scheduler', icon: 'scheduler' },
            { name: 'Daily Jobs', path: '/erp/operations', icon: 'operations' },
            { name: 'Technicians', path: '/crm/technicians', icon: 'technicians' },
            { name: 'Drivers', path: '/crm/drivers', icon: 'drivers' },
            { name: 'Invoices', path: '/erp/invoices', icon: 'invoices' },
            { name: 'Payments', path: '/erp/payments', icon: 'payments' },
            { name: 'Analytics', path: '/analytics', icon: 'analytics' },
            { name: 'Reports', path: '/crm/reports', icon: 'reports' },
            notificationsItem,
            { name: 'Settings', path: '/settings', icon: 'settings' },
            profileItem
        ];
    };

    const navigationItems = getNavigationItems();

    // Map role text and badge
    const getRoleDetails = () => {
        switch(userRole) {
            case 'superadmin':
                return { label: 'Super Admin', color: 'bg-purple-500/10 text-purple-300 border-purple-500/20', icon: <FaShieldAlt className="text-[10px]" /> };
            case 'technician':
                return { label: 'Technician', color: 'bg-amber-500/10 text-amber-300 border-amber-500/20', icon: <FaTools className="text-[10px]" /> };
            case 'driver':
                return { label: 'Driver Squad', color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', icon: <FaTruck className="text-[10px]" /> };
            case 'accounts':
                return { label: 'Accounts', color: 'bg-rose-500/10 text-rose-300 border-rose-500/20', icon: <FaFileInvoiceDollar className="text-[10px]" /> };
            case 'client':
                return { label: 'Client Portal', color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20', icon: <FaBuilding className="text-[10px]" /> };
            default:
                return { label: 'Operations Admin', color: 'bg-blue-500/10 text-blue-300 border-blue-500/20', icon: <FaUser className="text-[10px]" /> };
        }
    };

    const roleDetails = getRoleDetails();

    const renderSidebarContent = (isForMobile = false) => {
        const isCollapsedMode = !isForMobile && isCollapsed;

        return (
            <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto">
                <div>
                    {/* Brand Section */}
                    <div className={`p-5 flex flex-col border-b border-white/5 ${isCollapsedMode ? 'items-center' : 'space-y-3'}`}>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3 min-w-0">
                                <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/20 shrink-0 p-2 rounded-xl">C</div>
                                {!isCollapsedMode && (
                                    <span className="font-extrabold text-xl tracking-tight text-white truncate">CleanCRM</span>
                                )}
                            </div>
                            {/* Mobile Close Button */}
                            {isForMobile && (
                                <button 
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white p-1.5 hover:bg-white/5 rounded-lg transition"
                                >
                                    <FaTimes className="text-lg" />
                                </button>
                            )}
                        </div>
                        
                        {/* Active user details */}
                        {!isCollapsedMode && (
                            <div className="flex flex-col bg-white/[0.02] border border-white/5 rounded-xl p-3 space-y-1">
                                <div className="text-[11px] font-black text-slate-350 truncate uppercase tracking-wider">
                                    {user?.name || 'Administrator'}
                                </div>
                                <div className="flex items-center space-x-1.5 mt-0.5">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black border ${roleDetails.color}`}> 
                                        {roleDetails.icon}
                                        {roleDetails.label}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 mt-6 px-3 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-thin">
                        <ul className="space-y-1">
                            {navigationItems.map((item) => {
                                const isActive = location.pathname === item.path || 
                                                 (item.path === '/dashboard' && location.pathname === '/');
                                return (
                                    <li key={item.path}>
                                        <Link 
                                            to={item.path} 
                                            onClick={onClose}
                                            title={isCollapsedMode ? item.name : undefined}
                                            className={`flex items-center rounded-xl transition-all duration-200 text-sm font-semibold relative group ${
                                                isCollapsedMode ? 'justify-center p-3.5' : 'space-x-3 px-4 py-3'
                                            } ${
                                                isActive 
                                                    ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-600/10 border-l-2 border-blue-400' 
                                                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                                            }`}
                                        >
                                            <span className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white transition'}`}>
                                                {iconMap[item.icon] || <FaUser className="text-base" />}
                                            </span>
                                            {!isCollapsedMode && (
                                                <span className="truncate">{item.name}</span>
                                            )}

                                            {/* Hover Glow Effect */}
                                            <span className="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none" />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                {/* Footer Section */}
                <div className="p-3 border-t border-white/5 flex flex-col gap-2 bg-[#020617]/50">
                    <button 
                        onClick={logout}
                        title={isCollapsedMode ? "Log Out" : undefined}
                        className={`flex items-center justify-center bg-rose-500/10 hover:bg-rose-500/15 text-rose-400 py-3 rounded-xl text-sm font-bold transition duration-200 border border-rose-500/10 w-full ${
                            isCollapsedMode ? 'px-0' : 'space-x-2'
                        }`}
                    >
                        <FaSignOutAlt className="text-sm shrink-0" />
                        {!isCollapsedMode && <span>Log Out</span>}
                    </button>

                    {/* Desktop Collapse Toggle Switch */}
                    {!isForMobile && (
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden md:flex items-center justify-center hover:bg-white/5 py-2 rounded-lg text-slate-500 hover:text-slate-350 transition duration-150"
                            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                            {isCollapsed ? <FaChevronRight className="text-sm" /> : <FaChevronLeft className="text-sm" />}
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Desktop Sidebar — wrapped in a plain div so display:none is NOT overridden by framer-motion inline styles */}
            <div className="hidden md:block h-full shrink-0">
                <motion.div 
                    className="h-full bg-[#020617] text-slate-100 border-r border-white/5 relative z-40"
                    animate={{ width: isCollapsed ? 76 : 256 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                >
                    {renderSidebarContent(false)}
                </motion.div>
            </div>

            {/* Mobile Sidebar — full-screen overlay, only rendered when isOpen is true */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        {/* Backdrop overlay */}
                        <motion.div 
                            className="fixed inset-0 bg-black/75 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                        />
                        {/* Sidebar drawer — full width on mobile */}
                        <motion.div 
                            className="relative z-10 h-full w-[85%] max-w-[320px] bg-[#020617] text-slate-100 border-r border-white/5 flex flex-col shadow-2xl shadow-black/50 will-change-transform"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                        >
                            {renderSidebarContent(true)}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
