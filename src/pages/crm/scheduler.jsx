import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaCalendarAlt, FaPlus, FaClock, FaMapMarkerAlt, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const SchedulerPage = () => {
    const { jobs, addJob, deleteJob } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [employeeName, setEmployeeName] = useState('Sarah Jenkins');
    const [clientName, setClientName] = useState('Grand Central Plaza');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState('09:00 AM');
    const [priority, setPriority] = useState('Medium');

    const handleSchedule = (e) => {
        e.preventDefault();
        if (!title) return;

        addJob({
            title,
            employeeName,
            clientName,
            date,
            time,
            priority,
        });

        // Reset
        setTitle('');
        setClientName('Grand Central Plaza');
        setShowModal(false);
    };

    // Days of current week for simple calendar timeline view
    const daysOfWeek = [
        { label: 'Mon 18', dateStr: '2026-05-18' },
        { label: 'Tue 19', dateStr: '2026-05-19' },
        { label: 'Wed 20', dateStr: '2026-05-20' },
        { label: 'Thu 21', dateStr: '2026-05-21' },
        { label: 'Fri 22', dateStr: '2026-05-22' },
        { label: 'Sat 23', dateStr: '2026-05-23' },
        { label: 'Sun 24', dateStr: '2026-05-24' }
    ];

    const techniciansList = ['Sarah Jenkins', 'Michael Chang', 'Emma Watson', 'Dave Driver'];

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaCalendarAlt className="text-blue-500" />
                        Scheduler & Dispatch
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Assign technicians, plan logistics routes, and manage service rosters.</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg shadow-blue-600/20">
                    <FaPlus className="text-xs" />
                    <span>Roster Daily Job</span>
                </Button>
            </div>

            {/* Weekly Timeline Overview Grid */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <FaClock className="text-blue-500 text-xs" /> Weekly Calendar Grid
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {daysOfWeek.map((day) => {
                        const dayJobs = jobs.filter(j => j.date === day.dateStr);
                        const isToday = day.dateStr === '2026-05-21';
                        return (
                            <div 
                                key={day.dateStr}
                                className={`p-3 rounded-xl border text-left flex flex-col justify-between h-44 ${
                                    isToday 
                                        ? 'bg-blue-600/10 border-blue-500' 
                                        : 'bg-[#0B1120]/60 border-[#1E293B]/20'
                                }`}
                            >
                                <div className="flex justify-between items-center pb-2 border-b border-[#1E293B]/25">
                                    <span className={`text-[10px] font-black uppercase ${isToday ? 'text-blue-400' : 'text-slate-400'}`}>{day.label}</span>
                                    {isToday && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>}
                                </div>
                                <div className="flex-1 overflow-y-auto space-y-1.5 my-2 pr-0.5 scrollbar-thin">
                                    {dayJobs.length === 0 ? (
                                        <div className="text-[9px] text-slate-500 font-semibold italic text-center pt-8">No Cleanings</div>
                                    ) : (
                                        dayJobs.map(job => (
                                            <div 
                                                key={job.id} 
                                                className={`p-1.5 rounded text-[9px] font-bold border truncate ${
                                                    job.priority === 'High' ? 'bg-rose-500/10 text-rose-300 border-rose-500/20' :
                                                    job.priority === 'Medium' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                                                    'bg-blue-500/10 text-blue-300 border-blue-500/20'
                                                }`}
                                            >
                                                {job.time} - {job.title}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Detailed Dispatch Board List */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-slate-300 mb-4">Active Roster Sheets</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                <th className="py-3.5 px-3">Job ID</th>
                                <th className="py-3.5 px-3">Service & client</th>
                                <th className="py-3.5 px-3">Technician</th>
                                <th className="py-3.5 px-3">Date & Time</th>
                                <th className="py-3.5 px-3">Priority</th>
                                <th className="py-3.5 px-3">Status</th>
                                <th className="py-3.5 px-3 text-right">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]/20 text-slate-300 font-medium">
                            {jobs.map((job) => (
                                <tr key={job.id} className="hover:bg-[#1E293B]/10 transition duration-150">
                                    <td className="py-4 px-3 text-slate-500 font-mono">#{job.id}</td>
                                    <td className="py-4 px-3">
                                        <div className="font-bold text-white text-sm">{job.title}</div>
                                        <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                                            <FaMapMarkerAlt className="text-[9px]" /> {job.clientName}
                                        </div>
                                    </td>
                                    <td className="py-4 px-3 flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-[10px]">
                                            {job.employeeName[0]}
                                        </div>
                                        <span className="text-slate-200">{job.employeeName}</span>
                                    </td>
                                    <td className="py-4 px-3">
                                        <div className="font-bold text-slate-100">{job.date}</div>
                                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                            <FaClock className="text-[9px]" /> {job.time}
                                        </div>
                                    </td>
                                    <td className="py-4 px-3">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                                            job.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                            job.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        }`}>
                                            {job.priority === 'High' && <FaExclamationTriangle className="text-[8px]" />}
                                            {job.priority} Priority
                                        </span>
                                    </td>
                                    <td className="py-4 px-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                            job.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            job.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                            'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-3 text-right">
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this scheduled job?')) {
                                                    deleteJob(job.id);
                                                }
                                            }}
                                            className="p-1.5 hover:bg-rose-500/15 text-slate-400 hover:text-rose-400 rounded-lg transition"
                                        >
                                            <FaTrash className="text-xs" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Roster Job Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Assign New Scheduled Cleaning">
                <form onSubmit={handleSchedule} className="space-y-4 min-w-[320px]">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Service Job Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="e.g. Lobby Mopping & Sanitization"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Assign Client Site</label>
                            <select
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <option>Grand Central Plaza</option>
                                <option>TechLabs Headquarters</option>
                                <option>Metro Health Clinic</option>
                                <option>Downtown Penthouse Suites</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Assign Technician</label>
                            <select
                                value={employeeName}
                                onChange={(e) => setEmployeeName(e.target.value)}
                                className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                {techniciansList.map(tech => (
                                    <option key={tech}>{tech}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Select Date</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Start Time</label>
                            <input
                                type="text"
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                placeholder="e.g. 09:00 AM"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2.5 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-semibold rounded-xl text-sm transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition"
                        >
                            Roster Dispatch
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default SchedulerPage;
