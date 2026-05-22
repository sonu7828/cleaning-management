import React, { useEffect, useState } from 'react';
import LeadPipeline from '../../components/crm/LeadPipeline';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { fetchLeads, createLead, updateLead, deleteLead } from '../../services/api';
import { FaPlus, FaTrash, FaCheck, FaPhoneAlt } from 'react-icons/fa';

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'New'
    });

    const getLeadsData = async () => {
        try {
            const data = await fetchLeads();
            setLeads(data);
        } catch (error) {
            console.error("Error fetching leads:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLeadsData();
    }, []);

    const handleOpenModal = () => {
        setFormData({ name: '', email: '', phone: '', status: 'New' });
        setIsModalOpen(true);
    };

    const handleAddLead = async (e) => {
        e.preventDefault();
        try {
            await createLead(formData);
            setIsModalOpen(false);
            getLeadsData();
        } catch (e) {
            console.error('Error adding lead:', e);
        }
    };

    const handleStatusChange = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'New' ? 'Contacted' : 'Converted';
        try {
            await updateLead(id, { status: nextStatus });
            getLeadsData();
        } catch (e) {
            console.error('Error updating status:', e);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                await deleteLead(id);
                getLeadsData();
            } catch (e) {
                console.error('Error deleting lead:', e);
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-black text-white tracking-tight">Leads Dashboard</h1>
                <Button onClick={handleOpenModal} className="flex items-center space-x-2 shadow-md">
                    <FaPlus className="text-xs" />
                    <span>Add New Lead</span>
                </Button>
            </div>

            {/* Pipeline chart at the top */}
            <LeadPipeline leads={leads} />

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Leads List</h2>
                {leads.length === 0 ? (
                    <div className="text-center p-16 bg-[#111827]/80 backdrop-blur-md rounded-2xl shadow-xl border border-[#1E293B]/30">
                        <p className="text-slate-400 font-medium">No active leads found. Add a lead to start tracking conversions!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leads.map((lead) => (
                        <div key={lead.id} className="bg-[#111827]/85 border border-[#1E293B]/30 backdrop-blur-sm rounded-2xl shadow-xl p-5 hover:shadow-2xl hover:border-blue-500/30 transition-all flex flex-col justify-between h-48 text-slate-100">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                        lead.status === 'Converted' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                                        lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                                        'bg-blue-500/10 text-blue-300 border-blue-500/20'
                                    }`}>
                                        {lead.status}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">Created: {new Date(lead.createdAt).toLocaleDateString()}</p>
                                
                                <div className="mt-3 text-sm text-slate-300 space-y-1 font-medium">
                                    {lead.email && <p className="truncate">📧 {lead.email}</p>}
                                    {lead.phone && <p>📞 {lead.phone}</p>}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#1E293B]/20 flex justify-between items-center">
                                {lead.status !== 'Converted' ? (
                                    <button 
                                        onClick={() => handleStatusChange(lead.id, lead.status)}
                                        className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                                    >
                                        {lead.status === 'New' ? (
                                            <>
                                                <FaPhoneAlt className="text-[10px]" />
                                                <span>Mark Contacted</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaCheck className="text-[10px]" />
                                                <span>Mark Converted</span>
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                                        <FaCheck className="text-[10px]" />
                                        <span>Conversion Secured</span>
                                    </span>
                                )}

                                <button 
                                    onClick={() => handleDelete(lead.id)}
                                    className="text-slate-400 hover:text-rose-400 p-1.5 transition-colors"
                                >
                                    <FaTrash className="text-sm" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>

            {/* Add Lead Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Lead"
            >
                <form onSubmit={handleAddLead} className="space-y-4 w-full text-slate-100">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Lead Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#060a17] border border-[#1E293B]/40 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                            placeholder="e.g. Commercial Office Cleaning Request"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#060a17] border border-[#1E293B]/40 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                            placeholder="contact@lead.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Phone Number</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#060a17] border border-[#1E293B]/40 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                            placeholder="555-019-2831"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Initial Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full bg-[#060a17] border border-[#1E293B]/40 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                        >
                            <option value="New" className="bg-[#020617]">New</option>
                            <option value="Contacted" className="bg-[#020617]">Contacted</option>
                            <option value="Converted" className="bg-[#020617]">Converted</option>
                        </select>
                    </div>
                    <div className="pt-2 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-[#1E293B]/30 hover:bg-[#1E293B]/50 text-slate-300 font-semibold rounded-xl text-sm transition"
                        >
                            Cancel
                        </button>
                        <Button type="submit">
                            Save Lead
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default LeadsPage;
