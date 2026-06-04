import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
    FaChartBar, FaFileDownload, FaUsers, FaFileContract, 
    FaUserShield, FaTruck, FaHourglassHalf, FaTrophy, FaCalendarAlt,
    FaExclamationTriangle 
} from 'react-icons/fa';

const CRMReportsPage = () => {
    const { 
        clients, contracts, invoices, workOrders, 
        driverTrips, complaints 
    } = useContext(AppContext);

    const [activeTab, setActiveTab] = useState('customers');

    // ══════════════════════════════════════════
    // CALCULATIONS & DATA COMPILATION
    // ══════════════════════════════════════════

    // 1. Customer Reports Calculations
    const topPayingCustomers = clients.map(client => {
        const clientInvoices = invoices.filter(inv => inv.customerName === client.name && inv.status === 'Paid');
        const totalPaid = clientInvoices.reduce((sum, inv) => sum + inv.amount, 0);
        return { name: client.name, type: client.customerType, totalPaid };
    }).sort((a, b) => b.totalPaid - a.totalPaid).slice(0, 5);

    const overdueCustomers = invoices.filter(inv => inv.status === 'Overdue').map(inv => {
        const remaining = inv.outstandingBalance !== undefined ? inv.outstandingBalance : inv.amount;
        return { invoiceId: inv.id, name: inv.customerName, amount: remaining, dueDate: inv.dueDate };
    });

    const emirateDistribution = clients.reduce((acc, client) => {
        const em = client.emirate || 'Dubai';
        acc[em] = (acc[em] || 0) + 1;
        return acc;
    }, {});

    // 2. AMC Reports Calculations
    const activeAMCs = contracts.filter(c => c.status === 'Active');
    const totalActiveAMCValue = activeAMCs.reduce((sum, c) => sum + c.value, 0);
    
    const upcomingRenewalsCount = contracts.filter(c => {
        if (c.status !== 'Active') return false;
        const diffMs = new Date(c.endDate) - new Date();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 30;
    }).length;

    // 3. Staff & Driver Performance Calculations
    const techPerformance = workOrders.reduce((acc, wo) => {
        if (wo.status === 'Completed') {
            const name = wo.assignedTechnician || 'Unassigned';
            acc[name] = (acc[name] || 0) + 1;
        }
        return acc;
    }, {});

    const driverPerformance = driverTrips.reduce((acc, trip) => {
        if (trip.status === 'Completed') {
            const name = trip.driverName || 'Unassigned';
            acc[name] = (acc[name] || 0) + 1;
        }
        return acc;
    }, {});

    // 4. Operational & Fleet Reports
    const totalJobs = workOrders.length;
    const completedJobs = workOrders.filter(w => w.status === 'Completed').length;
    const completionRate = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 100;

    const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;
    const totalComplaints = complaints.length;
    const complaintResolutionRate = totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 100;

    // Vehicle log calculations
    const vehicleUtil = driverTrips.reduce((acc, trip) => {
        const plate = trip.vehicleNumber;
        if (!acc[plate]) {
            acc[plate] = { distance: 0, fuel: 0, tripsCount: 0 };
        }
        if (trip.status === 'Completed') {
            const diffOdo = Math.max(0, trip.odometerEnd - trip.odometerStart);
            acc[plate].distance += diffOdo;
            acc[plate].fuel += (trip.fuelExpense || 0);
            acc[plate].tripsCount += 1;
        }
        return acc;
    }, {});

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaChartBar className="text-blue-500" />
                        CRM & ERP Reporting Studio
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">Live database statistics, operational KPIs, logistics logs, and revenue forecasts.</p>
                </div>
                <button
                    onClick={() => alert('Compiling latest CRM & ERP operations audit PDF...')}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-blue-600/20 flex items-center gap-1.5"
                >
                    <FaFileDownload />
                    <span>Compile Global Reports</span>
                </button>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross AMC Pool Value</div>
                    <div className="text-2xl font-black text-blue-400">AED {totalActiveAMCValue.toLocaleString()}</div>
                    <p className="text-[9px] text-slate-500 font-semibold">Total active recurring contracts pool</p>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Job Completion Rate</div>
                    <div className="text-2xl font-black text-emerald-400">{completionRate}%</div>
                    <p className="text-[9px] text-slate-500 font-semibold">{completedJobs} of {totalJobs} dispatches completed</p>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Complaint SLA Closed</div>
                    <div className="text-2xl font-black text-purple-400">{complaintResolutionRate}%</div>
                    <p className="text-[9px] text-slate-500 font-semibold">{resolvedComplaints} of {totalComplaints} complaints closed</p>
                </div>
                <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 shadow-xl space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Renewals (30d)</div>
                    <div className="text-2xl font-black text-amber-500">{upcomingRenewalsCount} Contracts</div>
                    <p className="text-[9px] text-slate-500 font-semibold">Critical sales renewals countdown</p>
                </div>
            </div>

            {/* Tab selection */}
            <div className="flex border-b border-[#1E293B]/40 pb-px flex-wrap gap-2 text-xs">
                <button 
                    onClick={() => setActiveTab('customers')} 
                    className={`py-3 px-4 font-bold border-b-2 transition flex items-center gap-1.5 ${
                        activeTab === 'customers' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                >
                    <FaUsers /> Customer Analytics
                </button>
                <button 
                    onClick={() => setActiveTab('amc')} 
                    className={`py-3 px-4 font-bold border-b-2 transition flex items-center gap-1.5 ${
                        activeTab === 'amc' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                >
                    <FaFileContract /> AMC Contracts
                </button>
                <button 
                    onClick={() => setActiveTab('staff')} 
                    className={`py-3 px-4 font-bold border-b-2 transition flex items-center gap-1.5 ${
                        activeTab === 'staff' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                >
                    <FaUserShield /> Staff Performance
                </button>
                <button 
                    onClick={() => setActiveTab('ops')} 
                    className={`py-3 px-4 font-bold border-b-2 transition flex items-center gap-1.5 ${
                        activeTab === 'ops' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                >
                    <FaTruck /> Operations & Fleet
                </button>
            </div>

            {/* TAB PANELS */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl text-xs">
                
                {/* 1. CUSTOMER TAB */}
                {activeTab === 'customers' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Top Paying Clients */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-white flex items-center gap-2">
                                <FaTrophy className="text-amber-500" />
                                Top Paying Corporate Customers (YTD)
                            </h3>
                            <div className="bg-[#0B1120] border border-[#1E293B]/30 rounded-2xl p-4 divide-y divide-[#1E293B]/25">
                                {topPayingCustomers.map((c, i) => (
                                    <div key={i} className="flex justify-between items-center py-3">
                                        <div>
                                            <div className="font-extrabold text-white">{c.name}</div>
                                            <span className="text-[10px] text-slate-500 font-semibold uppercase">{c.type} Customer</span>
                                        </div>
                                        <span className="font-black text-emerald-400">AED {c.totalPaid.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Emirate Client distribution & Overdue payments */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h3 className="text-sm font-black text-white">Geographic Client Distribution</h3>
                                <div className="bg-[#0B1120] border border-[#1E293B]/30 rounded-2xl p-4 grid grid-cols-2 gap-3">
                                    {Object.entries(emirateDistribution).map(([em, count]) => (
                                        <div key={em} className="p-3 bg-[#111827] border border-[#1E293B]/20 rounded-xl flex justify-between items-center">
                                            <span className="font-bold text-slate-300">{em}</span>
                                            <span className="font-black text-blue-400 text-sm">{count} Clients</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Overdue list */}
                            {overdueCustomers.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-sm font-black text-rose-450 flex items-center gap-1">
                                        <FaExclamationTriangle className="text-rose-500 animate-pulse" />
                                        Accounts Receivable: Overdue Clients
                                    </h3>
                                    <div className="bg-[#0B1120] border border-[#1E293B]/30 rounded-2xl p-4 divide-y divide-[#1E293B]/20">
                                        {overdueCustomers.map((o, i) => (
                                            <div key={i} className="flex justify-between items-center py-2.5 text-slate-350">
                                                <div>
                                                    <span className="font-extrabold text-white">{o.name}</span>
                                                    <span className="text-[9px] text-slate-500 block">Inv: #{o.invoiceId} • Due: {o.dueDate}</span>
                                                </div>
                                                <span className="font-bold text-rose-500">AED {o.amount.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 2. AMC TAB */}
                {activeTab === 'amc' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h3 className="text-sm font-black text-white">AMC SLA Contracts Revenue Forecast</h3>
                                <div className="bg-[#0B1120] border border-[#1E293B]/30 rounded-2xl p-5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 font-semibold">Active Contracts count:</span>
                                        <span className="font-bold text-white">{activeAMCs.length} Active SLA</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 font-semibold">Annual Projected Revenue:</span>
                                        <span className="font-black text-cyan-400 text-lg">AED {totalActiveAMCValue.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-[#1E293B]/40 pt-3">
                                        <span className="text-slate-400 font-semibold">Monthly Recurring Revenue (MRR):</span>
                                        <span className="font-bold text-emerald-400 text-base">AED {Math.round(totalActiveAMCValue / 12).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                                    <FaCalendarAlt className="text-blue-500" />
                                    Upcoming Expirations Checklist
                                </h3>
                                <div className="bg-[#0B1120] border border-[#1E293B]/30 rounded-2xl p-4 divide-y divide-[#1E293B]/20">
                                    {contracts.map((ctr) => {
                                        const expiry = new Date(ctr.endDate);
                                        const diff = Math.ceil((expiry - new Date()) / (1000 * 60 * 60 * 24));
                                        const isCritical = diff <= 30;
                                        return (
                                            <div key={ctr.id} className="flex justify-between items-center py-2.5 text-slate-350">
                                                <div>
                                                    <span className="font-bold text-white">{ctr.title}</span>
                                                    <span className="text-[9px] text-slate-550 block">Manager: {ctr.assignedManager || 'Sales Rep A'}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-bold text-slate-200 block">{ctr.endDate}</span>
                                                    <span className={`text-[9px] font-black rounded-full px-2 py-0.5 mt-0.5 inline-block ${
                                                        isCritical ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' : 'bg-slate-800 text-slate-400'
                                                    }`}>
                                                        {diff > 0 ? `${diff} days left` : 'Expired'}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. STAFF TAB */}
                {activeTab === 'staff' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Technicians Completed Job Counts */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                                <FaUserShield className="text-blue-500" />
                                Field Supervisors: Job Sign-offs Closed
                            </h3>
                            <div className="bg-[#0B1120] border border-[#1E293B]/30 rounded-2xl p-4 space-y-4">
                                {Object.entries(techPerformance).length === 0 ? (
                                    <p className="text-slate-500 italic text-[11px] py-4 text-center">No completed dispatches logged for technicians yet.</p>
                                ) : (
                                    Object.entries(techPerformance).map(([name, count]) => (
                                        <div key={name} className="space-y-1.5">
                                            <div className="flex justify-between font-bold text-slate-300">
                                                <span>{name}</span>
                                                <span>{count} Jobs Completed</span>
                                            </div>
                                            <div className="w-full bg-[#111827] h-2 rounded-full overflow-hidden">
                                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, count * 10)}%` }}></div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Driver dispatches count */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                                <FaTruck className="text-blue-500" />
                                Logistics Fleet Drivers: Completed Trips
                            </h3>
                            <div className="bg-[#0B1120] border border-[#1E293B]/30 rounded-2xl p-4 space-y-4">
                                {Object.entries(driverPerformance).length === 0 ? (
                                    <p className="text-slate-500 italic text-[11px] py-4 text-center">No completed dispatches logged for drivers yet.</p>
                                ) : (
                                    Object.entries(driverPerformance).map(([name, count]) => (
                                        <div key={name} className="space-y-1.5">
                                            <div className="flex justify-between font-bold text-slate-300">
                                                <span>{name}</span>
                                                <span>{count} Trips Finished</span>
                                            </div>
                                            <div className="w-full bg-[#111827] h-2 rounded-full overflow-hidden">
                                                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${Math.min(100, count * 10)}%` }}></div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. OPS & FLEET TAB */}
                {activeTab === 'ops' && (
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-white flex items-center gap-2">
                            <FaTruck className="text-blue-500" />
                            Logistics Fleet Odometer & Fuel Utilization Records
                        </h3>
                        <div className="overflow-x-auto bg-[#0B1120] border border-[#1E293B]/30 rounded-2xl p-4">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#1E293B]/40 text-slate-450 font-extrabold uppercase text-[9px] tracking-wider">
                                        <th className="py-2.5 px-2">Plate Number</th>
                                        <th className="py-2.5 px-2 text-right">Trips Logged</th>
                                        <th className="py-2.5 px-2 text-right">Total Mileage (km)</th>
                                        <th className="py-2.5 px-2 text-right">Total Fuel Expense (AED)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1E293B]/25 font-semibold text-slate-350">
                                    {Object.keys(vehicleUtil).length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-6 text-slate-500 italic">No completed logistics trips found.</td>
                                        </tr>
                                    ) : (
                                        Object.entries(vehicleUtil).map(([plate, data]) => (
                                            <tr key={plate} className="hover:bg-slate-900/40">
                                                <td className="py-3 px-2 font-mono font-bold text-white">{plate}</td>
                                                <td className="py-3 px-2 text-right">{data.tripsCount} trips</td>
                                                <td className="py-3 px-2 text-right text-emerald-400 font-bold">{data.distance} km</td>
                                                <td className="py-3 px-2 text-right text-amber-400 font-bold">AED {data.fuel}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CRMReportsPage;
