import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
    FaTruck, FaMapMarkerAlt, FaCheckCircle, FaRoute, 
    FaBuilding, FaGasPump, FaClipboardCheck, FaHourglassHalf, 
    FaPlay, FaTimes, FaCamera 
} from 'react-icons/fa';

const DriverRoutesPage = () => {
    const { 
        driverTrips, 
        addDriverTrip, 
        updateDriverTrip, 
        completeDriverTrip, 
        workOrders, 
        vehicles, 
        user,
        userRole 
    } = useContext(AppContext);

    // Filter trips for the logged-in driver or show all if admin/dispatch
    const driverName = user?.name || 'DRIVER LOGISTICS';
    const isDriver = userRole === 'driver';

    const myTrips = driverTrips.filter(trip => 
        !isDriver || trip.driverName === driverName
    );

    // Find pending work orders assigned to this driver that do not have active trips
    const assignedWorkOrders = workOrders.filter(wo => {
        const matchesDriver = !isDriver || wo.assignedDriver === driverName;
        const noTrip = !driverTrips.some(t => t.linkedWorkOrderId === wo.id);
        return matchesDriver && noTrip && wo.status !== 'Completed' && wo.status !== 'Cancelled';
    });

    const [selectedTrip, setSelectedTrip] = useState(null);
    const [modalMode, setModalMode] = useState(''); // 'start' or 'complete' or 'fuel'
    
    // Forms state
    const [odometerStart, setOdometerStart] = useState('');
    const [odometerEnd, setOdometerEnd] = useState('');
    const [fuelExpense, setFuelExpense] = useState('');
    const [remarks, setRemarks] = useState('');
    const [selectedWO, setSelectedWO] = useState(null);
    
    // Vehicle condition checklist
    const [checklist, setChecklist] = useState({
        brakes: true,
        tires: true,
        lights: true,
        oil: true,
        bodyDamage: false,
        clean: true
    });

    const handleCheckboxChange = (name) => {
        setChecklist(prev => ({ ...prev, [name]: !prev[name] }));
    };

    // Open modal to start trip for an assigned work order
    const openStartTripModal = (wo) => {
        setSelectedWO(wo);
        setOdometerStart('');
        setChecklist({
            brakes: true,
            tires: true,
            lights: true,
            oil: true,
            bodyDamage: false,
            clean: true
        });
        setRemarks('');
        setModalMode('start');
    };

    // Submit action to create and start a trip
    const handleStartTripSubmit = (e) => {
        e.preventDefault();
        if (!odometerStart) {
            alert('Odometer start value is required.');
            return;
        }

        const conditionItems = [];
        if (checklist.brakes) conditionItems.push('Brakes Checked');
        if (checklist.tires) conditionItems.push('Tires Checked');
        if (checklist.lights) conditionItems.push('Lights OK');
        if (checklist.oil) conditionItems.push('Engine Oil OK');
        if (checklist.bodyDamage) conditionItems.push('Body Damage Noted');
        if (checklist.clean) conditionItems.push('Van Clean');

        const newTripData = {
            driverId: user?.id || 'drv1',
            driverName: driverName,
            vehicleNumber: selectedWO.vehicleInfo || 'DXB-A-12345',
            tripStartTime: new Date().toLocaleString(),
            tripEndTime: '',
            odometerStart: Number(odometerStart),
            odometerEnd: 0,
            fuelExpense: 0,
            routeDetails: `Start Depot to ${selectedWO.address}`,
            vehicleCondition: conditionItems.join(', '),
            remarks: remarks,
            status: 'In Transit',
            linkedWorkOrderId: selectedWO.id
        };

        const newTrip = addDriverTrip(newTripData);
        setModalMode('');
        setSelectedWO(null);
        alert(`Trip started successfully for Work Order ${newTripData.linkedWorkOrderId}`);
    };

    // Open modal to complete trip
    const openCompleteTripModal = (trip) => {
        setSelectedTrip(trip);
        setOdometerEnd('');
        setFuelExpense('');
        setRemarks(trip.remarks || '');
        setModalMode('complete');
    };

    // Submit action to complete a trip
    const handleCompleteTripSubmit = (e) => {
        e.preventDefault();
        if (!odometerEnd) {
            alert('Odometer end value is required.');
            return;
        }
        if (Number(odometerEnd) <= Number(selectedTrip.odometerStart)) {
            alert('Odometer end must be greater than odometer start.');
            return;
        }

        const conditionItems = [selectedTrip.vehicleCondition];
        const finalCondition = conditionItems.filter(Boolean).join(', ');

        completeDriverTrip(selectedTrip.id, {
            odometerEnd: Number(odometerEnd),
            fuelExpense: Number(fuelExpense) || 0,
            vehicleCondition: finalCondition || 'Good',
            remarks: remarks
        });

        setModalMode('');
        setSelectedTrip(null);
        alert(`Trip ${selectedTrip.id} completed successfully!`);
    };

    // Open modal to log fuel
    const openFuelModal = (trip) => {
        setSelectedTrip(trip);
        setFuelExpense(trip.fuelExpense || '');
        setModalMode('fuel');
    };

    // Submit action to update fuel
    const handleFuelSubmit = (e) => {
        e.preventDefault();
        updateDriverTrip(selectedTrip.id, {
            fuelExpense: Number(fuelExpense) || 0
        });
        setModalMode('');
        setSelectedTrip(null);
        alert('Fuel expense logged successfully.');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaRoute className="text-emerald-500" />
                        Driver Logistics & Trips
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Start dispatches, log odometer readings, fuel bills, and vehicle safety checklists.</p>
                </div>
                <div className="bg-[#1E293B]/40 px-4 py-2 border border-[#1E293B]/60 rounded-2xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-slate-350">{driverName} (Logistics)</span>
                </div>
            </div>

            {/* Assigned Work Orders without Trips */}
            {assignedWorkOrders.length > 0 && (
                <div className="bg-[#111827]/85 border border-emerald-500/20 rounded-3xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <h2 className="text-lg font-black text-white">Pending Dispatches Assigned to You</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {assignedWorkOrders.map(wo => (
                            <div key={wo.id} className="bg-[#0B1120]/80 border border-[#1E293B]/40 rounded-2xl p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                                            {wo.priority}
                                        </span>
                                        <h3 className="font-extrabold text-white text-sm mt-1">{wo.customerName}</h3>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-bold">{wo.timeSlot}</span>
                                </div>
                                <div className="space-y-1 text-xs text-slate-300">
                                    <p className="flex items-center gap-1.5"><FaBuilding className="text-slate-500 text-[10px]" /> {wo.serviceType}</p>
                                    <p className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-slate-500 text-[10px] shrink-0" /> {wo.address}</p>
                                    {wo.vehicleInfo && <p className="flex items-center gap-1.5"><FaTruck className="text-slate-500 text-[10px]" /> Vehicle: {wo.vehicleInfo}</p>}
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button 
                                        onClick={() => openStartTripModal(wo)}
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                                    >
                                        <FaPlay className="text-[8px]" /> Start Trip & Log Odo
                                    </button>
                                    {wo.googleMapLink && (
                                        <a 
                                            href={wo.googleMapLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-xl text-xs transition border border-slate-700/50 flex items-center justify-center"
                                        >
                                            Map Link
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Active & Historical Trips List */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-5">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <FaTruck className="text-blue-500" />
                    Trip Logs & Route History
                </h2>
                
                {myTrips.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-sm italic">
                        No trip history logged yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {myTrips.map(trip => (
                            <div 
                                key={trip.id} 
                                className={`p-5 bg-[#0B1120]/60 border rounded-2xl gap-4 transition hover:bg-[#0B1120] ${
                                    trip.status === 'In Transit' ? 'border-amber-500/30' : 'border-[#1E293B]/25'
                                }`}
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-white">Trip {trip.id}</span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-wider ${
                                                trip.status === 'Completed' 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                                            }`}>
                                                {trip.status}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5 text-xs text-slate-350">
                                            <p><strong className="text-slate-400">Vehicle:</strong> {trip.vehicleNumber}</p>
                                            <p><strong className="text-slate-400">Odo Start:</strong> {trip.odometerStart} km</p>
                                            {trip.status === 'Completed' && <p><strong className="text-slate-400">Odo End:</strong> {trip.odometerEnd} km</p>}
                                            {trip.status === 'Completed' && <p><strong className="text-slate-400">Distance:</strong> {trip.odometerEnd - trip.odometerStart} km</p>}
                                            <p><strong className="text-slate-400">Fuel Cost:</strong> AED {trip.fuelExpense || 0}</p>
                                            <p className="col-span-2"><strong className="text-slate-400">Route:</strong> {trip.routeDetails}</p>
                                            <p className="col-span-2"><strong className="text-slate-400">Condition:</strong> {trip.vehicleCondition}</p>
                                            {trip.remarks && <p className="col-span-2"><strong className="text-slate-400">Remarks:</strong> {trip.remarks}</p>}
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-bold space-y-0.5 mt-2">
                                            <p>Started: {trip.tripStartTime}</p>
                                            {trip.tripEndTime && <p>Ended: {trip.tripEndTime}</p>}
                                        </div>
                                    </div>
                                    <div className="flex md:flex-col justify-end items-end gap-2 shrink-0 self-end md:self-center">
                                        {trip.status === 'In Transit' && (
                                            <>
                                                <button
                                                    onClick={() => openCompleteTripModal(trip)}
                                                    className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md shadow-emerald-600/10"
                                                >
                                                    <FaCheckCircle className="text-[10px]" /> Arrive & Complete
                                                </button>
                                                <button
                                                    onClick={() => openFuelModal(trip)}
                                                    className="inline-flex items-center gap-1 px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-xl text-xs transition border border-slate-700/50"
                                                >
                                                    <FaGasPump className="text-[10px]" /> Log Fuel Expense
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODALS */}
            {modalMode === 'start' && selectedWO && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                    <div className="relative bg-[#111827] border border-[#1E293B]/80 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center pb-2 border-b border-[#1E293B]/50">
                            <h3 className="text-lg font-black text-white">Start Dispatch Route</h3>
                            <button onClick={() => setModalMode('')} className="text-slate-400 hover:text-slate-200 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleStartTripSubmit} className="space-y-4 text-xs">
                            <div className="bg-[#0B1120] p-3 rounded-xl border border-[#1E293B]/30 space-y-1">
                                <p className="text-slate-400 font-bold">Work Order: #{selectedWO.id}</p>
                                <p className="text-white font-black text-sm">{selectedWO.customerName}</p>
                                <p className="text-slate-300">{selectedWO.address}</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-300">Odometer Start Reading (km) *</label>
                                <input 
                                    type="number" 
                                    required 
                                    value={odometerStart} 
                                    onChange={e => setOdometerStart(e.target.value)} 
                                    placeholder="e.g. 124500" 
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 text-white" 
                                />
                            </div>

                            {/* Checklist */}
                            <div className="space-y-2">
                                <label className="font-bold text-slate-300 block">Vehicle Safety Inspection Checklist</label>
                                <div className="grid grid-cols-2 gap-3 bg-[#0B1120] p-4 rounded-xl border border-[#1E293B]/20">
                                    <label className="flex items-center gap-2 text-slate-350 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={checklist.brakes} 
                                            onChange={() => handleCheckboxChange('brakes')}
                                            className="rounded border-[#1E293B] text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-[#0B1120] w-4 h-4" 
                                        />
                                        <span>Brakes Working</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-slate-350 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={checklist.tires} 
                                            onChange={() => handleCheckboxChange('tires')}
                                            className="rounded border-[#1E293B] text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-[#0B1120] w-4 h-4" 
                                        />
                                        <span>Tires checked (Pressure OK)</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-slate-350 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={checklist.lights} 
                                            onChange={() => handleCheckboxChange('lights')}
                                            className="rounded border-[#1E293B] text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-[#0B1120] w-4 h-4" 
                                        />
                                        <span>Lights & Indicators OK</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-slate-350 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={checklist.oil} 
                                            onChange={() => handleCheckboxChange('oil')}
                                            className="rounded border-[#1E293B] text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-[#0B1120] w-4 h-4" 
                                        />
                                        <span>Engine Oil / Coolant OK</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-slate-350 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={checklist.bodyDamage} 
                                            onChange={() => handleCheckboxChange('bodyDamage')}
                                            className="rounded border-[#1E293B] text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-[#0B1120] w-4 h-4" 
                                        />
                                        <span>No New Body Damage</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-slate-350 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={checklist.clean} 
                                            onChange={() => handleCheckboxChange('clean')}
                                            className="rounded border-[#1E293B] text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-[#0B1120] w-4 h-4" 
                                        />
                                        <span>Van Cleanliness Good</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-300">Remarks / Condition Details</label>
                                <textarea 
                                    value={remarks} 
                                    onChange={e => setRemarks(e.target.value)} 
                                    placeholder="e.g. Minor scratches on left bumper, otherwise clean." 
                                    className="w-full h-20 bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 text-white"
                                />
                            </div>

                            <div className="flex justify-end gap-2.5 pt-3 border-t border-[#1E293B]/40">
                                <button type="button" onClick={() => setModalMode('')} className="px-4 py-2.5 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-bold rounded-xl text-xs transition">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition">Start Trip</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {modalMode === 'complete' && selectedTrip && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                    <div className="relative bg-[#111827] border border-[#1E293B]/80 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center pb-2 border-b border-[#1E293B]/50">
                            <h3 className="text-lg font-black text-white font-sans">Complete Logistics Trip</h3>
                            <button onClick={() => setModalMode('')} className="text-slate-400 hover:text-slate-200 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleCompleteTripSubmit} className="space-y-4 text-xs">
                            <div className="bg-[#0B1120] p-3 rounded-xl border border-[#1E293B]/30 text-xs">
                                <p className="text-slate-400 font-bold">Active Trip: {selectedTrip.id}</p>
                                <p className="text-slate-350">Odometer Start: <strong>{selectedTrip.odometerStart} km</strong></p>
                                <p className="text-slate-350">Vehicle: {selectedTrip.vehicleNumber}</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-300">Odometer End Reading (km) *</label>
                                <input 
                                    type="number" 
                                    required 
                                    value={odometerEnd} 
                                    onChange={e => setOdometerEnd(e.target.value)} 
                                    placeholder="e.g. 124650" 
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 text-white" 
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-300">Fuel Expense Logged (AED)</label>
                                <input 
                                    type="number" 
                                    value={fuelExpense} 
                                    onChange={e => setFuelExpense(e.target.value)} 
                                    placeholder="e.g. 150" 
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 text-white" 
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-300">Final Remarks / Vehicle Notes</label>
                                <textarea 
                                    value={remarks} 
                                    onChange={e => setRemarks(e.target.value)} 
                                    placeholder="Add any trip notes, delays, or vehicle reports." 
                                    className="w-full h-20 bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 text-white"
                                />
                            </div>

                            <div className="flex justify-end gap-2.5 pt-3 border-t border-[#1E293B]/40">
                                <button type="button" onClick={() => setModalMode('')} className="px-4 py-2.5 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-bold rounded-xl text-xs transition">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition">Complete Trip</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {modalMode === 'fuel' && selectedTrip && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                    <div className="relative bg-[#111827] border border-[#1E293B]/80 rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-[#1E293B]/50">
                            <h3 className="text-base font-black text-white">Log Fuel Bill</h3>
                            <button onClick={() => setModalMode('')} className="text-slate-400 hover:text-slate-200 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleFuelSubmit} className="space-y-4 text-xs">
                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-300">Fuel Bill Amount (AED) *</label>
                                <input 
                                    type="number" 
                                    required 
                                    value={fuelExpense} 
                                    onChange={e => setFuelExpense(e.target.value)} 
                                    placeholder="AED" 
                                    className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 text-white" 
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-[#1E293B]/40">
                                <button type="button" onClick={() => setModalMode('')} className="px-4 py-2 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-bold rounded-xl text-xs transition">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs transition">Save Fuel Log</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverRoutesPage;
