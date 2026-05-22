import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SuperAdminDashboard from '../../components/dashboards/SuperAdminDashboard';
import AdminDashboard from '../../components/dashboards/AdminDashboard';
import TechnicianDashboard from '../../components/dashboards/TechnicianDashboard';
import DriverDashboard from '../../components/dashboards/DriverDashboard';
import AccountsDashboard from '../../components/dashboards/AccountsDashboard';
import ClientPortalDashboard from '../../components/dashboards/ClientPortalDashboard';

const Dashboard = () => {
    const { userRole } = useContext(AppContext);

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            {(() => {
                switch (userRole) {
                    case 'superadmin':
                        return <SuperAdminDashboard />;
                    case 'technician':
                        return <TechnicianDashboard />;
                    case 'driver':
                        return <DriverDashboard />;
                    case 'accounts':
                        return <AccountsDashboard />;
                    case 'client':
                        return <ClientPortalDashboard />;
                    case 'admin':
                    default:
                        return <AdminDashboard />;
                }
            })()}
        </div>
    );
};

export default Dashboard;
