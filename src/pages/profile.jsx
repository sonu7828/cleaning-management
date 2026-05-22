import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import { FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaCamera, FaIdBadge } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
    const { user, updateUser, userRole } = useContext(AppContext);
    
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault();
        updateUser(formData);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    const getRoleBadgeColor = () => {
        switch (userRole) {
            case 'superadmin': return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
            case 'technician': return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
            case 'driver': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
            case 'accounts': return 'bg-rose-500/10 text-rose-300 border-rose-500/20';
            case 'client': return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20';
            default: return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
            
            {/* Page Title & Success Toast */}
            <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                    <FaIdBadge className="text-xl" />
                </div>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Profile Settings</h1>
                    <p className="text-slate-400 text-sm mt-0.5">Customize your personal credentials and contact details.</p>
                </div>
            </div>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div 
                        className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl p-4 text-sm flex items-center space-x-3 shadow-lg shadow-emerald-500/5 backdrop-blur-sm"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FaCheckCircle className="text-lg shrink-0" />
                        <span className="font-bold">Profile details updated successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Profile Header Card */}
            <motion.div 
                className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-4xl text-white shadow-xl shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105">
                        {(user?.name || 'U')[0].toUpperCase()}
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#0B1120] border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all shadow-md">
                        <FaCamera className="text-xs" />
                    </button>
                </div>
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-extrabold text-white">{user?.name || 'Administrator'}</h2>
                    <p className="text-sm text-slate-400 mt-1">{user?.email || 'admin@cleancrm.com'}</p>
                    <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${getRoleBadgeColor()}`}>
                            {userRole || 'Admin'} Portal
                        </span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border bg-emerald-500/10 text-emerald-300 border-emerald-500/20">
                            Active
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Edit Form Card */}
            <motion.div 
                className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">Personal Information</h3>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Full Name</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-blue-400 transition-colors">
                                    <FaUser className="text-sm" />
                                </span>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 focus:bg-white/[0.05] transition-all font-medium placeholder-slate-600"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-blue-400 transition-colors">
                                    <FaEnvelope className="text-sm" />
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 focus:bg-white/[0.05] transition-all font-medium placeholder-slate-600"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Phone Number</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-blue-400 transition-colors">
                                    <FaPhoneAlt className="text-sm" />
                                </span>
                                <input
                                    type="text"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 focus:bg-white/[0.05] transition-all font-medium placeholder-slate-600"
                                    placeholder="123-456-7890"
                                />
                            </div>
                        </div>

                        {/* Address Field (Full Width) */}
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Street Address</label>
                            <div className="relative group">
                                <span className="absolute top-4 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-blue-400 transition-colors">
                                    <FaMapMarkerAlt className="text-sm" />
                                </span>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 focus:bg-white/[0.05] transition-all font-medium h-28 resize-none placeholder-slate-600"
                                    placeholder="123 Main St, Anytown, USA"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-end gap-3">
                        <button 
                            type="button" 
                            className="px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <Button 
                            type="submit" 
                            className="px-8 py-3 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl"
                        >
                            Save Settings
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Profile;
