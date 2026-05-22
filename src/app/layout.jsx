import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { AppContext } from '../context/AppContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated } = useContext(AppContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Prevent body scrolling when mobile sidebar is open
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
        <div className="flex h-screen bg-[#0B1120] overflow-x-hidden font-sans text-slate-100">
            {/* Sidebar component with toggle props */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />

            {/* Main content area — full width on mobile when sidebar is closed */}
            <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden overflow-y-auto">
                {/* Topbar component with toggle menu handler */}
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    isSidebarCollapsed={isSidebarCollapsed}
                    setIsSidebarCollapsed={setIsSidebarCollapsed}
                />

                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0B1120]">
                    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
