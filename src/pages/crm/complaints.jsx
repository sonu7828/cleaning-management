import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
    FaExclamationCircle, FaPlus, FaCheckCircle, FaClock, 
    FaTimes, FaUser, FaHistory, FaSearch, FaFilter, FaTrafficLight, FaCheck 
} from 'react-icons/fa';

const ComplaintsPage = () => {
    const { 
        complaints, addComplaint, updateComplaint, resolveComplaint, 
        clients, contracts, userRole 
    } = useContext(AppContext);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Add Form states
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedContract, setSelectedContract] = useState('');
    const [complaintType, setComplaintType] = useState('Service Issue');
    const [priority, setPriority] = useState('Medium');
    const [assignedTeam, setAssignedTeam] = useState('Cleaning Crew A');
    const [description, setDescription] = useState('');

    // Resolution Form state
    const [resolutionNotes, setResolutionNotes] = useState('');

    // Filter contracts based on selected customer
    const clientContracts = selectedClient 
        ? contracts.filter(c => c.clientName === selectedClient) 
        : [];

    const handleCreateComplaint = (e) => {
        e.preventDefault();
        if (!selectedClient) {
            alert('Please select a customer.');
            return;
        }

        const clientMatch = clients.find(c => c.name === selectedClient);
        
        // Define SLA based on priority
        let sla = 48; // default
        if (priority === 'Emergency') sla = 4;
        else if (priority === 'High') sla = 24;
        else if (priority === 'Low') sla = 72;

        addComplaint({
            customerId: clientMatch ? clientMatch.id : 'c_temp',
            customerName: selectedClient,
            amcRef: selectedContract || 'None',
            complaintType,
            priority,
            assignedTeam,
            slaHours: sla,
            description
        });

        // Reset
        setSelectedClient('');
        setSelectedContract('');
        setComplaintType('Service Issue');
        setPriority('Medium');
        setDescription('');
        setIsAddModalOpen(false);
        alert('Complaint filed successfully. SLA tracker activated.');
    };

    const handleResolveSubmit = (e) => {
        e.preventDefault();
        if (!resolutionNotes.trim()) {
            alert('Please enter resolution notes.');
            return;
        }

        resolveComplaint(selectedComplaint.id, resolutionNotes);
        setSelectedComplaint(null);
        setResolutionNotes('');
        alert('Complaint status updated to Resolved.');
    };

    // Calculate SLA remaining hours for display
    const getSLARemaining = (complaint) => {
        if (complaint.status === 'Resolved') return 'Resolved';
        
        const raisedDate = new Date(complaint.date);
        const deadline = new Date(raisedDate.getTime() + complaint.slaHours * 60 * 60 * 1000);
        const now = new Date();
        const diffMs = deadline - now;
        
        if (diffMs <= 0) {
            return 'Breached';
        }
        
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${diffHrs}h ${diffMins}m left`;
    };

    // Metrics counters
    const totalComplaints = complaints.length;
    const openComplaints = complaints.filter(c => c.status === 'Open').length;
    const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;
    const breachedComplaints = complaints.filter(c => {
        if (c.status === 'Resolved') return false;
        const raisedDate = new Date(c.date);
        const deadline = new Date(raisedDate.getTime() + c.slaHours * 60 * 60 * 1000);
        return deadline < new Date();
    }).length;

    const filteredComplaints = complaints.filter(c => {
        const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
        const matchesSearch = c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              c.complaintNumber.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaExclamationCircle className="text-rose-600" />
                        CRM Complaints & SLA Desk
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Track customer feedback issues, trigger emergency dispatches, and enforce SLA deadlines.</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)} 
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-danger hover:bg-red-600 text-white font-bold rounded-xl text-xs transition shadow-lg"
                >
                    <FaPlus className="text-[10px]" /> File Complaint
                </button>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-xs font-semibold text-slate-500">
                    <div>Total Logged</div>
                    <div className="text-lg font-black text-slate-800 mt-1">{totalComplaints}</div>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-xs font-semibold text-slate-550">
                    <div>Open Tickets</div>
                    <div className="text-lg font-black text-amber-600 mt-1">{openComplaints}</div>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-xs font-semibold text-slate-550">
                    <div>Resolved Closed</div>
                    <div className="text-lg font-black text-emerald-600 mt-1">{resolvedComplaints}</div>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-xs font-semibold text-slate-550">
                    <div>SLA Breaches</div>
                    <div className="text-lg font-black text-rose-600 mt-1">{breachedComplaints}</div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 text-xs">
                    <FaSearch className="absolute left-3.5 top-3 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by client or complaint ticket ID..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                    />
                </div>
                <div className="flex gap-1.5 flex-wrap text-xs">
                    {['All', 'Open', 'Resolved'].map(st => (
                        <button
                            key={st}
                            onClick={() => setFilterStatus(st)}
                            className={`px-3 py-2 rounded-xl font-bold border transition ${
                                filterStatus === st 
                                    ? 'bg-primary border-primary text-white' 
                                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'
                            }`}
                        >
                            {st} Status
                        </button>
                    ))}
                </div>
            </div>

            {/* Complaints List */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-450 font-extrabold uppercase tracking-wider text-[10px]">
                                <th className="py-3 px-2">Ticket ID</th>
                                <th className="py-3 px-2">Customer Name</th>
                                <th className="py-3 px-2">Type</th>
                                <th className="py-3 px-2">SLA Period</th>
                                <th className="py-3 px-2">Remaining SLA Time</th>
                                <th className="py-3 px-2 text-center">Priority</th>
                                <th className="py-3 px-2 text-center">Status</th>
                                <th className="py-3 px-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {filteredComplaints.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-10 text-slate-400 italic">No complaints matching filters found.</td>
                                </tr>
                            ) : (
                                filteredComplaints.map((comp) => {
                                    const slaLeft = getSLARemaining(comp);
                                    return (
                                        <tr key={comp.id} className="hover:bg-slate-50 transition">
                                            <td className="py-3.5 px-2 text-slate-500 font-mono font-bold">{comp.complaintNumber}</td>
                                            <td className="py-3.5 px-2">
                                                <div className="font-extrabold text-slate-850">{comp.customerName}</div>
                                                {comp.amcRef !== 'None' && <span className="text-[9px] text-slate-450 font-bold block mt-0.5">AMC Ref: {comp.amcRef}</span>}
                                            </td>
                                            <td className="py-3.5 px-2 text-slate-500">{comp.complaintType}</td>
                                            <td className="py-3.5 px-2 text-slate-500">{comp.slaHours} Hours</td>
                                            <td className="py-3.5 px-2">
                                                <span className={`font-bold flex items-center gap-1 ${
                                                    slaLeft === 'Resolved' ? 'text-emerald-600' :
                                                    slaLeft === 'Breached' ? 'text-rose-600 font-black animate-pulse' :
                                                    'text-amber-600'
                                                }`}>
                                                    <FaClock className="text-[10px]" />
                                                    {slaLeft}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-2 text-center">
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                                                    comp.priority === 'Emergency' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                                    comp.priority === 'High' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                    comp.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                    'bg-slate-50 text-slate-700 border-slate-200'
                                                }`}>
                                                    {comp.priority}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-2 text-center">
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                                                    comp.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
                                                }`}>
                                                    {comp.status}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-2 text-right space-x-1.5 whitespace-nowrap">
                                                {comp.status !== 'Resolved' ? (
                                                    <button
                                                        onClick={() => setSelectedComplaint(comp)}
                                                        className="px-2.5 py-1 bg-success hover:bg-[#059669] text-white rounded-lg font-bold transition shadow-sm flex items-center gap-1.5 inline-flex"
                                                    >
                                                        <FaCheck className="text-[9px]" /> Resolve
                                                    </button>
                                                ) : (
                                                    <span className="text-[10px] text-slate-400 font-semibold italic">Resolved Closed</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal: File Complaint */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-slate-700">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-850">File Customer Complaint Ticket</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-650 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleCreateComplaint} className="space-y-3.5 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Customer Account *</label>
                                <select 
                                    required 
                                    value={selectedClient} 
                                    onChange={e => {
                                        setSelectedClient(e.target.value);
                                        setSelectedContract('');
                                    }} 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Customer...</option>
                                    {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>

                            {selectedClient && clientContracts.length > 0 && (
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Link to Active AMC Contract</label>
                                    <select 
                                        value={selectedContract} 
                                        onChange={e => setSelectedContract(e.target.value)} 
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select Contract SLA...</option>
                                        {clientContracts.map(c => <option key={c.id} value={c.id}>{c.title} (#{c.id})</option>)}
                                    </select>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Complaint Category</label>
                                    <select 
                                        value={complaintType} 
                                        onChange={e => setComplaintType(e.target.value)} 
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500"
                                    >
                                        <option>Service Issue</option>
                                        <option>Delay</option>
                                        <option>Property Damage</option>
                                        <option>Crew Behaviour</option>
                                        <option>Billing Dispute</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-500">Priority (SLA Timer)</label>
                                    <select 
                                        value={priority} 
                                        onChange={e => setPriority(e.target.value)} 
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500"
                                    >
                                        <option value="Emergency">Emergency (4h SLA)</option>
                                        <option value="High">High Priority (24h SLA)</option>
                                        <option value="Medium">Medium Priority (48h SLA)</option>
                                        <option value="Low">Low Priority (72h SLA)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Assign Operations Desk Team</label>
                                <select 
                                    value={assignedTeam} 
                                    onChange={e => setAssignedTeam(e.target.value)} 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500"
                                >
                                    <option>Cleaning Crew A</option>
                                    <option>Sanitization Techs</option>
                                    <option>HVAC Technical Team</option>
                                    <option>Fleet Driver Logistics</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Problem Description *</label>
                                <textarea 
                                    required
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Provide detailed description of the feedback raised..."
                                    className="w-full h-24 px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-danger hover:bg-red-650 text-white rounded-xl font-bold">File Complaint</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Resolve Complaint */}
            {selectedComplaint && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-slate-700">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-850">Resolve Complaint #{selectedComplaint.complaintNumber}</h3>
                            <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-slate-650 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleResolveSubmit} className="space-y-3.5 text-xs">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                                <div className="text-[10px] text-slate-400 font-bold">COMPLAINT SOURCE</div>
                                <div className="font-extrabold text-slate-850">{selectedComplaint.customerName}</div>
                                <div className="text-slate-500 mt-1 leading-relaxed">"{selectedComplaint.description}"</div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Root Cause Analysis & Resolution Notes *</label>
                                <textarea 
                                    required
                                    value={resolutionNotes} 
                                    onChange={e => setResolutionNotes(e.target.value)} 
                                    placeholder="Detail actions taken to satisfy customer (e.g. dispatched crew B to redo cleaning)." 
                                    className="w-full h-28 px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white" 
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setSelectedComplaint(null)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-success hover:bg-[#059669] text-white rounded-xl font-bold">Resolve Ticket</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComplaintsPage;
