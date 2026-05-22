import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaTools, FaUser } from 'react-icons/fa';

const TechniciansPage = () => {
    const { jobs } = useContext(AppContext);

    // List of static technicians with statuses
    const technicians = [
        { name: 'Sarah Jenkins', email: 'sarah.tech@cleancrm.com', phone: '+1 (555) 304-9844', status: 'On Duty', rating: '4.9', route: 'Grand Central Plaza' },
        { name: 'Michael Chang', email: 'michael.c@cleancrm.com', phone: '+1 (555) 203-9112', status: 'On Duty', rating: '4.8', route: 'TechLabs Headquarters' },
        { name: 'Emma Watson', email: 'emma.w@cleancrm.com', phone: '+1 (555) 551-0988', status: 'Active', rating: '4.7', route: 'Summit Tower LLC' },
        { name: 'James Carter', email: 'james.c@cleancrm.com', phone: '+1 (555) 777-1243', status: 'Offline', rating: '4.6', route: 'None' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaTools className="text-amber-500 animate-spin-slow" />
                    Technicians Directory
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Monitor field operations, service quality ratings, and live work statuses.</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {technicians.map((tech) => {
                    const todayJobsCount = jobs.filter(j => j.employeeName === tech.name && j.date === '2026-05-21').length;
                    return (
                        <div key={tech.email} className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-black text-sm">
                                    {tech.name[0]}
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                                    tech.status === 'On Duty' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                    tech.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                }`}>
                                    {tech.status}
                                </span>
                            </div>

                            <div>
                                <h3 className="font-bold text-white text-base">{tech.name}</h3>
                                <p className="text-xs text-slate-400 mt-1">{tech.email}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{tech.phone}</p>
                            </div>

                            <div className="pt-3 border-t border-[#1E293B]/20 grid grid-cols-2 gap-2 text-center text-[10px] font-semibold text-slate-400">
                                <div className="p-2 bg-[#0B1120]/60 rounded-xl border border-[#1E293B]/10">
                                    <div className="text-slate-500">Today Jobs</div>
                                    <div className="text-sm font-bold text-white mt-0.5">{todayJobsCount} cleanings</div>
                                </div>
                                <div className="p-2 bg-[#0B1120]/60 rounded-xl border border-[#1E293B]/10">
                                    <div className="text-slate-500">Rating</div>
                                    <div className="text-sm font-bold text-amber-400 mt-0.5">★ {tech.rating}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dispatch details list */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-slate-300 mb-4">Roster Dispatch Logs</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                <th className="py-3 px-3">Technician</th>
                                <th className="py-3 px-3">Assigned Job</th>
                                <th className="py-3 px-3">Client Target</th>
                                <th className="py-3 px-3">Roster Date</th>
                                <th className="py-3 px-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]/20 text-slate-300 font-medium">
                            {jobs.map((job) => (
                                <tr key={job.id} className="hover:bg-[#1E293B]/10 transition duration-150">
                                    <td className="py-4 px-3 flex items-center gap-2">
                                        <FaUser className="text-slate-400 text-[10px]" />
                                        <span>{job.employeeName}</span>
                                    </td>
                                    <td className="py-4 px-3 text-white font-bold">{job.title}</td>
                                    <td className="py-4 px-3 text-slate-400">{job.clientName}</td>
                                    <td className="py-4 px-3 text-slate-400">{job.date} - {job.time}</td>
                                    <td className="py-4 px-3">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            job.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            job.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                            'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                            {job.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TechniciansPage;
