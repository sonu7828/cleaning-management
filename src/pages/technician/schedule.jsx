import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaCalendarDay, FaClock, FaCheckCircle, FaCamera, FaSignature, FaMapMarkerAlt, FaFileSignature } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const TechnicianSchedulePage = () => {
    const { jobs, updateJobStatus, user } = useContext(AppContext);
    
    // Filter jobs assigned to the logged-in technician
    const myJobs = jobs.filter(j => j.employeeName === user.name);

    // Signature states
    const [signingJobId, setSigningJobId] = useState(null);
    const [signatureName, setSignatureName] = useState('');

    const handleStart = (id) => {
        updateJobStatus(id, 'In Progress');
    };

    const handleComplete = (id) => {
        // Complete requires signature
        setSigningJobId(id);
    };

    const handleMockPhoto = (id, type) => {
        const mockImgUrl = type === 'before'
            ? 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&auto=format&fit=crop&q=60'
            : 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=300&auto=format&fit=crop&q=60';
        
        const updateData = type === 'before' ? { beforePhoto: mockImgUrl } : { afterPhoto: mockImgUrl };
        updateJobStatus(id, 'In Progress', updateData);
    };

    const submitSignature = (e) => {
        e.preventDefault();
        if (signatureName.trim()) {
            updateJobStatus(signingJobId, 'Completed', { signature: signatureName });
            setSigningJobId(null);
            setSignatureName('');
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaCalendarDay className="text-amber-500" />
                        My Daily Roster
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Roster schedule for {user.name}.</p>
                </div>
            </div>

            {/* Jobs Checklist */}
            <div className="space-y-5">
                {myJobs.length === 0 ? (
                    <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-10 text-center text-slate-500">
                        No jobs assigned to you for today.
                    </div>
                ) : (
                    myJobs.map((job) => (
                        <div key={job.id} className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                            {/* Title & Status */}
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div className="space-y-1">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                        job.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                        job.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                        'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                    }`}>
                                        {job.priority} Priority
                                    </span>
                                    <h3 className="text-lg font-bold text-white leading-snug">{job.title}</h3>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                        job.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                        job.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                        'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                    }`}>
                                        {job.status}
                                    </span>
                                </div>
                            </div>

                            {/* Location & Time info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 bg-[#0B1120]/50 p-4 border border-[#1E293B]/20 rounded-2xl">
                                <div className="flex items-center gap-2.5">
                                    <FaMapMarkerAlt className="text-slate-500 shrink-0 text-sm" />
                                    <div>
                                        <div className="font-bold text-slate-200">Client Location</div>
                                        <div className="text-[11px] text-slate-400">{job.clientName || 'Main Plaza Office'}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <FaClock className="text-slate-500 shrink-0 text-sm" />
                                    <div>
                                        <div className="font-bold text-slate-200">Scheduled Time</div>
                                        <div className="text-[11px] text-slate-400">{job.time} - {job.date}</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Notes Section */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Technician / Job Notes</label>
                                <textarea
                                    value={job.notes || ''}
                                    onChange={(e) => updateJobStatus(job.id, job.status, { notes: e.target.value })}
                                    placeholder="Enter notes about detergents used, areas completed, or client requests..."
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/30 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                                    rows="2"
                                />
                            </div>

                            {/* Photo Upload Sections */}
                            {job.status !== 'Scheduled' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Before Photos */}
                                    <div className="border border-[#1E293B]/30 bg-[#0B1120]/30 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3">
                                        <span className="text-xs font-bold text-slate-300">Before Job Photo</span>
                                        {job.beforePhoto ? (
                                            <img src={job.beforePhoto} alt="Before job" className="w-full h-32 object-cover rounded-xl border border-[#1E293B]/50" />
                                        ) : (
                                            <div className="w-full h-32 flex flex-col items-center justify-center border border-dashed border-[#1E293B]/40 rounded-xl bg-[#0B1120]/50 text-slate-500">
                                                <FaCamera className="text-2xl mb-1.5" />
                                                <span className="text-[10px] font-semibold">No Photo Uploaded</span>
                                            </div>
                                        )}
                                        {job.status === 'In Progress' && (
                                            <Button onClick={() => handleMockPhoto(job.id, 'before')} size="small" variant="secondary" className="flex items-center gap-1.5">
                                                <FaCamera /> Upload Mock Before
                                            </Button>
                                        )}
                                    </div>

                                    {/* After Photos */}
                                    <div className="border border-[#1E293B]/30 bg-[#0B1120]/30 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3">
                                        <span className="text-xs font-bold text-slate-300">After Job Photo</span>
                                        {job.afterPhoto ? (
                                            <img src={job.afterPhoto} alt="After job" className="w-full h-32 object-cover rounded-xl border border-[#1E293B]/50" />
                                        ) : (
                                            <div className="w-full h-32 flex flex-col items-center justify-center border border-dashed border-[#1E293B]/40 rounded-xl bg-[#0B1120]/50 text-slate-500">
                                                <FaCamera className="text-2xl mb-1.5" />
                                                <span className="text-[10px] font-semibold">No Photo Uploaded</span>
                                            </div>
                                        )}
                                        {job.status === 'In Progress' && (
                                            <Button onClick={() => handleMockPhoto(job.id, 'after')} size="small" variant="secondary" className="flex items-center gap-1.5">
                                                <FaCamera /> Upload Mock After
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Job actions */}
                            <div className="flex justify-end gap-3 pt-2">
                                {job.status === 'Scheduled' && (
                                    <Button onClick={() => handleStart(job.id)} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5">
                                        <FaClock /> Start Cleaning Job
                                    </Button>
                                )}
                                {job.status === 'In Progress' && (
                                    <Button onClick={() => handleComplete(job.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5">
                                        <FaCheckCircle /> Sign off & Complete
                                    </Button>
                                )}
                                {job.status === 'Completed' && job.signature && (
                                    <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
                                        <FaSignature /> Customer Signature: <span className="text-white italic font-medium">"{job.signature}"</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Signature dialog overlay */}
            {signingJobId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSigningJobId(null)}></div>
                    <div className="relative bg-[#111827] border border-[#1E293B]/50 text-slate-100 rounded-3xl p-6 w-full max-w-sm shadow-2xl z-10 space-y-4">
                        <div className="flex items-center gap-2">
                            <FaFileSignature className="text-amber-500 text-lg" />
                            <h3 className="text-lg font-bold text-white">Client Sign-Off Signature</h3>
                        </div>
                        <p className="text-xs text-slate-400">Please enter the customer representative's full name to sign-off and close this work order.</p>
                        <form onSubmit={submitSignature} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1.5">Representative Name</label>
                                <input
                                    type="text"
                                    required
                                    value={signatureName}
                                    onChange={(e) => setSignatureName(e.target.value)}
                                    placeholder="e.g. Sarah Jenkins (Client)"
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 text-xs">
                                <button type="button" onClick={() => setSigningJobId(null)} className="px-3.5 py-2.5 text-slate-400">Cancel</button>
                                <button type="submit" className="px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-xl">Confirm Signature</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TechnicianSchedulePage;
