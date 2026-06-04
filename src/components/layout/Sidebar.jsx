import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaSignOutAlt,
    FaTimes,
    FaTachometerAlt,
    FaUsers,
    FaUserFriends,
    FaReceipt,
    FaFileContract,
    FaConciergeBell,
    FaCalendarAlt,
    FaTruck,
    FaClipboardList,
    FaUserCog,
    FaFileInvoiceDollar,
    FaMoneyBillWave,
    FaChartBar,
    FaSlidersH,
    FaUser,
    FaChevronLeft,
    FaChevronRight,
    FaRoute,
    FaPercent,
    FaExclamationCircle,
    FaWarehouse
} from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';

const iconMap = {
    dashboard: <FaTachometerAlt className="text-base shrink-0" />,
    leads: <FaUserFriends className="text-base shrink-0" />,
    customers: <FaUsers className="text-base shrink-0" />,
    services: <FaConciergeBell className="text-base shrink-0" />,
    quotations: <FaReceipt className="text-base shrink-0" />,
    contracts: <FaFileContract className="text-base shrink-0" />,
    complaints: <FaExclamationCircle className="text-base shrink-0" />,
    scheduling: <FaCalendarAlt className="text-base shrink-0" />,
    workOrders: <FaClipboardList className="text-base shrink-0" />,
    inventory: <FaWarehouse className="text-base shrink-0" />,
    technicians: <FaUserCog className="text-base shrink-0" />,
    drivers: <FaTruck className="text-base shrink-0" />,
    invoices: <FaFileInvoiceDollar className="text-base shrink-0" />,
    payments: <FaMoneyBillWave className="text-base shrink-0" />,
    reports: <FaChartBar className="text-base shrink-0" />,
    settings: <FaSlidersH className="text-base shrink-0" />,
    profile: <FaUser className="text-base shrink-0" />,
    routes: <FaRoute className="text-base shrink-0" />,
    vat: <FaPercent className="text-base shrink-0" />
};

const Sidebar = ({ isOpen, onClose, isCollapsed, setIsCollapsed }) => {
    useEffect(() => {
        if (isOpen) {
            const handleEsc = (e) => {
                if (e.key === 'Escape') onClose();
            };
            document.addEventListener('keydown', handleEsc);
            return () => document.removeEventListener('keydown', handleEsc);
        }
    }, [isOpen, onClose]);

    const { logout, userRole, user } = useContext(AppContext);
    const location = useLocation();

    // Dynamically generate navigation based on active role
    const getNavigationItems = () => {
        const dashboard = { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' };
        const profile = { name: 'Profile', path: '/profile', icon: 'profile' };

        switch (userRole) {
            case 'admin':
                return [
                    dashboard,
                    { name: 'Leads (CRM)', path: '/crm/leads', icon: 'leads' },
                    { name: 'Customers', path: '/crm/clients', icon: 'customers' },
                    { name: 'Services', path: '/crm/services', icon: 'services' },
                    { name: 'Quotations', path: '/crm/quotations', icon: 'quotations' },
                    { name: 'AMC Contracts', path: '/crm/contracts', icon: 'contracts' },
                    { name: 'Complaints Desk', path: '/crm/complaints', icon: 'complaints' },
                    { name: 'Scheduling', path: '/crm/scheduling', icon: 'scheduling' },
                    { name: 'Work Orders / Dispatch', path: '/crm/work-orders', icon: 'workOrders' },
                    { name: 'Warehouse Inventory', path: '/erp/inventory', icon: 'inventory' },
                    { name: 'Technicians', path: '/crm/technicians', icon: 'technicians' },
                    { name: 'Drivers', path: '/crm/drivers', icon: 'drivers' },
                    { name: 'Invoices', path: '/crm/invoices', icon: 'invoices' },
                    { name: 'Payments', path: '/crm/payments', icon: 'payments' },
                    { name: 'VAT Returns', path: '/crm/vat', icon: 'vat' },
                    { name: 'Reports & Analytics', path: '/crm/reports', icon: 'reports' },
                    { name: 'System Settings', path: '/settings', icon: 'settings' },
                    profile
                ];
            case 'sales':
                return [
                    dashboard,
                    { name: 'Leads (CRM)', path: '/crm/leads', icon: 'leads' },
                    { name: 'Customers', path: '/crm/clients', icon: 'customers' },
                    { name: 'Quotations', path: '/crm/quotations', icon: 'quotations' },
                    { name: 'AMC Contracts', path: '/crm/contracts', icon: 'contracts' },
                    profile
                ];
            case 'dispatch':
                return [
                    dashboard,
                    { name: 'Scheduling', path: '/crm/scheduling', icon: 'scheduling' },
                    { name: 'Work Orders & Assign', path: '/crm/work-orders', icon: 'workOrders' },
                    { name: 'Warehouse Inventory', path: '/erp/inventory', icon: 'inventory' },
                    { name: 'Complaints Desk', path: '/crm/complaints', icon: 'complaints' },
                    { name: 'Technicians', path: '/crm/technicians', icon: 'technicians' },
                    { name: 'Drivers', path: '/crm/drivers', icon: 'drivers' },
                    profile
                ];
            case 'technician':
                return [
                    dashboard,
                    { name: 'My Jobs', path: '/crm/work-orders', icon: 'workOrders' },
                    { name: 'My Roster', path: '/crm/scheduling', icon: 'scheduling' },
                    profile
                ];
            case 'accounts':
                return [
                    dashboard,
                    { name: 'Invoices Desk', path: '/crm/invoices', icon: 'invoices' },
                    { name: 'Payments Desk', path: '/crm/payments', icon: 'payments' },
                    { name: 'VAT Returns', path: '/crm/vat', icon: 'vat' },
                    { name: 'Financial Reports', path: '/crm/reports', icon: 'reports' },
                    profile
                ];
            case 'driver':
                return [
                    dashboard,
                    { name: 'Assigned Routes', path: '/crm/work-orders', icon: 'routes' },
                    { name: 'Logistics Schedule', path: '/crm/scheduling', icon: 'scheduling' },
                    profile
                ];
            default:
                return [dashboard, profile];
        }
    };

    const navigationItems = getNavigationItems();

    const getRoleDetails = () => {
        const roles = {
            admin: { label: 'Administrator', color: 'bg-purple-600/10 text-purple-600 border-purple-200' },
            sales: { label: 'Sales Executive', color: 'bg-blue-600/10 text-blue-600 border-blue-200' },
            dispatch: { label: 'Dispatcher', color: 'bg-emerald-600/10 text-emerald-600 border-emerald-200' },
            technician: { label: 'Cleaning Tech', color: 'bg-amber-600/10 text-amber-600 border-amber-200' },
            accounts: { label: 'Finance Accounts', color: 'bg-rose-600/10 text-rose-600 border-rose-200' },
            driver: { label: 'Logistics Driver', color: 'bg-indigo-600/10 text-indigo-600 border-indigo-200' }
        };
        return roles[userRole] || { label: 'User', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    };

    const renderSidebarContent = (isForMobile = false) => {
        const isCollapsedMode = !isForMobile && isCollapsed;

        return (
            <div className="flex-1 flex flex-col h-full sidebar-container">
                {/* Brand Header */}
                <div id="sidebar-brand-header" className="py-2.5 px-2.5 flex items-center justify-between relative w-full h-[56px] select-none">
                    {isCollapsedMode ? (
                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-white text-xs mx-auto">
                            TE
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2 text-white justify-start">
                            {/* Premium cleaning sparkle icon */}
                            <svg className="w-4 h-4 text-white shrink-0 opacity-95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <div className="flex flex-col text-left justify-center overflow-hidden">
                                <span className="font-bold leading-tight text-white tracking-wide uppercase whitespace-nowrap" style={{ fontSize: '15px' }}>TEAM ENVIRO</span>
                                <span className="text-[#DBE9F6] font-semibold tracking-wide whitespace-nowrap leading-none mt-1" style={{ fontSize: '10px' }}>Cleaning Management</span>
                            </div>
                        </div>
                    )}
                    {isForMobile && (
                        <button onClick={onClose} className="absolute top-3 right-3 text-[#DBE9F6] hover:text-white p-1 hover:bg-white/10 rounded transition">
                            <FaTimes className="text-base" />
                        </button>
                    )}
                </div>

                {/* Nav Links */}
                <nav className="flex-1 pt-4 pb-4 overflow-y-auto scrollbar-none space-y-0">
                    {navigationItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                title={isCollapsedMode ? item.name : undefined}
                                className={`flex items-center transition-all duration-150 text-xs font-semibold relative w-full ${isCollapsedMode ? 'justify-center py-3.5' : 'space-x-3 px-4 py-2.5'
                                    } ${isActive
                                        ? 'sidebar-link-active'
                                        : 'sidebar-link'
                                    }`}
                            >
                                {isActive && (
                                    <div className="sidebar-indicator" />
                                )}
                                <span className="shrink-0 sidebar-icon">{iconMap[item.icon] || <FaUser className="text-base shrink-0" />}</span>
                                {!isCollapsedMode && <span className="truncate">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer buttons */}
                <div className="flex flex-col bg-transparent">
                    <button
                        onClick={logout}
                        title={isCollapsedMode ? "Log Out" : undefined}
                        className={`flex items-center justify-start bg-transparent text-[#DBE9F6] py-3 px-4 text-xs font-semibold w-full sidebar-link ${isCollapsedMode ? 'justify-center px-0' : 'space-x-3'
                            }`}
                    >
                        <FaSignOutAlt className="text-sm shrink-0 sidebar-icon" />
                        {!isCollapsedMode && <span>Log Out</span>}
                    </button>

                    {!isForMobile && (
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden md:flex items-center justify-center py-2 text-[#DBE9F6] hover:text-white hover:bg-black/10 transition"
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
            {/* Desktop */}
            <div className="hidden md:block h-full shrink-0">
                <motion.div
                    className="h-full sidebar-container relative z-40"
                    animate={{ width: isCollapsed ? 76 : 200 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                >
                    {renderSidebarContent(false)}
                </motion.div>
            </div>

            {/* Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 md:hidden flex">
                        <motion.div
                            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                        />
                        <motion.div
                            className="relative z-10 h-full w-[85%] max-w-[320px] sidebar-container flex flex-col shadow-2xl"
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
