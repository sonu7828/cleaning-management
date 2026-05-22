import React, { useState } from 'react';
import { FaTruck, FaMapMarkerAlt, FaCheckCircle, FaRoute, FaBuilding } from 'react-icons/fa';

const DriverRoutesPage = () => {
    const [routes, setRoutes] = useState([
        {
            id: 'R-401',
            vehicle: 'Van #4 - Ford Transit',
            status: 'In Transit',
            stops: [
                { name: 'Logistics Depot', address: 'Bay 4, Operations Base', status: 'Completed' },
                { name: 'Grand Central Plaza', address: '89 Main St, Manhattan, NY', status: 'Current' },
                { name: 'TechLabs Headquarters', address: '456 Silicon Valley Blvd, San Jose, CA', status: 'Pending' },
            ]
        },
        {
            id: 'R-402',
            vehicle: 'Van #4 - Ford Transit',
            status: 'Scheduled',
            stops: [
                { name: 'Logistics Depot', address: 'Bay 4, Operations Base', status: 'Pending' },
                { name: 'Metro Health Clinic', address: '789 Medical Plaza, Chicago, IL', status: 'Pending' },
            ]
        }
    ]);

    const handleCompleteStop = (routeId, stopIdx) => {
        setRoutes(prev => prev.map(route => {
            if (route.id === routeId) {
                const newStops = route.stops.map((stop, sIdx) => {
                    if (sIdx === stopIdx) return { ...stop, status: 'Completed' };
                    if (sIdx === stopIdx + 1 && stop.status === 'Pending') return { ...stop, status: 'Current' };
                    return stop;
                });
                // Check if all completed
                const allDone = newStops.every(s => s.status === 'Completed');
                return {
                    ...route,
                    stops: newStops,
                    status: allDone ? 'Completed' : route.status
                };
            }
            return route;
        }));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaRoute className="text-emerald-500" />
                    Active Transport Routes
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Assigned logistics dispatches and route navigation stops.</p>
            </div>

            {/* List */}
            <div className="space-y-6">
                {routes.map((route) => (
                    <div key={route.id} className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-5">
                        {/* Header Details */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                                    <FaTruck className="text-sm" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white leading-snug">Route {route.id}</h3>
                                    <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">{route.vehicle}</span>
                                </div>
                            </div>
                            <div>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                    route.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                    route.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                    'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                }`}>
                                    {route.status}
                                </span>
                            </div>
                        </div>

                        {/* Stops Timeline */}
                        <div className="pl-4 space-y-6 relative border-l border-[#1E293B]/40">
                            {route.stops.map((stop, sIdx) => {
                                const isCompleted = stop.status === 'Completed';
                                const isCurrent = stop.status === 'Current';
                                return (
                                    <div key={sIdx} className="relative pl-6 space-y-1">
                                        {/* Dot indicator */}
                                        <div className={`absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                                            isCompleted ? 'bg-emerald-500 border-emerald-500' :
                                            isCurrent ? 'bg-blue-500 border-blue-500 animate-pulse' :
                                            'bg-[#0B1120] border-slate-700'
                                        }`}>
                                            {isCompleted && <FaCheckCircle className="text-[9px] text-white shrink-0" />}
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                            <div>
                                                <div className={`text-sm font-bold flex items-center gap-1.5 ${isCompleted ? 'text-slate-400 line-through' : isCurrent ? 'text-white' : 'text-slate-300'}`}>
                                                    <FaBuilding className="text-[10px] text-slate-500" />
                                                    {stop.name}
                                                </div>
                                                <div className="text-xs text-slate-400 flex items-center gap-1">
                                                    <FaMapMarkerAlt className="text-[10px] text-slate-500 shrink-0" />
                                                    {stop.address}
                                                </div>
                                            </div>
                                            
                                            {isCurrent && (
                                                <button
                                                    onClick={() => handleCompleteStop(route.id, sIdx)}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-md shadow-emerald-600/10 active:scale-[0.98] transition shrink-0"
                                                >
                                                    <FaCheckCircle className="text-[10px]" /> Arrived / Completed
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DriverRoutesPage;
