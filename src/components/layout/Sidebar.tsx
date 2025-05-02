
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  FilePlus, 
  Pill, 
  TestTube, 
  FileText, 
  CreditCard, 
  Settings, 
  ChevronDown, 
  ChevronUp,
  Users,
  LogOut,
  FileCheck,
  Clock,
  Search
} from 'lucide-react';

// Add type for navigation items with optional children
interface NavItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  children?: { name: string; path: string }[];
  isActive?: boolean;
}

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (key: string) => {
    setCollapsed({
      ...collapsed,
      [key]: !collapsed[key],
    });
  };

  // Navigation items based on user role
  const navigationItems: Record<UserRole, NavItem[]> = {
    admin: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', isActive: true },
      { 
        name: 'Staff Management', 
        icon: <Users size={20} />, 
        path: '/staff', 
        children: [
          { name: 'All Staff', path: '/staff' },
          { name: 'Roles & Permissions', path: '/staff/roles' },
          { name: 'Schedule', path: '/staff/schedule' }
        ]
      },
      { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
      { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    ],
    doctor: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', isActive: true },
      { name: 'Consultations', icon: <FilePlus size={20} />, path: '/consultations' },
      { name: 'Seen Patients', icon: <FileCheck size={20} />, path: '/patients' },
      { name: 'Appointments', icon: <Calendar size={20} />, path: '/appointments' },
      { name: 'Prescriptions', icon: <Pill size={20} />, path: '/prescriptions' },
    ],
    pharmacist: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', isActive: true },
      { name: 'Inventory', icon: <Pill size={20} />, path: '/pharmacy/inventory' },
      { name: 'Dispensary', icon: <FilePlus size={20} />, path: '/pharmacy/dispensary' },
      { name: 'Sales', icon: <CreditCard size={20} />, path: '/pharmacy/sales' },
    ],
    nurse: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', isActive: true },
      { name: 'Patients', icon: <User size={20} />, path: '/patients' },
      { name: 'Vitals', icon: <FileText size={20} />, path: '/vitals' },
      { name: 'Appointments', icon: <Calendar size={20} />, path: '/appointments' },
    ],
    labtech: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', isActive: true },
      { name: 'Test Requests', icon: <FilePlus size={20} />, path: '/lab/requests' },
      { name: 'Results', icon: <TestTube size={20} />, path: '/lab/results' },
      { name: 'Inventory', icon: <Pill size={20} />, path: '/lab/inventory' },
    ],
    cashier: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', isActive: true },
      { name: 'Billing', icon: <CreditCard size={20} />, path: '/billing' },
      { name: 'Payments', icon: <CreditCard size={20} />, path: '/payments' },
      { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
    ],
    ehr: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', isActive: true },
      { name: 'Patient Records', icon: <User size={20} />, path: '/records' },
      { name: 'Documents', icon: <FileText size={20} />, path: '/documents' },
      { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
    ],
  };

  // Get navigation items for the current user role
  const getNavItems = (role?: UserRole) => {
    if (!role) return [];
    return navigationItems[role] || [];
  };

  const navItems = getNavItems(user?.role as UserRole);

  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 h-screen overflow-y-auto hidden md:block">
      <div className="h-20 bg-gray-900 flex items-center px-4">
        <div className="w-10 h-10 rounded-full bg-medical-primary flex items-center justify-center text-white text-xl font-bold">A</div>
        <div className="ml-3">
          <h1 className="font-bold text-lg">ARCHMEDICS</h1>
          <p className="text-xs text-gray-400">Hospital Management System</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <nav>
          {navItems.map((item, index) => (
            <div key={item.path}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleCollapse(item.name)}
                    className="w-full flex items-center px-4 py-4 text-sm transition-colors hover:bg-gray-700"
                  >
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                    <span className="ml-auto">
                      {collapsed[item.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  
                  {collapsed[item.name] && (
                    <div className="bg-gray-900/50 pl-12 pr-4">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) => 
                            `block py-2 text-sm ${
                              isActive ? 'text-medical-primary font-medium' : 'text-gray-300'
                            } hover:text-white transition-colors`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => {
                    const activeClass = isActive || item.isActive 
                      ? 'bg-medical-primary'
                      : 'bg-gray-800 hover:bg-gray-700';
                    return `h-16 ${activeClass} flex items-center px-4 transition-colors`;
                  }}
                >
                  <div className={`w-8 h-8 ${item.isActive ? 'bg-blue-600' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <span className="ml-6">{item.name}</span>
                </NavLink>
              )}
            </div>
          ))}
          
          {/* Spacer */}
          <div className="flex-1 min-h-[50px]"></div>
          
          {/* Logout Button */}
          <button 
            onClick={logout}
            className="h-16 w-full bg-gray-800 flex items-center px-4 hover:bg-gray-700 transition-colors"
          >
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <LogOut size={16} />
            </div>
            <span className="ml-6">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
