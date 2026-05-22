import React, { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaUserShield,
    FaUserCog,
    FaTools,
    FaTruck,
    FaFileInvoiceDollar,
    FaBuilding,
    FaArrowRight,
    FaEnvelope,
    FaLock,
    FaHome,
    FaEye,
    FaEyeSlash,
} from 'react-icons/fa';
import { FiShield, FiCpu } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';
import FormInput from '../components/ui/FormInput';
import RoleCard from '../components/ui/RoleCard';

/* ──────────────────────────────────────────────
   Validation Helpers
   ────────────────────────────────────────────── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address';
    return '';
};

const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
};

/* ──────────────────────────────────────────────
   Roles Configuration
   ────────────────────────────────────────────── */
const ROLES = [
    {
        id: 'superadmin',
        title: 'Super Admin',
        borderColor: 'border-purple-500/30',
        hoverBg: 'hover:bg-purple-500/10',
        hoverBorder: 'hover:border-purple-500/50',
        iconBg: 'bg-purple-500/10',
        iconColor: 'text-purple-400',
        shadowColor: 'shadow-purple-500/10',
        icon: <FaUserShield className="text-xs" />,
    },
    {
        id: 'admin',
        title: 'Admin / Agency',
        borderColor: 'border-blue-500/30',
        hoverBg: 'hover:bg-blue-500/10',
        hoverBorder: 'hover:border-blue-500/50',
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        shadowColor: 'shadow-blue-500/10',
        icon: <FaUserCog className="text-xs" />,
    },
    {
        id: 'technician',
        title: 'Technician',
        borderColor: 'border-amber-500/30',
        hoverBg: 'hover:bg-amber-500/10',
        hoverBorder: 'hover:border-amber-500/50',
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-400',
        shadowColor: 'shadow-amber-500/10',
        icon: <FaTools className="text-xs" />,
    },
    {
        id: 'driver',
        title: 'Driver Portal',
        borderColor: 'border-emerald-500/30',
        hoverBg: 'hover:bg-emerald-500/10',
        hoverBorder: 'hover:border-emerald-500/50',
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-400',
        shadowColor: 'shadow-emerald-500/10',
        icon: <FaTruck className="text-xs" />,
    },
    {
        id: 'accounts',
        title: 'Accounts Dept',
        borderColor: 'border-rose-500/30',
        hoverBg: 'hover:bg-rose-500/10',
        hoverBorder: 'hover:border-rose-500/50',
        iconBg: 'bg-rose-500/10',
        iconColor: 'text-rose-400',
        shadowColor: 'shadow-rose-500/10',
        icon: <FaFileInvoiceDollar className="text-xs" />,
    },
    {
        id: 'client',
        title: 'Client Portal',
        borderColor: 'border-cyan-500/30',
        hoverBg: 'hover:bg-cyan-500/10',
        hoverBorder: 'hover:border-cyan-500/50',
        iconBg: 'bg-cyan-500/10',
        iconColor: 'text-cyan-400',
        shadowColor: 'shadow-cyan-500/10',
        icon: <FaBuilding className="text-xs" />,
    },
];

/* ──────────────────────────────────────────────
   Framer Motion Variants
   ────────────────────────────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
};

/* ──────────────────────────────────────────────
   LoginPage Component
   ────────────────────────────────────────────── */
const LoginPage = () => {
    const { loginAsRole, login, getRoleDashboardPath } = useContext(AppContext);
    const navigate = useNavigate();

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loadingRole, setLoadingRole] = useState(null);

    // Validation State
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({ email: false, password: false });
    const [formShake, setFormShake] = useState(false);

    /* ── Validation Handlers ── */
    const handleEmailBlur = useCallback(() => {
        setTouched((prev) => ({ ...prev, email: true }));
        setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    }, [email]);

    const handlePasswordBlur = useCallback(() => {
        setTouched((prev) => ({ ...prev, password: true }));
        setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }, [password]);

    const handleEmailChange = useCallback((e) => {
        const val = e.target.value;
        setEmail(val);
        if (touched.email) {
            setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
        }
    }, [touched.email]);

    const handlePasswordChange = useCallback((e) => {
        const val = e.target.value;
        setPassword(val);
        if (touched.password) {
            setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
        }
    }, [touched.password]);

    /* ── Quick Login (Role Cards) ── */
    const handleQuickLogin = useCallback((roleId) => {
        setLoadingRole(roleId);
        setTimeout(() => {
            loginAsRole(roleId);
            setLoadingRole(null);
            const path = getRoleDashboardPath(roleId);
            navigate(path);
        }, 800);
    }, [loginAsRole, getRoleDashboardPath, navigate]);

    /* ── Form Submit ── */
    const handleFormSubmit = useCallback((e) => {
        e.preventDefault();

        // Run all validations
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setErrors({ email: emailError, password: passwordError });
        setTouched({ email: true, password: true });

        if (emailError || passwordError) {
            setFormShake(true);
            setTimeout(() => setFormShake(false), 600);
            return;
        }

        setLoadingRole('form');
        setTimeout(() => {
            const result = login(email, password);
            setLoadingRole(null);
            if (result) {
                navigate('/dashboard');
            }
        }, 800);
    }, [email, password, login, navigate]);

    /* ── Derived ── */
    const isAnyLoading = loadingRole !== null;

    return (
        <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
            {/* ── Grid Background ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, rgba(128,128,128,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.03) 1px, transparent 1px)',
                    backgroundSize: '4rem 4rem',
                }}
                aria-hidden="true"
            />

            {/* ── Decorative Orbs (GPU-accelerated, reduced blur) ── */}
            <div
                className="login-orb absolute rounded-full animate-pulse"
                style={{
                    top: '-10%',
                    left: '-10%',
                    width: '40%',
                    height: '40%',
                    background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)',
                    filter: 'blur(64px)',
                }}
                aria-hidden="true"
            />
            <div
                className="login-orb absolute rounded-full animate-pulse"
                style={{
                    bottom: '-10%',
                    right: '-10%',
                    width: '40%',
                    height: '40%',
                    background: 'radial-gradient(circle, rgba(30,58,138,0.15) 0%, transparent 70%)',
                    filter: 'blur(64px)',
                }}
                aria-hidden="true"
            />

            {/* ── Main Container ── */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl 2xl:max-w-2xl"
            >
                {/* ── Logo & Heading ── */}
                <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10">
                    <motion.div
                        className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl shadow-2xl shadow-indigo-600/20 mb-4 sm:mb-6 cursor-pointer border border-white/10"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        role="button"
                        aria-label="Go to home page"
                        tabIndex={0}
                    >
                        <span className="text-xl sm:text-2xl font-black text-white select-none">C</span>
                    </motion.div>

                    <h1
                        className="font-black text-white tracking-tight mb-2"
                        style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
                    >
                        Welcome Back
                    </h1>
                    <p className="text-slate-400 font-medium text-sm sm:text-base max-w-sm mx-auto">
                        Enter custom credentials or select a quick access desk.
                    </p>
                </motion.div>

                {/* ── Glass Card ── */}
                <motion.div
                    variants={itemVariants}
                    className="contain-content bg-slate-900/40 backdrop-blur-xl p-5 sm:p-7 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-indigo-500/10 shadow-login-card space-y-5 sm:space-y-6 relative overflow-hidden"
                >
                    {/* Card Top Glow */}
                    <div
                        className="absolute top-0 left-1/2 w-3/5 h-24 pointer-events-none"
                        style={{
                            transform: 'translateX(-50%)',
                            background: 'radial-gradient(ellipse, rgba(79,70,229,0.08) 0%, transparent 70%)',
                            filter: 'blur(30px)',
                        }}
                        aria-hidden="true"
                    />

                    {/* ── Login Form ── */}
                    <form
                        onSubmit={handleFormSubmit}
                        className={`relative z-10 space-y-4 sm:space-y-5 ${formShake ? 'animate-shake' : ''}`}
                        noValidate
                    >
                        {/* Email Input */}
                        <FormInput
                            label="Terminal Address"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            placeholder="operations@agency.com"
                            required
                            autoComplete="email"
                            icon={FaEnvelope}
                            error={touched.email ? errors.email : ''}
                            id="login-email"
                        />

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label
                                    htmlFor="login-password"
                                    className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] select-none"
                                >
                                    Security Key
                                    <span className="text-rose-400 ml-0.5" aria-hidden="true">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => navigate('/forgot-password')}
                                    className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded transition-colors"
                                >
                                    Lost Key?
                                </button>
                            </div>
                            <div className="relative group">
                                <span
                                    className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${
                                        errors.password && touched.password ? 'text-rose-400/60' : 'text-white/25 group-focus-within:text-blue-400'
                                    }`}
                                    aria-hidden="true"
                                >
                                    <FaLock className="text-sm" />
                                </span>
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onBlur={handlePasswordBlur}
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    aria-invalid={errors.password && touched.password ? 'true' : 'false'}
                                    aria-describedby={errors.password && touched.password ? 'login-password-error' : undefined}
                                    aria-required="true"
                                    className={`
                                        w-full pl-11 pr-11 h-12 sm:h-[3.25rem]
                                        bg-white/[0.03] border rounded-2xl
                                        text-white text-sm font-medium
                                        placeholder-white/20
                                        focus:outline-none focus:ring-2 focus:bg-white/[0.05]
                                        transition-all duration-300
                                        ${errors.password && touched.password
                                            ? 'border-rose-500/40 focus:ring-rose-500/30 focus:border-rose-500/40'
                                            : 'border-white/10 focus:ring-blue-500/40 focus:border-blue-500/40 hover:border-white/15'
                                        }
                                    `.trim()}
                                    style={{ willChange: 'box-shadow, border-color' }}
                                />
                                {/* Password Visibility Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 focus:text-blue-400 focus:outline-none transition-colors duration-200"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    tabIndex={0}
                                >
                                    {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                                </button>
                            </div>
                            {/* Password Error */}
                            {touched.password && errors.password && (
                                <p
                                    id="login-password-error"
                                    className="text-[11px] font-semibold text-rose-400 ml-1 flex items-center gap-1 animate-fade-in"
                                    role="alert"
                                >
                                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isAnyLoading}
                            className="w-full h-12 sm:h-14 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/20 hover:from-indigo-500 hover:to-blue-500 hover:shadow-indigo-500/30 active:scale-[0.98] transition-all text-sm flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                            style={{ willChange: 'transform, box-shadow' }}
                            whileHover={!isAnyLoading ? { scale: 1.01 } : {}}
                            whileTap={!isAnyLoading ? { scale: 0.98 } : {}}
                            aria-busy={loadingRole === 'form' ? 'true' : 'false'}
                        >
                            {loadingRole === 'form' ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <span>Access Dashboard</span>
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" aria-hidden="true" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* ── Divider ── */}
                    <div className="relative z-10 border-t border-white/5" role="separator" />

                    {/* ── Quick Access Desks Grid ── */}
                    <div className="relative z-10" role="group" aria-labelledby="quick-access-label">
                        <label
                            id="quick-access-label"
                            className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1 block mb-3 select-none"
                        >
                            Quick Access Desks
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                            {ROLES.map((role) => (
                                <RoleCard
                                    key={role.id}
                                    id={role.id}
                                    title={role.title}
                                    icon={role.icon}
                                    borderColor={role.borderColor}
                                    hoverBg={role.hoverBg}
                                    hoverBorder={role.hoverBorder}
                                    iconBg={role.iconBg}
                                    iconColor={role.iconColor}
                                    shadowColor={role.shadowColor}
                                    isLoading={loadingRole === role.id}
                                    isDisabled={isAnyLoading}
                                    onClick={() => handleQuickLogin(role.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── Home Link ── */}
                    <div className="relative z-10 flex justify-center pt-1 sm:pt-2">
                        <motion.button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-1.5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] hover:text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Go to home page"
                        >
                            <FaHome className="text-[10px]" aria-hidden="true" />
                            Home
                        </motion.button>
                    </div>
                </motion.div>

                {/* ── Bottom Security Badges ── */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
                >
                    <div className="flex items-center space-x-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                        <FiShield className="text-indigo-400" aria-hidden="true" />
                        <span>256-bit AES</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                        <FiCpu className="text-blue-400" aria-hidden="true" />
                        <span>Edge Nodes Active</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;