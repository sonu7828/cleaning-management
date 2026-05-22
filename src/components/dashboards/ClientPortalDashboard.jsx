import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
    FaFileContract, FaCreditCard, FaRegLifeRing, FaClock, FaCheckCircle, 
    FaBuilding, FaSpinner, FaArrowRight, FaTicketAlt, FaShieldAlt
} from 'react-icons/fa';

const ClientPortalDashboard = () => {
    const { 
        contracts, invoices, complaints, jobs, 
        payInvoice, addComplaint 
    } = useContext(AppContext);

    // States
    const [showComplaintModal, setShowComplaintModal] = useState(false);
    const [showPayModal, setShowPayModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [paying, setPaying] = useState(false);

    // Form inputs state
    const [complaintForm, setComplaintForm] = useState({ subject: '', priority: 'Medium' });
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });

    // Client details mock checks (filtering for Grand Central Plaza - default client)
    const clientName = "Grand Central Plaza";
    const clientContracts = contracts.filter(c => c.clientName === clientName);
    const clientInvoices = invoices.filter(i => i.clientName === clientName);
    const clientComplaints = complaints.filter(c => c.clientName === clientName);
    const clientJobs = jobs.filter(j => j.clientName === clientName);

    // Handle raise complaint
    const handleComplaintSubmit = (e) => {
        e.preventDefault();
        addComplaint({
            subject: complaintForm.subject,
            priority: complaintForm.priority
        });
        setComplaintForm({ subject: '', priority: 'Medium' });
        setShowComplaintModal(false);
    };

    // Handle payment
    const handleOpenPayment = (inv) => {
        setSelectedInvoice(inv);
        setShowPayModal(true);
    };

    const handlePaySubmit = (e) => {
        e.preventDefault();
        setPaying(true);
        setTimeout(() => {
            payInvoice(selectedInvoice.id);
            setPaying(false);
            setShowPayModal(false);
            setSelectedInvoice(null);
            setCardDetails({ number: '', expiry: '', cvc: '' });
        }, 1200);
    };

    // Combine jobs and complaints into a unified timeline
    const timelineEvents = [
        ...clientJobs.map(job => ({
            id: job.id,
            type: 'job',
            title: job.title,
            desc: `Performed by ${job.employeeName}`,
            date: job.date,
            status: job.status,
            icon: <FaCheckCircle className="text-emerald-500 text-sm" />
        })),
        ...clientComplaints.map(cmp => ({
            id: cmp.id,
            type: 'complaint',
            title: `Complaint Raised: ${cmp.subject}`,
            desc: cmp.resolution ? `Resolution: ${cmp.resolution}` : 'Currently under investigation by admin squad.',
            date: cmp.date,
            status: cmp.status,
            icon: <FaTicketAlt className="text-rose-500 text-sm" />
        }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaBuilding className="text-cyan-400 animate-pulse" />
                        Client Portal Panel
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Welcome, Grand Central Plaza. Monitor service rosters, clear billings, and log support queries.</p>
                </div>
                
                <button
                    onClick={() => setShowComplaintModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md shadow-rose-600/10 hover:shadow-rose-700/20 active:scale-[0.98] transition-all text-sm"
                >
                    <FaRegLifeRing className="text-xs" />
                    File Quality Complaint
                </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* 1. Contracts & Billings */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Contract Details */}
                    <div className="bg-[#111827]/85 border border-[#1E293B]/30 backdrop-blur-sm shadow-xl rounded-2xl p-5 space-y-4">
                        <div className="flex items-center space-x-2">
                            <FaFileContract className="text-cyan-400 text-lg" />
                            <h3 className="text-lg font-bold text-white tracking-tight">Active AMC SLA Contracts</h3>
                        </div>

                        <div className="space-y-3">
                            {clientContracts.map((ctr) => (
                                <div key={ctr.id} className="p-4 bg-[#060a17] rounded-2xl border border-[#1E293B]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-1 text-xs">
                                        <div className="font-extrabold text-white text-sm">{ctr.title}</div>
                                        <div className="text-slate-400 font-semibold">{ctr.scope}</div>
                                        <div className="text-slate-300 font-semibold pt-1">
                                            Billing Cycle: <span className="font-extrabold text-cyan-400">{ctr.billingCycle}</span>
                                        </div>
                                    </div>
                                    <div className="text-left sm:text-right shrink-0">
                                        <div className="text-lg font-black text-white">${ctr.value.toLocaleString()}</div>
                                        <div className="text-[10px] text-slate-400 font-semibold">Ends: {ctr.endDate}</div>
                                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 uppercase tracking-wider">
                                            {ctr.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Invoice Billing center */}
                    <div className="bg-[#111827]/85 border border-[#1E293B]/30 backdrop-blur-sm shadow-xl rounded-2xl p-5 space-y-4">
                        <div className="flex items-center space-x-2">
                            <FaCreditCard className="text-cyan-400 text-lg" />
                            <h3 className="text-lg font-bold text-white tracking-tight">Invoices & Payments</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                        <th className="py-3 px-2">Invoice</th>
                                        <th className="py-3 px-2">Amount Due</th>
                                        <th className="py-3 px-2">Due Date</th>
                                        <th className="py-3 px-2">Status</th>
                                        <th className="py-3 px-2 text-right">Payment Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-300">
                                    {clientInvoices.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-white/5 transition">
                                            <td className="py-3.5 px-2">
                                                <div className="font-bold text-white">{inv.id}</div>
                                                <div className="text-[9px] text-slate-400">Issued: {inv.createdDate}</div>
                                            </td>
                                            <td className="py-3.5 px-2 font-extrabold text-white">${inv.amount.toFixed(2)}</td>
                                            <td className="py-3.5 px-2 text-slate-400">{inv.dueDate}</td>
                                            <td className="py-3.5 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                                    inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' :
                                                    'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                                                }`}>
                                                    {inv.status}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-2 text-right">
                                                {inv.status === 'Pending' && (
                                                    <button 
                                                        onClick={() => handleOpenPayment(inv)}
                                                        className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition"
                                                    >
                                                        Pay Now <FaArrowRight className="text-[8px]" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 2. Service Timeline */}
                <div className="lg:col-span-4 bg-[#111827]/85 border border-[#1E293B]/30 backdrop-blur-sm shadow-xl rounded-2xl p-5 space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                            <FaClock className="text-slate-400" />
                            Work History Timeline
                        </h3>
                        <p className="text-xs text-slate-400">Live tracker of rosters completed and complaints logged.</p>
                    </div>

                    <div className="relative border-l-2 border-[#1E293B]/30 pl-4 ml-2 space-y-5 py-2 max-h-[480px] overflow-y-auto pr-1">
                        {timelineEvents.map((event) => (
                            <div key={event.id} className="relative space-y-1 text-xs">
                                {/* Dot indicator */}
                                <div className="absolute -left-[23px] top-1 p-0.5 bg-[#0B1120] border border-[#1E293B]/30 rounded-full">
                                    {event.icon}
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400">
                                    <span className="font-extrabold text-slate-500 uppercase tracking-wider">{event.type}</span>
                                    <span>{event.date}</span>
                                </div>
                                <h4 className="font-extrabold text-white leading-snug">{event.title}</h4>
                                <p className="text-slate-400 font-semibold">{event.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* complaint modal */}
            {showComplaintModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-sm" onClick={() => setShowComplaintModal(false)}></div>
                    <motion.div className="relative bg-[#020617] border border-[#1E293B]/50 rounded-3xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div>
                            <h3 className="text-lg font-black text-white">Raise Quality Complaint</h3>
                            <p className="text-xs text-slate-400">Flag issues immediately for site manager review.</p>
                        </div>
                        <form onSubmit={handleComplaintSubmit} className="space-y-3.5 text-xs text-slate-300">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Complaint Details / Subject *</label>
                                <textarea required value={complaintForm.subject} onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })} placeholder="Describe missed areas, poor service quality, or staff delay details..." className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/40 rounded-xl h-24 resize-none text-white focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Priority Level</label>
                                <select value={complaintForm.priority} onChange={(e) => setComplaintForm({ ...complaintForm, priority: e.target.value })} className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/40 rounded-xl text-white focus:outline-none focus:border-blue-500">
                                    <option className="bg-[#020617]">Low</option>
                                    <option className="bg-[#020617]">Medium</option>
                                    <option className="bg-[#020617]">High</option>
                                    <option className="bg-[#020617]">Urgent SLA Breach</option>
                                </select>
                            </div>
                            <div className="pt-2 flex justify-end space-x-2">
                                <button type="button" onClick={() => setShowComplaintModal(false)} className="px-3 py-2 text-slate-400 hover:text-white">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md transition">File Ticket</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Pay invoice simulator modal */}
            {showPayModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-sm" onClick={() => setShowPayModal(false)}></div>
                    <motion.div className="relative bg-[#020617] border border-[#1E293B]/50 rounded-3xl p-6 w-full max-w-sm shadow-2xl z-10 space-y-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="flex justify-between items-center pb-2 border-b border-[#1E293B]/30">
                            <h3 className="font-black text-white">Clear Outstanding Invoice</h3>
                            <span className="text-xs font-black text-cyan-300 bg-[#060a17] border border-[#1E293B]/30 px-2 py-0.5 rounded">{selectedInvoice?.id}</span>
                        </div>
                        
                        <div className="text-center bg-[#060a17] border border-[#1E293B]/20 rounded-2xl p-4">
                            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Amount Due</div>
                            <div className="text-2xl font-black text-white">${selectedInvoice?.amount.toFixed(2)}</div>
                        </div>

                        <form onSubmit={handlePaySubmit} className="space-y-3.5 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Card Number</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                        <FaCreditCard />
                                    </span>
                                    <input 
                                        type="text" 
                                        required 
                                        maxLength="19"
                                        value={cardDetails.number} 
                                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim() })}
                                        placeholder="4000 1234 5678 9010" 
                                        className="w-full pl-9 pr-3 py-2 bg-[#060a17] border border-[#1E293B]/40 text-white rounded-xl focus:outline-none focus:border-blue-500" 
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Expiry Date</label>
                                    <input 
                                        type="text" 
                                        required 
                                        maxLength="5"
                                        value={cardDetails.expiry} 
                                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                        placeholder="MM/YY" 
                                        className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/40 text-white rounded-xl text-center focus:outline-none focus:border-blue-500" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">CVC Code</label>
                                    <input 
                                        type="password" 
                                        required 
                                        maxLength="3"
                                        value={cardDetails.cvc} 
                                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                                        placeholder="•••" 
                                        className="w-full px-3 py-2 bg-[#060a17] border border-[#1E293B]/40 text-white rounded-xl text-center focus:outline-none focus:border-blue-500" 
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold justify-center pt-1">
                                <FaShieldAlt className="text-emerald-400 animate-pulse" /> SECURE 256-BIT MOCK SANDBOX PAYMENT
                            </div>

                            <button
                                type="submit"
                                disabled={paying}
                                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 flex justify-center items-center gap-1.5 transition text-xs"
                            >
                                {paying ? (
                                    <>
                                        <FaSpinner className="animate-spin text-white" /> Verifying Funds...
                                    </>
                                ) : `Settle payment - $${selectedInvoice?.amount.toFixed(2)}`}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ClientPortalDashboard;
