import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
    FaUsers, FaFileSignature, FaCalendarCheck, FaFileInvoiceDollar, 
    FaPlus, FaCheck, FaRedo, FaTrash, FaUserPlus, FaCalendarAlt, FaClipboardList
} from 'react-icons/fa';

const AdminDashboard = () => {
    const { 
        clients, quotations, contracts, jobs, 
        addClient, addQuote, approveQuote, renewContract, addJob, deleteJob 
    } = useContext(AppContext);

    // States for toggling modal forms
    const [showClientModal, setShowClientModal] = useState(false);
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [showJobModal, setShowJobModal] = useState(false);

    // Form inputs state
    const [clientForm, setClientForm] = useState({ name: '', email: '', phone: '', address: '' });
    const [quoteForm, setQuoteForm] = useState({ clientName: '', email: '', serviceType: 'Standard Office Clean', areaSqFt: '', value: '' });
    const [jobForm, setJobForm] = useState({ title: '', employeeName: 'Sarah Jenkins', clientName: '', time: '09:00 AM', priority: 'Medium' });

    // Handle submissions
    const handleAddClient = (e) => {
        e.preventDefault();
        addClient(clientForm);
        setClientForm({ name: '', email: '', phone: '', address: '' });
        setShowClientModal(false);
    };

    const handleAddQuote = (e) => {
        e.preventDefault();
        addQuote({
            ...quoteForm,
            areaSqFt: Number(quoteForm.areaSqFt) || 1000,
            value: Number(quoteForm.value) || 100
        });
        setQuoteForm({ clientName: '', email: '', serviceType: 'Standard Office Clean', areaSqFt: '', value: '' });
        setShowQuoteModal(false);
    };

    const handleAddJob = (e) => {
        e.preventDefault();
        addJob({
            ...jobForm,
            date: new Date().toISOString().split('T')[0]
        });
        setJobForm({ title: '', employeeName: 'Sarah Jenkins', clientName: '', time: '09:00 AM', priority: 'Medium' });
        setShowJobModal(false);
    };

    // Calculate Admin stats
    const totalClients = clients.length;
    const pendingQuotes = quotations.filter(q => q.status === 'Pending').length;
    const activeContracts = contracts.filter(c => c.status === 'Active').length;
    const scheduledJobs = jobs.filter(j => j.status === 'Scheduled' || j.status === 'In Progress').length;

    return (
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaClipboardList className="text-blue-500" />
                        Operations CRM Dashboard
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Manage clients, dispatch daily clean squads, build quotes, and manage contracts.</p>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => setShowClientModal(true)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold rounded-xl active:scale-[0.98] transition-all text-xs"
                    >
                        <FaUserPlus className="text-xs" />
                        Add Client
                    </button>
                    <button
                        onClick={() => setShowQuoteModal(true)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold rounded-xl active:scale-[0.98] transition-all text-xs"
                    >
                        <FaPlus className="text-xs" />
                        Create Quote
                    </button>
                    <button
                        onClick={() => setShowJobModal(true)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all text-xs"
                    >
                        <FaCalendarAlt className="text-xs" />
                        Dispatch Squad
                    </button>
                </div>
            </div>

            {/* Stats KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Active Clients</span>
                        <FaUsers className="text-blue-400 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-white">{totalClients}</div>
                    <div className="text-xs text-slate-400 font-medium">B2B accounts registered</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Pending Quotations</span>
                        <FaFileSignature className="text-amber-400 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-white">{pendingQuotes}</div>
                    <div className="text-xs text-slate-400 font-medium">Awaiting customer approval</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Active AMC Contracts</span>
                        <FaFileInvoiceDollar className="text-emerald-400 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-emerald-400">{activeContracts}</div>
                    <div className="text-xs text-slate-400 font-medium">Annual maintenance recurring</div>
                </div>

                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Dispatched Jobs</span>
                        <FaCalendarCheck className="text-indigo-400 text-lg" />
                    </div>
                    <div className="text-3xl font-black text-white">{scheduledJobs}</div>
                    <div className="text-xs text-slate-400 font-medium">Daily rosters scheduled today</div>
                </div>
            </div>

            {/* Dashboard Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Daily Job Scheduler */}
                <div className="lg:col-span-8 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white tracking-tight">Today's Dispatch Board</h3>
                            <p className="text-xs text-slate-400">Assign cleaning jobs to technicians and monitor real-time completion status.</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                    <th className="py-3 px-2">Job Details</th>
                                    <th className="py-3 px-2">Assigned Staff</th>
                                    <th className="py-3 px-2">Client Site</th>
                                    <th className="py-3 px-2">Schedule Time</th>
                                    <th className="py-3 px-2">Priority</th>
                                    <th className="py-3 px-2 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-300">
                                {jobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-white/5 transition">
                                        <td className="py-3.5 px-2">
                                            <div className="font-bold text-white">{job.title}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">ID: {job.id}</div>
                                        </td>
                                        <td className="py-3.5 px-2 text-slate-300">{job.employeeName}</td>
                                        <td className="py-3.5 px-2 text-slate-300 font-semibold">{job.clientName}</td>
                                        <td className="py-3.5 px-2 text-slate-400">{job.time}</td>
                                        <td className="py-3.5 px-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                                job.priority === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                                                job.priority === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                                                'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                                            }`}>
                                                {job.priority}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-2 text-right flex items-center justify-end gap-2">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                job.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                                job.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                                'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                            }`}>
                                                {job.status}
                                            </span>
                                            {job.status === 'Scheduled' && (
                                                <button 
                                                    onClick={() => deleteJob(job.id)}
                                                    className="p-1 text-slate-400 hover:text-rose-400 transition"
                                                    title="Cancel Job"
                                                >
                                                    <FaTrash className="text-[10px]" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Staff Dispatch Status */}
                <div className="lg:col-span-4 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-4 backdrop-blur-sm">
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Staff Availability</h3>
                        <p className="text-xs text-slate-400">Current work roster status of operations staff.</p>
                    </div>

                    <div className="space-y-3.5">
                        {[
                            { name: 'Sarah Jenkins', role: 'Lead Technician', status: 'On Duty', color: 'bg-emerald-500' },
                            { name: 'Michael Chang', role: 'Technician Grade 2', status: 'On Duty', color: 'bg-emerald-500' },
                            { name: 'Emma Watson', role: 'Technician Grade 1', status: 'Standby', color: 'bg-amber-500' },
                            { name: 'Dave Driver', role: 'Logistics Driver', status: 'On Duty', color: 'bg-emerald-500' }
                        ].map((staff, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs p-3 bg-white/5 border border-[#1E293B]/20 rounded-xl">
                                <div className="space-y-0.5">
                                    <div className="font-bold text-white">{staff.name}</div>
                                    <div className="text-slate-400 text-[10px]">{staff.role}</div>
                                </div>
                                <div className="flex items-center space-x-1.5">
                                    <span className={`w-2 h-2 rounded-full ${staff.color}`}></span>
                                    <span className="font-bold text-slate-300">{staff.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Quotations Pipeline */}
                <div className="lg:col-span-6 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-4 backdrop-blur-sm">
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Quotations Board</h3>
                        <p className="text-xs text-slate-400">Approve pending estimates to automatically provision annual AMC contracts.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                    <th className="py-3 px-2">Client / Scope</th>
                                    <th className="py-3 px-2">Pricing</th>
                                    <th className="py-3 px-2">Status</th>
                                    <th className="py-3 px-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-300">
                                {quotations.map((quote) => (
                                    <tr key={quote.id} className="hover:bg-white/5 transition">
                                        <td className="py-3 px-2">
                                            <div className="font-bold text-white">{quote.clientName}</div>
                                            <div className="text-slate-400 text-[10px]">{quote.serviceType}</div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <div className="font-extrabold text-white">${quote.value}</div>
                                            <div className="text-slate-400 text-[9px]">{quote.areaSqFt.toLocaleString()} SqFt</div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                                quote.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' :
                                                quote.status === 'Pending' ? 'bg-amber-500/20 text-amber-300' :
                                                'bg-slate-500/20 text-slate-300'
                                            }`}>
                                                {quote.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2 text-right">
                                            {quote.status === 'Pending' && (
                                                <button 
                                                    onClick={() => approveQuote(quote.id)}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold rounded-lg transition"
                                                >
                                                    <FaCheck className="text-[9px]" /> Approve
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AMC Maintenance Contracts */}
                <div className="lg:col-span-6 bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-4 backdrop-blur-sm">
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">AMC Contracts Registry</h3>
                        <p className="text-xs text-slate-400">Track contract SLA schedules and execute 1-year contract renewals.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                    <th className="py-3 px-2">Client / Scope</th>
                                    <th className="py-3 px-2">Cycle Fee</th>
                                    <th className="py-3 px-2">End Date</th>
                                    <th className="py-3 px-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-300">
                                {contracts.map((contract) => (
                                    <tr key={contract.id} className="hover:bg-white/5 transition">
                                        <td className="py-3 px-2">
                                            <div className="font-bold text-white">{contract.clientName}</div>
                                            <div className="text-slate-400 text-[10px] truncate max-w-[180px]">{contract.title}</div>
                                        </td>
                                        <td className="py-3 px-2 font-extrabold text-emerald-400">
                                            ${contract.value.toLocaleString()}
                                            <span className="text-[9px] text-slate-400 font-medium block">/ {contract.billingCycle}</span>
                                        </td>
                                        <td className="py-3 px-2 text-slate-300 font-semibold">{contract.endDate}</td>
                                        <td className="py-3 px-2 text-right">
                                            <button 
                                                onClick={() => renewContract(contract.id)}
                                                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold rounded-lg transition"
                                                title="Renew AMC Contract"
                                            >
                                                <FaRedo className="text-[8px]" /> Renew
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals Section */}
            
            {/* 1. Client Modal */}
            {showClientModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm" onClick={() => setShowClientModal(false)}></div>
                    <motion.div className="relative bg-[#111827] border border-[#1E293B]/50 rounded-3xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-white" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <h3 className="text-lg font-black text-white">Add B2B Client</h3>
                        <form onSubmit={handleAddClient} className="space-y-3 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Client / Plaza Name</label>
                                <input type="text" required value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} placeholder="e.g. Empire State Plaza" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Contact Email</label>
                                <input type="email" required value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} placeholder="e.g. facilities@empire.com" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Phone</label>
                                <input type="text" required value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} placeholder="e.g. 212-555-0100" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Site Address</label>
                                <input type="text" required value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} placeholder="e.g. 350 5th Ave, NY" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                            </div>
                            <div className="pt-2 flex justify-end space-x-2">
                                <button type="button" onClick={() => setShowClientModal(false)} className="px-3 py-2 text-slate-400 hover:text-white transition">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition">Add Client</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* 2. Quotation Modal */}
            {showQuoteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm" onClick={() => setShowQuoteModal(false)}></div>
                    <motion.div className="relative bg-[#111827] border border-[#1E293B]/50 rounded-3xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-white" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <h3 className="text-lg font-black text-white">Generate Quotation</h3>
                        <form onSubmit={handleAddQuote} className="space-y-3 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Client Name</label>
                                <input type="text" required value={quoteForm.clientName} onChange={(e) => setQuoteForm({ ...quoteForm, clientName: e.target.value })} placeholder="e.g. Summit Tower LLC" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Client Email</label>
                                <input type="email" required value={quoteForm.email} onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })} placeholder="e.g. billing@summit.com" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Service Category</label>
                                <select value={quoteForm.serviceType} onChange={(e) => setQuoteForm({ ...quoteForm, serviceType: e.target.value })} className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white focus:border-blue-500 focus:outline-none [&>option]:bg-[#111827]">
                                    <option>Post-Construction Deep Clean</option>
                                    <option>Bi-Weekly Disinfection</option>
                                    <option>Industrial Floor Stripping</option>
                                    <option>Standard Office Clean</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Area Size (SqFt)</label>
                                    <input type="number" required value={quoteForm.areaSqFt} onChange={(e) => setQuoteForm({ ...quoteForm, areaSqFt: e.target.value })} placeholder="e.g. 15000" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Value Fee ($)</label>
                                    <input type="number" required value={quoteForm.value} onChange={(e) => setQuoteForm({ ...quoteForm, value: e.target.value })} placeholder="e.g. 2400" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                                </div>
                            </div>
                            <div className="pt-2 flex justify-end space-x-2">
                                <button type="button" onClick={() => setShowQuoteModal(false)} className="px-3 py-2 text-slate-400 hover:text-white transition">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl transition">Generate Quote</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* 3. Job Modal */}
            {showJobModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm" onClick={() => setShowJobModal(false)}></div>
                    <motion.div className="relative bg-[#111827] border border-[#1E293B]/50 rounded-3xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-white" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <h3 className="text-lg font-black text-white">Dispatch Cleaning Squad</h3>
                        <form onSubmit={handleAddJob} className="space-y-3 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Cleaning Task Title</label>
                                <input type="text" required value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} placeholder="e.g. Grade A Disinfection Roster" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Client Site</label>
                                <input type="text" required value={jobForm.clientName} onChange={(e) => setJobForm({ ...jobForm, clientName: e.target.value })} placeholder="e.g. Grand Central Plaza" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Assigned Technician</label>
                                    <select value={jobForm.employeeName} onChange={(e) => setJobForm({ ...jobForm, employeeName: e.target.value })} className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white focus:border-blue-500 focus:outline-none [&>option]:bg-[#111827]">
                                        <option>Sarah Jenkins</option>
                                        <option>Michael Chang</option>
                                        <option>Emma Watson</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Schedule Time</label>
                                    <input type="text" required value={jobForm.time} onChange={(e) => setJobForm({ ...jobForm, time: e.target.value })} placeholder="e.g. 10:30 AM" className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Job Priority</label>
                                <select value={jobForm.priority} onChange={(e) => setJobForm({ ...jobForm, priority: e.target.value })} className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/50 rounded-xl text-white focus:border-blue-500 focus:outline-none [&>option]:bg-[#111827]">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                            <div className="pt-2 flex justify-end space-x-2">
                                <button type="button" onClick={() => setShowJobModal(false)} className="px-3 py-2 text-slate-400 hover:text-white transition">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition">Dispatch Squad</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

