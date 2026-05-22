import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBuilding, FaUser, FaEnvelope, FaLock, FaCheckCircle, FaBriefcase, FaClipboardList, FaUsers } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

const RegisterPage = () => {
    const { addCompany } = useContext(AppContext);
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        owner: '',
        email: '',
        password: '',
        niche: 'Commercial & Office Cleaning',
        staffCount: '1-10',
        plan: 'Professional'
    });

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            addCompany({
                name: formData.name || 'My Cleaning Services Corp',
                owner: formData.owner,
                plan: formData.plan,
                status: 'Active'
            });
            setLoading(false);
            setStep(4); // Success step
        }, 1200);
    };

    const planOptions = [
        { name: 'Starter', price: '$49/mo', desc: 'Up to 5 staff members, basic quotations & AMC logs.' },
        { name: 'Professional', price: '$149/mo', desc: 'Up to 30 staff, drag-drop scheduler, petty cash.' },
        { name: 'Enterprise', price: '$399/mo', desc: 'Unlimited staff, multiple roles, advanced analytics & ledgers.' }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>

            {/* Container */}
            <div className="w-full max-w-xl z-10 space-y-8">
                {/* Branding Header */}
                <div className="text-center">
                    <div 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 font-black text-white text-2xl shadow-xl shadow-blue-500/25 mb-4 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        C
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Create Your Agency Tenant
                    </h2>
                    <p className="text-sm text-slate-400 mt-2">
                        Get started with the world's most advanced cleaning service ERP workspace.
                    </p>
                </div>

                {/* Progress Indicators */}
                {step <= 3 && (
                    <div className="flex items-center justify-between px-6 py-2 bg-[#0b0f24]/50 border border-white/5 rounded-2xl">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center space-x-2">
                                <div 
                                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                                        step === s 
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                                            : step > s 
                                                ? 'bg-emerald-500 text-white' 
                                                : 'bg-white/5 text-slate-500 border border-white/10'
                                    }`}
                                >
                                    {step > s ? '✓' : s}
                                </div>
                                <span className={`text-xs font-semibold hidden sm:inline ${step === s ? 'text-white' : 'text-slate-500'}`}>
                                    {s === 1 ? 'Credentials' : s === 2 ? 'Agency Details' : 'Select Plan'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-[#0b0f24]/75 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl shadow-black/50 overflow-hidden min-h-[400px] flex flex-col justify-between">
                    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between space-y-8">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-5"
                                >
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><FaUser className="text-blue-400 text-base" /> Personal Admin Details</h3>
                                    
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-400">Your Full Name</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                                <FaUser className="text-xs" />
                                            </span>
                                            <input
                                                type="text"
                                                required
                                                value={formData.owner}
                                                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                                                placeholder="e.g. Alice Vance"
                                                className="w-full pl-9 pr-3 py-2.5 bg-[#020617]/60 border border-white/5 rounded-xl text-white text-xs font-medium placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-400">Admin Email Address</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                                <FaEnvelope className="text-xs" />
                                            </span>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="operations@agency.com"
                                                className="w-full pl-9 pr-3 py-2.5 bg-[#020617]/60 border border-white/5 rounded-xl text-white text-xs font-medium placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-400">Password</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                                <FaLock className="text-xs" />
                                            </span>
                                            <input
                                                type="password"
                                                required
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                placeholder="••••••••"
                                                className="w-full pl-9 pr-3 py-2.5 bg-[#020617]/60 border border-white/5 rounded-xl text-white text-xs font-medium placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-5"
                                >
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><FaBuilding className="text-blue-400 text-base" /> Agency Information</h3>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-400">Agency Name</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                                <FaBuilding className="text-xs" />
                                            </span>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Sparkle Solutions Group"
                                                className="w-full pl-9 pr-3 py-2.5 bg-[#020617]/60 border border-white/5 rounded-xl text-white text-xs font-medium placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-400">Primary Cleaning Niche</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                                <FaBriefcase className="text-xs" />
                                            </span>
                                            <select
                                                value={formData.niche}
                                                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                                                className="w-full pl-9 pr-3 py-2.5 bg-[#020617]/60 border border-white/5 rounded-xl text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                                            >
                                                <option className="bg-[#0b0f24]">Commercial & Office Cleaning</option>
                                                <option className="bg-[#0b0f24]">Residential & Estate Housekeeping</option>
                                                <option className="bg-[#0b0f24]">Hospital & Grade A Disinfection</option>
                                                <option className="bg-[#0b0f24]">Industrial Facilities & Air Ducts</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-400">Number of Staff Members</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                                <FaUsers className="text-xs" />
                                            </span>
                                            <select
                                                value={formData.staffCount}
                                                onChange={(e) => setFormData({ ...formData, staffCount: e.target.value })}
                                                className="w-full pl-9 pr-3 py-2.5 bg-[#020617]/60 border border-white/5 rounded-xl text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                                            >
                                                <option className="bg-[#0b0f24]">1-10 staff members</option>
                                                <option className="bg-[#0b0f24]">11-30 staff members</option>
                                                <option className="bg-[#0b0f24]">31-100 staff members</option>
                                                <option className="bg-[#0b0f24]">Over 100 staff members</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><FaClipboardList className="text-blue-400 text-base" /> Select Your ERP Plan</h3>

                                    <div className="space-y-3">
                                        {planOptions.map((plan) => (
                                            <div 
                                                key={plan.name}
                                                onClick={() => setFormData({ ...formData, plan: plan.name })}
                                                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left ${
                                                    formData.plan === plan.name 
                                                        ? 'bg-blue-600/10 border-blue-500 text-white' 
                                                        : 'bg-white/5 border-white/5 hover:border-white/10 text-slate-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-extrabold text-sm tracking-tight">{plan.name}</span>
                                                    <span className="text-xs font-black text-blue-400 bg-[#020617]/60 px-2 py-0.5 rounded-md border border-white/5">{plan.price}</span>
                                                </div>
                                                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{plan.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6 text-center py-6"
                                >
                                    <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full mb-2">
                                        <FaCheckCircle className="text-5xl" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white">Agency Tenant Provisioned!</h3>
                                    <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                                        Your CRM workspace is initialized successfully. Your new organization has been pre-seeded into the active tenancy directory.
                                    </p>
                                    <div className="pt-4 max-w-xs mx-auto">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/login')}
                                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25 active:scale-[0.98] transition-all text-xs"
                                        >
                                            Navigate to Login Desk
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Control Buttons */}
                        {step <= 3 && (
                            <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-1/3 py-2.5 bg-white/5 border border-white/5 text-slate-300 font-bold rounded-xl hover:bg-white/10 active:scale-[0.98] transition-all text-xs text-center"
                                    >
                                        Back
                                    </button>
                                )}
                                
                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className={`py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all text-xs text-center ${
                                            step === 1 ? 'w-full' : 'w-2/3'
                                        }`}
                                    >
                                        Continue Setup
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-2/3 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25 active:scale-[0.98] transition-all text-xs flex justify-center items-center"
                                    >
                                        {loading ? (
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        ) : 'Finalize & Provision'}
                                    </button>
                                )}
                            </div>
                        )}
                    </form>
                </div>

                <div className="text-center">
                    <span className="text-xs text-slate-400">
                        Already have a desk account?{' '}
                        <button onClick={() => navigate('/login')} className="text-blue-400 hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer">
                            Connect Desk
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
