import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import HealthcareModule from './pages/HealthcareModule';
import CloudOperationsModule from './pages/CloudOperationsModule';
import LegacyAdminModule from './pages/LegacyAdminModule';
import AppShell from './components/layout/AppShell';

// Standard Auth Guard Wrapper
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = localStorage.getItem('host_session');
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return <AppShell>{children}</AppShell>;
};

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Protected SaaS Console Routes */}
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/customers" element={<RequireAuth><Customers /></RequireAuth>} />
        <Route path="/transactions" element={<RequireAuth><Transactions /></RequireAuth>} />
        <Route path="/alerts" element={<RequireAuth><Alerts /></RequireAuth>} />
        <Route path="/reports" element={<RequireAuth><Reports /></RequireAuth>} />
        <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />

        {/* Micro-Frontend Standalone Console Routes */}
        <Route path="/healthcare" element={<RequireAuth><HealthcareModule /></RequireAuth>} />
        <Route path="/cloud-ops" element={<RequireAuth><CloudOperationsModule /></RequireAuth>} />
        <Route path="/legacy-admin" element={<RequireAuth><LegacyAdminModule /></RequireAuth>} />

        {/* Wildcard Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
export default App;
