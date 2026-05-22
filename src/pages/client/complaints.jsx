import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaExclamationTriangle, FaPlus, FaCheckCircle, FaTools } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const ClientComplaintsPage = () => {
    const { complaints, addComplaint } = useContext(AppContext);
    
    // Filter complaints from this client
    const myComplaints = complaints.filter(c => 
        c.clientName.toLowerCase().includes('techlabs')
    );

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        priority: 'Medium',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addComplaint({
            subject: formData.subject,
            priority: formData.priority,
        });
        setFormData({ subject: '', priority: 'Medium' });
        setShowModal(false);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaExclamationTriangle className="text-cyan-500" />
                        Log Support Ticket
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Report service anomalies, request scheduling shifts, or flag cleaning misses.</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2 shadow-lg shadow-cyan-600/10">
                    <FaPlus className="text-xs" />
                    <span>Raise Support Ticket</span>
                </Button>
            </div>

            {/* Tickets List */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-300 pb-2 border-b border-[#1E293B]/20">
                    <FaTools className="text-cyan-400 text-xs" />
                    <span>Support Ticket Registry ({myComplaints.length})</span>
                </div>

                <div className="space-y-4">
                    {myComplaints.length === 0 ? (
                        <div className="text-center py-10 text-slate-500 text-sm font-semibold">No complaints or support tickets logged.</div>
                    ) : (
                        myComplaints.map((ticket) => (
                            <div key={ticket.id} className="p-5 bg-[#0B1120]/60 hover:bg-[#0B1120] border border-[#1E293B]/25 rounded-2xl space-y-3.5 transition">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-slate-500 font-black tracking-wider uppercase">Ticket Ref: #{ticket.id} • Opened on {ticket.date}</div>
                                        <h3 className="text-sm font-bold text-white leading-snug">{ticket.subject}</h3>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black border uppercase ${
                                            ticket.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                            ticket.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                            'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                        }`}>
                                            {ticket.priority} Priority
                                        </span>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black border uppercase ${
                                            ticket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                            'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                        }`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                </div>

                                {ticket.resolution && (
                                    <div className="border-t border-[#1E293B]/25 pt-3.5 mt-2 space-y-1.5">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                            <FaCheckCircle className="text-emerald-400 text-xs" /> Roster Support Resolution:
                                        </div>
                                        <p className="text-xs text-slate-300 italic bg-[#0B1120]/40 p-3 border border-[#1E293B]/10 rounded-xl leading-relaxed">
                                            "{ticket.resolution}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Raise Ticket Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Log Support Ticket">
                <form onSubmit={handleSubmit} className="space-y-4 min-w-[320px]">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Ticket Subject / Service Issue</label>
                        <input
                            type="text"
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            placeholder="e.g. Streak marks left on glass windows in Office B"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Priority Classification</label>
                        <select
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                    <div className="pt-2 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2.5 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-semibold rounded-xl text-sm transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl text-sm transition"
                        >
                            Raise Ticket
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ClientComplaintsPage;
