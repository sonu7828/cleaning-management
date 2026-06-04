import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaTools, FaUser, FaPlus, FaTrash, FaTimes, FaStar } from 'react-icons/fa';

const TechniciansPage = () => {
    const { workOrders, userRole } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    
    const [technicians, setTechnicians] = useState([
        { id: 'tech-1', name: 'CLEANING TECH', email: 'tech1@teamenviro.ae', phone: '1234567890', status: 'On Duty', rating: '4.9', skill: 'Deep Cleaning Specialist' },
        { id: 'tech-2', name: 'CLEANING TECH #2', email: 'tech2@teamenviro.ae', phone: '1234567890', status: 'On Duty', rating: '4.8', skill: 'HVAC Vent Cleaning' },
        { id: 'tech-3', name: 'CLEANING TECH #3', email: 'tech3@teamenviro.ae', phone: '1234567890', status: 'Active', rating: '4.7', skill: 'Sofa Shampooing Spec' },
        { id: 'tech-4', name: 'CLEANING TECH #4', email: 'tech4@teamenviro.ae', phone: '1234567890', status: 'Active', rating: '4.9', skill: 'Water Tank Sanitization' },
        { id: 'tech-5', name: 'CLEANING TECH #5', email: 'tech5@teamenviro.ae', phone: '1234567890', status: 'Offline', rating: '4.5', skill: 'Pest Control Specialist' },
        { id: 'tech-6', name: 'CLEANING TECH #6', email: 'tech6@teamenviro.ae', phone: '1234567890', status: 'Active', rating: '4.6', skill: 'General Floor Polishing' }
    ]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [skill, setSkill] = useState('Deep Cleaning Specialist');
    const [status, setStatus] = useState('Active');

    const handleAddTech = (e) => {
        e.preventDefault();
        const newTech = {
            id: 'tech-' + Date.now().toString().slice(-4),
            name,
            email,
            phone,
            status,
            rating: '5.0',
            skill
        };
        setTechnicians([...technicians, newTech]);
        setName('');
        setEmail('');
        setPhone('');
        setShowModal(false);
    };

    const handleDeleteTech = (id) => {
        if (window.confirm('Remove this technician from active staff rosters?')) {
            setTechnicians(technicians.filter(t => t.id !== id));
        }
    };

    const isAdmin = userRole === 'admin' || userRole === 'dispatch';

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaTools className="text-blue-600" />
                        Technicians Directory
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Manage on-field cleaning staff, active skill-sets, and duty status rosters.</p>
                </div>
                {isAdmin && (
                    <button 
                        onClick={() => setShowModal(true)} 
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/10"
                    >
                        <FaPlus className="text-[10px]" /> Register Technician
                    </button>
                )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technicians.map((tech) => {
                    const todayJobs = workOrders.filter(
                        wo => wo.assignedTechnician === tech.name && 
                        wo.status !== 'Completed'
                    );
                    return (
                        <div key={tech.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between group">
                            <div>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-sm shrink-0">
                                            {tech.name[0]}
                                        </div>
                                        <div className="flex flex-col items-start gap-1">
                                            <h3 className="font-extrabold text-slate-800 text-sm leading-tight">{tech.name}</h3>
                                            <span className="inline-block max-w-max text-[9.5px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider">{tech.skill}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                                            tech.status === 'On Duty' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            tech.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            'bg-slate-100 text-slate-700 border-slate-200'
                                        }`}>
                                            {tech.status}
                                        </span>
                                        {isAdmin && (
                                            <button 
                                                onClick={() => handleDeleteTech(tech.id)} 
                                                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition"
                                                title="De-register staff"
                                            >
                                                <FaTrash className="text-xs" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1 mt-3.5 text-xs text-slate-500 font-semibold">
                                    <div>Email: <strong className="text-slate-700">{tech.email}</strong></div>
                                    <div>Phone: <strong className="text-slate-700">{tech.phone}</strong></div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-[10px] font-bold text-slate-500">
                                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="text-slate-400 uppercase tracking-wider text-[8px]">Active Shifts</div>
                                    <div className="text-xs font-black text-slate-800 mt-0.5">{todayJobs.length} cleanings</div>
                                </div>
                                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="text-slate-400 uppercase tracking-wider text-[8px]">Client Rating</div>
                                    <div className="text-xs font-black text-amber-600 mt-0.5 flex items-center justify-center gap-0.5"><FaStar /> {tech.rating}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Roster Dispatch Logs using stateful AppContext workOrders */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                <h3 className="text-sm font-black text-slate-800">Technician Shifts Log</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-450 font-extrabold uppercase tracking-wider">
                                <th className="py-2.5 px-2">Technician</th>
                                <th className="py-2.5 px-2">Assigned Clean Scope</th>
                                <th className="py-2.5 px-2">Client Company</th>
                                <th className="py-2.5 px-2">Roster Date & Time</th>
                                <th className="py-2.5 px-2">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {workOrders.map((job) => (
                                <tr key={job.id} className="hover:bg-slate-50 transition">
                                    <td className="py-3 px-2 flex items-center gap-2">
                                        <FaUser className="text-slate-450 text-[10px]" />
                                        <span className="font-bold text-slate-800">{job.assignedTechnician}</span>
                                    </td>
                                    <td className="py-3 px-2 font-bold text-slate-750">{job.serviceType}</td>
                                    <td className="py-3 px-2 text-slate-500">{job.customerName}</td>
                                    <td className="py-3 px-2 text-slate-500">{job.date} - {job.timeSlot}</td>
                                    <td className="py-3 px-2">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                                            job.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            job.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            'bg-slate-50 text-slate-700 border-slate-200'
                                        }`}>
                                            {job.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Tech Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-slate-700 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-850">Register Technician Staff</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-650 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleAddTech} className="space-y-3.5 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Full Name *</label>
                                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ramesh Dev" className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Email Address *</label>
                                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="ramesh@teamenviro.ae" className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">UAE Contact Number *</label>
                                <input type="text" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+971 50 000 0000" className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Specialization</label>
                                    <select value={skill} onChange={e => setSkill(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option>Deep Cleaning Specialist</option>
                                        <option>HVAC Vent Cleaning</option>
                                        <option>Sofa Shampooing Spec</option>
                                        <option>Water Tank Sanitization</option>
                                        <option>Pest Control Specialist</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Initial Status</label>
                                    <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white">
                                        <option>Active</option>
                                        <option>On Duty</option>
                                        <option>Offline</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Add Staff Member</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TechniciansPage;
