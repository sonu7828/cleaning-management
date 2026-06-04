import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaUsers, FaFileInvoiceDollar, FaCalendarCheck, FaChartLine, FaCheckCircle,
    FaBars, FaTimes, FaArrowRight, FaLinkedin, FaEnvelope, FaPhone,
    FaTools, FaTruck, FaMobileAlt, FaCloudUploadAlt, FaShieldAlt, FaBuilding,
    FaClipboardList, FaBell, FaFileContract, FaHandshake, FaSearchDollar,
    FaBroom, FaTimesCircle, FaChevronRight, FaPlay, FaWhatsapp,
    FaEnvelopeOpenText, FaChartBar, FaEdit, FaPaperPlane, FaEye, FaCogs,
    FaRobot, FaChartPie, FaMapMarkedAlt, FaClock, FaLock,
    FaSyncAlt, FaCreditCard, FaLeaf
} from 'react-icons/fa';
import {
    navLinks, workflowSteps, moduleCards, roleCards,
    problemsSolved, trustBadges, industryCards, dashboardMetrics,
    emailApprovalSteps, futureRoadmap, mockCrmLogs, mockScheduleTasks,
    communicationWorkflows, mockFinanceInvoices, mockCustomerProfile,
    mockOperationalReports, mockSettingsToggles, servicesWeProvide
} from '../constants/landingData';

const iconLookup = {
    FaSearchDollar: <FaSearchDollar />, FaUsers: <FaUsers />, FaFileContract: <FaFileContract />,
    FaHandshake: <FaHandshake />, FaCalendarCheck: <FaCalendarCheck />, FaTools: <FaTools />,
    FaMobileAlt: <FaMobileAlt />, FaFileInvoiceDollar: <FaFileInvoiceDollar />,
    FaChartLine: <FaChartLine />, FaBell: <FaBell />, FaCloudUploadAlt: <FaCloudUploadAlt />,
    FaShieldAlt: <FaShieldAlt />, FaClipboardList: <FaClipboardList />,
    FaBuilding: <FaBuilding />, FaBroom: <FaBroom />, FaEnvelopeOpenText: <FaEnvelopeOpenText />,
    FaChartBar: <FaChartBar />, FaEdit: <FaEdit />, FaPaperPlane: <FaPaperPlane />,
    FaEye: <FaEye />, FaCogs: <FaCogs />, FaRobot: <FaRobot />, FaChartPie: <FaChartPie />,
    FaMapMarkedAlt: <FaMapMarkedAlt />, FaFolderOpen: <FaCloudUploadAlt />, FaUserCheck: <FaUsers />,
    FaClock: <FaClock />
};

const colorMap = {
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400' },
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400' },
    teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/20', text: 'text-teal-400' },
    slate: { bg: 'bg-slate-500/10', border: 'border-slate-500/20', text: 'text-slate-400' },
};

const lightColorMap = {
    cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
    teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700' },
    slate: { bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-700' },
};

const SectionBadge = ({ text }) => (
    <div className="landing-section-badge inline-flex items-center space-x-2 text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider">
        <span>{text}</span>
    </div>
);

const SectionHeading = ({ title, subtitle, light = true }) => (
    <div className="text-center mb-10 space-y-3">
        <h2 className={`text-2xl md:text-4xl font-black tracking-tight ${light ? 'text-slate-900' : 'text-white'}`}>{title}</h2>
        {subtitle && <p className={`text-sm md:text-base max-w-2xl mx-auto ${light ? 'text-slate-500' : 'text-blue-100'}`}>{subtitle}</p>}
    </div>
);

const getStatusBadgeStyle = (status) => {
    switch (status) {
        case 'In Progress':
            return 'bg-blue-50 border-blue-200 text-blue-700';
        case 'Assigned':
            return 'bg-amber-50 border-amber-200 text-amber-700';
        case 'Pending':
        default:
            return 'bg-slate-100 border-slate-200 text-slate-600';
    }
};

const getTrendColorClass = (colorClass) => {
    if (colorClass.includes('emerald') || colorClass.includes('success')) return 'text-emerald-700';
    if (colorClass.includes('blue') || colorClass.includes('info')) return 'text-blue-700';
    if (colorClass.includes('rose') || colorClass.includes('danger')) return 'text-rose-700';
    return 'text-slate-650';
};

const LandingPage = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const row1Steps = workflowSteps.slice(0, 5);
    const row2Steps = workflowSteps.slice(5, 9);

    return (
        <div className="min-h-screen bg-[#EBF2F6] text-slate-900 font-sans scroll-smooth overflow-x-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

            {/* ═══════════ FLOATING NAVBAR ═══════════ */}
            <header className="fixed top-4 left-4 right-4 z-50 max-w-[1600px] mx-auto">
                <div className="bg-[#0B1120]/90 backdrop-blur-2xl border border-white/10 rounded-2xl px-5 sm:px-8 xl:pl-6 xl:pr-4 py-3.5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                    {/* Logo on the left */}
                    <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => navigate('/')}>
                        <img src="/images/team-enviro-logo.png" alt="Team Enviro Logo" className="h-12 object-contain drop-shadow-lg" />
                    </div>

                    {/* Navigation items & Buttons grouped on the far right */}
                    <div className="hidden xl:flex items-center xl:space-x-4 2xl:space-x-6 flex-grow justify-end">
                        <nav className="flex items-center xl:space-x-2 2xl:space-x-3 text-[14px] xl:text-[14px] 2xl:text-[15px] font-semibold text-slate-350">
                            {navLinks.map(l => (
                                <a key={l.href} href={l.href} className="landing-nav-link xl:px-2.5 2xl:px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap">
                                    {l.label}
                                </a>
                            ))}
                        </nav>
                        <div className="flex items-center xl:space-x-3 2xl:space-x-4 shrink-0">
                            <a href="#contact" className="landing-btn-primary xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5 text-xs xl:text-xs 2xl:text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 flex items-center space-x-2 whitespace-nowrap">
                                <span>Request Site Inspection</span>
                                <FaArrowRight className="text-[10px]" />
                            </a>
                            <button onClick={() => navigate('/login')} className="landing-btn-secondary xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5 text-xs xl:text-xs 2xl:text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 flex items-center space-x-2 group whitespace-nowrap">
                                <FaLock className="text-white transition-colors" />
                                <span>Portal Login</span>
                            </button>
                        </div>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="xl:hidden text-slate-300 hover:text-white p-1 rounded-lg" aria-label="Toggle menu">
                        {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>
                </div>
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.2 }}
                            className="absolute top-20 left-0 right-0 p-5 bg-[#0B1120]/95 border border-white/[0.08] backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col space-y-4 xl:hidden">
                            {navLinks.map(l => (
                                <a key={l.href} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="landing-nav-link py-2 text-sm font-semibold border-b border-slate-200">
                                    {l.label}
                                </a>
                            ))}
                            <div className="pt-2 flex flex-col space-y-3">
                                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} className="landing-btn-secondary flex justify-center items-center w-full py-2.5 text-center text-sm font-bold rounded-xl transition">
                                    <FaLock className="text-xs mr-2" /> Portal Login
                                </button>
                                <a href="#workflow" onClick={() => setIsMobileMenuOpen(false)} className="landing-nav-link block w-full py-2.5 text-center text-sm font-bold rounded-xl border border-slate-200">
                                    How We Work
                                </a>
                                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="landing-btn-primary block w-full py-2.5 text-center text-sm font-bold rounded-xl">
                                    Request Site Inspection
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ═══════════ HERO SECTION ═══════════ */}
            <section className="pt-32 pb-10 relative overflow-hidden px-4 sm:px-6 text-center bg-[#020617]">
                <div className="max-w-6xl mx-auto relative z-10 space-y-4">
                    <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="landing-section-badge inline-flex items-center space-x-2 text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider shadow-sm">
                        <span>🏢 Cleaning Operations Management System</span>
                    </motion.div>
                    <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] text-white"
                        animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                        Professional Commercial & Residential Cleaning Services
                    </motion.h1>
                    <motion.p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed"
                        animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                        Providing top-tier facility management, deep cleaning, and automated AMC scheduling. Backed by our paperless operational workflow system for maximum reliability.
                    </motion.p>
                    <motion.div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
                        animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <a href="#contact"
                            className="hero-btn-primary w-full sm:w-auto py-3.5 px-8 font-bold rounded-xl active:scale-[0.98] flex items-center justify-center space-x-2">
                            <span>Request Site Inspection</span><FaArrowRight className="text-xs" />
                        </a>
                        <a href="#workflow" className="hero-btn-secondary w-full sm:w-auto py-3.5 px-8 font-semibold rounded-xl active:scale-[0.98] text-center flex items-center justify-center space-x-2">
                            <FaPlay className="text-xs mr-1.5" /><span>How We Work</span>
                        </a>
                    </motion.div>
                    {/* Mini operational indicators */}
                    <motion.div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-100 font-semibold"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        {['CRM & Leads', 'Quotations', 'AMC Contracts', 'Scheduling', 'Mobile Ops', 'Invoicing'].map(t => (
                            <span key={t} className="flex items-center space-x-1.5"><FaCheckCircle className="text-emerald-300 text-[10px]" /><span>{t}</span></span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ DASHBOARD PREVIEW ═══════════ */}
            <section className="pb-16 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span className="text-[10px] sm:text-xs text-slate-600 font-mono font-bold pl-4 hidden sm:block">TEAM ENVIRO OPERATIONS CENTER</span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full font-bold border border-emerald-200">Today's Operational Overview</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 relative z-0">
                        {dashboardMetrics.map((m, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{m.label}</span>
                                <h3 className="text-2xl sm:text-3xl font-black mt-1.5 text-slate-900">{m.value}</h3>
                                <span className="text-emerald-700 text-[11px] font-bold mt-1 inline-block">{m.change}</span>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl h-48 flex flex-col items-center justify-center p-4 text-center relative z-0 shadow-sm">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
                            <FaChartLine className="text-blue-600 text-2xl animate-pulse" />
                        </div>
                        <span className="text-slate-900 font-bold text-sm">Cleaning Operations Command Center</span>
                        <p className="text-slate-600 text-xs mt-1 max-w-sm">Track AMC contracts, technician operations, scheduling and invoicing from one centralized operational dashboard.</p>
                    </div>
                </div>
            </section>

            {/* ═══════════ BUSINESS WORKFLOW TIMELINE ═══════════ */}
            <section id="workflow" className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Operational Workflow" /></div>
                    <SectionHeading title="Complete Business Lifecycle" subtitle="From the first customer inquiry to AMC renewal — every step of your cleaning operations, digitized and automated." />
                    <div className="relative space-y-4 lg:space-y-6 z-10">
                        {/* Row 1: Steps 1-5 */}
                        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-6">
                            {row1Steps.map((step, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                    style={{ zIndex: 20 - i }}
                                    className="w-full sm:w-[45%] lg:w-[230px] shrink-0 bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group relative shadow-sm">
                                    <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-100 group-hover:border-blue-200 transition">
                                        <span className="text-blue-600 text-sm flex items-center justify-center">{iconLookup[step.icon]}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step {i + 1}</span>
                                    <h4 className="text-sm font-bold text-slate-900 mt-1">{step.title}</h4>
                                    <p className="text-slate-600 text-[11px] mt-1 leading-snug">{step.desc}</p>
                                    {i < 4 && (
                                        <div 
                                            style={{ right: '-24px', zIndex: 30 }}
                                            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm group-hover:border-blue-300 group-hover:scale-110 transition-all duration-300 pointer-events-none"
                                        >
                                            <FaChevronRight className="text-blue-600 text-[9px]" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Row 2: Steps 6-9 */}
                        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-6">
                            {row2Steps.map((step, idx) => {
                                const i = idx + 5;
                                return (
                                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                        style={{ zIndex: 20 - i }}
                                        className="w-full sm:w-[45%] lg:w-[230px] shrink-0 bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group relative shadow-sm">
                                        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-100 group-hover:border-blue-200 transition">
                                            <span className="text-blue-600 text-sm flex items-center justify-center">{iconLookup[step.icon]}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step {i + 1}</span>
                                        <h4 className="text-sm font-bold text-slate-900 mt-1">{step.title}</h4>
                                        <p className="text-slate-600 text-[11px] mt-1 leading-snug">{step.desc}</p>
                                        {idx < 3 && (
                                            <div 
                                                style={{ right: '-24px', zIndex: 30 }}
                                                className="hidden lg:flex absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm group-hover:border-blue-300 group-hover:scale-110 transition-all duration-300 pointer-events-none"
                                            >
                                                <FaChevronRight className="text-blue-600 text-[9px]" />
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ WHO IS THIS FOR ═══════════ */}
            <section className="py-16 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Built For Your Industry" /></div>
                    <SectionHeading title="Who This System Is For" subtitle="Purpose-built for cleaning companies and facility service providers across the UAE and beyond." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {industryCards.map((card, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                className="bg-white border border-slate-200 hover:border-cyan-300 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group shadow-sm">
                                <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-4 text-cyan-600 text-xl group-hover:bg-cyan-100 group-hover:border-cyan-200 transition">
                                    {iconLookup[card.icon]}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                                <p className="text-slate-600 text-sm">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ OPERATIONAL UI PREVIEWS (CRM & SCHEDULER) ═══════════ */}
            <section id="scheduling" className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Live Operations Interface" /></div>
                    <SectionHeading title="Centralized Operations Dashboard" subtitle="Stop using Excel and WhatsApp. Manage your entire CRM pipeline and daily technician dispatching from one real-time interface." />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* CRM Mockup */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
                            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <FaUsers className="text-cyan-600 text-lg" />
                                    <span className="font-bold text-slate-900 text-sm">Customer Activity Log</span>
                                </div>
                                <span className="text-[10px] bg-cyan-50 text-cyan-700 px-2 py-1 rounded border border-cyan-200 font-bold">Updated Just Now</span>
                            </div>
                            <div className="p-0 divide-y divide-slate-200 bg-white">
                                {mockCrmLogs.map((log, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 transition">
                                        <div className="flex flex-col mb-2 sm:mb-0">
                                            <span className="text-slate-900 text-sm font-bold">{log.action}</span>
                                            <span className="text-slate-500 text-[11px] mt-0.5">{log.user}</span>
                                        </div>
                                        <span className="text-slate-650 text-[11px] shrink-0 bg-slate-100 px-2 py-1 rounded-md border border-slate-200 font-semibold">{log.date}</span>
                                    </div>
                                ))}
                                <div className="p-4 text-center border-t border-slate-200 bg-slate-50/50">
                                    <button className="text-blue-600 hover:text-blue-700 text-xs font-bold transition flex items-center justify-center space-x-2 w-full">
                                        <span>View Full Pipeline</span>
                                        <FaChevronRight className="text-[10px]" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Dispatch Mockup */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
                            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <FaCalendarCheck className="text-amber-600 text-lg" />
                                    <span className="font-bold text-slate-900 text-sm">Daily Dispatch Board</span>
                                </div>
                                <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200 font-bold">Today's Schedule</span>
                            </div>
                            <div className="p-4 space-y-3 bg-white">
                                {mockScheduleTasks.map((task, i) => (
                                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center hover:bg-slate-100/50 transition">
                                        <div className="flex flex-col">
                                            <span className="text-slate-900 text-sm font-bold">{task.job}</span>
                                            <span className="text-slate-500 text-[11px] mt-1 flex items-center space-x-1.5">
                                                <FaTools className="text-[10px] text-slate-400" />
                                                <span>{task.tech}</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-slate-600 text-xs font-medium mb-1">{task.time}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${getStatusBadgeStyle(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Customer Profile Mockup */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg lg:col-span-2">
                            <div className="bg-slate-50 border-b border-slate-200 p-5 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                                        <FaBuilding className="text-cyan-600" />
                                        <span>{mockCustomerProfile.name}</span>
                                    </h3>
                                    <div className="flex space-x-2 mt-2">
                                        <span className="text-[10px] bg-slate-100 text-slate-650 px-2 py-1 rounded border border-slate-200 font-semibold">{mockCustomerProfile.id}</span>
                                        {mockCustomerProfile.tags.map(t => (
                                            <span key={t} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-200 font-bold">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex space-x-2 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                                    {mockCustomerProfile.tabs.map((tab, i) => (
                                        <button key={tab} className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition ${i === 0 ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'}`}>{tab}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="p-0 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-white">
                                {mockCustomerProfile.recentActivity.map((act, i) => (
                                    <div key={i} className={`flex items-center justify-between p-4 hover:bg-slate-50 transition ${i === 2 ? 'md:col-span-2 border-t border-slate-100' : ''}`}>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                                                {act.type === 'contract' && <FaHandshake className="text-blue-600 text-xs" />}
                                                {act.type === 'invoice' && <FaFileInvoiceDollar className="text-emerald-600 text-xs" />}
                                                {act.type === 'service' && <FaTools className="text-amber-600 text-xs" />}
                                            </div>
                                            <span className="text-slate-800 text-sm font-bold">{act.title}</span>
                                        </div>
                                        <span className="text-slate-500 text-xs">{act.date}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Operational Reports */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <FaChartPie className="text-indigo-600" />
                                    <span className="font-bold text-slate-900 text-sm">Operational Performance Overview</span>
                                </div>
                            </div>
                            <div className="p-4 grid grid-cols-1 gap-3 flex-grow bg-white">
                                {mockOperationalReports.map((report, i) => (
                                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center hover:border-indigo-300 transition">
                                        <span className="text-slate-605 text-xs font-bold">{report.metric}</span>
                                        <div className="text-right">
                                            <div className="text-slate-900 font-bold text-sm">{report.value}</div>
                                            <div className={`text-[10px] font-bold mt-0.5 ${getTrendColorClass(report.color)}`}>{report.trend}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Settings Mockup */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <FaShieldAlt className="text-slate-550" />
                                    <span className="font-bold text-slate-900 text-sm">Business Settings & Permissions</span>
                                </div>
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 font-bold">Admin View</span>
                            </div>
                            <div className="p-4 space-y-3 flex-grow bg-white">
                                {mockSettingsToggles.map((setting, i) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 p-2.5 rounded-lg transition border border-slate-200">
                                        <span className="text-slate-800 text-xs pr-4">{setting.label}</span>
                                        <div className={`w-8 h-4 rounded-full relative flex items-center shrink-0 transition-colors ${setting.active ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                            <div className={`w-3 h-3 rounded-full bg-white absolute shadow-sm transition-transform ${setting.active ? 'translate-x-4' : 'translate-x-1'}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════ CORE OPERATIONAL MODULES ═══════════ */}
            <section id="modules" className="py-16 bg-slate-50 border-y border-slate-200 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Core Operational Modules" /></div>
                    <SectionHeading title="Operational Tools Used Across Daily Cleaning Workflows" subtitle="Every module designed for real cleaning business workflows — not generic software features." />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {moduleCards.map((card, i) => {
                            const c = lightColorMap[card.color] || lightColorMap.blue;
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                    className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group shadow-sm flex flex-col justify-between">
                                    <div>
                                        <div className={`p-3 ${c.bg} border ${c.border} w-fit rounded-xl group-hover:scale-110 transition-all duration-300`}>
                                            <span className={`${c.text} text-xl`}>{iconLookup[card.icon]}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">{card.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════ FINANCE & INVOICING WORKFLOW ═══════════ */}
            <section id="amc" className="py-16 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Finance & AMC Billing" /></div>
                    <SectionHeading title="Professional Billing & AMC Management" subtitle="Generate UAE VAT-compliant invoices, manage AMC billing cycles and maintain paperless financial records for customer operations." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        {[
                            { title: 'UAE VAT Invoices', desc: 'Compliant tax invoices generated instantly upon job completion with digital signatures.', icon: <FaFileInvoiceDollar className="text-blue-600 text-xl" />, color: 'blue' },
                            { title: 'AMC Billing Cycles', desc: 'Automated contract renewals and scheduled billing for long-term facility management.', icon: <FaSyncAlt className="text-emerald-600 text-xl" />, color: 'emerald' },
                            { title: 'Digital Payment Records', desc: 'Secure, traceable, and completely transparent payment logging for every service.', icon: <FaCreditCard className="text-purple-600 text-xl" />, color: 'purple' },
                            { title: 'Paperless Documentation', desc: 'All financial records are stored digitally, reducing physical waste and administrative overhead.', icon: <FaLeaf className="text-amber-600 text-xl" />, color: 'amber' },
                        ].map((card, i) => {
                            const c = lightColorMap[card.color] || lightColorMap.blue;
                            return (
                                <motion.div key={i} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group shadow-sm flex flex-col h-full text-center">
                                    <div className={`w-14 h-14 mx-auto rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-inner`}>
                                        {card.icon}
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-3">{card.title}</h3>
                                    <p className="text-slate-655 text-xs leading-relaxed flex-grow">{card.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════ OPERATIONAL COMMUNICATION & TRACKING ═══════════ */}
            <section id="approvals" className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Paperless Workflows" /></div>
                    <SectionHeading title="Complete Communication Tracking" subtitle="Monitor quotation, contract and invoice communication history in one centralized workflow." />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {communicationWorkflows.map((workflow, i) => {
                            const c = lightColorMap[workflow.color] || lightColorMap.blue;
                            return (
                                <motion.div key={i} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md relative">
                                    <div className="bg-slate-50 border-b border-slate-200 p-5 flex items-center space-x-3">
                                        <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center`}>
                                            <span className={`${c.text} text-sm`}>{iconLookup[workflow.icon]}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm">{workflow.title}</h3>
                                    </div>
                                    <div className="p-6 relative bg-white">
                                        <div className="absolute left-8 top-8 bottom-8 w-px bg-slate-200"></div>
                                        <div className="space-y-6 relative z-10">
                                            {workflow.steps.map((step, idx) => (
                                                <div key={idx} className="flex items-center space-x-4">
                                                    <div className={`w-4 h-4 rounded-full border-2 ${idx === workflow.steps.length - 1 ? c.bg + ' ' + c.border : 'bg-slate-100 border-slate-300'}`}></div>
                                                    <span className={`text-sm ${idx === workflow.steps.length - 1 ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════ MOBILE FIELD OPERATIONS ═══════════ */}
            <section id="mobile" className="py-16 bg-slate-50 border-y border-slate-200 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Field Operations" /></div>
                    <SectionHeading title="Mobile-First Field Operations" subtitle="Technicians manage their entire workday from a mobile-optimized dashboard — no paper, no calls, no confusion." />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Assigned Jobs', desc: 'Daily job list with client address, service type, time slot and priority level', icon: <FaClipboardList className="text-blue-600 text-xl" />, color: 'blue' },
                            { title: 'Before & After Photos', desc: 'Capture visual proof of work completion with timestamped photos', icon: <FaMobileAlt className="text-emerald-600 text-xl" />, color: 'emerald' },
                            { title: 'Digital Signatures', desc: 'Customer sign-off directly on the device screen for instant job verification', icon: <FaHandshake className="text-purple-600 text-xl" />, color: 'purple' },
                        ].map((card, i) => {
                            const c = lightColorMap[card.color] || lightColorMap.blue;
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group shadow-sm text-center flex flex-col h-full">
                                    <div className={`w-14 h-14 mx-auto rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                                        {card.icon}
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-2 mt-4">{card.title}</h3>
                                    <p className="text-slate-655 text-xs leading-relaxed flex-grow">{card.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════ PAPERLESS OPERATIONS ═══════════ */}
            <section className="py-16 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Paperless Workflow" /></div>
                    <SectionHeading title="100% Paperless Operations" subtitle="Every document, every signature, every record — digitized and stored securely in the centralized document system." />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {['Digital Quotations', 'E-Contracts', 'PDF Generation', 'Online Approvals', 'Photo Proof', 'Document Hub'].map((label, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                                className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 hover:shadow-md transition duration-300 group shadow-sm">
                                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                                    <FaCheckCircle className="text-blue-600 text-sm" />
                                </div>
                                <span className="text-xs font-bold text-slate-800">{label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ ROLE-BASED DASHBOARDS ═══════════ */}
            <section id="operations" className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Operational Team Access" /></div>
                    <SectionHeading title="Specialized Dashboards for Every Role" subtitle="Every team member sees exactly what they need — nothing more, nothing less." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {roleCards.map((card, i) => {
                            const c = lightColorMap[card.color] || lightColorMap.blue;
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                    className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group shadow-sm flex flex-col justify-between">
                                    <div>
                                        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${c.bg} ${c.text} border ${c.border} mb-3`}>{card.title}</div>
                                        <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════ PROBLEMS SOLVED ═══════════ */}
            <section className="py-16 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Operational Challenges" /></div>
                    <SectionHeading title="Problems We Solve" subtitle="Real operational headaches that cleaning businesses face every day — and how this software eliminates them." />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {problemsSolved.map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-400 hover:shadow-md transition-all duration-300 group shadow-sm">
                                <div className="flex items-start space-x-3 mb-4">
                                    <FaTimesCircle className="text-red-600 mt-0.5 shrink-0" />
                                    <span className="text-sm text-red-700 font-semibold line-through decoration-red-400/50">{item.problem}</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <FaCheckCircle className="text-emerald-600 mt-0.5 shrink-0" />
                                    <span className="text-sm text-slate-800 font-medium">{item.solution}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ WHY CHOOSE US ═══════════ */}
            <section className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Our Standards" /></div>
                    <SectionHeading title="Why Businesses Choose Team Enviro" subtitle="A trusted name in UAE commercial cleaning and facility management." />
                    <div className="flex flex-wrap justify-center gap-4">
                        {trustBadges.map((badge, i) => (
                            <div key={i} className="flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl py-6 w-[150px] sm:w-[160px] hover:border-emerald-400 hover:shadow-md transition-all duration-300 shadow-sm">
                                <span className="text-emerald-600 text-2xl">{iconLookup[badge.icon] || <FaCheckCircle />}</span>
                                <span className="text-[11px] sm:text-xs font-bold text-slate-800 text-center px-2">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ SERVICES WE PROVIDE ═══════════ */}
            <section className="py-16 border-y border-white/5 bg-[#020617] px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6"><SectionBadge text="Professional Services" /></div>
                    <SectionHeading title="Services We Provide" subtitle="Comprehensive facility and cleaning solutions tailored to your operational needs." light={false} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {servicesWeProvide.map((srv, i) => (
                            <motion.div key={i} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-400 hover:shadow-md transition-all duration-300 group shadow-sm flex flex-col h-full">
                                <div className="w-12 h-12 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                                    <span className="text-emerald-600 text-xl">{iconLookup[srv.icon] || <FaBroom />}</span>
                                </div>
                                <h3 className="text-[15px] font-bold text-slate-900 mb-2">{srv.title}</h3>
                                <p className="text-slate-605 text-xs leading-relaxed flex-grow">{srv.desc}</p>
                                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center space-x-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                    <FaCalendarCheck className="text-emerald-600" />
                                    <span>{srv.freq}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ═══════════ SERVICE INQUIRY FORM ═══════════ */}
            <section id="contact" className="py-16 px-4 sm:px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-600/5 to-transparent pointer-events-none"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center space-y-6 mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Request a <br /><span className="text-slate-900">Site Inspection</span></h2>
                        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">Need professional cleaning services or an Annual Maintenance Contract (AMC)? Fill out the form below and our operations team will contact you shortly.</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
                        <form className="landing-form space-y-6 text-sm" onSubmit={(e) => { e.preventDefault(); alert('Inquiry Sent Successfully! Our operations team will contact you soon.'); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-bold text-slate-500">Full Name *</label>
                                    <input type="text" required placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-slate-500">Phone Number *</label>
                                    <input type="tel" required placeholder="+971 50 123 4567" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-slate-500">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-slate-500">Site Location (Area/City) *</label>
                                    <input type="text" required placeholder="e.g. Business Bay, Dubai" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-bold text-slate-500">Service Required *</label>
                                <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition [&>option]:bg-white">
                                    <option value="">Select Service Type...</option>
                                    <option value="commercial">Commercial Office Cleaning</option>
                                    <option value="residential">Residential Deep Cleaning</option>
                                    <option value="post_construction">Post-Construction Cleaning</option>
                                    <option value="hvac">HVAC & Duct Sanitization</option>
                                </select>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                <input type="checkbox" id="amc-inquiry" className="w-5 h-5 rounded border-slate-250 bg-white text-blue-600 focus:ring-blue-500/30 cursor-pointer" />
                                <label htmlFor="amc-inquiry" className="font-semibold text-slate-500 cursor-pointer">I am interested in an Annual Maintenance Contract (AMC)</label>
                            </div>

                            <div className="space-y-2">
                                <label className="font-bold text-slate-500">Additional Details</label>
                                <textarea rows="4" placeholder="Tell us more about your requirements or preferred visit date..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 active:scale-[0.99] transition-all text-base flex items-center justify-center space-x-2 border border-blue-700">
                                <span>Submit Inspection Request</span><FaPaperPlane className="text-sm" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* ═══════════ ENTERPRISE FOOTER ═══════════ */}
            <footer className="pt-20 pb-10 border-t border-white/5 bg-[#020617] px-4 sm:px-6 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12 pb-16">
                    <div className="col-span-2 md:col-span-4 space-y-4">
                        <div className="flex items-center space-x-2.5">
                            <span className="font-bold text-lg text-white">Team Enviro</span>
                        </div>
                        <p className="text-blue-100 text-sm max-w-sm leading-relaxed">Professional cleaning operations management system — CRM, quotations, AMC contracts, scheduling, invoicing and field management.</p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#whatsapp" aria-label="WhatsApp" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-blue-100 hover:text-white transition"><FaWhatsapp /></a>
                            <a href="#email" aria-label="Email" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-blue-100 hover:text-white transition"><FaEnvelope /></a>
                            <a href="#linkedin" aria-label="LinkedIn" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-blue-100 hover:text-white transition"><FaLinkedin /></a>
                        </div>
                        <p className="text-[11px] text-blue-100/70 pt-2 whitespace-nowrap">&copy; {new Date().getFullYear()} Team Enviro Cleaning Services. All rights reserved.</p>
                    </div>
                    <div className="md:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Customer Operations</h4>
                        <ul className="space-y-2.5 text-sm text-blue-100">
                            <li>Lead Management</li><li>Client Directory</li><li>Quotation Builder</li><li>Sales Pipeline</li>
                        </ul>
                    </div>
                    <div className="md:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">AMC Operations</h4>
                        <ul className="space-y-2.5 text-sm text-blue-100">
                            <li>Contract Lifecycle</li><li>Visit Scheduling</li><li>Renewal Tracking</li><li>Service Records</li>
                        </ul>
                    </div>
                    <div className="md:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Field Operations</h4>
                        <ul className="space-y-2.5 text-sm text-blue-100">
                            <li>Mobile Dashboard</li><li>Digital Signatures</li><li>Photo Evidence</li><li>Job Checklists</li>
                        </ul>
                    </div>
                    <div className="md:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
                        <ul className="space-y-2.5 text-sm text-blue-100">
                            <li><a href="#contact" className="text-blue-100 hover:text-white transition">Request Site Inspection</a></li>
                            <li>UAE Operations</li>
                            <li>Support</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
