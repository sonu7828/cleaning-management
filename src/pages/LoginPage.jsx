import React, { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaUserShield,
    FaUsers,
    FaCalendarAlt,
    FaUserGraduate,
    FaFileInvoiceDollar,
    FaTruck,
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
        id: 'admin',
        title: 'Admin / Owner',
        borderColor: 'border-purple-500/30',
        hoverBg: 'hover:bg-purple-500/10',
        hoverBorder: 'hover:border-purple-500/50',
        iconBg: 'bg-purple-500/10',
        iconColor: 'text-purple-400',
        shadowColor: 'shadow-purple-500/10',
        icon: <FaUserShield className="text-xs" />,
    },
    {
        id: 'sales',
        title: 'Sales Rep',
        borderColor: 'border-blue-500/30',
        hoverBg: 'hover:bg-blue-500/10',
        hoverBorder: 'hover:border-blue-500/50',
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        shadowColor: 'shadow-blue-500/10',
        icon: <FaUsers className="text-xs" />,
    },
    {
        id: 'dispatch',
        title: 'Dispatch Team',
        borderColor: 'border-emerald-500/30',
        hoverBg: 'hover:bg-emerald-500/10',
        hoverBorder: 'hover:border-emerald-500/50',
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-400',
        shadowColor: 'shadow-emerald-500/10',
        icon: <FaCalendarAlt className="text-xs" />,
    },
    {
        id: 'technician',
        title: 'Cleaning Tech',
        borderColor: 'border-amber-500/30',
        hoverBg: 'hover:bg-amber-500/10',
        hoverBorder: 'hover:border-amber-500/50',
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-400',
        shadowColor: 'shadow-amber-500/10',
        icon: <FaUserGraduate className="text-xs" />,
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
        id: 'driver',
        title: 'Driver Logistics',
        borderColor: 'border-indigo-500/30',
        hoverBg: 'hover:bg-indigo-500/10',
        hoverBorder: 'hover:border-indigo-500/50',
        iconBg: 'bg-indigo-500/10',
        iconColor: 'text-indigo-400',
        shadowColor: 'shadow-indigo-500/10',
        icon: <FaTruck className="text-xs" />,
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
    const [email, setEmail] = useState('admin@teamenviro.ae');
    const [password, setPassword] = useState('12345678');
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

            {/* ── Decorative Orbs (Subtle white glows on blue bg) ── */}
            <div
                className="login-orb absolute rounded-full pointer-events-none"
                style={{
                    top: '-10%',
                    left: '-10%',
                    width: '45%',
                    height: '45%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                    filter: 'blur(64px)',
                }}
                aria-hidden="true"
            />
            <div
                className="login-orb absolute rounded-full pointer-events-none"
                style={{
                    bottom: '-10%',
                    right: '-10%',
                    width: '45%',
                    height: '45%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                    filter: 'blur(64px)',
                }}
                aria-hidden="true"
            />

            {/* ── Main Container ── */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl 2xl:max-w-2xl mt-1 sm:mt-0 -translate-y-6 sm:-translate-y-20"
            >
                {/* ── Logo & Heading ── */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="inline-flex items-center justify-center cursor-pointer shrink-0" onClick={() => navigate('/')}>
                        <img src="/images/team-enviro-logo.png" alt="Team Enviro Logo" className="h-12 sm:h-16 object-contain drop-shadow-lg" />
                    </div>

                    <div className="text-center sm:text-left">
                        <h1 className="font-black text-white tracking-tight mb-0.5 text-sm sm:text-lg md:text-xl lg:text-2xl leading-none">
                            OPERATIONS & CRM SYSTEM
                        </h1>
                        <p className="text-[8px] sm:text-xs text-white font-extrabold uppercase tracking-widest">
                            🧹 TEAM ENVIRO CLEANING SERVICES
                        </p>
                    </div>
                </motion.div>

                {/* ── Glass Card ── */}
                <motion.div
                    variants={itemVariants}
                    className="login-card-premium contain-content pt-4 pb-5 px-4 sm:p-7 md:p-9 lg:p-10 space-y-4 sm:space-y-5 relative overflow-hidden"
                >
                    {/* Card Top Glow */}
                    <div
                        className="absolute top-0 left-1/2 w-3/5 h-24 pointer-events-none"
                        style={{
                            transform: 'translateX(-50%)',
                            background: 'radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)',
                            filter: 'blur(30px)',
                        }}
                        aria-hidden="true"
                    />

                    {/* ── Login Form ── */}
                    <form
                        onSubmit={handleFormSubmit}
                        className={`relative z-10 space-y-3.5 sm:space-y-4 ${formShake ? 'animate-shake' : ''}`}
                        noValidate
                    >
                        {/* Email Input */}
                        <FormInput
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            placeholder="admin@teamenviro.ae"
                            required
                            autoComplete="email"
                            icon={FaEnvelope}
                            error={touched.email ? errors.email : ''}
                            id="login-email"
                        />

                        {/* Password Input */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label
                                    htmlFor="login-password"
                                    className="text-[10px] sm:text-xs font-bold uppercase tracking-wider select-none login-label-white"
                                >
                                    Password
                                    <span className="text-rose-400 ml-0.5" aria-hidden="true">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => navigate('/forgot-password')}
                                    className="text-xs font-semibold hover:text-slate-200 focus:outline-none rounded transition-colors login-label-white"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="relative group">
                                <span
                                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300 z-10 text-slate-400 group-focus-within:text-blue-500"
                                    aria-hidden="true"
                                >
                                    <FaLock className="text-xs" />
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
                                        w-full pl-10 pr-10 h-10 sm:h-[2.75rem]
                                        bg-white border rounded-xl
                                        text-slate-900 text-xs font-semibold
                                        placeholder-slate-400
                                        focus:outline-none focus:ring-2 focus:bg-white
                                        transition-all duration-300
                                        ${errors.password && touched.password
                                            ? 'border-rose-500/40 focus:ring-rose-500/30 focus:border-rose-500/40'
                                            : 'border-slate-200 focus:ring-blue-500/40 focus:border-blue-500 hover:border-slate-350'
                                        }
                                    `.trim()}
                                    style={{ color: '#000000', backgroundColor: '#ffffff', willChange: 'box-shadow, border-color' }}
                                />
                                {/* Password Visibility Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-650 focus:text-blue-500 focus:outline-none transition-colors duration-200 z-10"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    tabIndex={0}
                                >
                                    {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                                </button>
                            </div>
                            {/* Password Error */}
                            {touched.password && errors.password && (
                                <p
                                    id="login-password-error"
                                    className="text-[10px] font-semibold text-rose-400 ml-1 flex items-center gap-1 animate-fade-in"
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
                            className="w-full h-10 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-blue-500 hover:shadow-blue-500/30 active:scale-[0.98] transition-all text-xs sm:text-xs flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                            style={{ willChange: 'transform, box-shadow' }}
                            whileHover={!isAnyLoading ? { scale: 1.01 } : {}}
                            whileTap={!isAnyLoading ? { scale: 0.98 } : {}}
                            aria-busy={loadingRole === 'form' ? 'true' : 'false'}
                        >
                            {loadingRole === 'form' ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
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
                            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider ml-1 block mb-2 select-none login-label-white"
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
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded transition-colors login-label-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Go to home page"
                        >
                            <FaHome className="text-[10px] login-label-white" aria-hidden="true" />
                            Home
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;