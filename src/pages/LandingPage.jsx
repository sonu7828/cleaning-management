import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaUsers, 
    FaFileInvoiceDollar, 
    FaCalendarCheck, 
    FaChartLine, 
    FaCheckCircle, 
    FaBars, 
    FaTimes, 
    FaArrowRight, 
    FaTwitter, 
    FaGithub, 
    FaLinkedin,
    FaShieldAlt,
    faRocket
} from 'react-icons/fa';

const LandingPage = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAnnual, setIsAnnual] = useState(false);

    const features = [
        {
            icon: <FaUsers className="text-2xl text-cyan-400" />,
            title: 'Advanced CRM',
            desc: 'Organize and manage cleaning service clients and prospective leads statefully in one centralized workspace.'
        },
        {
            icon: <FaFileInvoiceDollar className="text-2xl text-emerald-400" />,
            title: 'ERP Invoicing',
            desc: 'Draft, issue, and settle invoices with advanced sorting columns. Manage agency payments seamlessly.'
        },
        {
            icon: <FaCalendarCheck className="text-2xl text-amber-400" />,
            title: 'Schedule Board',
            desc: 'Dispatch cleaning crews, schedule custom jobs, assign employees, and track project status interactively.'
        },
        {
            icon: <FaChartLine className="text-2xl text-purple-400" />,
            title: 'Performance Analytics',
            desc: 'Review total revenue milestones, customer onboarding rates, and pending task volumes dynamically.'
        }
    ];

    const pricingPlans = [
        {
            name: 'Starter',
            monthlyPrice: 29,
            annualPrice: 23,
            desc: 'For small cleaning teams just getting organized.',
            features: ['Up to 50 active clients', 'Standard schedule board', 'Basic invoices', 'Email support'],
            highlighted: false,
        },
        {
            name: 'Professional',
            monthlyPrice: 79,
            annualPrice: 63,
            desc: 'Best for growing professional cleaning agencies.',
            features: ['Unlimited active clients', 'Advanced interactive dispatch board', 'Automated invoicing & sorting', 'Priority 24/7 support', 'Analytics dashboards'],
            highlighted: true,
        },
        {
            name: 'Enterprise',
            monthlyPrice: 149,
            annualPrice: 119,
            desc: 'Custom controls for large franchise agencies.',
            features: ['Multiple agency branches', 'Custom API access', 'Dedicated client onboarding', 'White-labeled invoices'],
            highlighted: false,
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-sans scroll-smooth overflow-x-hidden relative">
            {/* Background Ambient Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute top-[40%] right-[-5%] w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[110px] pointer-events-none"></div>

            {/* Navigation Header (Floating Premium Style) */}
            <header className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto">
                <div className="bg-[#020617]/70 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/30">
                    <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/30">C</div>
                        <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent hidden sm:block">CleanCRM</span>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
                        <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
                        <a href="#stats" className="hover:text-white transition-colors duration-200">Stats</a>
                        <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
                    </nav>

                    <div className="hidden md:flex items-center space-x-3">
                        <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition">
                            Sign In
                        </button>
                        <button onClick={() => navigate('/login')} className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 transition-all duration-200">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Hamburger Menu Toggle */}
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-slate-300 hover:text-white p-1 rounded-lg" aria-label="Toggle menu">
                        {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>
                </div>

                {/* Mobile Drawer Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-20 left-0 right-0 p-5 bg-[#0B1120]/95 border border-white/[0.08] backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col space-y-4 md:hidden"
                        >
                            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 text-sm font-medium border-b border-white/5">Features</a>
                            <a href="#stats" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 text-sm font-medium border-b border-white/5">Stats</a>
                            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 text-sm font-medium border-b border-white/5">Pricing</a>
                            <div className="pt-2 flex flex-col space-y-3">
                                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} className="w-full py-2.5 text-center text-sm font-bold text-slate-300 hover:text-white border border-white/10 rounded-xl transition">Sign In</button>
                                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} className="w-full py-2.5 text-center text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">Get Started</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Hero Section */}
            <section className="pt-36 sm:pt-44 pb-20 relative overflow-hidden px-4 sm:px-6 text-center">
                <div className="max-w-5xl mx-auto relative z-10 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider shadow-sm"
                    >
                        <span>✨ Introducing CleanCRM 2.0</span>
                    </motion.div>

                    <motion.h1 
                        className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Scale Your Cleaning Agency <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">With Smart CRM & ERP</span>
                    </motion.h1>

                    <motion.p 
                        className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        The ultimate operations cockpit. Dispatch cleaning crews, monitor client relations, generate sorted invoices, and track revenue metrics statefully.
                    </motion.p>

                    <motion.div 
                        className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <button 
                            onClick={() => navigate('/login')}
                            className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/40 transition duration-300 active:scale-[0.98] flex items-center justify-center space-x-2"
                        >
                            <span>Get Started Free</span>
                            <FaArrowRight className="text-xs" />
                        </button>
                        <a 
                            href="#features"
                            className="w-full sm:w-auto py-3.5 px-8 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-slate-200 font-semibold rounded-xl transition duration-300 text-center"
                        >
                            Explore Features
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Mock Dashboard Bento Preview */}
            <section className="pb-24 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto rounded-3xl border border-white/[0.08] bg-[#0B1120]/40 backdrop-blur-xl p-4 sm:p-6 shadow-2xl shadow-blue-900/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10 rounded-3xl pointer-events-none"></div>
                    
                    <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                            <span className="text-[10px] sm:text-xs text-slate-500 font-mono pl-4 hidden sm:block">app.cleancrm.com/dashboard</span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-bold border border-emerald-500/20">Live Status</span>
                    </div>

                    {/* Simulated Dashboard UI */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 relative z-0">
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 shadow-sm hover:bg-white/[0.04] transition-colors">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
                            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1.5">$45,000</h3>
                            <span className="text-emerald-400 text-[11px] font-bold mt-1 inline-block">+12.5% from last month</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 shadow-sm hover:bg-white/[0.04] transition-colors">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Leads</span>
                            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1.5">120 Clients</h3>
                            <span className="text-blue-400 text-[11px] font-bold mt-1 inline-block">18 new this week</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 shadow-sm hover:bg-white/[0.04] transition-colors">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completion Rate</span>
                            <h3 className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1.5">99.8%</h3>
                            <span className="text-slate-400 text-[11px] font-bold mt-1 inline-block">Industry standard: 95%</span>
                        </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl h-48 flex flex-col items-center justify-center shadow-inner p-4 text-center relative z-0">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                            <FaChartLine className="text-blue-400 text-2xl animate-pulse" />
                        </div>
                        <span className="text-slate-300 font-semibold text-sm">Interactive Analytics Engine</span>
                        <p className="text-slate-500 text-xs mt-1 max-w-sm">Recharts integration dynamically mapping crew milestones & revenue.</p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-[#06091d]/40 border-y border-white/5 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 space-y-3">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Full-Featured Operations Dashboard</h2>
                        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">Everything you need to streamline and scale your cleaning service agency.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feat, index) => (
                            <motion.div 
                                key={index} 
                                className="bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20 group"
                            >
                                <div className="p-3 bg-white/[0.04] border border-white/[0.06] w-fit rounded-xl group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all duration-300">
                                    {feat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mt-6 mb-2.5">{feat.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Bento Section */}
            <section id="stats" className="py-24 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                    
                    <div className="lg:col-span-2 space-y-4 text-center lg:text-left">
                        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider">
                            <span>By The Numbers</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">Join the agencies operating at peak performance</h2>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed">Ditch the spreadsheets. Automate job assignments, invoice dispatches, and client communications statefully.</p>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-2 gap-4">
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-cyan-500/20 transition-colors">
                            <h3 className="text-4xl md:text-5xl font-black text-cyan-400">10K+</h3>
                            <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-wider">Jobs Handled</p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-indigo-500/20 transition-colors">
                            <h3 className="text-4xl md:text-5xl font-black text-indigo-400">99.8%</h3>
                            <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-wider">SLA Success</p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-amber-500/20 transition-colors">
                            <h3 className="text-4xl md:text-5xl font-black text-amber-400">150+</h3>
                            <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-wider">Active Agencies</p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-emerald-500/20 transition-colors">
                            <h3 className="text-4xl md:text-5xl font-black text-emerald-400">18%</h3>
                            <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-wider">Profit Boost</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section (Interactive Toggle) */}
            <section id="pricing" className="py-24 px-4 sm:px-6 bg-[#06091d]/40 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Fair, Scalable Pricing</h2>
                        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">Simple pricing with no hidden fees. Choose the cycle that fits your team.</p>
                        
                        {/* Interactive Billing Toggle */}
                        <div className="flex items-center justify-center space-x-4 pt-2">
                            <span className={`text-sm font-semibold transition ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
                            <button 
                                onClick={() => setIsAnnual(!isAnnual)}
                                className="w-12 h-6 rounded-full bg-slate-700/50 border border-white/10 p-1 transition flex items-center justify-start focus:outline-none hover:bg-slate-700"
                                aria-label="Toggle annual pricing"
                            >
                                <motion.div 
                                    layout
                                    className="w-4 h-4 rounded-full bg-blue-500 shadow-md shadow-blue-500/50"
                                    animate={{ x: isAnnual ? 24 : 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            </button>
                            <span className={`text-sm font-semibold transition ${isAnnual ? 'text-white' : 'text-slate-400'} flex items-center space-x-2`}>
                                <span>Annual</span>
                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide border border-emerald-500/20">Save 20%</span>
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {pricingPlans.map((plan, index) => {
                            const activePrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
                            return (
                                <div 
                                    key={index} 
                                    className={`bg-white/[0.02] border rounded-2xl p-8 relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 backdrop-blur-sm ${
                                        plan.highlighted ? 'border-blue-500/50 bg-blue-500/[0.04] ring-1 ring-blue-500/20' : 'border-white/[0.06] hover:border-white/[0.12]'
                                    }`}
                                >
                                    {plan.highlighted && (
                                        <span className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-blue-600/30">
                                            Most Popular
                                        </span>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline mb-4">
                                            <span className="text-5xl font-black text-white">${activePrice}</span>
                                            <span className="text-slate-400 text-sm ml-1.5">/mo</span>
                                        </div>
                                        <p className="text-slate-400 text-xs mb-6 leading-relaxed">{plan.desc}</p>
                                        <ul className="space-y-3 mb-8 text-sm text-slate-300">
                                            {plan.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start space-x-2.5">
                                                    <FaCheckCircle className="text-cyan-400 text-xs mt-1 flex-shrink-0" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className={`w-full py-3.5 rounded-xl font-bold transition text-sm mt-auto ${
                                            plan.highlighted 
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20' 
                                                : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20'
                                        }`}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Modern Grid Footer */}
            <footer className="pt-20 pb-10 border-t border-white/5 bg-[#020617] px-4 sm:px-6 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12 pb-16">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-5 space-y-4">
                        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-600/20">C</div>
                            <span className="font-black text-lg text-white">CleanCRM</span>
                        </div>
                        <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                            Streamline dispatching, handle invoice billing statefully, and scale your professional cleaning crews.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#twitter" aria-label="Twitter" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"><FaTwitter /></a>
                            <a href="#github" aria-label="Github" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"><FaGithub /></a>
                            <a href="#linkedin" aria-label="Linkedin" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"><FaLinkedin /></a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="md:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Product</h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li><a href="#features" className="hover:text-white transition">Features</a></li>
                            <li><a href="#pricing" className="hover:text-white transition">Pricing Plans</a></li>
                            <li><a href="#stats" className="hover:text-white transition">Analytics</a></li>
                            <li><a href="#security" className="hover:text-white transition">Security</a></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div className="md:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li><a href="#docs" className="hover:text-white transition">Documentation</a></li>
                            <li><a href="#help" className="hover:text-white transition">Help Center</a></li>
                            <li><a href="#guides" className="hover:text-white transition">Guides & Blogs</a></li>
                            <li><a href="#status" className="hover:text-white transition">API Status</a></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
                            <li><a href="#contact" className="hover:text-white transition">Contact Sales</a></li>
                            <li><a href="#partners" className="hover:text-white transition">Partner Program</a></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} CleanCRM Inc. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#terms" className="hover:text-white transition">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
