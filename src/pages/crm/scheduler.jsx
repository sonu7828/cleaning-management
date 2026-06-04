import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
    FaCalendarAlt, FaPlus, FaClock, FaMapMarkerAlt, 
    FaExclamationTriangle, FaTrash, FaTimes, FaUser, FaTruck, FaFilter, FaCheckCircle, FaUserFriends
} from 'react-icons/fa';

const SchedulerPage = () => {
    const { workOrders, addWorkOrder, deleteWorkOrder, clients, services, vehicles } = useContext(AppContext);
    
    const [showModal, setShowModal] = useState(false);
    const [showConflictConfirm, setShowConflictConfirm] = useState(false);
    const [deleteJobConfirm, setDeleteJobConfirm] = useState({ isOpen: false, jobId: null });
    const [selectedService, setSelectedService] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [timeSlot, setTimeSlot] = useState('09:00 AM - 01:00 PM');
    const [priority, setPriority] = useState('Medium');
    const [assignedTech, setAssignedTech] = useState('Ali Hassan');
    const [assignedHelper, setAssignedHelper] = useState('None');
    const [assignedDriver, setAssignedDriver] = useState('Mohammed Tariq');
    const [assignedVehicle, setAssignedVehicle] = useState('Toyota Hiace - Van #04');
    const [jobCategory, setJobCategory] = useState('Cleaning');
    const [instructions, setInstructions] = useState('');

    // Region/Emirate filter for dispatcher (Missing Item FSM Route optimization)
    const [emirateFilter, setEmirateFilter] = useState('All');

    const techniciansList = ['Ali Hassan', 'Michael Ndubuisi', 'Rakesh Kumar', 'Sunny Singh'];
    const helpersList = ['None', 'Sunny Singh', 'Rakesh Kumar', 'Michael Ndubuisi', 'Ali Hassan'];
    const driversList = ['Mohammed Tariq', 'Bilal Khan', 'Suresh Nair', 'Yuvraj Singh'];
    const timeSlots = [
        '08:00 AM - 12:00 PM',
        '09:00 AM - 01:00 PM',
        '01:00 PM - 05:00 PM',
        '02:00 PM - 06:00 PM',
        '10:00 PM - 02:00 AM'
    ];

    const jobCategories = ['Cleaning', 'Maintenance', 'Repair', 'Inspection'];

    // Real-time conflict checking (Missing Item 22 Conflict Check)
    const activeScheduleConflicts = [];
    if (showModal) {
        const slotsOverlap = workOrders.filter(wo => wo.date === date && wo.timeSlot === timeSlot && wo.status !== 'Cancelled');
        
        const techConflict = slotsOverlap.some(wo => wo.assignedTechnician === assignedTech || wo.assignedHelper === assignedTech);
        const helperConflict = assignedHelper !== 'None' && slotsOverlap.some(wo => wo.assignedTechnician === assignedHelper || wo.assignedHelper === assignedHelper);
        const driverConflict = slotsOverlap.some(wo => wo.assignedDriver === assignedDriver);
        const vehicleConflict = slotsOverlap.some(wo => wo.vehicleInfo === assignedVehicle);

        if (techConflict) activeScheduleConflicts.push(`Lead Tech ${assignedTech} is already scheduled on this slot.`);
        if (helperConflict) activeScheduleConflicts.push(`Helper ${assignedHelper} is already scheduled on this slot.`);
        if (driverConflict) activeScheduleConflicts.push(`Driver ${assignedDriver} is already scheduled on this slot.`);
        if (vehicleConflict) activeScheduleConflicts.push(`Vehicle ${assignedVehicle} is already scheduled on this slot.`);
    }

    // Dispatch Job Helper
    const dispatchJob = () => {
        const clientMatch = clients.find(c => c.name === selectedClient);
        const address = clientMatch ? clientMatch.address : 'Dubai, UAE';
        const emirate = clientMatch ? (clientMatch.emirate || 'Dubai') : 'Dubai';

        addWorkOrder({
            customerName: selectedClient,
            address,
            emirate,
            serviceType: selectedService,
            timeSlot,
            date,
            assignedTechnician: assignedTech,
            assignedHelper,
            assignedDriver,
            vehicleInfo: assignedVehicle,
            instructions,
            priority,
            jobCategory,
            status: 'Pending'
        });

        // Reset
        setSelectedService('');
        setSelectedClient('');
        setInstructions('');
        setShowModal(false);
        setShowConflictConfirm(false);
    };

    // Handle Schedule Submit
    const handleSchedule = (e) => {
        e.preventDefault();
        if (!selectedClient || !selectedService) {
            alert('Please select a customer and service.');
            return;
        }

        if (activeScheduleConflicts.length > 0) {
            setShowConflictConfirm(true);
        } else {
            dispatchJob();
        }
    };

    // Calculate the 7 days of the current week dynamically
    const getCurrentWeekDays = () => {
        const current = new Date();
        const day = current.getDay();
        const diff = current.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(current.setDate(diff));
        
        const days = [];
        for (let i = 0; i < 7; i++) {
            const temp = new Date(monday);
            temp.setDate(monday.getDate() + i);
            const dateStr = temp.toISOString().split('T')[0];
            const label = temp.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
            days.push({ label, dateStr });
        }
        return days;
    };

    const daysOfWeek = getCurrentWeekDays();
    const todayStr = new Date().toISOString().split('T')[0];

    // Filter work orders based on Emirate for scheduling optimization
    const filteredWorkOrders = workOrders.filter(wo => {
        if (emirateFilter === 'All') return true;
        return wo.emirate === emirateFilter;
    });

    const priorityColors = {
        Emergency: 'bg-rose-50 border-rose-100 text-rose-700',
        High: 'bg-orange-50 border-orange-100 text-orange-700',
        Medium: 'bg-amber-50 border-amber-100 text-amber-700',
        Low: 'bg-slate-50 border-slate-200 text-slate-700'
    };

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-600" />
                        Scheduler & Dispatch Desk
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Roster technicians, Van drivers, helper support, and vehicles on a conflict-free grid.</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)} 
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/10"
                >
                    <FaPlus className="text-[10px]" /> Schedule Visit
                </button>
            </div>

            {/* Weekly Timeline Overview Grid */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <h3 className="text-xs font-black text-slate-500 flex items-center gap-1.5">
                        <FaClock className="text-blue-600" /> Weekly Schedule Timeline (All Regions)
                    </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3">
                    {daysOfWeek.map((day) => {
                        const dayWOs = workOrders.filter(wo => wo.date === day.dateStr);
                        const isToday = day.dateStr === todayStr;
                        return (
                            <div 
                                key={day.dateStr}
                                className={`p-3 rounded-xl border text-left flex flex-col justify-between min-h-[160px] transition ${
                                    isToday 
                                        ? 'bg-blue-50/20 border-blue-500 ring-2 ring-blue-500/5' 
                                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                                    }`}
                            >
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                    <span className={`text-[10px] font-extrabold uppercase ${isToday ? 'text-blue-650' : 'text-slate-500'}`}>{day.label}</span>
                                    {isToday && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>}
                                </div>
                                
                                <div className="flex-1 overflow-y-auto space-y-1.5 my-2 pr-0.5 max-h-[100px] scrollbar-thin">
                                    {dayWOs.length === 0 ? (
                                        <div className="text-[9px] text-slate-400 font-semibold italic text-center pt-6">Rest Day</div>
                                    ) : (
                                        dayWOs.map(wo => (
                                            <div 
                                                key={wo.id} 
                                                className={`p-1.5 rounded text-[8.5px] leading-tight font-bold border break-words whitespace-normal ${
                                                    wo.priority === 'Emergency' ? 'bg-rose-50 border-rose-100 text-rose-700' :
                                                    wo.priority === 'High' ? 'bg-orange-50 border-orange-100 text-orange-700' :
                                                    wo.priority === 'Medium' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                                                    'bg-blue-50 border-blue-100 text-blue-700'
                                                }`}
                                                title={`${wo.timeSlot} - ${wo.customerName} - ${wo.serviceType}`}
                                            >
                                                {wo.timeSlot.split(' ')[0]} - {wo.customerName}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Split screen: Dispatch table on left, Fleet vehicle status on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Detailed Dispatch Board List */}
                <div className="lg:col-span-9 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
                        <h3 className="text-sm font-black text-slate-800">Operational Dispatch Roster</h3>
                        
                        {/* Emirate filter for Route Optimization (Missing Item Route Optimize) */}
                        <div className="flex items-center gap-2">
                            <FaFilter className="text-slate-400 text-[10px]" />
                            <select 
                                value={emirateFilter}
                                onChange={e => setEmirateFilter(e.target.value)}
                                className="px-2.5 py-1.5 border border-slate-200 rounded-xl bg-white font-semibold text-slate-700 text-[11px]"
                            >
                                <option value="All">All UAE Regions</option>
                                <option value="Dubai">Dubai</option>
                                <option value="Abu Dhabi">Abu Dhabi</option>
                                <option value="Sharjah">Sharjah</option>
                                <option value="Ajman">Ajman</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-slate-250 text-slate-450 font-extrabold uppercase tracking-wider">
                                    <th className="py-3 px-2">Job Ref</th>
                                    <th className="py-3 px-2">Customer & Site Address</th>
                                    <th className="py-3 px-2">Category / Service</th>
                                    <th className="py-3 px-2">Field Crew Assignments</th>
                                    <th className="py-3 px-2">Schedule Time</th>
                                    <th className="py-3 px-2">Status</th>
                                    <th className="py-3 px-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                {filteredWorkOrders.map((wo) => (
                                    <tr key={wo.id} className="hover:bg-slate-50 transition">
                                        <td className="py-3.5 px-2 text-slate-500 font-mono font-bold">#{wo.id}</td>
                                        <td className="py-3.5 px-2">
                                            <div className="flex items-center gap-1.5">
                                                <div className="font-bold text-slate-850">{wo.customerName}</div>
                                                <span className={`text-[8.5px] px-1 bg-slate-100 border border-slate-200 rounded text-slate-500 font-bold`}>{wo.emirate || 'Dubai'}</span>
                                            </div>
                                            <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-[9px]" /> {wo.address}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-2">
                                            <div className="font-extrabold text-indigo-650 tracking-wider text-[10px] uppercase">{wo.jobCategory || 'Cleaning'}</div>
                                            <div className="font-bold text-slate-750 mt-0.5">{wo.serviceType}</div>
                                        </td>
                                        <td className="py-3.5 px-2 space-y-1 text-[10px]">
                                            <div className="flex items-center gap-1.5">
                                                <FaUser className="text-blue-500 shrink-0 text-[8px]" />
                                                <span>Tech: <strong>{wo.assignedTechnician}</strong></span>
                                            </div>
                                            {wo.assignedHelper && wo.assignedHelper !== 'None' && (
                                                <div className="flex items-center gap-1.5 pl-3">
                                                    <FaUserFriends className="text-slate-400 shrink-0 text-[8px]" />
                                                    <span>Helper: <strong className="text-slate-600">{wo.assignedHelper}</strong></span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1.5">
                                                <FaTruck className="text-emerald-500 shrink-0 text-[8px]" />
                                                <span>Driver: <strong>{wo.assignedDriver}</strong> ({wo.vehicleInfo})</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-2">
                                            <div className="font-bold text-slate-800">{wo.date}</div>
                                            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                                <FaClock className="text-[9px]" /> {wo.timeSlot}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-2">
                                            <div className="space-y-1">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border block text-center ${
                                                    wo.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    wo.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    wo.status === 'Assigned' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                                    wo.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                                    'bg-slate-50 text-slate-700 border-slate-200'
                                                }`}>
                                                    {wo.status}
                                                </span>
                                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold border block text-center ${priorityColors[wo.priority || 'Medium']}`}>
                                                    {wo.priority || 'Medium'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-2 text-right">
                                            <button
                                                onClick={() => {
                                                    setDeleteJobConfirm({ isOpen: true, jobId: wo.id });
                                                }}
                                                className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-100 rounded-lg transition"
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

                {/* Fleet Vehicle Status Side Panel (Missing Item Vehicle Panel) */}
                <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <FaTruck className="text-blue-600" /> Fleet Vehicle Roster
                    </h3>
                    <div className="space-y-2.5">
                        {vehicles.map(v => (
                            <div key={v.id} className="p-3 border border-slate-200 bg-slate-50/50 rounded-xl space-y-1.5 flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-slate-850">{v.type}</div>
                                    <div className="text-[9px] font-mono text-slate-400">{v.plateNumber}</div>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                                    v.status === 'Available' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                    v.status === 'Active' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-amber-50 border-amber-100 text-amber-600'
                                }`}>
                                    {v.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Roster Job Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl z-10 space-y-4 text-slate-700 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-850 flex items-center gap-1.5"><FaCalendarAlt /> Dispatch Visit Job Card</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-650 transition"><FaTimes /></button>
                        </div>
                        
                        {/* Real-time schedule conflict notification banner */}
                        {activeScheduleConflicts.length > 0 && (
                            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 font-bold rounded-xl space-y-1 flex items-start gap-2">
                                <FaExclamationTriangle className="mt-0.5 shrink-0" />
                                <div>
                                    <div className="text-[10px] uppercase font-black">Roster Scheduling Conflict Detected</div>
                                    <ul className="list-disc pl-4 text-[9px] font-medium mt-1">
                                        {activeScheduleConflicts.map((conf, idx) => <li key={idx}>{conf}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSchedule} className="space-y-3.5 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Select Customer Site *</label>
                                    <select
                                        required
                                        value={selectedClient}
                                        onChange={(e) => setSelectedClient(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    >
                                        <option value="">Choose Site...</option>
                                        {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Cleaning Service *</label>
                                    <select
                                        required
                                        value={selectedService}
                                        onChange={(e) => setSelectedService(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    >
                                        <option value="">Select Service...</option>
                                        {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Job Roster Category *</label>
                                    <select
                                        value={jobCategory}
                                        onChange={(e) => setJobCategory(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white font-bold text-slate-700"
                                    >
                                        {jobCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Job Priority *</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white font-bold"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Emergency">Emergency</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Lead Technician *</label>
                                    <select
                                        value={assignedTech}
                                        onChange={(e) => setAssignedTech(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    >
                                        {techniciansList.map(tech => (
                                            <option key={tech} value={tech}>{tech}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Helper Technician Assignment</label>
                                    <select
                                        value={assignedHelper}
                                        onChange={(e) => setAssignedHelper(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    >
                                        {helpersList.map(h => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Fleet Driver *</label>
                                    <select
                                        value={assignedDriver}
                                        onChange={(e) => setAssignedDriver(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    >
                                        {driversList.map(driver => (
                                            <option key={driver} value={driver}>{driver}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Assign Van Vehicle *</label>
                                    <select
                                        value={assignedVehicle}
                                        onChange={(e) => setAssignedVehicle(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    >
                                        {vehicles.map(v => (
                                            <option key={v.id} value={v.type}>{v.type} ({v.plateNumber})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Service Date *</label>
                                    <input
                                        type="date"
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Shift Time Slot *</label>
                                    <select
                                        value={timeSlot}
                                        onChange={(e) => setTimeSlot(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                    >
                                        {timeSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Technician Protocols & Gate Instructions</label>
                                <textarea 
                                    rows="3" 
                                    value={instructions} 
                                    onChange={(e) => setInstructions(e.target.value)} 
                                    placeholder="Enter access details, material requirements, gate passes..." 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none" 
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Dispatch Job</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Custom Schedule Conflict Confirm Modal */}
            {showConflictConfirm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-card border border-gray-800 text-white rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-xs">
                        <div className="flex items-center gap-3 text-warning">
                            <FaExclamationTriangle className="text-2xl shrink-0" />
                            <div>
                                <h3 className="text-sm font-black tracking-tight text-white">Scheduling Conflict Detected</h3>
                                <p className="text-[10px] text-gray-400 mt-0.5">Overlap in crew or fleet assignment</p>
                            </div>
                        </div>
                        
                        <div className="p-3 bg-red-950/20 border border-red-900/50 rounded-xl space-y-1 text-[10px] text-red-305 font-bold">
                            {activeScheduleConflicts.map((c, idx) => (
                                <div key={idx} className="flex items-start gap-1">
                                    <span>•</span> <span>{c}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-gray-300 leading-relaxed font-medium">
                            Do you want to override these scheduling conflicts and dispatch this work order anyway?
                        </p>
                        
                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                            <button 
                                type="button" 
                                onClick={() => setShowConflictConfirm(false)} 
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={dispatchJob}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition"
                            >
                                Confirm Override
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Job Deletion Confirm Modal */}
            {deleteJobConfirm.isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-card border border-gray-800 text-white rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-xs">
                        <div className="flex items-center gap-3 text-rose-500">
                            <FaExclamationTriangle className="text-2xl shrink-0" />
                            <div>
                                <h3 className="text-sm font-black tracking-tight text-white">Cancel Cleaning Job</h3>
                                <p className="text-[10px] text-gray-400 mt-0.5">This action will remove the job from schedule.</p>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed font-medium">
                            Are you sure you want to cancel and delete the scheduled cleaning job <span className="text-white font-bold">"#{deleteJobConfirm.jobId}"</span>?
                        </p>
                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                            <button 
                                type="button" 
                                onClick={() => setDeleteJobConfirm({ isOpen: false, jobId: null })} 
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    deleteWorkOrder(deleteJobConfirm.jobId);
                                    setDeleteJobConfirm({ isOpen: false, jobId: null });
                                }}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition"
                            >
                                Confirm Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchedulerPage;
