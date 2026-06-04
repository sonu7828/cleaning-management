import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
    FaCalendarDay, FaClock, FaCheckCircle, FaCamera, 
    FaSignature, FaMapMarkerAlt, FaFileSignature, FaGasPump, 
    FaClipboardCheck, FaPlus, FaTimes, FaExchangeAlt, FaKey, FaChevronRight 
} from 'react-icons/fa';
import Button from '../../components/ui/Button';

const TechnicianSchedulePage = () => {
    const { 
        workOrders, 
        updateWorkOrderStatus, 
        completeTechnicianJob, 
        inventory, 
        requestPartsFromWarehouse, 
        contracts,
        user 
    } = useContext(AppContext);
    
    // Filter jobs assigned to the logged-in technician (default: CLEANING TECH / Ali Hassan)
    const technicianName = user?.name || 'CLEANING TECH';
    const myJobs = workOrders.filter(wo => wo.assignedTechnician === technicianName);

    // Modal/State triggers
    const [signingJobId, setSigningJobId] = useState(null);
    const [requestingPartsJob, setRequestingPartsJob] = useState(null);
    
    // Form fields
    const [signatureName, setSignatureName] = useState('');
    const [completionNotes, setCompletionNotes] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otpError, setOtpError] = useState(false);
    
    // Checklist states (keyed by job ID)
    const [jobChecklistState, setJobChecklistState] = useState({});

    // Parts Request states
    const [selectedPart, setSelectedPart] = useState('');
    const [requestQty, setRequestQty] = useState(1);
    const [pendingPartsList, setPendingPartsList] = useState([]);

    const getNextServiceDate = (clientName) => {
        const contract = contracts.find(c => c.clientName === clientName && c.status === 'Active');
        if (contract) {
            // Predict next service date (e.g. 14 days from now)
            const date = new Date();
            date.setDate(date.getDate() + 14);
            return date.toISOString().split('T')[0];
        }
        return 'N/A (One-Time Service)';
    };

    const getChecklistForService = (serviceType) => {
        const type = serviceType.toLowerCase();
        if (type.includes('ac') || type.includes('hvac')) {
            return [
                'Clean filter screen & grill elements',
                'Inspect condenser coil and pressure lines',
                'Check motor acoustics and fan vibration',
                'Verify thermostat calibration levels',
                'Deep sanitize AC ducts & vents'
            ];
        } else if (type.includes('sofa') || type.includes('upholstery')) {
            return [
                'Dry vacuum deep dust extraction',
                'Apply extraction shampoo foam to fabric',
                'Agitate fabric stains with spot brush',
                'Warm rinse and vacuum extraction drying',
                'Mist sanitization coat'
            ];
        } else {
            return [
                'Disinfect high-touch points (handles, switches)',
                'Deep vacuum and mop floor spaces',
                'Sanitize kitchen & bathroom plumbing fixtures',
                'Collect and dispose of trash bin contents',
                'Final sanitizing mist spray'
            ];
        }
    };

    const handleStart = (id) => {
        updateWorkOrderStatus(id, 'In Progress');
    };

    const handleCompleteTrigger = (wo) => {
        // Generate a 4-digit code and prompt sign-off modal
        const code = String(Math.floor(1000 + Math.random() * 9000));
        setGeneratedOtp(code);
        setSigningJobId(wo.id);
        setSignatureName('');
        setCompletionNotes(wo.completionNotes || '');
        setOtpCode('');
        setOtpError(false);
    };

    const handleMockPhoto = (id, type) => {
        const mockImgUrl = type === 'before'
            ? 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&auto=format&fit=crop&q=60'
            : 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=300&auto=format&fit=crop&q=60';
        
        if (type === 'before') {
            updateWorkOrderStatus(id, 'In Progress', { beforePhotos: [mockImgUrl] });
        } else {
            updateWorkOrderStatus(id, 'In Progress', { afterPhotos: [mockImgUrl] });
        }
    };

    const handleChecklistToggle = (jobId, taskIndex) => {
        const key = `${jobId}-${taskIndex}`;
        setJobChecklistState(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleAddPartToPending = () => {
        if (!selectedPart) return;
        const partItem = inventory.find(i => i.name === selectedPart);
        if (!partItem) return;

        const exists = pendingPartsList.find(p => p.name === selectedPart);
        if (exists) {
            setPendingPartsList(prev => prev.map(p => 
                p.name === selectedPart ? { ...p, qty: p.qty + Number(requestQty) } : p
            ));
        } else {
            setPendingPartsList(prev => [...prev, { name: selectedPart, qty: Number(requestQty) }]);
        }
        setSelectedPart('');
        setRequestQty(1);
    };

    const handleRemovePendingPart = (name) => {
        setPendingPartsList(prev => prev.filter(p => p.name !== name));
    };

    const handleSubmitPartsRequest = (e) => {
        e.preventDefault();
        if (pendingPartsList.length === 0) {
            alert('Please add at least one part.');
            return;
        }

        requestPartsFromWarehouse(
            requestingPartsJob.id,
            requestingPartsJob.customerName,
            pendingPartsList
        );

        setPendingPartsList([]);
        setRequestingPartsJob(null);
        alert('Parts request successfully sent to warehouse manager!');
    };

    const handleFinalSignOff = (e) => {
        e.preventDefault();
        if (otpCode !== generatedOtp) {
            setOtpError(true);
            return;
        }

        completeTechnicianJob(signingJobId, {
            customerSignature: signatureName,
            completionNotes: completionNotes,
            afterPhotos: ['https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=300&auto=format&fit=crop&q=60']
        });

        setSigningJobId(null);
        setGeneratedOtp('');
        alert('Work order completed, verified via OTP, and client invoice drafted.');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaCalendarDay className="text-amber-500" />
                        Technician Dispatch Roster
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Roster schedule, service checklists, and warehouse requests for {technicianName}.</p>
                </div>
                <div className="bg-[#1E293B]/40 px-4 py-2 border border-[#1E293B]/60 rounded-2xl flex items-center gap-2 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-slate-350">{technicianName} (Field Agent)</span>
                </div>
            </div>

            {/* Jobs Checklist */}
            <div className="space-y-6">
                {myJobs.length === 0 ? (
                    <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-12 text-center text-slate-400 font-bold italic shadow-xl">
                        No active jobs assigned to you on today's roster.
                    </div>
                ) : (
                    myJobs.map((job) => {
                        const checklistTasks = getChecklistForService(job.serviceType);
                        return (
                            <div key={job.id} className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-5">
                                {/* Title & Status */}
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                                                job.priority === 'Emergency' || job.priority === 'High' 
                                                    ? 'bg-rose-500/10 text-rose-450 border-rose-500/20' 
                                                    : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                            }`}>
                                                {job.priority} Priority
                                            </span>
                                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-[#1E293B] text-slate-350 border border-[#1E293B]/50 uppercase tracking-wider">
                                                Next Service: {getNextServiceDate(job.customerName)}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-black text-white leading-snug mt-1">{job.customerName} - {job.serviceType}</h3>
                                    </div>
                                    <div className="shrink-0">
                                        <span className={`px-3 py-1 rounded-full text-xs font-black border uppercase tracking-wider ${
                                            job.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                            job.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                            'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                        }`}>
                                            {job.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Location & Instructions Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 bg-[#0B1120]/50 p-4 border border-[#1E293B]/20 rounded-2xl">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2.5">
                                            <FaMapMarkerAlt className="text-slate-500 shrink-0 text-sm mt-0.5" />
                                            <div>
                                                <div className="font-bold text-slate-200">Site Location</div>
                                                <div className="text-[11px] text-slate-400 mt-0.5">{job.address}</div>
                                                {job.googleMapLink && (
                                                    <a 
                                                        href={job.googleMapLink} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="text-amber-400 hover:underline font-bold text-[10px] flex items-center gap-1 mt-1"
                                                    >
                                                        Google Maps Navigation <FaChevronRight className="text-[8px]" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2.5">
                                            <FaClock className="text-slate-500 shrink-0 text-sm mt-0.5" />
                                            <div>
                                                <div className="font-bold text-slate-200">Scheduled Slot</div>
                                                <div className="text-[11px] text-slate-400 mt-0.5">{job.timeSlot} ({job.date})</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t md:border-t-0 md:border-l border-[#1E293B]/40 pt-3 md:pt-0 md:pl-4 space-y-1.5">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Dispatcher Instructions</span>
                                        <p className="text-slate-350 leading-relaxed font-semibold italic">"{job.instructions || 'Perform standard cleaning SOP.'}"</p>
                                    </div>
                                </div>

                                {/* Dynamic Checklist Block */}
                                {job.status !== 'Pending' && (
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                            <FaClipboardCheck className="text-amber-500" />
                                            Service Task Checklist ({job.serviceType})
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#0B1120]/40 p-4 border border-[#1E293B]/20 rounded-2xl">
                                            {checklistTasks.map((task, idx) => {
                                                const checked = !!jobChecklistState[`${job.id}-${idx}`];
                                                return (
                                                    <label 
                                                        key={idx} 
                                                        className="flex items-start gap-2.5 p-1.5 hover:bg-[#0B1120] rounded-lg cursor-pointer transition text-xs"
                                                    >
                                                        <input 
                                                            type="checkbox" 
                                                            checked={checked} 
                                                            onChange={() => handleChecklistToggle(job.id, idx)}
                                                            className="rounded border-[#1E293B]/50 text-amber-500 focus:ring-0 focus:ring-offset-0 bg-[#0B1120] w-4.5 h-4.5 shrink-0 mt-0.5" 
                                                        />
                                                        <span className={`font-semibold ${checked ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                                                            {task}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Photo Uploads (Before & After) */}
                                {job.status !== 'Pending' && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Before Photos */}
                                        <div className="border border-[#1E293B]/30 bg-[#0B1120]/30 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3">
                                            <span className="text-xs font-bold text-slate-300">Before Job Photo</span>
                                            {job.beforePhotos && job.beforePhotos.length > 0 ? (
                                                <img src={job.beforePhotos[0]} alt="Before job" className="w-full h-36 object-cover rounded-xl border border-[#1E293B]/50" />
                                            ) : (
                                                <div className="w-full h-36 flex flex-col items-center justify-center border border-dashed border-[#1E293B]/40 rounded-xl bg-[#0B1120]/50 text-slate-500">
                                                    <FaCamera className="text-3xl mb-1.5" />
                                                    <span className="text-[10px] font-bold">No Photo Uploaded</span>
                                                </div>
                                            )}
                                            {job.status === 'In Progress' && (
                                                <button 
                                                    onClick={() => handleMockPhoto(job.id, 'before')} 
                                                    className="px-3.5 py-1.5 bg-[#1E293B] hover:bg-[#1E293B]/80 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                                                >
                                                    <FaCamera /> Snap Before
                                                </button>
                                            )}
                                        </div>

                                        {/* After Photos */}
                                        <div className="border border-[#1E293B]/30 bg-[#0B1120]/30 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3">
                                            <span className="text-xs font-bold text-slate-300">After Job Photo</span>
                                            {job.afterPhotos && job.afterPhotos.length > 0 ? (
                                                <img src={job.afterPhotos[0]} alt="After job" className="w-full h-36 object-cover rounded-xl border border-[#1E293B]/50" />
                                            ) : (
                                                <div className="w-full h-36 flex flex-col items-center justify-center border border-dashed border-[#1E293B]/40 rounded-xl bg-[#0B1120]/50 text-slate-500">
                                                    <FaCamera className="text-3xl mb-1.5" />
                                                    <span className="text-[10px] font-bold">No Photo Uploaded</span>
                                                </div>
                                            )}
                                            {job.status === 'In Progress' && (
                                                <button 
                                                    onClick={() => handleMockPhoto(job.id, 'after')} 
                                                    className="px-3.5 py-1.5 bg-[#1E293B] hover:bg-[#1E293B]/80 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                                                >
                                                    <FaCamera /> Snap After
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Job Action Panel */}
                                <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-[#1E293B]/20">
                                    <div>
                                        {job.status === 'In Progress' && (
                                            <button 
                                                onClick={() => {
                                                    setRequestingPartsJob(job);
                                                    setPendingPartsList([]);
                                                }}
                                                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 font-bold rounded-xl text-xs transition"
                                            >
                                                Request Warehouse Parts
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        {job.status === 'Pending' && (
                                            <button 
                                                onClick={() => handleStart(job.id)} 
                                                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/10"
                                            >
                                                <FaClock /> Start Cleaning Job
                                            </button>
                                        )}
                                        {job.status === 'In Progress' && (
                                            <button 
                                                onClick={() => handleCompleteTrigger(job)} 
                                                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-600/10"
                                            >
                                                <FaCheckCircle /> Sign off & Complete
                                            </button>
                                        )}
                                        {job.status === 'Completed' && (
                                            <div className="text-xs text-emerald-400 font-bold flex items-center gap-2 bg-[#0B1120] border border-emerald-500/25 px-4 py-2.5 rounded-xl">
                                                <FaSignature /> Customer Signature: <span className="text-white italic">"{job.customerSignature || 'Elena Rostova'}"</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* MODAL: Warehouse Parts Request */}
            {requestingPartsJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                    <div className="relative bg-[#111827] border border-[#1E293B]/80 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center pb-2 border-b border-[#1E293B]/50">
                            <h3 className="text-base font-black text-white">Request Parts from Warehouse</h3>
                            <button onClick={() => setRequestingPartsJob(null)} className="text-slate-400 hover:text-slate-200 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmitPartsRequest} className="space-y-4 text-xs">
                            <div className="bg-[#0B1120] p-3 rounded-xl border border-[#1E293B]/30 space-y-1">
                                <p className="text-slate-400 font-bold">Client: {requestingPartsJob.customerName}</p>
                                <p className="text-slate-350">Service: {requestingPartsJob.serviceType}</p>
                            </div>

                            {/* Dropdown to select inventory part */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-2 space-y-1">
                                    <label className="font-bold text-slate-300">Select Part</label>
                                    <select 
                                        value={selectedPart}
                                        onChange={e => setSelectedPart(e.target.value)}
                                        className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2 outline-none text-white bg-[#0B1120]"
                                    >
                                        <option value="">-- Choose Item --</option>
                                        {inventory.map(item => (
                                            <option key={item.id} value={item.name} disabled={item.quantity <= 0}>
                                                {item.name} ({item.quantity} {item.unit} left) {item.quantity <= item.minStock ? '- Low Stock' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Qty</label>
                                    <div className="flex gap-1.5">
                                        <input 
                                            type="number" 
                                            min="1"
                                            value={requestQty}
                                            onChange={e => setRequestQty(Number(e.target.value))}
                                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2 outline-none text-white text-center" 
                                        />
                                        <button 
                                            type="button"
                                            onClick={handleAddPartToPending}
                                            className="px-3 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-600 transition"
                                        >
                                            <FaPlus className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Selected Parts List */}
                            <div className="space-y-2">
                                <span className="font-bold text-slate-300 block">Requested Items</span>
                                <div className="bg-[#0B1120] border border-[#1E293B]/20 rounded-xl p-3 divide-y divide-[#1E293B]/30 max-h-[140px] overflow-y-auto">
                                    {pendingPartsList.length === 0 ? (
                                        <p className="text-center text-slate-500 italic text-[10px] py-4">No parts added yet.</p>
                                    ) : (
                                        pendingPartsList.map((part, i) => (
                                            <div key={i} className="flex justify-between items-center py-2 text-xs">
                                                <span className="text-slate-200 font-semibold">{part.name}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-amber-400 font-bold">{part.qty} pcs</span>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleRemovePendingPart(part.name)}
                                                        className="text-slate-400 hover:text-rose-500 transition"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2.5 pt-3 border-t border-[#1E293B]/40">
                                <button type="button" onClick={() => setRequestingPartsJob(null)} className="px-4 py-2.5 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-bold rounded-xl text-xs transition">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-xs transition">Submit Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* SIGNATURE & OTP SIGN-OFF OVERLAY */}
            {signingJobId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                    <div className="relative bg-[#111827] border border-[#1E293B]/50 text-slate-100 rounded-3xl p-6 w-full max-w-sm shadow-2xl z-10 space-y-4">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-[#1E293B]/40">
                            <FaFileSignature className="text-emerald-500 text-lg" />
                            <h3 className="text-base font-black text-white">Client Completion Sign-Off</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">Ask the customer to inspect the site and provide signature details. Enter the Verification OTP to complete the dispatch loop.</p>
                        
                        {/* Mock OTP Display */}
                        <div className="bg-[#0B1120] border border-amber-500/25 p-3 rounded-xl flex items-center justify-between">
                            <div>
                                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Customer verification otp</span>
                                <span className="text-sm font-black text-amber-400 tracking-wider font-mono">{generatedOtp}</span>
                            </div>
                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded text-[9px] font-bold">Simulated</span>
                        </div>

                        <form onSubmit={handleFinalSignOff} className="space-y-3.5 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Customer Representative Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={signatureName}
                                    onChange={(e) => setSignatureName(e.target.value)}
                                    placeholder="e.g. John Miller (Operations Manager)"
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2 text-white outline-none focus:ring-1 focus:ring-emerald-500/50"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Job Completion Notes / Customer Feedback</label>
                                <textarea
                                    value={completionNotes}
                                    onChange={(e) => setCompletionNotes(e.target.value)}
                                    placeholder="All filters washed, unit tested, client verified airflow."
                                    className="w-full h-16 bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2 text-white outline-none focus:ring-1 focus:ring-emerald-500/50"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Enter Verification OTP *</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        maxLength="4"
                                        value={otpCode}
                                        onChange={(e) => {
                                            setOtpCode(e.target.value);
                                            setOtpError(false);
                                        }}
                                        placeholder="Enter the 4-digit code"
                                        className={`w-full bg-[#0B1120] border rounded-xl pl-9 pr-3 py-2 text-white outline-none font-bold tracking-widest font-mono text-center ${
                                            otpError ? 'border-rose-500 focus:ring-1 focus:ring-rose-500/50' : 'border-[#1E293B]/40 focus:ring-1 focus:ring-emerald-500/50'
                                        }`}
                                    />
                                    <FaKey className="absolute left-3 top-3 text-slate-500 text-[10px]" />
                                </div>
                                {otpError && <p className="text-[10px] text-rose-450 font-bold">Incorrect verification code. Please check simulated display above.</p>}
                            </div>

                            <div className="flex justify-end gap-2 text-xs pt-3 border-t border-[#1E293B]/40">
                                <button type="button" onClick={() => setSigningJobId(null)} className="px-4 py-2.5 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-bold rounded-xl transition">Cancel</button>
                                <button type="submit" className="px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-xl transition">Submit & Close Job</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TechnicianSchedulePage;
