import React, { useState } from 'react';
import { FaDollarSign, FaPlus, FaSearch, FaCheckCircle, FaHourglassHalf, FaMoneyBillWave } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const DriverCollectionsPage = () => {
    const [collections, setCollections] = useState([
        { id: 'col1', clientName: 'Grand Central Plaza', amount: 350.00, method: 'Cash', date: '2026-05-21', status: 'Deposited' },
        { id: 'col2', clientName: 'Downtown Penthouse Suites', amount: 800.00, method: 'Cheque', date: '2026-05-21', status: 'Pending Review' },
        { id: 'col3', clientName: 'Metro Health Clinic', amount: 150.00, method: 'Cash', date: '2026-05-20', status: 'Deposited' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        clientName: '',
        amount: '',
        method: 'Cash',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCollection = {
            id: 'col' + Date.now().toString().slice(-6),
            clientName: formData.clientName,
            amount: Number(formData.amount) || 0,
            method: formData.method,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending Review'
        };
        setCollections(prev => [newCollection, ...prev]);
        setFormData({ clientName: '', amount: '', method: 'Cash' });
        setShowModal(false);
    };

    const filteredCollections = collections.filter(col =>
        col.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalCollectedToday = collections
        .filter(c => c.date === '2026-05-21')
        .reduce((sum, curr) => sum + curr.amount, 0);

    return (
        <div className="space-y-6 max-w-4xl mx-auto text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaMoneyBillWave className="text-emerald-500" />
                        Daily Collections Ledger
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Register client payments collected on-site during operational dispatches.</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/10">
                    <FaPlus className="text-xs" />
                    <span>Log Collection Voucher</span>
                </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Collected Today</div>
                    <div className="text-3xl font-black text-emerald-400">${totalCollectedToday.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-500 font-bold">Total Cash & Cheque hand-ins</div>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deposited to Accounts</div>
                    <div className="text-3xl font-black text-white">
                        ${collections.filter(c => c.status === 'Deposited').reduce((sum, curr) => sum + curr.amount, 0).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold">Verified ledger deposits</div>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Audit</div>
                    <div className="text-3xl font-black text-amber-500">
                        ${collections.filter(c => c.status === 'Pending Review').reduce((sum, curr) => sum + curr.amount, 0).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold">Awaiting accountant verification</div>
                </div>
            </div>

            {/* Search Box */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-4 shadow-xl">
                <div className="relative w-full">
                    <FaSearch className="absolute left-4 top-3.5 text-slate-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search collections by client name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                </div>
            </div>

            {/* Collections List */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-300 pb-2 border-b border-[#1E293B]/20">
                    <FaDollarSign className="text-emerald-400 text-xs" />
                    <span>Payment Collections Log ({filteredCollections.length})</span>
                </div>

                <div className="space-y-4">
                    {filteredCollections.length === 0 ? (
                        <div className="text-center py-10 text-slate-500 text-sm">No collections logged yet.</div>
                    ) : (
                        filteredCollections.map((col) => (
                            <div key={col.id} className="flex flex-col sm:flex-row justify-between p-4 bg-[#0B1120]/60 border border-[#1E293B]/25 rounded-2xl gap-4 transition hover:bg-[#0B1120]">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm shrink-0">
                                        <FaMoneyBillWave />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-bold text-white">{col.clientName}</div>
                                        <div className="text-xs text-slate-400 font-semibold">Payment Method: <span className="text-slate-200">{col.method}</span></div>
                                        <div className="text-[10px] text-slate-500 font-bold">Collected on {col.date}</div>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                                    <div className="text-lg font-black text-white">${col.amount.toFixed(2)}</div>
                                    <div>
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase ${
                                            col.status === 'Deposited' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                            'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                        }`}>
                                            {col.status === 'Deposited' ? <FaCheckCircle /> : <FaHourglassHalf />}
                                            {col.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Collection Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Log Client Payment Collection">
                <form onSubmit={handleSubmit} className="space-y-4 min-w-[320px]">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Client / Customer Name</label>
                        <input
                            type="text"
                            required
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            placeholder="e.g. Grand Central Plaza"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Amount Collected ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            placeholder="e.g. 350.00"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">Payment Method</label>
                        <select
                            value={formData.method}
                            onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                            className="w-full bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        >
                            <option value="Cash">Cash Collection</option>
                            <option value="Cheque">Cheque Collection</option>
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
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition"
                        >
                            Record Payment
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DriverCollectionsPage;
