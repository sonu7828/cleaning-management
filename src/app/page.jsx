import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import DashboardPage from '../pages/crm/dashboard';
import ClientsPage from '../pages/crm/clients';
import LeadsPage from '../pages/crm/leads';
import QuotationsPage from '../pages/crm/quotations';
import ContractsPage from '../pages/crm/contracts';
import ServicesPage from '../pages/crm/services';
import SchedulerPage from '../pages/crm/scheduler';
import OperationsPage from '../pages/erp/operations'; // Represents Work Orders & Dispatch
import TechniciansPage from '../pages/crm/technicians';
import DriversPage from '../pages/crm/drivers';
import InvoicesPage from '../pages/erp/invoices';
import PaymentsPage from '../pages/erp/payments';
import ReportsPage from '../pages/crm/reports';
import ComplaintsPage from '../pages/crm/complaints';
import InventoryPage from '../pages/erp/inventory';
import SettingsPage from '../pages/settings';
import ProfilePage from '../pages/profile';
import AccountsVATPage from '../pages/accounts/vat';
import NotificationsPage from '../pages/notifications';
import ProtectedRoute from '../components/layout/ProtectedRoute';

const Page = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Cleaning System Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/crm/leads" element={<ProtectedRoute><LeadsPage /></ProtectedRoute>} />
                    <Route path="/crm/clients" element={<ProtectedRoute><ClientsPage /></ProtectedRoute>} />
                    <Route path="/crm/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
                    <Route path="/crm/quotations" element={<ProtectedRoute><QuotationsPage /></ProtectedRoute>} />
                    <Route path="/crm/contracts" element={<ProtectedRoute><ContractsPage /></ProtectedRoute>} />
                    <Route path="/crm/complaints" element={<ProtectedRoute><ComplaintsPage /></ProtectedRoute>} />
                    
                    {/* Field Operations & Scheduling */}
                    <Route path="/crm/scheduling" element={<ProtectedRoute><SchedulerPage /></ProtectedRoute>} />
                    <Route path="/crm/work-orders" element={<ProtectedRoute><OperationsPage /></ProtectedRoute>} />
                    
                    {/* Staff & Fleet */}
                    <Route path="/crm/technicians" element={<ProtectedRoute><TechniciansPage /></ProtectedRoute>} />
                    <Route path="/crm/drivers" element={<ProtectedRoute><DriversPage /></ProtectedRoute>} />
                    
                    {/* Finance & Accounts */}
                    <Route path="/crm/invoices" element={<ProtectedRoute><InvoicesPage /></ProtectedRoute>} />
                    <Route path="/crm/payments" element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>} />
                    <Route path="/crm/vat" element={<ProtectedRoute><AccountsVATPage /></ProtectedRoute>} />
                    
                    {/* Warehouse & Inventory */}
                    <Route path="/erp/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
                    
                    {/* Reports & Settings */}
                    <Route path="/crm/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default Page;
