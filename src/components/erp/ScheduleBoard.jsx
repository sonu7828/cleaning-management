import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaTrash } from 'react-icons/fa';

const ScheduleBoard = ({ jobs, onDeleteJob }) => {
    return (
        <div className="space-y-4">
            {jobs.length === 0 ? (
                <div className="text-center p-8 bg-[#0c102b]/40 rounded-2xl border border-[#1E293B]/30">
                    <p className="text-slate-400 font-medium">No jobs scheduled yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AnimatePresence>
                        {jobs.map((job) => (
                            <motion.div
                                key={job.id}
                                className="bg-[#111827]/85 backdrop-blur-sm shadow-md hover:shadow-lg border border-[#1E293B]/30 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-bold text-slate-200 text-base leading-snug line-clamp-2">
                                            {job.title}
                                        </h3>
                                        <button
                                            onClick={() => onDeleteJob(job.id)}
                                            className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition duration-150"
                                            title="Delete Job"
                                        >
                                            <FaTrash className="text-xs" />
                                        </button>
                                    </div>
                                    <div className="space-y-1.5 text-sm text-slate-400">
                                        <div className="flex items-center space-x-2">
                                            <FaUser className="text-slate-500 text-xs shrink-0" />
                                            <span className="font-medium text-slate-300">{job.employeeName}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaCalendarAlt className="text-blue-400 text-xs shrink-0" />
                                            <span className="font-semibold text-blue-300">
                                                {new Date(job.date).toLocaleDateString(undefined, {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default ScheduleBoard;
