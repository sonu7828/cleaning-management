import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import AdminDashboard from '../../components/dashboards/AdminDashboard';
import TechnicianDashboard from '../../components/dashboards/TechnicianDashboard';
import AccountsDashboard from '../../components/dashboards/AccountsDashboard';
import DriverDashboard from '../../components/dashboards/DriverDashboard';

const Dashboard = () => {
    const { userRole } = useContext(AppContext);

    return (
        <div className="max-w-7xl mx-auto">
            {(() => {
                switch (userRole) {
                    case 'driver':
                        return <DriverDashboard />;
                    case 'technician':
                        return <TechnicianDashboard />;
                    case 'accounts':
                        return <AccountsDashboard />;
                    case 'sales':
                    case 'dispatch':
                    case 'admin':
                    default:
                        return <AdminDashboard />;
                }
            })()}
        </div>
    );
};

export default Dashboard;
