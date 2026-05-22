import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaHistory, FaCheckCircle, FaCalendarAlt, FaFileSignature, FaMapMarkerAlt } from 'react-icons/fa';

const ClientServiceHistoryPage = () => {
    const { jobs, user } = useContext(AppContext);
    
    // Filter completed jobs for the logged-in client (TechLabs)
    const myHistory = jobs.filter(j => 
        j.status === 'Completed' && (
            j.clientName.toLowerCase().includes('techlabs') ||
            j.clientName.toLowerCase().includes(user.name.split(' ')[0].toLowerCase())
        )
    );

    return (
        <div className="space-y-6 max-w-4xl mx-auto text-slate-100">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaHistory className="text-cyan-500" />
                    My Service History
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Audit log of all completed office cleaning, waste removals, and sanitization services at your sites.</p>
            </div>

            {/* History Checklist */}
            <div className="space-y-5">
                {myHistory.length === 0 ? (
                    <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-10 text-center text-slate-500">
                        No completed services found on your client record.
                    </div>
                ) : (
                    myHistory.map((job) => (
                        <div key={job.id} className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                            {/* Title & Status */}
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div>
                                    <h3 className="text-base font-bold text-white leading-snug">{job.title}</h3>
                                    <span className="text-[10px] text-slate-400 font-semibold tracking-wider flex items-center gap-1.5 mt-0.5 uppercase">
                                        <FaCalendarAlt /> Completed on {job.date} • {job.time}
                                    </span>
                                </div>
                                <div className="shrink-0">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        <FaCheckCircle className="text-[10px]" /> Service Completed
                                    </span>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-300">
                                <div>
                                    <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">Site Location</span>
                                    <span className="font-semibold text-slate-200 mt-1 block flex items-center gap-1">
                                        <FaMapMarkerAlt className="text-slate-400" />
                                        {job.clientName}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">Assigned Crew</span>
                                    <span className="font-semibold text-slate-200 mt-1 block">{job.employeeName}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">Priority Code</span>
                                    <span className="font-semibold text-slate-200 mt-1 block">{job.priority} Priority</span>
                                </div>
                            </div>

                            {/* Notes Section if exists */}
                            {job.notes && (
                                <div className="bg-[#0B1120]/40 border border-[#1E293B]/20 rounded-xl p-3.5 text-xs text-slate-300">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Crew Observations & Notes</span>
                                    <p className="italic">"{job.notes}"</p>
                                </div>
                            )}

                            {/* Before / After Photos */}
                            {(job.beforePhoto || job.afterPhoto) && (
                                <div className="grid grid-cols-2 gap-4 border-t border-[#1E293B]/20 pt-4">
                                    {job.beforePhoto && (
                                        <div className="space-y-1.5">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Before Cleaning</span>
                                            <img src={job.beforePhoto} alt="Before work" className="w-full h-28 object-cover rounded-xl border border-[#1E293B]/30" />
                                        </div>
                                    )}
                                    {job.afterPhoto && (
                                        <div className="space-y-1.5">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">After Cleaning</span>
                                            <img src={job.afterPhoto} alt="After work" className="w-full h-28 object-cover rounded-xl border border-[#1E293B]/30" />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Signature log */}
                            {job.signature && (
                                <div className="border-t border-[#1E293B]/20 pt-3 flex items-center gap-1.5 text-xs text-slate-400">
                                    <FaFileSignature className="text-slate-500" />
                                    <span>Signed-off by representative: </span>
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

export default ClientServiceHistoryPage;
