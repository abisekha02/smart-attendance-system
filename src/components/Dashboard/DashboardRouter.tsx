import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth';
import AdminDashboard from './AdminDashboard';
import MarketingDashboard from './MarketingDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import CenterHeadDashboard from './CenterHeadDashboard';

const DashboardRouter: React.FC = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.role as UserRole;

  // Render the appropriate dashboard based on user role
  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'marketing':
      return <MarketingDashboard />;
    case 'employee':
      return <EmployeeDashboard />;
    case 'center_head':
      return <CenterHeadDashboard />;
    default:
      return <div>Loading dashboard...</div>;
  }
};

export default DashboardRouter;