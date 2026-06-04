import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Modal from '../components/ui/Modal';
import { AppContext } from '../context/AppContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated, alertConfig, setAlertConfig } = useContext(AppContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [sidebarOpen]);

    const isPublicRoute = ['/', '/login', '/register', '/forgot-password'].includes(location.pathname);

    if (isPublicRoute) {
        return <div className="min-h-screen">{children}</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div 
            className="flex bg-[#0B1120] overflow-hidden font-sans text-slate-100"
            style={{ height: '100dvh', minHeight: '-webkit-fill-available' }}
        >
            {/* Sidebar component with toggle props */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />

            {/* Main content area — full width on mobile when sidebar is closed */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar component with toggle menu handler */}
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    isSidebarCollapsed={isSidebarCollapsed}
                    setIsSidebarCollapsed={setIsSidebarCollapsed}
                />

                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0B1120]">
                    <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-6 md:px-6 md:py-8 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Global Custom Alert Overlay */}
            {alertConfig?.isOpen && (
                <Modal
                    isOpen={alertConfig.isOpen}
                    onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                    title="System Notification"
                >
                    <div className="space-y-4 text-xs font-semibold text-slate-300 text-center py-2">
                        <div className="text-sm font-bold text-slate-200 mt-2 mb-4 leading-relaxed whitespace-pre-wrap">
                            {alertConfig.message}
                        </div>
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95 text-xs"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Layout;
