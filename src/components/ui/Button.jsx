import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    variant = 'primary',
    size = 'medium',
    loading = false,
    fullWidth = false,
    icon: Icon,
    children,
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-sans font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent disabled:opacity-55 disabled:pointer-events-none select-none active:scale-[0.98]';

    const variantStyles = {
        primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/15 hover:shadow-blue-600/25 hover:border-blue-400/25 border border-transparent focus-visible:ring-blue-500/40',
        secondary: 'bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/10 hover:border-white/20 hover:text-white focus-visible:ring-white/20',
        danger: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-600/15 hover:shadow-red-600/25 border border-transparent focus-visible:ring-red-500/40',
        ghost: 'bg-transparent hover:bg-white/[0.05] text-white/50 hover:text-white/80 border border-transparent focus-visible:ring-white/20',
    };

    const sizeStyles = {
        small: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
        medium: 'px-5 py-2.5 text-sm rounded-xl gap-2',
        large: 'px-6 py-3.5 text-base rounded-2xl gap-2.5',
    };

    return (
        <motion.button
            className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.medium} ${fullWidth ? 'w-full' : ''} ${className}`}
            disabled={loading || props.disabled}
            aria-busy={loading ? 'true' : undefined}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            {...props}
        >
            {loading ? (
                <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true"></span>
                    <span>Loading...</span>
                </div>
            ) : (
                <>
                    {Icon && <Icon className="text-sm flex-shrink-0" aria-hidden="true" />}
                    {children}
                </>
            )}
        </motion.button>
    );
};

export default Button;
