import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
    variant = 'primary', 
    size = 'medium', 
    loading = false, 
    children, 
    className = '',
    ...props 
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-sans font-bold transition-all duration-200 focus:outline-none disabled:opacity-55 disabled:pointer-events-none select-none active:scale-[0.98]';
    
    const variantStyles = {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-600/15 hover:shadow-blue-600/25 hover:border-blue-400/25 border border-transparent focus:ring-2 focus:ring-blue-500/30',
        secondary: 'bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/10 hover:border-white/20 hover:text-white focus:ring-2 focus:ring-white/10',
        danger: 'bg-gradient-to-r from-red-600 to-red-550 hover:from-red-550 hover:to-red-600 text-white shadow-lg shadow-red-600/15 hover:shadow-red-600/25 border border-transparent focus:ring-2 focus:ring-red-500/30',
    };
    
    const sizeStyles = {
        small: 'px-3 py-1.5 text-xs rounded-lg',
        medium: 'px-5 py-2.5 text-sm rounded-xl',
        large: 'px-6 py-3.5 text-base rounded-2xl',
    };

    return (
        <motion.button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={loading}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            {...props}
        >
            {loading ? (
                <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </motion.button>
    );
};

export default Button;
