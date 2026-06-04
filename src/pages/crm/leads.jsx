import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
    FaPlus, FaTrash, FaCheck, FaPhoneAlt, FaChevronRight, 
    FaFileInvoice, FaComments, FaCalendarDay, FaUserCheck,
    FaRegBuilding
} from 'react-icons/fa';

const pipelineStages = [
    'New Lead',
    'Contacted',
    'Site Survey',
    'Quoted',
    'Approved'
];

const LeadsPage = () => {
    const { leads, addLead, updateLead, deleteLead, convertLeadToCustomer, addFollowUp } = useContext(AppContext);
    
    const [selectedLead, setSelectedLead] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [followUpNote, setFollowUpNote] = useState('');
    const [expandedStages, setExpandedStages] = useState({});
    const [newLeadForm, setNewLeadForm] = useState({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        source: 'Website',
        notes: '',
        status: 'New Lead'
    });

    const handleCreateLead = (e) => {
        e.preventDefault();
        addLead(newLeadForm);
        setNewLeadForm({
            name: '',
            contactPerson: '',
            email: '',
            phone: '',
            source: 'Website',
            notes: '',
            status: 'New Lead'
        });
        setIsAddOpen(false);
    };

    const handleStatusMove = (id, currentStatus) => {
        // Map old statuses to new pipeline if needed
        let statusToUse = currentStatus;
        if (currentStatus === 'Proposal Sent' || currentStatus === 'Quotation Sent') statusToUse = 'Quoted';
        if (currentStatus === 'Negotiation') statusToUse = 'Quoted';

        const currentIndex = pipelineStages.indexOf(statusToUse);
        if (currentIndex !== -1 && currentIndex < pipelineStages.length - 1) {
            const nextStatus = pipelineStages[currentIndex + 1];
            updateLead(id, { status: nextStatus });
            if (selectedLead && selectedLead.id === id) {
                setSelectedLead(prev => ({ ...prev, status: nextStatus }));
            }
        }
    };

    const handleAddFollowUpNote = (leadId) => {
        if (!followUpNote.trim()) return;
        addFollowUp(leadId, followUpNote);
        setFollowUpNote('');
        const updated = leads.find(l => l.id === leadId);
        if (updated) {
            setSelectedLead(updated);
        }
    };

    const stageColors = {
        'New Lead': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        'Contacted': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        'Site Survey': 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
        'Quoted': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
        'Approved': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        // Fallbacks for old data
        'Proposal Sent': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
        'Quotation Sent': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
        'Negotiation': 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    };

    return (
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaRegBuilding className="text-blue-500" />
                        CRM Pipeline & Lead Desk
                    </h1>
                    <p className="text-slate-400 text-xs mt-1">Nurture client cleaning inquiries and track them along the conversion pipeline.</p>
                </div>
                <button 
                    onClick={() => setIsAddOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl active:scale-[0.98] transition-all text-xs shadow-lg shadow-blue-600/20"
                >
                    <FaPlus className="text-[10px]" /> Add New Prospect
                </button>
            </div>

            {/* Kanban Pipeline Overview */}
            <div className="flex flex-col md:flex-row gap-3.5 overflow-x-auto pb-4 scrollbar-thin">
                {pipelineStages.map(stage => {
                    // Match current stage, plus group old ones into Quoted so they don't disappear
                    const stageLeads = leads.filter(l => {
                        if (stage === 'Quoted') {
                            return ['Quoted', 'Proposal Sent', 'Quotation Sent', 'Negotiation'].includes(l.status);
                        }
                        return l.status === stage;
                    });
                    
                    return (
                        <div key={stage} className="bg-slate-900/60 border border-white/5 rounded-2xl p-3.5 flex flex-col min-h-[220px] max-h-[420px] overflow-y-auto shadow-sm flex-1 md:min-w-[240px] lg:min-w-[200px]">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                                <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider truncate" style={{ color: stageColors[stage]?.match(/text-(\w+)-400/)?.[0]?.replace('text-', '') }}>
                                    {stage}
                                </span>
                                <span className="w-5 h-5 rounded-md bg-[#1E293B] border border-white/10 text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                                    {stageLeads.length}
                                </span>
                            </div>
                            <div className="space-y-3 flex-1">
                                {(expandedStages[stage] ? stageLeads : stageLeads.slice(0, 5)).map(lead => (
                                    <div 
                                        key={lead.id}
                                        onClick={() => setSelectedLead(lead)}
                                        className={`bg-[#1E293B] p-3 rounded-xl shadow-sm cursor-pointer transition-all hover:-translate-y-0.5 text-xs border ${
                                            selectedLead?.id === lead.id ? 'border-blue-500 shadow-blue-500/10' : 'border-white/5 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="font-extrabold text-slate-800 line-clamp-1">{lead.name}</div>
                                        <div className="text-[10px] text-slate-400 mt-1">Rep: <span className="text-slate-600 font-bold">{lead.contactPerson}</span></div>
                                        <div className="text-[10px] text-slate-400 mt-0.5 mb-2 font-bold flex justify-between items-center">
                                            <span>Source: {lead.source}</span>
                                        </div>
                                        
                                        {/* Action footer */}
                                        <div className="pt-2 border-t border-white/5 flex justify-end">
                                            {stage !== 'Approved' ? (
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatusMove(lead.id, lead.status);
                                                    }}
                                                    className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 text-[9px] uppercase tracking-wider"
                                                    title="Move to next stage"
                                                >
                                                    Next Stage <FaChevronRight className="text-[8px]" />
                                                </button>
                                            ) : (
                                                <span className="text-emerald-400 font-bold flex items-center gap-1 text-[9px] uppercase tracking-wider">
                                                    <FaCheck className="text-[9px]" /> Ready to quote
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {stageLeads.length > 5 && (
                                    <button 
                                        onClick={() => setExpandedStages(prev => ({ ...prev, [stage]: !prev[stage] }))}
                                        className="w-full py-2 bg-[#1E293B]/40 hover:bg-[#1E293B]/80 border border-dashed border-white/10 rounded-xl text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-all mt-2"
                                    >
                                        {expandedStages[stage] ? 'Show Less' : `+ ${stageLeads.length - 5} More`}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Split Panel: Leads list & Detail Drawer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Leads List Table */}
                <div className="lg:col-span-8 bg-slate-900/60 border border-white/5 rounded-2xl p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-black text-white tracking-tight">All Registered Prospects</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                                    <th className="py-3 px-2">Company / Contact</th>
                                    <th className="py-3 px-2">Phone & Email</th>
                                    <th className="py-3 px-2">Pipeline Stage</th>
                                    <th className="py-3 px-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 font-medium text-slate-600">
                                {leads.map(lead => (
                                    <tr key={lead.id} onClick={() => setSelectedLead(lead)} className={`hover:bg-[#1E293B]/60 cursor-pointer transition-colors ${selectedLead?.id === lead.id ? 'bg-[#1E293B]' : ''}`}>
                                        <td className="py-3 px-2">
                                            <div className="font-bold text-slate-800 text-[13px]">{lead.name}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">Contact: {lead.contactPerson}</div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <div className="font-bold text-slate-650">{lead.phone}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">{lead.email}</div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${stageColors[lead.status] || stageColors['New Lead']}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2 text-right">
                                            <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                                                {lead.status !== 'Approved' && (
                                                    <button 
                                                        onClick={() => convertLeadToCustomer(lead.id)}
                                                        className="px-2.5 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                                                        title="Convert to Customer"
                                                    >
                                                        <FaUserCheck /> Convert
                                                    </button>
                                                )}
                                                <button onClick={() => deleteLead(lead.id)} className="p-1.5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-500/20 rounded-lg transition-colors" title="Delete Prospect">
                                                    <FaTrash className="text-[11px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Lead Detail Panel / Follow-Up timeline */}
                <div className="lg:col-span-4 bg-slate-900/60 border border-white/5 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    {selectedLead ? (
                        <div className="space-y-4 flex-1">
                            <div className="flex justify-between items-start pb-4 border-b border-white/5">
                                <div>
                                    <h4 className="text-sm font-black text-slate-800">{selectedLead.name}</h4>
                                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mt-2 ${stageColors[selectedLead.status] || stageColors['New Lead']}`}>
                                        {selectedLead.status}
                                    </span>
                                </div>
                                <span className="text-[9px] font-black text-slate-500 uppercase bg-[#1E293B] px-2 py-1 rounded border border-white/5">ID: {selectedLead.id}</span>
                            </div>

                            <div className="space-y-3 text-xs bg-[#1E293B] p-4 rounded-xl border border-white/5 text-slate-600">
                                <div className="flex justify-between"><span className="text-slate-400 font-bold">Contact Person:</span> <span className="font-black text-slate-800">{selectedLead.contactPerson}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400 font-bold">Phone Number:</span> <span className="font-black text-slate-800">{selectedLead.phone}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400 font-bold">Email Address:</span> <span className="font-black text-slate-800">{selectedLead.email}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400 font-bold">Inquiry Source:</span> <span className="font-black text-slate-800">{selectedLead.source}</span></div>
                                <div className="pt-3 mt-3 border-t border-white/5">
                                    <span className="text-slate-400 font-bold block mb-1.5">Prospect Notes:</span>
                                    <p className="text-slate-600 font-medium leading-relaxed text-[11px]">{selectedLead.notes || 'No initial notes provided.'}</p>
                                </div>
                            </div>

                            {/* Follow-up timeline */}
                            <div className="pt-2 space-y-3">
                                <div className="flex items-center gap-1.5 text-xs font-black text-white"><FaComments className="text-blue-400" /> Follow-Up Logs & Activity</div>
                                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                                    {(selectedLead.followUps || []).map((follow, idx) => (
                                        <div key={idx} className="p-3 bg-[#1E293B] border border-white/5 rounded-xl text-[10px] space-y-1">
                                            <div className="flex justify-between text-slate-400 font-bold">
                                                <span className="flex items-center gap-1.5"><FaCalendarDay className="text-blue-400/70" /> {follow.date}</span>
                                            </div>
                                            <p className="text-slate-650 font-medium leading-relaxed">{follow.note}</p>
                                        </div>
                                    ))}
                                    {(!selectedLead.followUps || selectedLead.followUps.length === 0) && (
                                        <div className="text-center p-4 border border-dashed border-white/10 rounded-xl text-slate-500 text-[10px] font-bold">
                                            No activity logged yet.
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <input 
                                        type="text" 
                                        placeholder="Type follow-up update..." 
                                        value={followUpNote}
                                        onChange={e => setFollowUpNote(e.target.value)}
                                        className="flex-1 px-3 py-2 bg-[#1E293B] border border-white/10 rounded-xl text-xs text-white outline-none focus:border-blue-500 placeholder:text-slate-500"
                                    />
                                    <button 
                                        onClick={() => handleAddFollowUpNote(selectedLead.id)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                                    >
                                        Log
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-500 text-center">
                            <FaFileInvoice className="text-4xl opacity-20 mb-3" />
                            <p className="text-xs font-bold max-w-[200px]">Select a prospect from the pipeline or table to view detailed status and timeline.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Lead Modal */}
            {isAddOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-5">
                        <div className="flex justify-between items-center pb-3 border-b border-white/5">
                            <h3 className="text-sm font-black text-white">Add New Cleaning Prospect</h3>
                            <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-white transition-colors font-black text-lg">✕</button>
                        </div>
                        <form onSubmit={handleCreateLead} className="space-y-4 text-xs text-slate-300">
                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Company / Facility Name</label>
                                <input required type="text" value={newLeadForm.name} onChange={e => setNewLeadForm({...newLeadForm, name: e.target.value})} className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors" placeholder="e.g. Burj Khalifa Management office" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Contact Person</label>
                                    <input required type="text" value={newLeadForm.contactPerson} onChange={e => setNewLeadForm({...newLeadForm, contactPerson: e.target.value})} className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors" placeholder="e.g. John Miller" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Lead Source</label>
                                    <select value={newLeadForm.source} onChange={e => setNewLeadForm({...newLeadForm, source: e.target.value})} className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors appearance-none">
                                        <option value="Website">Website Form</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Exhibition">Exhibition/Event</option>
                                        <option value="Cold Call">Cold Call</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Phone Number</label>
                                    <input required type="text" value={newLeadForm.phone} onChange={e => setNewLeadForm({...newLeadForm, phone: e.target.value})} className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors" placeholder="+971 50..." />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Email Address</label>
                                    <input required type="email" value={newLeadForm.email} onChange={e => setNewLeadForm({...newLeadForm, email: e.target.value})} className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors" placeholder="operations@..." />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Service Requirements / Notes</label>
                                <textarea rows="3" value={newLeadForm.notes} onChange={e => setNewLeadForm({...newLeadForm, notes: e.target.value})} className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-slate-500" placeholder="Details of the cleaning scope required..." />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                                <button type="button" onClick={() => setIsAddOpen(false)} className="px-5 py-2.5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-bold transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">Create Prospect</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadsPage;
