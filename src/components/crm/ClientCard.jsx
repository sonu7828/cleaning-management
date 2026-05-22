import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const ClientCard = ({ client, onEdit, onDelete }) => {
    return (
        <motion.div 
            className="bg-[#111827]/85 border border-[#1E293B]/30 rounded-2xl p-5 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between h-56 shadow-lg text-slate-100"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="space-y-3.5">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-950/50 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-800/30">
                        <FaUser className="text-xs" />
                    </div>
                    <div className="overflow-hidden">
                        <h3 className="text-base font-bold text-white truncate leading-snug">{client.name}</h3>
                        <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Active Client</span>
                    </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 pl-1 font-medium">
                    {client.email && (
                        <div className="flex items-center space-x-2.5">
                            <FaEnvelope className="text-slate-400 text-[10px]" />
                            <span className="truncate">{client.email}</span>
                        </div>
                    )}
                    {client.phone && (
                        <div className="flex items-center space-x-2.5">
                            <FaPhoneAlt className="text-slate-400 text-[10px]" />
                            <span>{client.phone}</span>
                        </div>
                    )}
                    {client.address && (
                        <div className="flex items-center space-x-2.5">
                            <FaMapMarkerAlt className="text-slate-400 text-[10px] shrink-0" />
                            <span className="truncate">{client.address}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-4 border-t border-[#1E293B]/20 flex justify-end space-x-2">
                <button 
                    onClick={() => onEdit(client)}
                    className="flex items-center space-x-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg text-xs font-bold transition"
                >
                    <FaEdit className="text-[10px]" />
                    <span>Edit</span>
                </button>
                <button 
                    onClick={() => onDelete(client.id)}
                    className="flex items-center space-x-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg text-xs font-bold transition"
                >
                    <FaTrash className="text-[10px]" />
                    <span>Delete</span>
                </button>
            </div>
        </motion.div>
    );
};

export default ClientCard;
