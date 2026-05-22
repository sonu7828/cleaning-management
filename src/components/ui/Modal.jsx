import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    {/* Backdrop */}
                    <motion.div 
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm" 
                        onClick={onClose} 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                    
                    {/* Modal Content Card */}
                    <motion.div 
                        className="bg-[#111827]/90 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-7 z-10 w-full max-w-lg relative overflow-hidden text-slate-100 shadow-glow-blue/20" 
                        initial={{ scale: 0.95, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-5">
                            {title ? (
                                <h2 className="text-xl font-extrabold text-white tracking-tight">{title}</h2>
                            ) : (
                                <div />
                            )}
                            <button 
                                onClick={onClose}
                                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition duration-150"
                                aria-label="Close modal"
                            >
                                <FaTimes className="text-base" />
                            </button>
                        </div>
                        
                        {/* Body */}
                        <div className="max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
