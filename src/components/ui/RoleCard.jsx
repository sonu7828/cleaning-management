import React from 'react';
import { motion } from 'framer-motion';

const RoleCard = ({
    id,
    title,
    icon,
    borderColor = 'border-blue-500/30',
    hoverBg = 'hover:bg-blue-500/10',
    hoverBorder = 'hover:border-blue-500/50',
    iconBg = 'bg-blue-500/10',
    iconColor = 'text-blue-400',
    shadowColor = 'shadow-blue-500/10',
    isLoading = false,
    isDisabled = false,
    onClick,
}) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isDisabled && onClick) onClick();
        }
    };

    return (
        <motion.button
            onClick={onClick}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            role="button"
            aria-label={`Login as ${title}`}
            aria-busy={isLoading ? 'true' : 'false'}
            className={`
                group relative flex flex-col items-center justify-center
                px-1.5 py-2 sm:p-3
                rounded-xl
                bg-white/[0.02]
                border ${borderColor}
                ${hoverBg} ${hoverBorder}
                text-center
                transition-all duration-300
                shadow-lg ${shadowColor}
                disabled:opacity-40 disabled:cursor-not-allowed
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent
                min-h-[4.2rem] sm:min-h-[5rem]
                select-none
            `.trim()}
            style={{ willChange: 'transform' }}
            whileHover={!isDisabled ? { scale: 1.04, y: -2 } : {}}
            whileTap={!isDisabled ? { scale: 0.96 } : {}}
        >
            {/* Icon Container */}
            <div
                className={`
                    w-6 h-6 sm:w-8 sm:h-8
                    rounded-lg
                    ${iconBg}
                    flex items-center justify-center
                    mx-auto mb-1
                    ${iconColor}
                    transition-colors duration-300
                    group-hover:scale-110
                `.trim()}
                aria-hidden="true"
            >
                {icon}
            </div>

            {/* Title */}
            <span className="text-[8px] sm:text-[9.5px] font-black text-white/80 uppercase tracking-wider block leading-tight whitespace-normal break-words w-full px-0.5">
                {title}
            </span>

            {/* Loading Spinner */}
            {isLoading && (
                <span
                    className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                />
            )}
        </motion.button>
    );
};

export default RoleCard;
