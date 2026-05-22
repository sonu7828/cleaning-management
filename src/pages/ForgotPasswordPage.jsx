import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaKey, FaClock, FaCheckCircle, FaUndo } from 'react-icons/fa';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [timer, setTimer] = useState(59);

    const startTimer = () => {
        setTimer(59);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSendOTP = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
            startTimer();
        }, 1000);
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Auto focus next input
        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 1000);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(4); // Success step
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>

            {/* Container */}
            <div className="w-full max-w-md z-10 space-y-8">
                {/* Branding Header */}
                <div className="text-center">
                    <div 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 font-black text-white text-2xl shadow-xl shadow-blue-500/25 mb-4 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        C
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Recover Desk Password
                    </h2>
                    <p className="text-sm text-slate-400 mt-2">
                        Verify your credentials to reset secure account login.
                    </p>
                </div>

                <div className="bg-[#0b0f24]/75 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl shadow-black/50 min-h-[320px] flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.form
                                key="step1"
                                onSubmit={handleSendOTP}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><FaKey className="text-blue-400 text-sm" /> Forgot Password?</h3>
                                    <p className="text-xs text-slate-400">Enter your email and we'll send a 6-digit verification code to reset your password.</p>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-400">Email Address</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                            <FaEnvelope className="text-xs" />
                                        </span>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="operations@agency.com"
                                            className="w-full pl-9 pr-3 py-2.5 bg-[#020617]/60 border border-white/5 rounded-xl text-white text-xs font-medium placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25 active:scale-[0.98] transition-all text-xs flex justify-center items-center"
                                >
                                    {loading ? (
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    ) : 'Send Reset Code'}
                                </button>
                            </motion.form>
                        )}

                        {step === 2 && (
                            <motion.form
                                key="step2"
                                onSubmit={handleVerifyOTP}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><FaClock className="text-blue-400 text-sm" /> Enter OTP Code</h3>
                                    <p className="text-xs text-slate-400">We've sent a 6-digit confirmation key to <span className="text-blue-400 font-semibold">{email}</span>.</p>
                                </div>

                                <div className="flex justify-between space-x-2">
                                    {otp.map((data, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            name="otp"
                                            maxLength="1"
                                            value={data}
                                            onChange={(e) => handleOtpChange(e.target, index)}
                                            onFocus={(e) => e.target.select()}
                                            className="w-12 h-12 text-center bg-[#020617]/60 border border-white/10 rounded-xl text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500 flex items-center gap-1.5">
                                        <FaClock className="text-[10px]" /> 
                                        {timer > 0 ? `Resend in ${timer}s` : 'Code expired'}
                                    </span>
                                    <button 
                                        type="button" 
                                        onClick={startTimer}
                                        disabled={timer > 0}
                                        className="text-blue-400 hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer disabled:opacity-40 disabled:no-underline"
                                    >
                                        Resend Code
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || otp.join('').length < 6}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25 active:scale-[0.98] transition-all text-xs flex justify-center items-center"
                                >
                                    {loading ? (
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    ) : 'Verify Code'}
                                </button>
                            </motion.form>
                        )}

                        {step === 3 && (
                            <motion.form
                                key="step3"
                                onSubmit={handleResetPassword}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-5"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><FaLock className="text-blue-400 text-sm" /> Reset Password</h3>
                                    <p className="text-xs text-slate-400">Establish a new, strong password credentials for your security desk.</p>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-400">New Password</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                            <FaLock className="text-xs" />
                                        </span>
                                        <input
                                            type="password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-9 pr-3 py-2.5 bg-[#020617]/60 border border-white/5 rounded-xl text-white text-xs font-medium placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-400">Confirm Password</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                            <FaLock className="text-xs" />
                                        </span>
                                        <input
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-9 pr-3 py-2.5 bg-[#020617]/60 border border-white/5 rounded-xl text-white text-xs font-medium placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25 active:scale-[0.98] transition-all text-xs flex justify-center items-center"
                                >
                                    {loading ? (
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    ) : 'Save New Password'}
                                </button>
                            </motion.form>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6 text-center py-4"
                            >
                                <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full mb-1">
                                    <FaCheckCircle className="text-4xl" />
                                </div>
                                <h3 className="text-xl font-black text-white">Password Changed!</h3>
                                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                                    Your password has been reset successfully. You may now return to the login panel.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25 active:scale-[0.98] transition-all text-xs"
                                >
                                    Go to Login Panel
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="text-center flex justify-center items-center space-x-2 text-xs">
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 bg-transparent border-none p-0 cursor-pointer"
                    >
                        <FaUndo className="text-[10px]" /> Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
