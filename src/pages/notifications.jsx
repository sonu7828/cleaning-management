import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
    FaBell, FaCheck, FaTrash, FaExclamationTriangle, 
    FaFileContract, FaFileInvoiceDollar, FaCalendarAlt, 
    FaHistory, FaArrowRight, FaHourglassHalf, FaRegCircle, FaCheckCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const categoryTabs = [
    { id: 'all', label: 'All Alerts', icon: <FaBell /> },
    { id: 'amc', label: 'AMC Renewals 🚨', icon: <FaFileContract /> },
    { id: 'quotes', label: 'Quotations 📄', icon: <FaCheckCircle /> },
    { id: 'scheduling', label: 'Scheduling 📅', icon: <FaCalendarAlt /> },
    { id: 'payments', label: 'Payments 💰', icon: <FaFileInvoiceDollar /> },
    { id: 'followup', label: 'Follow-ups 💡', icon: <FaHourglassHalf /> },
];

const NotificationsPage = () => {
    const { 
        notifications, 
        markAllNotificationsRead, 
        clearAllNotifications, 
        toggleNotificationRead, 
        deleteNotification 
    } = useContext(AppContext);

    const [activeTab, setActiveTab] = useState('all');

    const filteredNotifs = (notifications || []).filter(n => activeTab === 'all' || n.category === activeTab);
    const unreadCount = (notifications || []).filter(n => !n.read).length;

    const getIconAndStyle = (cat, type) => {
        switch (cat) {
            case 'amc':
                return {
                    icon: <FaFileContract className="text-sm" />,
                    style: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                };
            case 'quotes':
                return {
                    icon: <FaCheckCircle className="text-sm" />,
                    style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                };
            case 'scheduling':
                return {
                    icon: <FaCalendarAlt className="text-sm" />,
                    style: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                };
            case 'payments':
                return {
                    icon: <FaFileInvoiceDollar className="text-sm" />,
                    style: type === 'error' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                };
            case 'followup':
                return {
                    icon: <FaHourglassHalf className="text-sm" />,
                    style: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                };
            default:
                return {
                    icon: <FaBell className="text-sm" />,
                    style: 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                };
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto text-slate-100 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-3">
                        <FaBell className={`text-blue-500 ${unreadCount > 0 ? 'animate-bounce' : ''}`} />
                        System Notification Hub
                        {unreadCount > 0 && (
                            <span className="text-[10px] font-black bg-blue-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                {unreadCount} Active
                            </span>
                        )}
                    </h1>
                    <p className="text-slate-400 text-xs mt-1">Review critical AMC renewal pending alerts, quotation approvals, scheduling statuses, and lead follow-up rosters.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto shrink-0">
                    <button
                        onClick={markAllNotificationsRead}
                        className="w-full sm:w-auto justify-center px-4 py-2 bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/5 rounded-xl text-xs font-bold transition flex items-center gap-2"
                    >
                        <FaCheck className="text-[10px]" />
                        <span>Mark All Read</span>
                    </button>
                    <button
                        onClick={clearAllNotifications}
                        className="w-full sm:w-auto justify-center px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition flex items-center gap-2"
                    >
                        <FaTrash className="text-[10px]" />
                        <span>Clear All</span>
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1.5 flex-wrap border-b border-white/5 pb-4">
                {categoryTabs.map(tab => {
                    const count = tab.id === 'all' 
                        ? (notifications || []).length 
                        : (notifications || []).filter(n => n.category === tab.id).length;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                                activeTab === tab.id
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20'
                                    : 'bg-[#1E293B] border-white/5 text-slate-400 hover:bg-[#1E293B]/80 hover:text-white'
                            }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-md ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'}`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* List */}
            <div className="space-y-3">
                <AnimatePresence initial={false}>
                    {filteredNotifs.map(notif => {
                        const styleInfo = getIconAndStyle(notif.category, notif.type);
                        return (
                            <motion.div
                                key={notif.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`bg-slate-900/40 border border-white/5 rounded-2xl p-5 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 ${
                                    notif.read ? 'opacity-55' : 'opacity-100 ring-1 ring-blue-500/10'
                                }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${styleInfo.style}`}>
                                        {styleInfo.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center flex-wrap gap-2">
                                            <h4 className="font-extrabold text-white text-sm leading-tight">{notif.title}</h4>
                                            {!notif.read && (
                                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                            )}
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                                                notif.category === 'amc' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/25' :
                                                notif.category === 'quotes' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' :
                                                notif.category === 'scheduling' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/25' :
                                                notif.category === 'payments' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' :
                                                'bg-indigo-500/10 text-indigo-400 border border-indigo-500/25'
                                            }`}>
                                                {notif.badgeText}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{notif.body}</p>
                                        <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500 font-bold">
                                            <FaHistory className="text-[9px]" />
                                            <span>{notif.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0 self-end md:self-auto w-full md:w-auto justify-end">
                                    <button
                                        onClick={() => toggleNotificationRead(notif.id)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition uppercase tracking-wider border ${
                                            notif.read
                                                ? 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                                                : 'bg-blue-600/10 border-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                                        }`}
                                    >
                                        {notif.read ? 'Mark Unread' : 'Mark Read'}
                                    </button>
                                    <button
                                        onClick={() => deleteNotification(notif.id)}
                                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 rounded-lg transition"
                                        title="Delete Alert"
                                    >
                                        <FaTrash className="text-[10px]" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {filteredNotifs.length === 0 && (
                    <div className="text-center py-16 text-slate-500 bg-slate-900/40 border border-white/5 rounded-2xl">
                        <FaBell className="text-4xl mx-auto mb-2 opacity-20" />
                        <p className="text-xs font-black">No active notifications found in this category roster.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
