import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
    FaFileInvoiceDollar, FaCheckCircle, FaRegCalendarAlt, 
    FaPlusCircle, FaTimes, FaCoins, FaCheck 
} from 'react-icons/fa';

const PaymentsPage = () => {
    const { invoices, payments, recordPayment, userRole } = useContext(AppContext);

    const [showSettlementModal, setShowSettlementModal] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
    const [refNo, setRefNo] = useState('');

    const paidInvoices = invoices.filter(i => i.status === 'Paid');
    const pendingInvoices = invoices.filter(i => ['Sent', 'Pending', 'Overdue'].includes(i.status));

    const totalPaid = payments.reduce((sum, p) => sum + Number(p.amountPaid || 0), 0);
    const totalPending = pendingInvoices.reduce((sum, i) => sum + Number(i.amount || 0), 0);

    const handleSettleSubmit = (e) => {
        e.preventDefault();
        if (!refNo.trim()) {
            alert('Please provide transaction reference/cheque number.');
            return;
        }

        recordPayment({
            customerName: showSettlementModal.customerName,
            invoiceId: showSettlementModal.id,
            amountPaid: showSettlementModal.amount,
            paymentMethod,
            referenceNo: refNo
        });

        setShowSettlementModal(null);
        setRefNo('');
    };

    const isBillingStaff = userRole === 'admin' || userRole === 'accounts';

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <FaFileInvoiceDollar className="text-blue-600" />
                    Corporate Payments & Receipts
                </h1>
                <p className="text-slate-500 text-xs mt-0.5">Track cleared client cash flows, bank transfer vouchers, and record general payments ledger.</p>
            </div>

            {/* KPI metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Gross Settle Collections</div>
                    <div className="text-2xl font-black text-emerald-600">AED {totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">Cleared cash flows across AMC contracts.</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Outstanding Receivables</div>
                    <div className="text-2xl font-black text-amber-600">AED {totalPending.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">Awaiting client bank clearance.</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Collection Ratio</div>
                    <div className="text-2xl font-black text-blue-600">
                        {invoices.length > 0 ? Math.round((paidInvoices.length / invoices.length) * 100) : 0}%
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">Completed vs pending invoice sheets.</div>
                </div>
            </div>

            {/* Split Board */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Pending collections table */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Pending Settlements</h3>
                    <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto pr-1">
                        {pendingInvoices.length === 0 ? (
                            <div className="text-center py-12 text-slate-400 font-bold">No active outstanding collections!</div>
                        ) : (
                            pendingInvoices.map(inv => (
                                <div key={inv.id} className="py-3 flex justify-between items-center gap-3">
                                    <div>
                                        <div className="font-extrabold text-slate-800">{inv.customerName}</div>
                                        <div className="text-[10px] text-slate-500 mt-0.5">Due: {inv.dueDate} | Ref: #{inv.id}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-slate-800">AED {inv.amount?.toFixed(2)}</div>
                                        {isBillingStaff && (
                                            <button 
                                                onClick={() => setShowSettlementModal(inv)}
                                                className="mt-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[9px] font-bold transition flex items-center gap-1 shadow-sm"
                                            >
                                                <FaCoins className="text-[8px]" /> Record Settle
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Cleared Payments Ledger */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Payments History Ledger</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-450 font-extrabold uppercase tracking-wider">
                                    <th className="py-2.5 px-2">Payment ID</th>
                                    <th className="py-2.5 px-2">Client / Account</th>
                                    <th className="py-2.5 px-2">Method</th>
                                    <th className="py-2.5 px-2">Txn Reference</th>
                                    <th className="py-2.5 px-2">Clear Date</th>
                                    <th className="py-2.5 px-2 text-right">Cleared Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                {payments.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50 transition">
                                        <td className="py-3 px-2 text-slate-500 font-mono font-bold">#{p.id}</td>
                                        <td className="py-3 px-2 font-bold text-slate-800">{p.customerName || p.clientName}</td>
                                        <td className="py-3 px-2 text-slate-500">{p.paymentMethod}</td>
                                        <td className="py-3 px-2 font-mono text-slate-600 font-bold">{p.referenceNo || 'Cleared'}</td>
                                        <td className="py-3 px-2 text-slate-500">{p.date || 'Cleared'}</td>
                                        <td className="py-3 px-2 text-right font-black text-emerald-600">AED {p.amountPaid?.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Settle Modal popup */}
            {showSettlementModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-slate-700">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-850">Record Invoice Settlement</h3>
                            <button onClick={() => setShowSettlementModal(null)} className="text-slate-400 hover:text-slate-650 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSettleSubmit} className="space-y-3.5 text-xs">
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                                <div className="text-[10px] text-slate-400 font-bold">CLIENT ACCOUNT</div>
                                <div className="font-extrabold text-slate-800">{showSettlementModal.customerName}</div>
                                <div className="font-black text-sm text-blue-650 mt-1">AED {showSettlementModal.amount?.toFixed(2)}</div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Receipt Gateway</label>
                                <select 
                                    value={paymentMethod} 
                                    onChange={e => setPaymentMethod(e.target.value)} 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500"
                                >
                                    <option>Bank Transfer</option>
                                    <option>Cash payment</option>
                                    <option>Cheque payment</option>
                                    <option>Credit Card Online</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Transaction Reference No / Cheque No *</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={refNo} 
                                    onChange={e => setRefNo(e.target.value)} 
                                    placeholder="e.g. ENBD-9824001" 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" 
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setShowSettlementModal(null)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-success text-white rounded-xl font-bold hover:bg-[#059669]">Record Settlement</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentsPage;
