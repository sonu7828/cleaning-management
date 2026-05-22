import React, { useState } from 'react';
import { FaUserShield, FaPlus, FaSearch, FaUserTag, FaCheckCircle, FaTimesCircle, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const UsersPage = () => {
    const [users, setUsers] = useState([
        { id: 'u1', name: 'Alice Super', email: 'superadmin@cleancrm.com', phone: '+1 (555) 999-0000', role: 'superadmin', status: 'Active' },
        { id: 'u2', name: 'John Doe', email: 'admin@cleancrm.com', phone: '+1 (555) 019-2831', role: 'admin', status: 'Active' },
        { id: 'u3', name: 'Gary Goldman', email: 'gary.accounts@cleancrm.com', phone: '+1 (555) 728-1122', role: 'accounts', status: 'Active' },
        { id: 'u4', name: 'Sarah Jenkins', email: 'sarah.tech@cleancrm.com', phone: '+1 (555) 304-9844', role: 'technician', status: 'Active' },
        { id: 'u5', name: 'Michael Chang', email: 'michael.c@cleancrm.com', phone: '+1 (555) 203-9112', role: 'technician', status: 'Active' },
        { id: 'u6', name: 'Dave Driver', email: 'dave.driver@cleancrm.com', phone: '+1 (555) 441-2090', role: 'driver', status: 'Active' },
        { id: 'u7', name: 'TechLabs Facilities', email: 'facilities@techlabs.io', phone: '+1 (555) 880-9900', role: 'client', status: 'Active' }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'admin',
        status: 'Active'
    });

    const handleToggleStatus = (id) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: 'u' + Date.now().toString().slice(-6),
            ...formData
        };
        setUsers(prev => [...prev, newUser]);
        setFormData({ name: '', email: '', phone: '', role: 'admin', status: 'Active' });
        setShowModal(false);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'All' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const getRoleBadge = (role) => {
        switch (role) {
            case 'superadmin':
                return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
            case 'admin':
                return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
            case 'accounts':
                return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
            case 'technician':
                return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
            case 'driver':
                return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
            default:
                return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaUserShield className="text-purple-500" />
                        Platform User Management
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Control login permissions, security credentials, and platform-wide administrative roles.</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                    <FaPlus className="text-xs" />
                    <span>Add New User</span>
                </Button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Active logins</div>
                    <div className="text-4xl font-black text-purple-400">{users.filter(u => u.status === 'Active').length}</div>
                    <div className="text-xs text-slate-500 font-medium">Authorised platform staff accounts</div>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Administrative Staff</div>
                    <div className="text-4xl font-black text-blue-400">{users.filter(u => u.role === 'admin' || u.role === 'superadmin').length}</div>
                    <div className="text-xs text-slate-500 font-medium">Platform operators and system admins</div>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Field Operatives</div>
                    <div className="text-4xl font-black text-amber-400">{users.filter(u => u.role === 'technician' || u.role === 'driver').length}</div>
                    <div className="text-xs text-slate-500 font-medium">Technicians and drivers squad</div>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suspended Licenses</div>
                    <div className="text-4xl font-black text-rose-500">{users.filter(u => u.status === 'Inactive').length}</div>
                    <div className="text-xs text-slate-500 font-medium">Locked accounts needing review</div>
                </div>
            </div>

            {/* Filter and Search Panel */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute left-4 top-3.5 text-slate-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Role:</span>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="bg-[#0B1120] border border-[#1E293B]/40 text-slate-200 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                        <option value="All">All Roles</option>
                        <option value="superadmin">Super Admin</option>
                        <option value="admin">Operations Admin</option>
                        <option value="accounts">Accounts</option>
                        <option value="technician">Technician</option>
                        <option value="driver">Driver</option>
                        <option value="client">Client</option>
                    </select>
                </div>
            </div>

            {/* User Directory Table */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-[#1E293B]/30 text-slate-400 font-extrabold uppercase tracking-wider">
                                <th className="py-4 px-3">Name & Contact</th>
                                <th className="py-4 px-3">System Role</th>
                                <th className="py-4 px-3">Status</th>
                                <th className="py-4 px-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]/20 font-medium text-slate-300">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-[#1E293B]/10 transition duration-150">
                                    <td className="py-4 px-3 flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-black text-sm shrink-0">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-sm">{user.name}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">{user.email} | {user.phone}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-3">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getRoleBadge(user.role)}`}>
                                            <FaUserTag className="text-[9px]" />
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-3">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                            user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                        }`}>
                                            {user.status === 'Active' ? <FaCheckCircle /> : <FaTimesCircle />}
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-3 text-right">
                                        <button 
                                            onClick={() => handleToggleStatus(user.id)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                                                user.status === 'Active' ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                                            }`}
                                        >
                                            {user.status === 'Active' ? <><FaToggleOff /> Disable</> : <><FaToggleOn /> Enable</>}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Platform Account">
                <form onSubmit={handleSubmit} className="space-y-4 min-w-[320px]">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            placeholder="e.g. David Hasselhoff"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            placeholder="e.g. david@cleancrm.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Phone Number</label>
                        <input
                            type="text"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            placeholder="e.g. +1 (555) 234-9121"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Access Role Tier</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        >
                            <option value="superadmin">Super Admin</option>
                            <option value="admin">Operations Admin</option>
                            <option value="accounts">Accounts Team</option>
                            <option value="technician">Rostered Technician</option>
                            <option value="driver">Logistics Driver</option>
                            <option value="client">Client Portal Access</option>
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
                            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition"
                        >
                            Create User
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default UsersPage;
