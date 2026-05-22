import React, { useEffect, useState, useCallback } from 'react';
import InvoiceTable from '../../components/erp/InvoiceTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { getInvoices, createInvoice, updateInvoice, deleteInvoice, getClients } from '../../services/api';
import { FaPlus, FaReceipt } from 'react-icons/fa';

const InvoicesPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        clientId: '',
        amount: '',
        status: 'Pending',
        dueDate: new Date().toISOString().split('T')[0]
    });

    const loadData = useCallback(async () => {
        try {
            const [invoicesData, clientsData] = await Promise.all([
                getInvoices(),
                getClients()
            ]);
            setInvoices(invoicesData);
            setClients(clientsData);
        } catch (error) {
            console.error('Error fetching invoices or clients:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleOpenAddModal = () => {
        setFormData({
            clientId: clients[0]?.id || '',
            amount: '',
            status: 'Pending',
            dueDate: new Date().toISOString().split('T')[0]
        });
        setIsModalOpen(true);
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.clientId) {
            alert('Please select a client first. If you don\'t have any clients, add one in the Clients Register page.');
            return;
        }
        try {
            await createInvoice(formData);
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Invoice ID',
                accessor: 'id',
            },
            {
                Header: 'Client',
                accessor: 'clientId',
                Cell: ({ value }) => {
                    const client = clients.find(c => c.id === value);
                    return client ? (
                        <div className="font-semibold text-slate-200">{client.name}</div>
                    ) : (
                        <span className="text-slate-400 italic">Unknown Client #{value}</span>
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
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center ${
                        value === 'Paid' 
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${value === 'Paid' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                        {value}
                    </span>
                ),
            },
            {
                Header: 'Due Date',
                accessor: 'dueDate',
                Cell: ({ value }) => {
                    const date = new Date(value);
                    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
                },
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div className="flex items-center space-x-2">
                        {row.original.status !== 'Paid' && (
                            <button
                                onClick={() => handleMarkPaid(row.original.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs transition duration-150 font-bold shadow-md"
                            >
                                Mark Paid
                            </button>
                        )}
                        <button
                            onClick={() => handleDeleteInvoice(row.original.id)}
                            className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-xl text-xs transition duration-150 font-bold shadow-md"
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
                <span className="text-slate-400 text-sm font-semibold">Loading Invoices...</span>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaReceipt className="text-blue-500 text-2xl" />
                        Invoices Billing
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Manage, create, track, and record payments for invoices.</p>
                </div>
                <Button onClick={handleOpenAddModal} className="flex items-center space-x-2 shadow-lg">
                    <FaPlus className="text-xs" />
                    <span>Create Invoice</span>
                </Button>
            </div>

            {invoices.length === 0 ? (
                <div className="text-center p-16 bg-[#111827]/85 backdrop-blur-md rounded-2xl shadow-xl border border-[#1E293B]/30">
                    <div className="w-16 h-16 bg-[#0c102b] text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#1E293B]/20">
                        <FaReceipt className="text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">No invoices recorded</h3>
                    <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">Click "Create Invoice" above to generate a new invoice billing record for one of your clients.</p>
                </div>
            ) : (
                <InvoiceTable columns={columns} data={invoices} />
            )}

            {/* Create Invoice Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Invoice"
            >
                <form onSubmit={handleSubmit} className="space-y-4 min-w-[340px]">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Select Client</label>
                        {clients.length === 0 ? (
                            <div className="text-rose-400 text-xs font-semibold py-1">
                                No clients found. Please add a client first.
                            </div>
                        ) : (
                            <select
                                required
                                value={formData.clientId}
                                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                                className="w-full border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent bg-[#060a17] font-medium text-slate-200"
                            >
                                {clients.map(client => (
                                    <option key={client.id} value={client.id} className="bg-[#0c102b] text-slate-200">
                                        {client.name} ({client.email})
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Invoice Amount ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            min="0"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full border border-[#1E293B]/40 bg-[#060a17] text-slate-200 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent font-medium"
                            placeholder="150.00"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Due Date</label>
                        <input
                            type="date"
                            required
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            className="w-full border border-[#1E293B]/40 bg-[#060a17] text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Payment Status</label>
                        <div className="flex space-x-4 mt-2">
                            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Pending"
                                    checked={formData.status === 'Pending'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="focus:ring-blue-500/20 h-4 w-4 text-blue-500 border-[#1E293B]/40 bg-[#060a17]"
                                />
                                <span>Pending</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Paid"
                                    checked={formData.status === 'Paid'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="focus:ring-blue-500/20 h-4 w-4 text-blue-500 border-[#1E293B]/40 bg-[#060a17]"
                                />
                                <span>Paid</span>
                            </label>
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2.5 bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-300 font-semibold rounded-xl text-sm transition"
                        >
                            Cancel
                        </button>
                        <Button type="submit">
                            Save Invoice
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default InvoicesPage;

