import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import AnalyticsPage from '../pages/analytics';
import ClientsPage from '../pages/crm/clients';
import DashboardPage from '../pages/crm/dashboard';
import LeadsPage from '../pages/crm/leads';
import InvoicesPage from '../pages/erp/invoices';
import OperationsPage from '../pages/erp/operations';
import ProfilePage from '../pages/profile';

// Super Admin Pages
import CompaniesPage from '../pages/superadmin/companies';
import LogsPage from '../pages/superadmin/logs';
import PlansPage from '../pages/superadmin/plans';
import SaaSAnalyticsPage from '../pages/superadmin/analytics';
import UsersPage from '../pages/superadmin/users';
import PlatformReportsPage from '../pages/superadmin/reports';

// Technician Pages
import TechnicianSchedulePage from '../pages/technician/schedule';
import TechnicianHistoryPage from '../pages/technician/history';
import TechnicianAttendancePage from '../pages/technician/attendance';

// Driver Pages
import DriverRoutesPage from '../pages/driver/routes';
import DriverReimbursementsPage from '../pages/driver/reimbursements';
import DriverCollectionsPage from '../pages/driver/collections';

// Accounts Pages
import AccountsVATPage from '../pages/accounts/vat';
import AccountsTransactionsPage from '../pages/accounts/transactions';
import AccountsReportsPage from '../pages/accounts/reports';

// Client Portal Pages
import ClientContractsPage from '../pages/client/contracts';
import ClientBillingsPage from '../pages/client/billings';
import ClientComplaintsPage from '../pages/client/complaints';
import ClientServiceHistoryPage from '../pages/client/history';

// Admin / CRM Sub-pages
import QuotationsPage from '../pages/crm/quotations';
import ContractsPage from '../pages/crm/contracts';
import SchedulerPage from '../pages/crm/scheduler';
import TechniciansPage from '../pages/crm/technicians';
import DriversPage from '../pages/crm/drivers';
import PaymentsPage from '../pages/erp/payments';
import CRMReportsPage from '../pages/crm/reports';
import NotificationsPage from '../pages/notifications';
import SettingsPage from '../pages/settings';

const Page = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Protected Dashboard Routes (Checked dynamically in Layout.jsx) */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/crm/clients" element={<ClientsPage />} />
                    <Route path="/crm/leads" element={<LeadsPage />} />
                    <Route path="/erp/invoices" element={<InvoicesPage />} />
                    <Route path="/erp/operations" element={<OperationsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* Super Admin Routes */}
                    <Route path="/superadmin/companies" element={<CompaniesPage />} />
                    <Route path="/superadmin/logs" element={<LogsPage />} />
                    <Route path="/superadmin/plans" element={<PlansPage />} />
                    <Route path="/superadmin/analytics" element={<SaaSAnalyticsPage />} />
                    <Route path="/superadmin/users" element={<UsersPage />} />
                    <Route path="/superadmin/reports" element={<PlatformReportsPage />} />

                    {/* Technician Routes */}
                    <Route path="/technician/schedule" element={<TechnicianSchedulePage />} />
                    <Route path="/technician/history" element={<TechnicianHistoryPage />} />
                    <Route path="/technician/attendance" element={<TechnicianAttendancePage />} />

                    {/* Driver Routes */}
                    <Route path="/driver/routes" element={<DriverRoutesPage />} />
                    <Route path="/driver/reimbursements" element={<DriverReimbursementsPage />} />
                    <Route path="/driver/collections" element={<DriverCollectionsPage />} />

                    {/* Accounts Routes */}
                    <Route path="/accounts/vat" element={<AccountsVATPage />} />
                    <Route path="/accounts/transactions" element={<AccountsTransactionsPage />} />
                    <Route path="/accounts/reports" element={<AccountsReportsPage />} />

                    {/* Client Portal Routes */}
                    <Route path="/client/contracts" element={<ClientContractsPage />} />
                    <Route path="/client/billings" element={<ClientBillingsPage />} />
                    <Route path="/client/complaints" element={<ClientComplaintsPage />} />
                    <Route path="/client/history" element={<ClientServiceHistoryPage />} />

                    {/* Admin Specific Routes */}
                    <Route path="/crm/quotations" element={<QuotationsPage />} />
                    <Route path="/crm/contracts" element={<ContractsPage />} />
                    <Route path="/crm/scheduler" element={<SchedulerPage />} />
                    <Route path="/crm/technicians" element={<TechniciansPage />} />
                    <Route path="/crm/drivers" element={<DriversPage />} />
                    <Route path="/erp/payments" element={<PaymentsPage />} />
                    <Route path="/crm/reports" element={<CRMReportsPage />} />
                    
                    {/* General Routes */}
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default Page;

