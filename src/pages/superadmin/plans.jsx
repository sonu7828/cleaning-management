import React, { useState } from 'react';
import { FaBoxes, FaCheck, FaEdit, FaSlidersH, FaFileInvoiceDollar } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const PlansPage = () => {
    const [plans, setPlans] = useState([
        { id: '1', name: 'Starter', price: 49, interval: 'month', clientsLimit: 15, staffLimit: 5, features: ['Client CRM Registry', 'Standard Invoicing', 'Basic Job Calendar', 'Email Notifications'], activeTenants: 12 },
        { id: '2', name: 'Professional', price: 149, interval: 'month', clientsLimit: 100, staffLimit: 25, features: ['Client CRM Registry', 'Advanced Roster Dispatch', 'Invoicing & Payments Ledger', 'SMS & Email Alerts', 'Custom Branding'], activeTenants: 28 },
        { id: '3', name: 'Enterprise', price: 249, interval: 'month', clientsLimit: 'Unlimited', staffLimit: 'Unlimited', features: ['Multi-tenant Admin Panels', 'Custom Scheduling Timelines', 'Automated VAT/GST Invoicing', 'Driver Petty Cash Modules', 'Customer Portal', 'Priority SLA Support', 'API Access'], activeTenants: 8 },
    ]);

    const handleEditPlan = (id) => {
        const newPrice = prompt("Enter new price for this subscription plan ($):");
        if (newPrice && !isNaN(Number(newPrice))) {
            setPlans(prev => prev.map(p => p.id === id ? { ...p, price: Number(newPrice) } : p));
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <FaBoxes className="text-purple-500" />
                    SaaS Subscription Plans
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">Manage pricing slabs, active quotas, and feature flags for all CRM/ERP clients.</p>
            </div>

            {/* Plans List Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan.id} className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
                        {plan.name === 'Professional' && (
                            <div className="absolute top-4 right-4 bg-purple-500 text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                                Popular
                            </div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <h3 className="text-lg font-bold text-slate-300 uppercase tracking-wider">{plan.name}</h3>
                                <div className="flex items-baseline mt-2 gap-1">
                                    <span className="text-4xl font-black text-white">${plan.price}</span>
                                    <span className="text-xs text-slate-500 font-bold">/ {plan.interval}</span>
                                </div>
                                <p className="text-slate-400 text-xs mt-2">Active Tenants: <span className="text-purple-400 font-bold">{plan.activeTenants} companies</span></p>
                            </div>

                            <div className="border-t border-[#1E293B]/30 pt-4 space-y-3.5">
                                <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                    <FaSlidersH className="text-purple-400 text-[10px]" /> Limits & Capacity:
                                </div>
                                <ul className="text-xs text-slate-300 space-y-2.5 pl-1">
                                    <li className="flex items-center justify-between">
                                        <span>Max Active Clients:</span>
                                        <span className="font-bold text-white">{plan.clientsLimit}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>Rostered Staff Members:</span>
                                        <span className="font-bold text-white">{plan.staffLimit}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="border-t border-[#1E293B]/30 pt-4 space-y-3">
                                <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                    <FaCheck className="text-emerald-400 text-[10px]" /> Included Features:
                                </div>
                                <ul className="text-xs text-slate-300 space-y-2.5 pl-1">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button 
                                onClick={() => handleEditPlan(plan.id)}
                                className="w-full bg-[#1E293B]/40 hover:bg-[#1E293B]/60 text-slate-200 border border-[#1E293B]/50 flex items-center justify-center gap-1.5"
                            >
                                <FaEdit className="text-[10px]" /> Modify Tier Rate
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Plan Settings Card */}
            <div className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-[#1E293B]/20 pb-3">
                    <FaFileInvoiceDollar className="text-purple-400" />
                    <span>Global Billing & Pricing Rules</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                    <div className="space-y-3">
                        <h4 className="font-bold text-slate-200 uppercase tracking-wider">Tenant Billing Period</h4>
                        <p className="text-slate-400">Specify system-wide subscription renewal behaviors. Automated invoice runs execute 5 days before the cycle end date.</p>
                        <select className="bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 w-full text-slate-200 focus:outline-none">
                            <option>Auto-renew with Stripe checkout link</option>
                            <option>Invoice billing (Net-30 payment terms)</option>
                            <option>Manual SaaS admin override</option>
                        </select>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-bold text-slate-200 uppercase tracking-wider">Trial Period Duration</h4>
                        <p className="text-slate-400">The length of the trial environment provisioned to new companies upon initial registration.</p>
                        <select className="bg-[#0B1120] border border-[#1E293B]/40 rounded-xl px-4 py-2.5 w-full text-slate-200 focus:outline-none">
                            <option>14 Days Full Professional Features</option>
                            <option>30 Days Sandbox Trial</option>
                            <option>7 Days Basic Roster Trial</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlansPage;
