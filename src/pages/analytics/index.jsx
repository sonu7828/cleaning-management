import React from 'react';
import DashboardChart from '../../components/analytics/DashboardChart';
import RevenueCard from '../../components/analytics/RevenueCard';
const AnalyticsPage = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Analytics Dashboard</h1>
                <p className="text-slate-400 text-sm mt-1">Real-time revenue settled tracking and gross statistics insights.</p>
            </div>
            
            <div className="space-y-6">
                <RevenueCard />
                <DashboardChart />
            </div>
        </div>
    );
};
export default AnalyticsPage;
