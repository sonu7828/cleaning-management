import React, { useEffect, useState } from 'react';
import ClientCard from '../../components/crm/ClientCard';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { fetchClients, createClient, updateClient, deleteClient } from '../../services/api';
import { FaPlus } from 'react-icons/fa';

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
    const [selectedClient, setSelectedClient] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const loadClients = async () => {
        try {
            const data = await fetchClients();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleOpenAddModal = () => {
        setModalMode('add');
        setFormData({ name: '', email: '', phone: '', address: '' });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (client) => {
        setModalMode('edit');
        setSelectedClient(client);
        setFormData({
            name: client.name || '',
            email: client.email || '',
            phone: client.phone || '',
            address: client.address || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this client? This will also remove their invoices.')) {
            try {
                await deleteClient(id);
                loadClients();
            } catch (error) {
                console.error('Error deleting client:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modalMode === 'add') {
                await createClient(formData);
            } else {
                await updateClient(selectedClient.id, formData);
            }
            setIsModalOpen(false);
            loadClients();
        } catch (error) {
            console.error('Error saving client:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-black text-white tracking-tight">Clients Register</h1>
                <Button onClick={handleOpenAddModal} className="flex items-center space-x-2 shadow-md">
                    <FaPlus className="text-xs" />
                    <span>Add Client</span>
                </Button>
            </div>

            {clients.length === 0 ? (
                <div className="text-center p-16 bg-[#111827]/80 backdrop-blur-md rounded-2xl shadow-xl border border-[#1E293B]/30">
                    <p className="text-slate-400 font-medium">No clients found. Add a new client to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map(client => (
                        <ClientCard 
                             key={client.id} 
                             client={client}
                             onEdit={() => handleOpenEditModal(client)}
                             onDelete={() => handleDelete(client.id)}
                        />
                    ))}
                </div>
            )}

            {/* Add / Edit Client Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === 'add' ? 'Add New Client' : 'Edit Client Info'}
            >
                <form onSubmit={handleSubmit} className="space-y-4 w-full text-slate-100">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#060a17] border border-[#1E293B]/40 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#060a17] border border-[#1E293B]/40 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Phone Number</label>
                        <input
                            type="text"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#060a17] border border-[#1E293B]/40 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                            placeholder="123-456-7890"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Billing Address</label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full bg-[#060a17] border border-[#1E293B]/40 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-20 resize-none"
                            placeholder="123 Main St..."
                        />
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
                            Save Client
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ClientsPage;
