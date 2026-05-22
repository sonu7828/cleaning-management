import React, { useEffect, useState, useCallback } from 'react';
import ScheduleBoard from '../../components/erp/ScheduleBoard';
import InvoiceTable from '../../components/erp/InvoiceTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { getInvoices, getJobs, createJob, deleteJob, getClients, updateInvoice, deleteInvoice } from '../../services/api';
import { FaCalendarAlt, FaPlus, FaReceipt } from 'react-icons/fa';

const OperationsPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [jobFormData, setJobFormData] = useState({
        title: '',
        employeeName: '',
        date: new Date().toISOString().split('T')[0]
    });

    const loadData = useCallback(async () => {
        try {
            const [invoicesData, jobsData, clientsData] = await Promise.all([
                getInvoices(),
                getJobs(),
                getClients()
            ]);
            setInvoices(invoicesData);
            setJobs(jobsData);
            setClients(clientsData);
        } catch (error) {
            console.error('Error fetching operations data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleOpenJobModal = () => {
        setJobFormData({
            title: '',
            employeeName: '',
            date: new Date().toISOString().split('T')[0]
        });
        setIsJobModalOpen(true);
    };

    const handleCreateJob = async (e) => {
        e.preventDefault();
        try {
            await createJob(jobFormData);
            setIsJobModalOpen(false);
            loadData();
        } catch (error) {
            console.error('Error scheduling job:', error);
        }
    };

    const handleDeleteJob = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to cancel and delete this scheduled job?')) {
            try {
                await deleteJob(id);
                loadData();
            } catch (error) {
                console.error('Error deleting job:', error);
            }
        }
    }, [loadData]);

    const handleMarkPaid = useCallback(async (id) => {
        try {
            await updateInvoice(id, { status: 'Paid' });
            loadData();
        } catch (error) {
            console.error('Error updating invoice status:', error);
        }
    }, [loadData]);

    const handleDeleteInvoice = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            try {
                await deleteInvoice(id);
                loadData();
            } catch (error) {
                console.error('Error deleting invoice:', error);
            }
        }
    }, [loadData]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Client',
                accessor: 'clientId',
                Cell: ({ value }) => {
                    const client = clients.find(c => c.id === value);
                    return client ? (
                        <div className="font-semibold text-slate-200">{client.name}</div>
                    ) : (
                        <span className="text-slate-400 italic">Client #{value}</span>
                    );
                },
            },
            {
                Header: 'Amount',
                accessor: 'amount',
                Cell: ({ value }) => (
                    <span className="font-mono text-slate-100 font-semibold">${Number(value).toFixed(2)}</span>
                ),
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }) => (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold inline-flex items-center ${
                        value === 'Paid' 
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}>
                        {value}
                    </span>
                ),
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div className="flex items-center space-x-1.5">
                        {row.original.status !== 'Paid' && (
                            <button
                                onClick={() => handleMarkPaid(row.original.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-bold transition shadow-md"
                            >
                                Pay
                            </button>
                        )}
                        <button
                            onClick={() => handleDeleteInvoice(row.original.id)}
                            className="bg-rose-600 hover:bg-rose-50 text-white px-2 py-1 rounded-lg text-xs font-bold transition shadow-md"
                        >
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        [clients, handleDeleteInvoice, handleMarkPaid]
    );

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-[#0B1120]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-2"></div>
                <span className="text-slate-400 text-sm font-semibold">Loading Operations Dashboard...</span>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Operations Management</h1>
                <p className="text-slate-400 text-sm mt-1">Monitor dispatch board schedules and invoice payments simultaneously.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Schedule Board Card */}
                <div className="bg-[#111827]/85 backdrop-blur-md shadow-xl border border-[#1E293B]/30 rounded-2xl p-6 lg:col-span-7 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-[#1E293B]/20">
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-blue-400 text-lg" />
                            <h2 className="text-xl font-bold text-slate-200">Dispatch Schedule</h2>
                        </div>
                        <Button onClick={handleOpenJobModal} className="flex items-center space-x-1.5 py-1.5 px-3 text-xs shadow-md animate-pulse-subtle">
                            <FaPlus className="text-[10px]" />
                            <span>Schedule Job</span>
                        </Button>
                    </div>
                    <ScheduleBoard jobs={jobs} onDeleteJob={handleDeleteJob} />
                </div>

                {/* Invoices Card */}
                <div className="bg-[#111827]/85 backdrop-blur-md shadow-xl border border-[#1E293B]/30 rounded-2xl p-6 lg:col-span-5 space-y-4">
                    <div className="flex items-center space-x-2 pb-2 border-b border-[#1E293B]/20">
                        <FaReceipt className="text-indigo-400 text-lg" />
                        <h2 className="text-xl font-bold text-slate-200">Billing Quick View</h2>
                    </div>
                    <div className="overflow-hidden">
                        <InvoiceTable columns={columns} data={invoices} />
                    </div>
                </div>
            </div>

            {/* Add Scheduled Job Modal */}
            <Modal
                isOpen={isJobModalOpen}
                onClose={() => setIsJobModalOpen(false)}
                title="Schedule New Service Job"
            >
                <form onSubmit={handleCreateJob} className="space-y-4 min-w-[340px]">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Job / Service Title</label>
                        <input
                            type="text"
                            required
                            value={jobFormData.title}
                            onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                            className="w-full border border-[#1E293B]/40 bg-[#060a17] text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent font-medium"
                            placeholder="e.g. Deep Carpet Cleaning"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Assigned Employee</label>
                        <input
                            type="text"
                            required
                            value={jobFormData.employeeName}
                            onChange={(e) => setJobFormData({ ...jobFormData, employeeName: e.target.value })}
                            className="w-full border border-[#1E293B]/40 bg-[#060a17] text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent font-medium"
                            placeholder="e.g. Sarah Jenkins"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Schedule Date</label>
                        <input
                            type="date"
                            required
                            value={jobFormData.date}
                            onChange={(e) => setJobFormData({ ...jobFormData, date: e.target.value })}
                            className="w-full border border-[#1E293B]/40 bg-[#060a17] text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent font-medium"
                        />
                    </div>
                    <div className="pt-4 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsJobModalOpen(false)}
                            className="px-4 py-2.5 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-semibold rounded-xl text-sm transition"
                        >
                            Cancel
                        </button>
                        <Button type="submit">
                            Save Schedule
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default OperationsPage;

