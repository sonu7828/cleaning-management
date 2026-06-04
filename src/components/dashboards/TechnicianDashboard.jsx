import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaTools, FaMapMarkerAlt, FaClock, FaCheckCircle, 
    FaPlay, FaSignature, FaImage, FaCheckSquare, FaArrowLeft 
} from 'react-icons/fa';

const TechnicianDashboard = () => {
    const { workOrders, updateWorkOrderStatus, user } = useContext(AppContext);
    
    // Filter jobs assigned to the technician
    const technicianJobs = workOrders.filter(wo => wo.assignedTechnician === user.name || wo.assignedTechnician === 'Ali Hassan');

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

    // Adjust canvas size
    useEffect(() => {
        if (showCheckoutModal && canvasRef.current) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width || 350;
            canvas.height = rect.height || 100;
        }
    }, [showCheckoutModal]);

    const handleCheckIn = (jobId) => {
        updateWorkOrderStatus(jobId, 'In Progress');
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

    // Drawing helpers
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#3b82f6';
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
            if (e.cancelable) e.preventDefault();
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

        updateWorkOrderStatus(activeJob.id, 'Completed');
        setShowCheckoutModal(false);
        setActiveJob(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12 text-slate-800 px-4">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <FaTools className="text-amber-500 text-xl" />
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        My Daily Roster Tasks
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Mobile-first site operator dashboard. Clock-in and sign off checklists.</p>
                </div>
            </div>

            {/* Tasks list */}
            <div className="space-y-4">
                {technicianJobs.map((job) => (
                    <div 
                        key={job.id} 
                        className={`bg-[#111827]/85 border rounded-2xl p-5 shadow-xl border-l-4 backdrop-blur-sm transition-all hover:bg-[#111827]/95 ${
                            job.status === 'Completed' ? 'border-l-emerald-500 border-t-[#1E293B]/30 border-r-[#1E293B]/30 border-b-[#1E293B]/30' :
                            job.status === 'In Progress' ? 'border-l-blue-500 bg-blue-950/20 border-t-[#1E293B]/40 border-r-[#1E293B]/40 border-b-[#1E293B]/40' :
                            'border-l-amber-500 border-t-[#1E293B]/30 border-r-[#1E293B]/30 border-b-[#1E293B]/30'
                        }`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            {/* Col 1: Job Header */}
                            <div className="space-y-1 md:col-span-4">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                                    job.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                    job.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border border-blue-200 animate-pulse' :
                                    'bg-amber-100 text-amber-800 border border-amber-200'
                                }`}>
                                    {job.status}
                                </span>
                                <h3 className="font-extrabold text-sm sm:text-base text-slate-800 leading-snug">{job.serviceType}</h3>
                                <p className="text-[10px] text-slate-500 font-semibold">Job Roster ID: {job.id}</p>
                            </div>

                            {/* Col 2: Details */}
                            <div className="space-y-1.5 text-xs text-slate-600 md:col-span-4">
                                <div className="flex items-center gap-1.5">
                                    <FaMapMarkerAlt className="text-rose-500 text-[11px]" />
                                    <span className="font-semibold text-slate-800">{job.customerName}</span>
                                </div>
                                <div className="text-[11px] text-slate-600 pl-4">{job.address}</div>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <FaClock className="text-slate-500 text-[10px]" />
                                    <span className="text-slate-600">Schedule: {job.timeSlot}</span>
                                </div>
                            </div>

                            {/* Col 3: Actions */}
                            <div className="flex md:justify-end md:col-span-4">
                                {job.status === 'Pending' && (
                                    <button
                                        onClick={() => handleCheckIn(job.id)}
                                        className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl flex items-center justify-center gap-1.5 text-xs transition shadow-lg"
                                    >
                                        <FaPlay className="text-[9px]" /> Check-In (Start Job)
                                    </button>
                                )}

                                {job.status === 'In Progress' && (
                                    <button
                                        onClick={() => handleCheckOutOpen(job)}
                                        className="w-full md:w-auto px-5 py-2.5 bg-success hover:bg-[#059669] text-white font-extrabold rounded-xl flex items-center justify-center gap-1.5 text-xs transition shadow-lg"
                                    >
                                        <FaCheckCircle className="text-[10px]" /> Check-Out & Sign off
                                    </button>
                                )}

                                {job.status === 'Completed' && (
                                    <div className="w-full md:w-auto px-5 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold rounded-xl flex items-center justify-center gap-1.5 text-xs">
                                        <FaCheckCircle className="text-success text-[10px]" /> Roster Complete
                                    </div>
                                )}
                            </div>
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
                            className="relative bg-[#111827] border-t sm:border border-[#1E293B]/50 rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto text-slate-800"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                        >
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                                <button onClick={() => setShowCheckoutModal(false)} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition">
                                    <FaArrowLeft className="text-xs" />
                                </button>
                                <div>
                                    <h3 className="text-base font-black text-slate-800">Job Sign-off Check Sheet</h3>
                                    <p className="text-[10px] text-slate-500">Complete quality checks to close Job Roster: {activeJob?.id}</p>
                                </div>
                            </div>

                            {/* Checklist */}
                            <div className="space-y-2.5">
                                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                                    <FaCheckSquare className="text-blue-500" /> Quality checklist
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { key: 'vacuuming', label: 'Carpet vacuumed & floors mopped *' },
                                        { key: 'wasteDisposed', label: 'Bags replaced & waste disposed *' },
                                        { key: 'sanitizationApplied', label: 'Disinfection spray applied to desks *' },
                                        { key: 'windowsPolished', label: 'Glass mirrors & windows polished' }
                                    ].map((item) => (
                                        <label key={item.key} className="flex items-center space-x-2.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition">
                                            <input 
                                                type="checkbox" 
                                                checked={checklist[item.key]} 
                                                onChange={(e) => setChecklist({ ...checklist, [item.key]: e.target.checked })}
                                                className="rounded bg-white border-slate-300 text-blue-650 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                                            />
                                            <span className={checklist[item.key] ? 'text-slate-400 line-through' : 'text-slate-700'}>{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Before/After Photos */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                                    <FaImage className="text-blue-500" /> Service Proof Photos
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-slate-500">Before Photo</span>
                                        <div 
                                            onClick={() => simulatePhotoUpload('before')}
                                            className="h-20 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition"
                                        >
                                            {beforePhoto ? (
                                                <img src={beforePhoto} alt="Before" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-[9px] text-slate-500 font-bold">Tap to Upload</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-slate-500">After Photo *</span>
                                        <div 
                                            onClick={() => simulatePhotoUpload('after')}
                                            className="h-20 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition"
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
                                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                                        <FaSignature className="text-blue-500" /> Client Handover Signature *
                                    </h4>
                                    {hasSigned && (
                                        <button onClick={clearSignature} className="text-[10px] text-rose-500 font-bold hover:underline transition">Clear</button>
                                    )}
                                </div>

                                <div className="border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                                    <canvas
                                        ref={canvasRef}
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseLeave={stopDrawing}
                                        onTouchStart={startDrawing}
                                        onTouchMove={draw}
                                        onTouchEnd={stopDrawing}
                                        className="w-full h-[100px] cursor-crosshair touch-none bg-slate-50"
                                    />
                                </div>
                                <p className="text-[9px] text-slate-500 leading-normal">Draw signature inside the box using mouse pointer or finger touch screen.</p>
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
