import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaCreditCard, FaCheckCircle, FaExclamationCircle, FaReceipt } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const ClientBillingsPage = () => {
    const { invoices, payInvoice } = useContext(AppContext);
    
    // Match based on client properties
    const myInvoices = invoices.filter(inv => 
        inv.clientName.toLowerCase().includes('techlabs') || 
        inv.clientId === '2'
    );

    const pendingInvoices = myInvoices.filter(i => i.status === 'Pending');
    const paidInvoices = myInvoices.filter(i => i.status === 'Paid');

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaReceipt className="text-cyan-500" />
                    Billing & Invoices
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Settle outstanding balances and download receipt sheets.</p>
            </div>

            {/* Outstanding invoices */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-300 pb-2 border-b border-[#1E293B]/20">
                    <FaExclamationCircle className="text-amber-500 text-xs" />
                    <span>Outstanding Invoices ({pendingInvoices.length})</span>
                </div>

                <div className="space-y-4">
                    {pendingInvoices.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-sm font-semibold">No unpaid invoices found. All settled!</div>
                    ) : (
                        pendingInvoices.map((inv) => (
                            <div key={inv.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#0B1120]/60 hover:bg-[#0B1120] border border-[#1E293B]/25 rounded-2xl gap-4 transition">
                                <div className="space-y-1">
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Invoice Code: {inv.id}</div>
                                    <div className="text-sm font-bold text-white">Facility Maintenance Service Fee</div>
                                    <div className="text-[10px] text-slate-400 font-semibold">Payment Due: <span className="text-amber-400">{inv.dueDate}</span></div>
                                </div>

                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    <div className="text-lg font-black text-white">${Number(inv.amount).toFixed(2)}</div>
                                    <Button 
                                        onClick={() => payInvoice(inv.id)}
                                        className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-1.5 text-xs font-bold shadow-lg shadow-cyan-600/10"
                                    >
                                        <FaCreditCard /> Pay Now
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Paid invoices log */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-300 pb-2 border-b border-[#1E293B]/20">
                    <FaCheckCircle className="text-emerald-500 text-xs" />
                    <span>Settled Receipts History ({paidInvoices.length})</span>
                </div>

                <div className="space-y-4">
                    {paidInvoices.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-sm">No transaction histories recorded yet.</div>
                    ) : (
                        paidInvoices.map((inv) => (
                            <div key={inv.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#0B1120]/30 border border-[#1E293B]/10 rounded-2xl gap-4">
                                <div className="space-y-1">
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Invoice Code: {inv.id}</div>
                                    <div className="text-sm font-bold text-slate-300">Facility Maintenance Service Fee</div>
                                    <div className="text-[10px] text-slate-500 font-bold">Settled Date: {inv.dueDate}</div>
                                </div>

                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    <div className="text-base font-black text-slate-200">${Number(inv.amount).toFixed(2)}</div>
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                                        <FaCheckCircle className="text-[9px]" /> Paid
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientBillingsPage;
