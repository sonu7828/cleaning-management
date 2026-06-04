import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
    FaTruck, FaMapMarkerAlt, FaClock, FaCheckCircle, 
    FaPlay, FaUserFriends, FaClipboardList 
} from 'react-icons/fa';

const DriverDashboard = () => {
    const { workOrders, updateWorkOrderStatus, user } = useContext(AppContext);
    
    // Filter work orders assigned to this driver (DRIVER LOGISTICS)
    const driverRoutes = workOrders.filter(wo => wo.assignedDriver === user.name || wo.assignedDriver === 'DRIVER LOGISTICS' || wo.assignedDriver === 'Mohammed Tariq');

    const handleStartTrip = (id) => {
        updateWorkOrderStatus(id, 'In Progress');
    };

    const handleConfirmArrival = (id) => {
        updateWorkOrderStatus(id, 'Completed');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12 text-slate-800 px-4">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <FaTruck className="text-indigo-600 text-xl" />
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        Logistics Driver Console
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Toyota Hiace - Van #04 | Active Duty</p>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-[#1E293B]/60 border border-white/5 rounded-2xl p-4 text-center">
                    <div className="text-xs uppercase font-black tracking-widest text-indigo-700">Total Runs</div>
                    <div className="text-xl sm:text-2xl font-black text-slate-800 mt-1">{driverRoutes.length}</div>
                </div>
                <div className="bg-[#1E293B]/60 border border-white/5 rounded-2xl p-4 text-center">
                    <div className="text-xs uppercase font-black tracking-widest text-emerald-700">Completed</div>
                    <div className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
                        {driverRoutes.filter(r => r.status === 'Completed').length}
                    </div>
                </div>
                <div className="bg-[#1E293B]/60 border border-white/5 rounded-2xl p-4 text-center flex flex-col justify-center items-center">
                    <div className="text-xs uppercase font-black tracking-widest text-amber-700">Active Van</div>
                    <div className="text-sm font-black text-slate-800 mt-1 truncate max-w-full">Van #04</div>
                </div>
            </div>

            {/* Title */}
            <div>
                <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                    <FaClipboardList className="text-indigo-600" />
                    <span>My Assigned Routes & Dispatches</span>
                </h3>
                <p className="text-xs text-slate-500">Select an assigned cleaning roster route below to start transit.</p>
            </div>

            {/* Routes List */}
            <div className="space-y-4">
                {driverRoutes.length === 0 ? (
                    <div className="text-center py-10 bg-[#111827]/85 border border-white/5 rounded-2xl text-slate-400 text-xs font-medium">
                        No routes assigned to your schedule today.
                    </div>
                ) : (
                    driverRoutes.map((route) => (
                        <div 
                            key={route.id} 
                            className={`bg-[#111827]/85 border rounded-2xl p-5 shadow-xl border-l-4 backdrop-blur-sm transition-all hover:bg-[#111827]/95 ${
                                route.status === 'Completed' ? 'border-l-emerald-500 border-t-white/5 border-r-white/5 border-b-white/5' :
                                route.status === 'In Progress' ? 'border-l-indigo-500 bg-indigo-950/5 border-t-white/10 border-r-white/10 border-b-white/10' :
                                'border-l-amber-500 border-t-white/5 border-r-white/5 border-b-white/5'
                            }`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                {/* Col 1: Route Status & Customer */}
                                <div className="space-y-1 md:col-span-4">
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black border ${
                                        route.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                                        route.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800 border-indigo-200 animate-pulse' :
                                        'bg-amber-100 text-amber-800 border-amber-200'
                                    }`}>
                                        {route.status === 'In Progress' ? 'In Transit' : route.status}
                                    </span>
                                    <h3 className="font-extrabold text-sm sm:text-base text-slate-800 leading-snug">{route.customerName}</h3>
                                    <p className="text-[10px] text-slate-500 font-semibold">Route ID: {route.id}</p>
                                </div>

                                {/* Col 2: Details */}
                                <div className="space-y-2 text-xs text-slate-650 md:col-span-4">
                                    <div className="flex items-start gap-1.5">
                                        <FaMapMarkerAlt className="text-rose-500 text-[11px] mt-0.5 shrink-0" />
                                        <span className="font-medium text-slate-700">{route.address}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FaClock className="text-slate-500 text-[10px] shrink-0" />
                                        <span>Schedule: {route.timeSlot} ({route.date})</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FaUserFriends className="text-indigo-600 text-[10px] shrink-0" />
                                        <span>Crew: <strong className="text-slate-800">{route.assignedTechnician}</strong></span>
                                    </div>
                                    {route.instructions && (
                                        <div className="mt-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-650 leading-relaxed">
                                            <strong className="text-slate-800">Special Instructions:</strong> {route.instructions}
                                        </div>
                                    )}
                                </div>

                                {/* Col 3: Action Buttons */}
                                <div className="flex md:justify-end md:col-span-4">
                                    {route.status === 'Pending' && (
                                        <button
                                            onClick={() => handleStartTrip(route.id)}
                                            className="w-full md:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl flex items-center justify-center gap-1.5 text-xs active:scale-[0.98] transition-all shadow-lg"
                                        >
                                            <FaPlay className="text-[9px]" /> Start Transit / Route
                                        </button>
                                    )}

                                    {route.status === 'In Progress' && (
                                        <button
                                            onClick={() => handleConfirmArrival(route.id)}
                                            className="w-full md:w-auto px-5 py-2.5 bg-success hover:bg-[#059669] text-white font-extrabold rounded-xl flex items-center justify-center gap-1.5 text-xs active:scale-[0.98] transition-all shadow-lg"
                                        >
                                            <FaCheckCircle className="text-[10px]" /> Confirm Arrival / Drop-off
                                        </button>
                                    )}

                                    {route.status === 'Completed' && (
                                        <div className="w-full md:w-auto px-5 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold rounded-xl flex items-center justify-center gap-1.5 text-xs">
                                            <FaCheckCircle className="text-success text-[10px]" /> Drop-off Completed
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DriverDashboard;
