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
            case 'admin': return 'bg-purple-50 text-purple-700 border-purple-105';
            case 'sales': return 'bg-blue-50 text-blue-700 border-blue-105';
            case 'dispatch': return 'bg-amber-50 text-amber-705 border-amber-105';
            case 'technician': return 'bg-slate-100 text-slate-700 border-slate-205';
            default: return 'bg-slate-50 text-slate-600 border-slate-205';
        }
    };

    return (
        <div className="space-y-6 text-slate-800 max-w-4xl mx-auto">
            
            {/* Page Title & Success Toast */}
            <div className="flex items-center space-x-3">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaIdBadge className="text-blue-600" />
                        My Corporate Profile
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5 font-semibold">Customize your personal credentials and logistics details.</p>
                </div>
            </div>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div 
                        className="bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl p-4 text-xs flex items-center space-x-3 shadow-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <FaCheckCircle className="text-sm shrink-0" />
                        <span className="font-bold">Profile details updated successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Profile Header Card */}
            <motion.div 
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="relative group">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-3xl text-white shadow-md">
                        {(user?.name || 'U')[0].toUpperCase()}
                    </div>
                </div>
                <div className="text-center sm:text-left text-xs">
                    <h2 className="text-base font-extrabold text-slate-850">{user?.name || 'Administrator'}</h2>
                    <p className="text-slate-500 font-semibold mt-1">{user?.email || 'admin@teamenviro.ae'}</p>
                    <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${getRoleBadgeColor()}`}>
                            {userRole || 'Admin'} Access
                        </span>
                        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border bg-emerald-50 text-emerald-705 border-emerald-105">
                            Status: Active
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Edit Form Card */}
            <motion.div 
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3 className="text-sm font-black text-slate-850 mb-6 border-b border-slate-100 pb-4">Personal Contact Information</h3>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="space-y-1">
                            <label className="font-bold text-slate-550">Full Name *</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                    <FaUser className="text-xs" />
                                </span>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={userRole !== 'admin' && userRole !== 'sales'}
                                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-800 disabled:bg-slate-50/70 disabled:text-slate-400 disabled:cursor-not-allowed"
                                    placeholder="John Doe"
                                />
                            </div>
                            {userRole !== 'admin' && userRole !== 'sales' && (
                                <p className="text-[10px] text-slate-400 mt-0.5">Contact HR/Admin to change your corporate profile name.</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1">
                            <label className="font-bold text-slate-550">Email Address *</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                    <FaEnvelope className="text-xs" />
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={userRole !== 'admin' && userRole !== 'sales'}
                                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-800 disabled:bg-slate-50/70 disabled:text-slate-400 disabled:cursor-not-allowed"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-1">
                            <label className="font-bold text-slate-550">Contact Number *</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex-center text-slate-400 flex items-center">
                                    <FaPhoneAlt className="text-xs" />
                                </span>
                                <input
                                    type="text"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-800"
                                    placeholder="+971 50 000 0000"
                                />
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="space-y-1 md:col-span-2">
                            <label className="font-bold text-slate-550">UAE Location Address</label>
                            <div className="relative group">
                                <span className="absolute top-3.5 left-0 pl-3.5 flex items-center text-slate-400">
                                    <FaMapMarkerAlt className="text-xs" />
                                </span>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 h-24 resize-none font-bold text-slate-800"
                                    placeholder="Dubai, UAE Address..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-2.5">
                        <button 
                            type="button" 
                            className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-md shadow-blue-600/10"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Profile;
