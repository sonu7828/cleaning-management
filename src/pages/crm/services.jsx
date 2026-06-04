import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { FaConciergeBell, FaPlus, FaEdit, FaTrash, FaTimes, FaSearch } from 'react-icons/fa';

const emptyForm = { name: '', category: '', price: '', unit: 'per visit', vatPercent: 5, frequency: 'One-time', duration: '', description: '' };

const categories = ['Deep Cleaning', 'Office Cleaning', 'Pest Control', 'Sofa Cleaning', 'Tank Cleaning', 'AMC Maintenance', 'Other'];
const frequencies = ['One-time', 'Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Annual'];
const units = ['per visit', 'per session', 'per project', 'per unit', 'per room', 'per floor', 'per sqft', 'per treatment'];

const ServicesPage = () => {
    const { services, addService, updateService, deleteService, userRole } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const isAdmin = userRole === 'admin';

    const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowModal(true); };
    const openEdit = (svc) => { setForm({ name: svc.name, category: svc.category, price: svc.price, unit: svc.unit, vatPercent: svc.vatPercent, frequency: svc.frequency, duration: svc.duration || '', description: svc.description }); setEditingId(svc.id); setShowModal(true); };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...form, price: Number(form.price), vatPercent: Number(form.vatPercent) };
        if (editingId) {
            updateService(editingId, data);
        } else {
            addService(data);
        }
        setShowModal(false);
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            deleteService(id);
        }
    };

    // Filter services
    const filteredServices = services.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
        const matchCategory = filterCategory === 'All' || s.category === filterCategory;
        return matchSearch && matchCategory;
    });

    const activeCategories = ['All', ...categories];

    return (
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaConciergeBell className="text-blue-500" />
                        Service Catalog
                    </h1>
                    <p className="text-slate-400 text-xs mt-1">Manage category types, pricing structures, VAT tax, frequency rosters, and job durations.</p>
                </div>
                {isAdmin && (
                    <button onClick={openAdd} className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all text-xs">
                        <FaPlus className="text-xs" /> Add Service
                    </button>
                )}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450 text-sm" />
                    <input type="text" placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1E293B] border border-white/10 rounded-xl text-white text-xs placeholder-slate-500 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {activeCategories.map(cat => (
                        <button key={cat} onClick={() => setFilterCategory(cat)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border ${filterCategory === cat ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-[#1E293B] border-white/5 text-slate-400 hover:bg-[#1E293B]/80 hover:text-white'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map((svc) => (
                    <motion.div key={svc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition group flex flex-col justify-between min-h-[230px]">
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-sm font-black text-white">{svc.name}</h3>
                                    <span className="inline-block text-[9px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider mt-1">{svc.category}</span>
                                </div>
                                {isAdmin && (
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
                                        <button onClick={() => openEdit(svc)} className="p-1.5 text-slate-400 hover:text-blue-400 transition" title="Edit"><FaEdit className="text-xs" /></button>
                                        <button onClick={() => handleDelete(svc.id)} className="p-1.5 text-slate-400 hover:text-rose-400 transition" title="Delete"><FaTrash className="text-xs" /></button>
                                    </div>
                                )}
                            </div>
                            <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">{svc.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5 text-xs">
                            <div>
                                <div className="text-[9px] text-slate-450 font-bold uppercase tracking-wider">Rate</div>
                                <div className="text-xs font-black text-white">AED {Number(svc.price).toLocaleString()}</div>
                                <div className="text-[9px] text-slate-450 font-semibold">{svc.unit}</div>
                            </div>
                            <div>
                                <div className="text-[9px] text-slate-450 font-bold uppercase tracking-wider">VAT</div>
                                <div className="text-xs font-bold text-slate-200">{svc.vatPercent}%</div>
                                <div className="text-[9px] text-slate-450 font-semibold">Included</div>
                            </div>
                            <div>
                                <div className="text-[9px] text-slate-450 font-bold uppercase tracking-wider">Duration</div>
                                <div className="text-xs font-bold text-slate-200">{svc.duration || 'Flexible'}</div>
                            </div>
                            <div className="col-span-3 pt-2">
                                <span className="inline-block text-[9px] font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider">{svc.frequency} Schedule</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredServices.length === 0 && (
                <div className="text-center py-16 text-slate-450 bg-slate-900/60 border border-white/5 rounded-2xl">
                    <FaConciergeBell className="text-4xl mx-auto mb-2 opacity-20" />
                    <p className="text-xs font-bold">No active service categories matched this filter.</p>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-filter backdrop-blur-md">
                    <div className="relative bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl z-10 space-y-4 text-slate-300 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-3 border-b border-white/5">
                            <h3 className="text-sm font-black text-white">{editingId ? 'Edit Cleaning Service' : 'Add New Service To Catalog'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition font-black text-lg">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Service Name *</label>
                                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sofa Sanitization & Deep Extraction" className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Category *</label>
                                    <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors appearance-none">
                                        <option value="">Select...</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Default Frequency</label>
                                    <select value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors appearance-none">
                                        {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Price Rate (AED) *</label>
                                    <input type="number" required min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Unit Type</label>
                                    <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors appearance-none">
                                        {units.map(u => <option key={u} value={u}>{u}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Default VAT %</label>
                                    <input type="number" min="0" max="100" value={form.vatPercent} onChange={(e) => setForm({ ...form, vatPercent: e.target.value })} className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Service Duration (hours/days)</label>
                                    <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 4 Hours" className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Description / Cleaning Spec</label>
                                <textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe details, chemical type, equipment used..." className="w-full px-3 py-2.5 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-slate-500" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-bold transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">{editingId ? 'Save Changes' : 'Publish Service'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesPage;
