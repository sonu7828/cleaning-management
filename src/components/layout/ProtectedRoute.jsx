import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

// Define which routes each role can access
const roleAccess = {
    admin: [
        '/dashboard', '/crm/leads', '/crm/clients', '/crm/services',
        '/crm/quotations', '/crm/contracts', '/crm/scheduling',
        '/crm/work-orders', '/crm/technicians', '/crm/drivers',
        '/crm/invoices', '/crm/payments', '/crm/vat', '/crm/reports',
        '/crm/complaints', '/erp/inventory',
        '/settings', '/profile', '/notifications'
    ],
    sales: [
        '/dashboard', '/crm/leads', '/crm/clients', '/crm/quotations',
        '/crm/contracts', '/crm/complaints', '/profile', '/notifications'
    ],
    dispatch: [
        '/dashboard', '/crm/scheduling', '/crm/work-orders',
        '/crm/technicians', '/crm/drivers', '/crm/clients',
        '/crm/contracts', '/crm/complaints', '/erp/inventory',
        '/profile', '/notifications'
    ],
    technician: [
        '/dashboard', '/crm/work-orders', '/crm/scheduling',
        '/profile', '/notifications'
    ],
    accounts: [
        '/dashboard', '/crm/invoices', '/crm/payments', '/crm/vat',
        '/crm/reports', '/crm/clients', '/crm/contracts', '/crm/complaints',
        '/erp/inventory', '/profile', '/notifications'
    ],
    driver: [
        '/dashboard', '/crm/work-orders', '/crm/scheduling',
        '/profile', '/notifications'
    ]
};

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, userRole } = useContext(AppContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Get current path
    const currentPath = window.location.pathname;

    // Check if the current role has access to this route
    const allowedRoutes = roleAccess[userRole] || [];
    const hasAccess = allowedRoutes.some(route => currentPath === route || currentPath.startsWith(route + '/'));

    if (!hasAccess) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
