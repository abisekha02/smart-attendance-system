import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  LineChart, 
  UserCheck, 
  ClipboardList, 
  DollarSign, 
  Settings, 
  BarChart4, 
  Building, 
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`nav-link ${active ? 'nav-link-active' : ''}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const role = currentUser?.role as UserRole;

  const getNavItems = (role: UserRole) => {
    const items = [
      {
        to: '/dashboard',
        icon: <LayoutDashboard className="h-5 w-5" />,
        label: 'Dashboard',
        roles: ['admin', 'marketing', 'employee', 'center_head'],
      },
    ];

    if (role === 'admin') {
      items.push(
        {
          to: '/users',
          icon: <Users className="h-5 w-5" />,
          label: 'Users',
          roles: ['admin'],
        },
        {
          to: '/centers',
          icon: <Building className="h-5 w-5" />,
          label: 'Centers',
          roles: ['admin'],
        }
      );
    }

    if (['admin', 'center_head'].includes(role)) {
      items.push(
        {
          to: '/courses',
          icon: <BookOpen className="h-5 w-5" />,
          label: 'Courses',
          roles: ['admin', 'center_head'],
        },
        {
          to: '/batches',
          icon: <Calendar className="h-5 w-5" />,
          label: 'Batches',
          roles: ['admin', 'center_head'],
        },
        {
          to: '/students',
          icon: <Users className="h-5 w-5" />,
          label: 'Students',
          roles: ['admin', 'center_head'],
        },
        {
          to: '/revenue',
          icon: <DollarSign className="h-5 w-5" />,
          label: 'Revenue',
          roles: ['admin', 'center_head'],
        }
      );
    }

    items.push(
      {
        to: '/attendance',
        icon: <UserCheck className="h-5 w-5" />,
        label: 'Attendance',
        roles: ['admin', 'employee', 'center_head'],
      },
      {
        to: '/tasks',
        icon: <ClipboardList className="h-5 w-5" />,
        label: 'Tasks',
        roles: ['admin', 'marketing', 'employee', 'center_head'],
      }
    );

    if (['admin', 'marketing', 'center_head'].includes(role)) {
      items.push({
        to: '/admissions',
        icon: <Briefcase className="h-5 w-5" />,
        label: 'Admissions',
        roles: ['admin', 'marketing', 'center_head'],
      });
    }

    if (['admin', 'marketing'].includes(role)) {
      items.push({
        to: '/incentives',
        icon: <DollarSign className="h-5 w-5" />,
        label: 'Incentives',
        roles: ['admin', 'marketing'],
      });
    }

    if (['admin', 'marketing', 'center_head'].includes(role)) {
      items.push({
        to: '/targets',
        icon: <BarChart4 className="h-5 w-5" />,
        label: 'Targets',
        roles: ['admin', 'marketing', 'center_head'],
      });
    }

    if (role === 'admin') {
      items.push({
        to: '/reports',
        icon: <LineChart className="h-5 w-5" />,
        label: 'Reports',
        roles: ['admin'],
      });
    }

    items.push({
      to: '/settings',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      roles: ['admin', 'marketing', 'employee', 'center_head'],
    });

    return items.filter(item => item.roles.includes(role));
  };

  const navItems = getNavItems(role);

  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-primary-600">TrainCenter</h1>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.to}
              />
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white uppercase">
                  {currentUser?.name.charAt(0)}
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                <p className="text-xs font-medium text-gray-500 capitalize">{role.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;