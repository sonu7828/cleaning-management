import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaTruck, FaTrash, FaPlus, FaTimes, FaMapMarkerAlt, FaUser, FaPhone } from 'react-icons/fa';

const DriversPage = () => {
    const { workOrders, userRole } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);

    const [drivers, setDrivers] = useState([
        { id: 'drv-1', name: 'DRIVER LOGISTICS', email: 'driver@teamenviro.ae', phone: '1234567890', vehicle: 'Toyota Hiace - Van #04', status: 'In Transit' },
        { id: 'drv-2', name: 'DRIVER LOGISTICS #2', email: 'driver2@teamenviro.ae', phone: '1234567890', vehicle: 'Nissan Urvan - Van #02', status: 'Idle' },
        { id: 'drv-3', name: 'DRIVER LOGISTICS #3', email: 'driver3@teamenviro.ae', phone: '1234567890', vehicle: 'Toyota Hiace - Van #06', status: 'Idle' },
        { id: 'drv-4', name: 'DRIVER LOGISTICS #4', email: 'driver4@teamenviro.ae', phone: '1234567890', vehicle: 'Nissan Urvan - Van #08', status: 'In Transit' }
    ]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [vehicle, setVehicle] = useState('Toyota Hiace - Van #04');
    const [status, setStatus] = useState('Idle');

    const handleAddDriver = (e) => {
        e.preventDefault();
        const newDriver = {
            id: 'drv-' + Date.now().toString().slice(-4),
            name,
            email,
            phone,
            vehicle,
            status
        };
        setDrivers([...drivers, newDriver]);
        setName('');
        setEmail('');
        setPhone('');
        setShowModal(false);
    };

    const handleDeleteDriver = (id) => {
        if (window.confirm('De-register this driver from logistics fleet?')) {
            setDrivers(drivers.filter(d => d.id !== id));
        }
    };

    const isAdmin = userRole === 'admin' || userRole === 'dispatch';

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaTruck className="text-blue-600" />
                        Drivers & Fleet Logistics
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Manage dispatch drivers, assigned transport vans, and logistics rosters.</p>
                </div>
                {isAdmin && (
                    <button 
                        onClick={() => setShowModal(true)} 
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/10"
                    >
                        <FaPlus className="text-[10px]" /> Register Driver
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Fleet Directory Card */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Fleet Drivers Directory</h3>
                    <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto pr-1">
                        {drivers.map(driver => (
                            <div key={driver.id} className="py-3.5 flex justify-between items-start gap-2 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-sm shrink-0">
                                        {driver.name[0]}
                                    </div>
                                    <div className="text-xs">
                                        <h4 className="font-extrabold text-slate-850">{driver.name}</h4>
                                        <p className="text-slate-400 font-semibold">{driver.phone}</p>
                                        <p className="text-[10px] text-slate-500 font-bold bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block">{driver.vehicle}</p>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                                            driver.status === 'In Transit' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            driver.status === 'Idle' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            'bg-slate-100 text-slate-700 border-slate-200'
                                        }`}>
                                            {driver.status}
                                        </span>
                                        {isAdmin && (
                                            <button 
                                                onClick={() => handleDeleteDriver(driver.id)} 
                                                className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-rose-600 transition"
                                                title="Remove driver"
                                            >
                                                <FaTrash className="text-xs" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logistics Route assignments Card using stateful AppContext workOrders */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Active Transport Routes & Dispatches</h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                        {workOrders.filter(wo => wo.status !== 'Completed').length === 0 ? (
                            <div className="text-center py-16 text-slate-400 text-xs font-bold">No active transit tasks scheduled currently.</div>
                        ) : (
                            workOrders.filter(wo => wo.status !== 'Completed').map(wo => (
                                <div key={wo.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                                    <div>
                                        <div className="font-extrabold text-slate-800 flex items-center gap-1.5">
                                            <FaTruck className="text-blue-600 text-[10px]" />
                                            <span>Driver: {wo.assignedDriver}</span>
                                        </div>
                                        <div className="text-slate-500 font-semibold mt-1">Carrying: <strong className="text-slate-800">{wo.assignedTechnician}</strong> (Technician)</div>
                                        <div className="text-slate-500 font-semibold">Service: {wo.serviceType}</div>
                                        <div className="text-[10px] text-slate-450 mt-1 flex items-center gap-1"><FaMapMarkerAlt className="text-slate-450 text-[9px]" /> {wo.address}</div>
                                    </div>
                                    <div className="text-left sm:text-right shrink-0">
                                        <div className="font-extrabold text-slate-800">{wo.date}</div>
                                        <div className="text-[10px] text-slate-450 font-bold">{wo.timeSlot}</div>
                                        <span className="inline-block mt-2 px-2 py-0.5 bg-blue-50 text-blue-750 border border-blue-100 rounded text-[9px] font-bold">{wo.status}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Add Driver Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-slate-700 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-850">Register Logistics Driver</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-650 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleAddDriver} className="space-y-3.5 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Driver Name *</label>
                                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Gurpreet Singh" className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Email Address *</label>
                                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="gurpreet@teamenviro.ae" className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">UAE Contact Number *</label>
                                <input type="text" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+971 50 000 0000" className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Vehicle / Van Number</label>
                                    <select value={vehicle} onChange={e => setVehicle(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option>Toyota Hiace - Van #04</option>
                                        <option>Toyota Hiace - Van #06</option>
                                        <option>Nissan Urvan - Van #02</option>
                                        <option>Nissan Urvan - Van #08</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Current Status</label>
                                    <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option>Idle</option>
                                        <option>In Transit</option>
                                        <option>Offline</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Add Driver</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriversPage;
