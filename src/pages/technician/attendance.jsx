import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaCalendarCheck, FaToggleOn, FaToggleOff, FaFingerprint } from 'react-icons/fa';

const TechnicianAttendancePage = () => {
    const { logActivity, user } = useContext(AppContext);
    const [clockedIn, setClockedIn] = useState(false);
    const [clockInTime, setClockInTime] = useState(null);
    const [attendanceLogs, setAttendanceLogs] = useState([
        { date: '2026-05-20', clockIn: '08:45 AM', clockOut: '05:30 PM', totalHours: '8h 45m', status: 'Present' },
        { date: '2026-05-19', clockIn: '09:02 AM', clockOut: '06:05 PM', totalHours: '9h 3m', status: 'Present' },
        { date: '2026-05-18', clockIn: '08:50 AM', clockOut: '05:40 PM', totalHours: '8h 50m', status: 'Present' },
    ]);

    const handleClockToggle = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = now.toISOString().split('T')[0];

        if (!clockedIn) {
            setClockedIn(true);
            setClockInTime(timeStr);
            logActivity(user.name, `Clocked in for today shift at ${timeStr}`);
            
            // Add entry to log
            const newLog = {
                date: dateStr,
                clockIn: timeStr,
                clockOut: '--:--',
                totalHours: 'Active Shift',
                status: 'Present'
            };
            setAttendanceLogs(prev => [newLog, ...prev]);
        } else {
            setClockedIn(false);
            logActivity(user.name, `Clocked out from today shift at ${timeStr}`);
            
            // Update last log
            setAttendanceLogs(prev => prev.map((log, idx) => {
                if (idx === 0 && log.clockOut === '--:--') {
                    return {
                        ...log,
                        clockOut: timeStr,
                        totalHours: '8h 00m (Approx)'
                    };
                }
                return log;
            }));
            setClockInTime(null);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaFingerprint className="text-amber-500" />
                    Attendance & Rota
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Clock in daily shifts and monitor weekly log schedules.</p>
            </div>

            {/* Clock in Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl flex flex-col justify-between items-center text-center space-y-4">
                    <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance Console</span>
                        <h3 className="text-lg font-bold text-white">Daily Clocking</h3>
                    </div>

                    <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center text-3xl transition-all duration-300 ${
                        clockedIn 
                            ? 'border-emerald-500/50 text-emerald-400 bg-emerald-950/20 shadow-lg shadow-emerald-500/10' 
                            : 'border-slate-700/50 text-slate-500 bg-slate-900/20'
                    }`}>
                        <FaFingerprint className={clockedIn ? 'animate-pulse' : ''} />
                    </div>

                    <div className="space-y-1">
                        <div className="text-xs text-slate-400 font-bold uppercase">Shift Status</div>
                        <div className={`text-base font-black ${clockedIn ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {clockedIn ? `CLOCKED IN (Since ${clockInTime})` : 'CLOCKED OUT (Off Duty)'}
                        </div>
                    </div>

                    <button
                        onClick={handleClockToggle}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition duration-200 text-sm border ${
                            clockedIn
                                ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-lg shadow-emerald-600/10'
                        }`}
                    >
                        {clockedIn ? <FaToggleOff /> : <FaToggleOn />}
                        {clockedIn ? 'Clock Out Shift' : 'Clock In Shift'}
                    </button>
                </div>

                {/* Clock Logs */}
                <div className="md:col-span-7 bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-300 pb-2 border-b border-[#1E293B]/20">
                        <FaCalendarCheck className="text-amber-500 text-xs" />
                        <span>Recent Rota Log Sheets</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[#1E293B]/30 text-slate-400 font-bold uppercase tracking-wider">
                                    <th className="py-3 px-2">Work Date</th>
                                    <th className="py-3 px-2">Clock In</th>
                                    <th className="py-3 px-2">Clock Out</th>
                                    <th className="py-3 px-2">Active Hours</th>
                                    <th className="py-3 px-2 text-right">Roster Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-300">
                                {attendanceLogs.map((log, idx) => (
                                    <tr key={idx} className="hover:bg-[#1E293B]/10 transition">
                                        <td className="py-3 px-2 font-bold text-white">{log.date}</td>
                                        <td className="py-3 px-2 text-slate-400">{log.clockIn}</td>
                                        <td className="py-3 px-2 text-slate-400">{log.clockOut}</td>
                                        <td className="py-3 px-2 font-semibold text-slate-200">{log.totalHours}</td>
                                        <td className="py-3 px-2 text-right">
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                                                {log.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicianAttendancePage;
