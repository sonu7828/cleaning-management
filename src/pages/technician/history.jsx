import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaHistory, FaCheckCircle, FaCalendarAlt, FaFileSignature } from 'react-icons/fa';

const TechnicianHistoryPage = () => {
    const { jobs, user } = useContext(AppContext);
    
    // Filter completed jobs for the logged-in technician
    const completedJobs = jobs.filter(j => j.employeeName === user.name && j.status === 'Completed');

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaHistory className="text-amber-500" />
                    My Work History
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Logs of all completed cleaning and sanitization services.</p>
            </div>

            {/* List */}
            <div className="space-y-4">
                {completedJobs.length === 0 ? (
                    <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-10 text-center text-slate-500">
                        No completed jobs in your archives. Keep up the good work!
                    </div>
                ) : (
                    completedJobs.map((job) => (
                        <div key={job.id} className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div>
                                    <h3 className="text-base font-bold text-white leading-snug">{job.title}</h3>
                                    <span className="text-[10px] text-slate-400 font-semibold tracking-wider flex items-center gap-1.5 mt-0.5 uppercase">
                                        <FaCalendarAlt /> Completed on {job.date}
                                    </span>
                                </div>
                                <div className="shrink-0">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        <FaCheckCircle className="text-[10px]" /> Verified Completed
                                    </span>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-300">
                                <div>
                                    <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">Client Site</span>
                                    <span className="font-semibold text-slate-200 mt-1 block">{job.clientName || 'Main Plaza Office'}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">Roster Time</span>
                                    <span className="font-semibold text-slate-200 mt-1 block">{job.time}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">Priority Code</span>
                                    <span className="font-semibold text-slate-200 mt-1 block">{job.priority}</span>
                                </div>
                            </div>

                            {/* Before / After Photos */}
                            {(job.beforePhoto || job.afterPhoto) && (
                                <div className="grid grid-cols-2 gap-4 border-t border-[#1E293B]/20 pt-4">
                                    {job.beforePhoto && (
                                        <div className="space-y-1.5">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Before Cleaning</span>
                                            <img src={job.beforePhoto} alt="Before work" className="w-full h-24 object-cover rounded-xl border border-[#1E293B]/30" />
                                        </div>
                                    )}
                                    {job.afterPhoto && (
                                        <div className="space-y-1.5">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">After Cleaning</span>
                                            <img src={job.afterPhoto} alt="After work" className="w-full h-24 object-cover rounded-xl border border-[#1E293B]/30" />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Signature log */}
                            {job.signature && (
                                <div className="border-t border-[#1E293B]/20 pt-3 flex items-center gap-1.5 text-xs text-slate-400">
                                    <FaFileSignature className="text-slate-500" />
                                    <span>Client Sign-off Name: </span>
                                    <span className="text-slate-200 italic font-semibold">"{job.signature}"</span>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TechnicianHistoryPage;
