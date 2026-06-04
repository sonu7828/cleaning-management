import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
    FaReceipt, FaPlus, FaEye, FaPrint, FaTimes, 
    FaFileInvoiceDollar, FaCheckCircle, FaExclamationCircle, FaLock, FaHistory, FaPercentage
} from 'react-icons/fa';
import DocumentHeader from '../../components/ui/DocumentHeader';
import DocumentFooter from '../../components/ui/DocumentFooter';

const InvoicesPage = () => {
    const { 
        invoices, clients, addInvoice, updateInvoiceStatus, 
        recordPayment, userRole, settings 
    } = useContext(AppContext);

    const [filterStatus, setFilterStatus] = useState('All');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [previewInvoice, setPreviewInvoice] = useState(null);
    const [recordPaymentInvoice, setRecordPaymentInvoice] = useState(null);

    // Form inputs for manual invoice
    const [selectedClient, setSelectedClient] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    // Form inputs for recording payment (supporting partial payments)
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
    const [refNo, setRefNo] = useState('');

    const handleCreateInvoice = (e) => {
        e.preventDefault();
        if (!selectedClient) {
            alert('Please select a customer.');
            return;
        }

        const subtotal = Number(amount);
        const vatAmount = Number((subtotal * 0.05).toFixed(2));
        const grandTotal = Number((subtotal + vatAmount).toFixed(2));

        addInvoice({
            customerName: selectedClient,
            refQuote: `MANUAL-${Math.floor(Math.random()*900+100)}`,
            amount: grandTotal,
            vatAmount,
            dueDate,
            outstandingBalance: grandTotal,
            partialPayments: [],
            status: 'Sent'
        });

        // Reset
        setSelectedClient('');
        setAmount('');
        setIsAddModalOpen(false);
    };

    const handleOpenPaymentModal = (inv) => {
        setRecordPaymentInvoice(inv);
        setPaymentAmount(inv.outstandingBalance !== undefined ? inv.outstandingBalance : inv.amount);
        setPaymentMethod('Bank Transfer');
        setRefNo('');
    };

    const handleRecordPaymentSubmit = (e) => {
        e.preventDefault();
        const amt = Number(paymentAmount);
        const outstanding = recordPaymentInvoice.outstandingBalance !== undefined ? recordPaymentInvoice.outstandingBalance : recordPaymentInvoice.amount;
        
        if (!refNo.trim()) {
            alert('Please enter transaction reference number.');
            return;
        }
        if (isNaN(amt) || amt <= 0 || amt > outstanding + 0.01) {
            alert(`Please enter a valid amount between AED 0.01 and the remaining outstanding balance of AED ${outstanding.toFixed(2)}.`);
            return;
        }

        recordPayment({
            customerName: recordPaymentInvoice.customerName,
            invoiceId: recordPaymentInvoice.id,
            amountPaid: amt,
            paymentMethod,
            referenceNo: refNo
        });

        setRecordPaymentInvoice(null);
        setRefNo('');
        setPaymentAmount('');
    };

    const filteredInvoices = invoices.filter(inv => {
        if (filterStatus === 'All') return true;
        return inv.status === filterStatus;
    });

    const isBillingStaff = userRole === 'admin' || userRole === 'accounts';

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaReceipt className="text-blue-600" />
                        Tax Invoices & Billing
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Generate compliant VAT invoices, trace payments, and record corporate receipts.</p>
                </div>
                <div className="flex gap-2">
                    {isBillingStaff && (
                        <button 
                            onClick={() => setIsAddModalOpen(true)} 
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/10"
                        >
                            <FaPlus className="text-[10px]" /> Raise Invoice
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-xs font-semibold text-slate-500">
                    <div>Total Generated</div>
                    <div className="text-lg font-black text-slate-800 mt-1">
                        AED {invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-xs font-semibold text-slate-550">
                    <div>Paid Invoices</div>
                    <div className="text-lg font-black text-emerald-600 mt-1">
                        AED {invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-xs font-semibold text-slate-550">
                    <div>Outstanding Receivables</div>
                    <div className="text-lg font-black text-amber-600 mt-1">
                        AED {invoices.reduce((sum, inv) => sum + (inv.outstandingBalance !== undefined ? inv.outstandingBalance : (inv.status === 'Paid' ? 0 : inv.amount)), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-xs font-semibold text-slate-550">
                    <div>Overdue Vouchers</div>
                    <div className="text-lg font-black text-rose-600 mt-1">
                        AED {invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + (inv.outstandingBalance !== undefined ? inv.outstandingBalance : inv.amount), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                </div>
            </div>

            {/* Invoices List Board */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                <div className="flex justify-between items-center flex-wrap gap-2 pb-2 border-b border-slate-100">
                    <h3 className="text-sm font-black text-slate-800">Billing Ledgers</h3>
                    <div className="flex gap-1 flex-wrap">
                        {['All', 'Sent', 'Partially Paid', 'Paid', 'Overdue'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                                    filterStatus === status 
                                        ? 'bg-slate-800 border-slate-800 text-white' 
                                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-450 font-extrabold uppercase tracking-wider text-[10px]">
                                <th className="py-3 px-2">Invoice ID</th>
                                <th className="py-3 px-2">Client / Customer</th>
                                <th className="py-3 px-2">Issue Date</th>
                                <th className="py-3 px-2">Due Date</th>
                                <th className="py-3 px-2 text-right">Invoice Value</th>
                                <th className="py-3 px-2 text-right">Remaining Balance</th>
                                <th className="py-3 px-2 text-center">Status</th>
                                <th className="py-3 px-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {filteredInvoices.map((inv) => {
                                const remaining = inv.outstandingBalance !== undefined ? inv.outstandingBalance : (inv.status === 'Paid' ? 0 : inv.amount);
                                return (
                                    <tr key={inv.id} className="hover:bg-slate-50 transition">
                                        <td className="py-3.5 px-2 text-slate-500 font-mono font-bold">#{inv.id}</td>
                                        <td className="py-3.5 px-2 font-bold text-slate-850">{inv.customerName}</td>
                                        <td className="py-3.5 px-2 text-slate-500">{inv.date || 'Auto'}</td>
                                        <td className="py-3.5 px-2 text-slate-500">{inv.dueDate}</td>
                                        <td className="py-3.5 px-2 text-right font-bold text-slate-700">AED {inv.amount?.toFixed(2)}</td>
                                        <td className="py-3.5 px-2 text-right font-black text-slate-800">AED {remaining?.toFixed(2)}</td>
                                        <td className="py-3.5 px-2 text-center">
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                                                inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                inv.status === 'Partially Paid' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                inv.status === 'Sent' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                'bg-rose-50 text-rose-700 border-rose-100'
                                            }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-2 text-right space-x-1.5 whitespace-nowrap">
                                            <button
                                                onClick={() => setPreviewInvoice(inv)}
                                                className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg font-bold text-slate-600 transition"
                                            >
                                                View Tax PDF
                                            </button>
                                            {inv.status !== 'Paid' && isBillingStaff && (
                                                <button
                                                    onClick={() => handleOpenPaymentModal(inv)}
                                                    className="px-2 py-1 bg-emerald-600 hover:bg-emerald-750 text-white rounded-lg font-bold transition shadow-sm"
                                                >
                                                    Record Payment
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Invoice Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-slate-700">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-850">Raise VAT Tax Invoice</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-650 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleCreateInvoice} className="space-y-3.5 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Customer Account *</label>
                                <select 
                                    required 
                                    value={selectedClient} 
                                    onChange={e => setSelectedClient(e.target.value)} 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Account...</option>
                                    {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Taxable Subtotal (AED) *</label>
                                <input 
                                    type="number" 
                                    required 
                                    min="1" 
                                    value={amount} 
                                    onChange={e => setAmount(e.target.value)} 
                                    placeholder="Enter net total before VAT" 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" 
                                />
                                <span className="text-[10px] text-slate-400 block mt-1">5% Dubai VAT will be calculated and added automatically.</span>
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Payment Due Date *</label>
                                <input 
                                    type="date" 
                                    required 
                                    value={dueDate} 
                                    onChange={e => setDueDate(e.target.value)} 
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" 
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Raise Invoice</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Record Payment Modal */}
            {recordPaymentInvoice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4 text-slate-700">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-850">Record Invoice Payment</h3>
                            <button onClick={() => setRecordPaymentInvoice(null)} className="text-slate-400 hover:text-slate-650 transition"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleRecordPaymentSubmit} className="space-y-3.5 text-xs">
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                                <div className="text-[10px] text-slate-400 font-bold">INVOICE TO RECEIVE PAYMENT</div>
                                <div className="font-extrabold text-slate-800">{recordPaymentInvoice.customerName}</div>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    <div>
                                        <span className="text-[9px] text-slate-400 block font-semibold">Total Amount</span>
                                        <span className="font-bold text-slate-750">AED {recordPaymentInvoice.amount?.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <span className="text-[9px] text-slate-400 block font-semibold">Remaining Balance</span>
                                        <span className="font-black text-blue-600">
                                            AED {(recordPaymentInvoice.outstandingBalance !== undefined ? recordPaymentInvoice.outstandingBalance : recordPaymentInvoice.amount)?.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="font-bold text-slate-300 block mb-1">Payment Amount (AED) *</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    required 
                                    value={paymentAmount} 
                                    onChange={e => setPaymentAmount(e.target.value)} 
                                    placeholder="Enter receipt amount"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500" 
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-500">Payment Gateway / Method</label>
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
                                <button type="button" onClick={() => setRecordPaymentInvoice(null)} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-500 font-bold">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700">Record Receipt</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tax PDF Preview Modal */}
            {previewInvoice && (
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print-modal-overlay" style={{ zIndex: 9999 }}>
                    <div className="relative bg-white border border-slate-200 rounded-2xl w-full max-w-3xl shadow-2xl z-10 flex flex-col justify-between print-modal-content" style={{ maxHeight: '85vh' }}>
                        <div className="flex justify-between items-center p-4 border-b border-slate-100">
                            <h3 className="font-extrabold text-sm text-slate-800">Corporate Tax Invoice - UAE Standard</h3>
                            <div className="flex gap-2">
                                <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold rounded-lg transition">
                                    <FaPrint /> Print PDF
                                </button>
                                <button onClick={() => setPreviewInvoice(null)} className="px-3 py-1.5 text-slate-500 hover:text-slate-750 font-bold text-[10px]">Close</button>
                            </div>
                        </div>
                        
                        <div className="p-8 overflow-y-auto bg-white text-slate-800 flex-1" id="printable-document" style={{ overflowY: 'auto' }}>
                            <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                                <div>
                                    <img src="/images/team-enviro-logo.png" alt="Team Enviro Logo" className="h-14 object-contain mb-1.5" />
                                    <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-wider">{settings.companyName || 'Team Enviro Cleaning Services LLC'}</h2>
                                    <p className="text-[9px] text-slate-500 mt-0.5 max-w-sm">{settings.address || 'Dubai, United Arab Emirates'}</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">TRN: {settings.trn || '100458921400003'}</p>
                                </div>
                                <div className="text-right">
                                    <h1 className="text-xl font-black text-blue-600 uppercase tracking-widest text-right">TAX INVOICE</h1>
                                    <p className="text-[10px] text-slate-500 mt-1">Invoice ID: <strong>#{previewInvoice.id}</strong></p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Date: {previewInvoice.date || new Date().toISOString().split('T')[0]}</p>
                                </div>
                            </div>
                            
                            <div className="my-6 flex justify-between items-start text-[11px]">
                                <div>
                                    <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">Billed To:</span>
                                    <div className="text-sm font-black text-slate-800 mt-1">{previewInvoice.customerName}</div>
                                    <div className="text-slate-500 mt-1">Dubai, United Arab Emirates</div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">Due Date:</span>
                                    <div className="text-sm font-black text-rose-600 mt-1">{previewInvoice.dueDate}</div>
                                </div>
                            </div>
                            
                            <table className="w-full text-left my-6 border-collapse text-xs">
                                <thead>
                                    <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 font-extrabold uppercase text-[9px]">
                                        <th className="py-2.5 px-3">Description</th>
                                        <th className="py-2.5 px-3 text-right">VAT Rate</th>
                                        <th className="py-2.5 px-3 text-right">Taxable Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 px-3 font-bold text-slate-800">
                                            Cleaning Maintenance Services SLA
                                            <span className="block text-[10px] text-slate-450 mt-1 font-semibold">Includes scheduled professional deep cleanings, crew logistics and premium materials.</span>
                                        </td>
                                        <td className="py-4 px-3 text-right text-slate-500 font-bold">5.00%</td>
                                        <td className="py-4 px-3 text-right font-black text-slate-850">AED {(previewInvoice.amount - (previewInvoice.vatAmount || 0)).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Receipt Log for Partial Payments */}
                            {previewInvoice.partialPayments && previewInvoice.partialPayments.length > 0 && (
                                <div className="my-6">
                                    <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1"><FaHistory /> Receipt history (Partial Payments)</span>
                                    <table className="w-full text-left text-[10px] border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-y border-slate-100 text-slate-550 font-extrabold uppercase text-[8px] tracking-wider">
                                                <th className="py-2 px-2">Date</th>
                                                <th className="py-2 px-2">Method</th>
                                                <th className="py-2 px-2">Reference</th>
                                                <th className="py-2 px-2 text-right">Amount Paid</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {previewInvoice.partialPayments.map((p, i) => (
                                                <tr key={i} className="border-b border-slate-100">
                                                    <td className="py-2 px-2 text-slate-500 font-semibold">{p.date}</td>
                                                    <td className="py-2 px-2 text-slate-500">{p.method}</td>
                                                    <td className="py-2 px-2 text-slate-500 font-mono">{p.reference}</td>
                                                    <td className="py-2 px-2 text-right font-bold text-slate-800">AED {p.amount?.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            
                            <div className="flex justify-between items-start mt-8 text-xs gap-4">
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-500 w-1/2">
                                    <div className="font-extrabold text-slate-800 uppercase mb-2">Corporate Payment terms</div>
                                    <div>Bank: Emirates NBD Bank PJSC</div>
                                    <div>Account Name: {settings.companyName}</div>
                                    <div>IBAN: AE120240000001003498274</div>
                                </div>
                                <div className="w-72 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5 font-semibold text-slate-650 shrink-0">
                                    <div className="flex justify-between">
                                        <span>Subtotal (Ex VAT):</span>
                                        <span className="font-bold">AED {(previewInvoice.amount - (previewInvoice.vatAmount || 0)).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>VAT Amount (5%):</span>
                                        <span className="font-bold">AED {(previewInvoice.vatAmount || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-850 font-bold border-t border-slate-200 pt-1.5">
                                        <span>Total (VAT Inc):</span>
                                        <span>AED {previewInvoice.amount?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-emerald-600 font-bold border-b border-slate-250 pb-1.5">
                                        <span>Paid Amount:</span>
                                        <span>AED {(previewInvoice.amount - (previewInvoice.outstandingBalance !== undefined ? previewInvoice.outstandingBalance : previewInvoice.amount)).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-black text-blue-600 pt-1.5">
                                        <span>Outstanding Balance:</span>
                                        <span>AED {(previewInvoice.outstandingBalance !== undefined ? previewInvoice.outstandingBalance : previewInvoice.amount).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoicesPage;
