import React, { useState, useId } from 'react';

const FormInput = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    required = false,
    error = '',
    icon: Icon,
    trailingIcon,
    onTrailingIconClick,
    trailingIconAriaLabel,
    disabled = false,
    autoComplete,
    className = '',
    id: externalId,
    ...props
}) => {
    const generatedId = useId();
    const inputId = externalId || generatedId;
    const errorId = `${inputId}-error`;
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`space-y-1 ${className}`}>
            {/* Label */}
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-[9px] sm:text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1 select-none"
                >
                    {label}
                    {required && (
                        <span className="text-rose-400 ml-0.5" aria-hidden="true">*</span>
                    )}
                </label>
            )}

            {/* Input Wrapper */}
            <div className="relative group">
                {/* Leading Icon */}
                {Icon && (
                    <span
                        className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300 z-10 ${
                            isFocused ? 'text-blue-400' : error ? 'text-rose-400' : 'text-white'
                        }`}
                        aria-hidden="true"
                    >
                        <Icon className="text-xs" />
                    </span>
                )}

                {/* Input */}
                <input
                    id={inputId}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? errorId : undefined}
                    aria-required={required ? 'true' : undefined}
                    className={`
                        w-full h-10 sm:h-[2.75rem]
                        ${Icon ? 'pl-10' : 'pl-3.5'}
                        ${trailingIcon ? 'pr-10' : 'pr-3.5'}
                        bg-white border rounded-xl
                        text-slate-900 text-xs font-semibold
                        placeholder-slate-400
                        focus:outline-none focus:ring-2 focus:bg-white
                        transition-all duration-300
                        disabled:opacity-40 disabled:cursor-not-allowed
                        ${error
                            ? 'border-rose-300 focus:ring-rose-500/30 focus:border-rose-400'
                            : 'border-slate-200 focus:ring-blue-500/40 focus:border-blue-400 hover:border-slate-300'
                        }
                    `.trim()}
                    style={{ color: '#000000', backgroundColor: '#ffffff', willChange: 'box-shadow, border-color' }}
                    {...props}
                />

                {/* Trailing Icon (e.g., password toggle) */}
                {trailingIcon && (
                    <button
                        type="button"
                        onClick={onTrailingIconClick}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-white hover:text-slate-200 focus:text-blue-400 focus:outline-none transition-colors duration-200 z-10"
                        aria-label={trailingIconAriaLabel || 'Toggle'}
                        tabIndex={0}
                    >
                        <span className="text-base">{trailingIcon}</span>
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <p
                    id={errorId}
                    className="text-[11px] font-semibold text-rose-400 ml-1 flex items-center gap-1 animate-fade-in"
                    role="alert"
                >
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormInput;
