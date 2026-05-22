import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaTools, FaMapMarkerAlt, FaClock, FaCheckCircle, 
    FaPlay, FaSignature, FaImage, FaCheckSquare, FaArrowLeft 
} from 'react-icons/fa';

const TechnicianDashboard = () => {
    const { jobs, updateJobStatus } = useContext(AppContext);
    
    // Filter jobs assigned to Sarah Jenkins (mock technician)
    const technicianJobs = jobs.filter(j => j.employeeName === 'Sarah Jenkins');

    const [activeJob, setActiveJob] = useState(null);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    
    // Checklist state
    const [checklist, setChecklist] = useState({
        vacuuming: false,
        wasteDisposed: false,
        sanitizationApplied: false,
        windowsPolished: false
    });

    // Drawing signature canvas states
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSigned, setHasSigned] = useState(false);
    const [beforePhoto, setBeforePhoto] = useState(null);
    const [afterPhoto, setAfterPhoto] = useState(null);

    // Adjust logical canvas scale to match actual rendered dimensions on mount/display
    useEffect(() => {
        if (showCheckoutModal && canvasRef.current) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width || 350;
            canvas.height = rect.height || 100;
        }
    }, [showCheckoutModal]);

    const handleCheckIn = (jobId) => {
        updateJobStatus(jobId, 'In Progress');
        // Seed a quick mockup before photo
        updateJobStatus(jobId, 'In Progress', {
            beforePhoto: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&auto=format&fit=crop&q=60'
        });
    };

    const handleCheckOutOpen = (job) => {
        setActiveJob(job);
        setShowCheckoutModal(true);
        setBeforePhoto(job.beforePhoto || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&auto=format&fit=crop&q=60');
        setAfterPhoto(null);
        setHasSigned(false);
        setChecklist({
            vacuuming: false,
            wasteDisposed: false,
            sanitizationApplied: false,
            windowsPolished: false
        });
    };

    // Draw handler for simulated signature canvas (supports touch & mouse)
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#3b82f6'; // blue-500
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
        setIsDrawing(true);
        setHasSigned(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            // Prevent screen scrolling when drawing on touch devices
            if (e.cancelable) {
                e.preventDefault();
            }
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSigned(false);
    };

    const simulatePhotoUpload = (type) => {
        // Simulates picking a standard cleaning mockup photo
        const mockPhotos = {
            before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&auto=format&fit=crop&q=60',
            after: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=300&auto=format&fit=crop&q=60'
        };
        if (type === 'before') {
            setBeforePhoto(mockPhotos.before);
        } else {
            setAfterPhoto(mockPhotos.after);
        }
    };

    const handleSaveCheckOut = () => {
        if (!checklist.vacuuming || !checklist.wasteDisposed || !checklist.sanitizationApplied) {
            alert("Please complete the required checklist items.");
            return;
        }

        updateJobStatus(activeJob.id, 'Completed', {
            beforePhoto: beforePhoto,
            afterPhoto: afterPhoto || 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=300&auto=format&fit=crop&q=60',
            signature: 'SIMULATED_SIGNATURE_DATA'
        });

        setShowCheckoutModal(false);
        setActiveJob(null);
    };

    return (
        <div className="max-w-md mx-auto space-y-6 pb-12 text-slate-100">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <FaTools className="text-amber-500 text-xl animate-spin-slow" />
                    My Daily Roster Tasks
                </h1>
                <p className="text-slate-400 text-xs mt-0.5">Mobile-first site operator dashboard. Clock-in and sign off checklists.</p>
            </div>

            {/* Tasks list */}
            <div className="space-y-4">
                {technicianJobs.map((job) => (
                    <div 
                        key={job.id} 
                        className={`bg-[#111827]/85 border rounded-2xl p-4 shadow-xl space-y-4 border-l-4 backdrop-blur-sm ${
                            job.status === 'Completed' ? 'border-l-emerald-500 border-t-[#1E293B]/30 border-r-[#1E293B]/30 border-b-[#1E293B]/30' :
                            job.status === 'In Progress' ? 'border-l-blue-500 bg-blue-950/20 border-t-[#1E293B]/40 border-r-[#1E293B]/40 border-b-[#1E293B]/40' :
                            'border-l-amber-500 border-t-[#1E293B]/30 border-r-[#1E293B]/30 border-b-[#1E293B]/30'
                        }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-0.5">
                                <h3 className="font-extrabold text-sm text-white leading-snug">{job.title}</h3>
                                <p className="text-[10px] text-slate-400 font-semibold">Job Roster ID: {job.id}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                job.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                job.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 animate-pulse' :
                                'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                                {job.status}
                            </span>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-300">
                            <div className="flex items-center gap-1.5">
                                <FaMapMarkerAlt className="text-slate-400 text-[10px]" />
                                <span className="font-semibold text-white">{job.clientName}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FaClock className="text-slate-400 text-[10px]" />
                                <span>Schedule Time: {job.time}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-2 border-t border-[#1E293B]/20 flex items-center justify-between">
                            {job.status === 'Scheduled' && (
                                <button
                                    onClick={() => handleCheckIn(job.id)}
                                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs transition"
                                >
                                    <FaPlay className="text-[9px]" /> Check-In (Start Job)
                                </button>
                            )}

                            {job.status === 'In Progress' && (
                                <button
                                    onClick={() => handleCheckOutOpen(job)}
                                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs transition shadow-lg shadow-emerald-600/25"
                                >
                                    <FaCheckCircle className="text-[10px]" /> Check-Out & Sign off
                                </button>
                            )}

                            {job.status === 'Completed' && (
                                <div className="w-full py-2 bg-white/5 border border-white/5 text-slate-400 font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs">
                                    <FaCheckCircle className="text-emerald-400 text-[10px]" /> Roster Complete
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Check-Out Checklist and Signature Modal */}
            <AnimatePresence>
                {showCheckoutModal && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <div className="absolute inset-0 bg-[#020617]/85 backdrop-blur-sm" onClick={() => setShowCheckoutModal(false)}></div>
                        <motion.div 
                            className="relative bg-[#111827] border-t sm:border border-[#1E293B]/50 rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto text-white"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                        >
                            <div className="flex items-center gap-2 pb-2 border-b border-[#1E293B]/20">
                                <button onClick={() => setShowCheckoutModal(false)} className="p-1.5 text-slate-400 hover:bg-white/5 rounded-lg transition">
                                    <FaArrowLeft className="text-xs" />
                                </button>
                                <div>
                                    <h3 className="text-base font-black text-white">Job Sign-off Check Sheet</h3>
                                    <p className="text-[10px] text-slate-400">Complete quality checks to close Job Roster: {activeJob?.id}</p>
                                </div>
                            </div>

                            {/* Checklist */}
                            <div className="space-y-2.5">
                                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                                    <FaCheckSquare className="text-blue-400" /> Quality checklist
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { key: 'vacuuming', label: 'Carpet vacuumed & floors mopped *' },
                                        { key: 'wasteDisposed', label: 'Bags replaced & waste disposed *' },
                                        { key: 'sanitizationApplied', label: 'Disinfection spray applied to desks *' },
                                        { key: 'windowsPolished', label: 'Glass mirrors & windows polished' }
                                    ].map((item) => (
                                        <label key={item.key} className="flex items-center space-x-2.5 p-2 bg-white/5 hover:bg-white/10 border border-[#1E293B]/25 rounded-xl text-xs font-semibold cursor-pointer transition">
                                            <input 
                                                type="checkbox" 
                                                checked={checklist[item.key]} 
                                                onChange={(e) => setChecklist({ ...checklist, [item.key]: e.target.checked })}
                                                className="rounded bg-[#060a17] border-[#1E293B]/50 text-blue-500 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                                            />
                                            <span className={checklist[item.key] ? 'text-slate-400 line-through' : 'text-slate-200'}>{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Before/After Photos */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                                    <FaImage className="text-blue-400" /> Service Proof Photos
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-slate-400">Before Photo</span>
                                        <div 
                                            onClick={() => simulatePhotoUpload('before')}
                                            className="h-20 rounded-xl border border-dashed border-[#1E293B]/50 bg-[#060a17] hover:bg-[#0a0f24] flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition"
                                        >
                                            {beforePhoto ? (
                                                <img src={beforePhoto} alt="Before" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-[9px] text-slate-500 font-bold">Tap to Upload</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-slate-400">After Photo *</span>
                                        <div 
                                            onClick={() => simulatePhotoUpload('after')}
                                            className="h-20 rounded-xl border border-dashed border-[#1E293B]/50 bg-[#060a17] hover:bg-[#0a0f24] flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition"
                                        >
                                            {afterPhoto ? (
                                                <img src={afterPhoto} alt="After" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-[9px] text-slate-500 font-bold">Tap to Upload</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Signature Pad */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                                        <FaSignature className="text-blue-400" /> Client Handover Signature *
                                    </h4>
                                    {hasSigned && (
                                        <button onClick={clearSignature} className="text-[10px] text-rose-400 font-bold hover:underline transition">Clear</button>
                                    )}
                                </div>

                                <div className="border border-[#1E293B]/50 rounded-xl overflow-hidden bg-[#060a17]">
                                    <canvas
                                        ref={canvasRef}
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseLeave={stopDrawing}
                                        onTouchStart={startDrawing}
                                        onTouchMove={draw}
                                        onTouchEnd={stopDrawing}
                                        className="w-full h-[100px] cursor-crosshair touch-none bg-[#060a17]"
                                    />
                                </div>
                                <p className="text-[9px] text-slate-400 leading-normal">Draw signature inside the box using mouse pointer or finger touch screen.</p>
                            </div>

                            {/* Submit Sign off */}
                            <button
                                onClick={handleSaveCheckOut}
                                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98] transition-all text-xs"
                            >
                                Submit Sign-off & Close Job
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TechnicianDashboard;
