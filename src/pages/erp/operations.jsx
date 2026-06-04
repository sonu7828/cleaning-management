import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
    FaClipboardList, FaTruck, FaUser, FaCheck, FaTimes, 
    FaSignature, FaEye, FaCalendarAlt, FaMapMarkerAlt, FaFileInvoice, FaCamera
} from 'react-icons/fa';

// Interactive canvas signature pad
const SignaturePad = ({ onSave, onClear }) => {
    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }, []);

    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        
        // Handle touch events
        if (e.touches && e.touches.length > 0) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        
        // Handle mouse events
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        isDrawingRef.current = true;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const coords = getCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
    };

    const draw = (e) => {
        if (!isDrawingRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const coords = getCoordinates(e);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        isDrawingRef.current = false;
        if (canvasRef.current && onSave) {
            onSave(canvasRef.current.toDataURL());
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (onClear) onClear();
    };

    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">Draw Client E-Signature *</label>
                <button type="button" onClick={clearCanvas} className="text-rose-500 hover:text-rose-600 font-black text-[10px] uppercase">Clear Canvas</button>
            </div>
            <canvas
                ref={canvasRef}
                width={380}
                height={110}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[110px] bg-slate-50 border border-slate-200 rounded-xl cursor-crosshair touch-none shadow-inner"
            />
        </div>
    );
};

const OperationsPage = () => {
    const { 
        workOrders, dispatchWorkOrder, completeTechnicianJob, 
        userRole, deleteWorkOrder, clients 
    } = useContext(AppContext);

    const [filterStatus, setFilterStatus] = useState('All');
    
    // Tech Completion Form State
    const [completionJobId, setCompletionJobId] = useState(null);
    const [completionNotes, setCompletionNotes] = useState('');
    const [customerSignature, setCustomerSignature] = useState('');
    const [drawnSignatureData, setDrawnSignatureData] = useState(null);
    
    // Checklists & Photos State
    const [checklist, setChecklist] = useState([
        { id: 1, text: 'Wiped all counter surfaces and furniture dust extraction', checked: false },
        { id: 2, text: 'Vacuumed carpeted zones / mopped marble tiles', checked: false },
        { id: 3, text: 'Disinfected kitchen counters and high-touch areas', checked: false },
        { id: 4, text: 'Garbage bags gathered, cleared, and disposed', checked: false }
    ]);
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    // Dispatcher Form State
    const [dispatchJobId, setDispatchJobId] = useState(null);
    const [assignedTech, setAssignedTech] = useState('CLEANING TECH');
    const [assignedDriver, setAssignedDriver] = useState('DRIVER LOGISTICS');
    const [timeSlot, setTimeSlot] = useState('09:00 AM - 01:00 PM');

    const techniciansList = ['CLEANING TECH', 'CLEANING TECH #2', 'CLEANING TECH #3', 'CLEANING TECH #4'];
    const driversList = ['DRIVER LOGISTICS', 'DRIVER LOGISTICS #2', 'DRIVER LOGISTICS #3', 'DRIVER LOGISTICS #4'];

    // Handle Dispatch Submit
    const handleDispatchSubmit = (e) => {
        e.preventDefault();
        dispatchWorkOrder(dispatchJobId, {
            assignedTechnician: assignedTech,
            assignedDriver,
            vehicleInfo: assignedDriver === 'DRIVER LOGISTICS' ? 'Toyota Hiace - Van #04' : 'Nissan Urvan - Van #02',
            timeSlot
        });
        setDispatchJobId(null);
    };

    // Toggle checklist item
    const handleToggleChecklist = (id) => {
        setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    };

    // Handle File upload change simulation
    const handleFileChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map(file => file.name);
            setSelectedPhotos(prev => [...prev, ...filesArray]);
        }
    };

    // Handle Technician Completion Submit
    const handleCompletionSubmit = (e) => {
        e.preventDefault();
        const uncompletedChecklist = checklist.some(item => !item.checked);
        if (uncompletedChecklist) {
            alert('Please check off all task checklists before declaring the job completed.');
            return;
        }
        if (!customerSignature.trim() || !drawnSignatureData) {
            alert('Please record client name and complete the E-Signature canvas.');
            return;
        }
        
        completeTechnicianJob(completionJobId, {
            completionNotes,
            customerSignature: `${customerSignature} (Signed Electronically)`,
            afterPhotos: selectedPhotos.length > 0 ? selectedPhotos.map(p => `/images/${p}`) : ['/images/after-clean-1.png']
        });
        
        setCompletionJobId(null);
        setCompletionNotes('');
        setCustomerSignature('');
        setDrawnSignatureData(null);
        setChecklist([
            { id: 1, text: 'Wiped all counter surfaces and furniture dust extraction', checked: false },
            { id: 2, text: 'Vacuumed carpeted zones / mopped marble tiles', checked: false },
            { id: 3, text: 'Disinfected kitchen counters and high-touch areas', checked: false },
            { id: 4, text: 'Garbage bags gathered, cleared, and disposed', checked: false }
        ]);
        setSelectedPhotos([]);
    };

    const statusColors = {
        Pending: 'bg-slate-50 text-slate-700 border-slate-200',
        'In Progress': 'bg-blue-50 text-blue-700 border-blue-100',
        Completed: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    };

    const filteredWOs = workOrders.filter(wo => {
        if (filterStatus === 'All') return true;
        return wo.status === filterStatus;
    });

    const isTechnician = userRole === 'technician';
    const isDispatcher = userRole === 'admin' || userRole === 'dispatch';

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaClipboardList className="text-blue-600" />
                        Field Operations & Work Orders
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Real-time dispatch console for managing active cleaning sessions, vans, routes, and paperless completions.</p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                                filterStatus === status 
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10' 
                                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Work Orders List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWOs.map(wo => (
                    <motion.div 
                        key={wo.id} 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between min-h-[260px] text-xs"
                    >
                        <div>
                            {/* Ref & Status */}
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-mono font-bold text-slate-400">Ref: #{wo.id}</span>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${statusColors[wo.status]}`}>
                                    {wo.status}
                                </span>
                            </div>

                            {/* Client & Address */}
                            <div className="space-y-1 mb-3">
                                <h3 className="font-black text-sm text-slate-850">{wo.customerName}</h3>
                                <p className="text-slate-500 font-semibold flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-slate-400 text-[10px]" /> {wo.address}
                                </p>
                            </div>

                            {/* Service Type */}
                            <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl space-y-1 mb-4">
                                <div className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Service Selected</div>
                                <div className="font-bold text-slate-800">{wo.serviceType}</div>
                                {wo.instructions && <div className="text-[10px] text-slate-500 font-semibold italic mt-1">Instructions: "{wo.instructions}"</div>}
                            </div>
                        </div>

                        {/* Dispatch Details & Actions */}
                        <div className="space-y-3 pt-3 border-t border-slate-100">
                            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                                <div>
                                    <span className="block text-[8px] text-slate-400 font-bold uppercase">Technician</span>
                                    <strong className="text-slate-700">{wo.assignedTechnician || 'Unassigned'}</strong>
                                </div>
                                <div>
                                    <span className="block text-[8px] text-slate-400 font-bold uppercase">Logistics Van</span>
                                    <strong className="text-slate-700">{wo.assignedDriver ? `${wo.assignedDriver} (${wo.vehicleInfo})` : 'Unassigned'}</strong>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-slate-450 font-bold pt-1.5">
                                <span>Date: {wo.date}</span>
                                <span>Slot: {wo.timeSlot}</span>
                            </div>

                            {/* State Action Buttons */}
                            <div className="flex justify-end gap-1.5 pt-2 border-t border-slate-100/50">
                                {wo.status === 'Pending' && isDispatcher && (
                                    <button
                                        onClick={() => {
                                            setDispatchJobId(wo.id);
                                            setAssignedTech(wo.assignedTechnician || 'CLEANING TECH');
                                            setAssignedDriver(wo.assignedDriver || 'DRIVER LOGISTICS');
                                            setTimeSlot(wo.timeSlot || '09:00 AM - 01:00 PM');
                                        }}
                                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-center transition flex items-center justify-center gap-1 shadow-sm"
                                    >
                                        <FaTruck className="text-[10px]" /> Dispatch Crew
                                    </button>
                                )}

                                {wo.status === 'In Progress' && (isTechnician || isDispatcher) && (
                                    <button
                                        onClick={() => setCompletionJobId(wo.id)}
                                        className="w-full py-2 bg-success hover:bg-[#059669] text-white rounded-xl font-bold text-center transition flex items-center justify-center gap-1 shadow-sm"
                                    >
                                        <FaSignature className="text-[10px]" /> Close Out (Paperless)
                                    </button>
                                )}

                                {wo.status === 'Completed' && (
                                    <div className="w-full p-2 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1.5">
                                        <div className="font-extrabold text-[9px] text-emerald-800 flex items-center gap-1">
                                            <FaCheck className="text-[8px]" /> Signed off by: {wo.customerSignature}
                                        </div>
                                        {wo.completionNotes && <div className="text-[9px] text-slate-500 font-semibold">Notes: "{wo.completionNotes}"</div>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredWOs.length === 0 && (
                <div className="text-center py-16 text-slate-400 bg-white border border-slate-200 rounded-2xl">
                    <FaClipboardList className="text-4xl mx-auto mb-2 opacity-20" />
                    <p className="text-xs font-bold">No active work orders matched this filter.</p>
                </div>
            )}

            {/* Dispatch Modal */}
            {dispatchJobId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-slate-700">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-850">Dispatch Field Crew</h3>
                            <button onClick={() => setDispatchJobId(null)} className="text-slate-400 hover:text-slate-650 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleDispatchSubmit} className="space-y-3.5 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Assign Field Technician</label>
                                <select 
                                    value={assignedTech} 
                                    onChange={e => setAssignedTech(e.target.value)} 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500"
                                >
                                    {techniciansList.map(tech => <option key={tech} value={tech}>{tech}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Assign Driver & Logistics Van</label>
                                <select 
                                    value={assignedDriver} 
                                    onChange={e => setAssignedDriver(e.target.value)} 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500"
                                >
                                    {driversList.map(driver => <option key={driver} value={driver}>{driver}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Scheduled Time Slot</label>
                                <input 
                                    type="text" 
                                    value={timeSlot} 
                                    onChange={e => setTimeSlot(e.target.value)} 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" 
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setDispatchJobId(null)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Confirm Dispatch</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Close Out Paperless Modal */}
            {completionJobId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl z-10 space-y-4 text-slate-700 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-850">Paperless Job Close-Out</h3>
                            <button onClick={() => setCompletionJobId(null)} className="text-slate-400 hover:text-slate-650 transition"><FaTimes /></button>
                        </div>
                        
                        <form onSubmit={handleCompletionSubmit} className="space-y-4 text-xs">
                            {/* Operational Checklists */}
                            <div className="space-y-2">
                                <label className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Operations Task Checklist *</label>
                                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    {checklist.map(item => (
                                        <label key={item.id} className="flex items-start gap-2.5 cursor-pointer py-0.5 select-none">
                                            <input 
                                                type="checkbox" 
                                                checked={item.checked} 
                                                onChange={() => handleToggleChecklist(item.id)} 
                                                className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                                            />
                                            <span className={`font-semibold ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                {item.text}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Before/After Photo Upload */}
                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Site Photo Uploads (Proof of Clean)</label>
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-1.5 px-3 py-2 border border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer text-slate-600 font-bold transition">
                                        <FaCamera className="text-slate-400" />
                                        <span>Add Clean Photos</span>
                                        <input 
                                            type="file" 
                                            multiple 
                                            accept="image/*" 
                                            onChange={handleFileChange} 
                                            className="hidden" 
                                        />
                                    </label>
                                </div>
                                {selectedPhotos.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                                        {selectedPhotos.map((name, i) => (
                                            <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-bold border border-blue-100">
                                                {name}
                                                <button type="button" onClick={() => setSelectedPhotos(prev => prev.filter((_, idx) => idx !== i))} className="text-blue-400 hover:text-blue-600">✕</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Job Notes */}
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Job Completion Notes</label>
                                <textarea 
                                    required 
                                    rows="2" 
                                    value={completionNotes} 
                                    onChange={e => setCompletionNotes(e.target.value)} 
                                    placeholder="Enter report, checklists checked, client feedback..." 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none" 
                                />
                            </div>

                            {/* E-Signature drawing canvas */}
                            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 space-y-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Client Representative Name *</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            required 
                                            value={customerSignature} 
                                            onChange={e => setCustomerSignature(e.target.value)} 
                                            placeholder="e.g. John Miller" 
                                            className="w-full px-3 py-2 pl-8 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-800" 
                                        />
                                        <FaUser className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-450" />
                                    </div>
                                </div>

                                <SignaturePad 
                                    onSave={(dataUrl) => setDrawnSignatureData(dataUrl)}
                                    onClear={() => setDrawnSignatureData(null)}
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setCompletionJobId(null)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-success text-white rounded-xl font-bold hover:bg-[#059669]">Submit Completion</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OperationsPage;
