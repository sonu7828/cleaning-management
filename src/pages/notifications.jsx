import React, { useState } from 'react';
import { FaBell, FaCheck, FaTrash, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([
        { id: '1', title: 'Daily Cleaning Job Completed', body: 'Sarah Jenkins completed daily cleaning at Grand Central Plaza.', time: '10 mins ago', type: 'info', read: false },
        { id: '2', title: 'New Petty Cash Voucher Submitted', body: 'Dave Driver uploaded a fuel receipt voucher of $85.50 for approval.', time: '30 mins ago', type: 'warning', read: false },
        { id: '3', title: 'Invoice inv-104 Settle Succeeded', body: 'Client settled payment dues for Downtown Penthouse Suites.', time: '2 hours ago', type: 'success', read: true },
        { id: '4', title: 'SLA Contract Ending Soon', body: 'Annual facility maintenance contract for TechLabs is expiring in 10 days.', time: '1 day ago', type: 'warning', read: true },
    ]);

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const toggleRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto text-slate-100">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaBell className="text-blue-500 animate-bounce" />
                        Notification Center
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Read, filter, and manage platform alerts and daily activity updates.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={markAllRead}
                        className="px-3.5 py-1.5 bg-[#1E293B]/50 hover:bg-[#1E293B]/85 text-slate-200 border border-[#1E293B]/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                        <FaCheck />
                        <span>Mark All Read</span>
                    </button>
                    <button
                        onClick={clearAll}
                        className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                        <FaTrash />
                        <span>Clear All</span>
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-4">
                {notifications.length === 0 ? (
                    <div className="text-center py-16 text-slate-500 font-semibold text-sm">You have zero active notifications. Check back later!</div>
                ) : (
                    <div className="divide-y divide-[#1E293B]/20">
                        {notifications.map(notif => (
                            <div
                                key={notif.id}
                                className={`py-4 flex justify-between items-start gap-4 transition ${
                                    notif.read ? 'opacity-60' : 'opacity-100'
                                }`}
                            >
                                <div className="flex gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                                        notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                        notif.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    }`}>
                                        {notif.type === 'success' ? <FaCheck className="text-xs" /> :
                                         notif.type === 'warning' ? <FaExclamationTriangle className="text-xs" /> :
                                         <FaInfoCircle className="text-xs" />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-sm flex items-center gap-2">
                                            {notif.title}
                                            {!notif.read && (
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-400 mt-0.5">{notif.body}</p>
                                        <span className="text-[10px] text-slate-500 font-bold block mt-1">{notif.time}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleRead(notif.id)}
                                    className="px-2.5 py-1 hover:bg-[#1E293B]/30 text-[10px] text-slate-400 hover:text-white rounded transition border border-transparent hover:border-[#1E293B]/20 shrink-0 font-bold"
                                >
                                    {notif.read ? 'Mark Unread' : 'Mark Read'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
