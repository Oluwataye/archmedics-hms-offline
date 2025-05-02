
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
  Users
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (key: string) => {
    setCollapsed({
      ...collapsed,
      [key]: !collapsed[key],
    });
  };

  // Navigation items based on user role
  const navigationItems = {
    admin: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
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
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
      { name: 'Appointments', icon: <Calendar size={20} />, path: '/appointments' },
      { name: 'Patients', icon: <User size={20} />, path: '/patients' },
      { name: 'Consultations', icon: <FilePlus size={20} />, path: '/consultations' },
      { name: 'Prescriptions', icon: <Pill size={20} />, path: '/prescriptions' },
    ],
    pharmacist: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
      { name: 'Inventory', icon: <Pill size={20} />, path: '/pharmacy/inventory' },
      { name: 'Dispensary', icon: <FilePlus size={20} />, path: '/pharmacy/dispensary' },
      { name: 'Sales', icon: <CreditCard size={20} />, path: '/pharmacy/sales' },
    ],
    nurse: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
      { name: 'Patients', icon: <User size={20} />, path: '/patients' },
      { name: 'Vitals', icon: <FileText size={20} />, path: '/vitals' },
      { name: 'Appointments', icon: <Calendar size={20} />, path: '/appointments' },
    ],
    labtech: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
      { name: 'Test Requests', icon: <FilePlus size={20} />, path: '/lab/requests' },
      { name: 'Results', icon: <TestTube size={20} />, path: '/lab/results' },
      { name: 'Inventory', icon: <Pill size={20} />, path: '/lab/inventory' },
    ],
    cashier: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
      { name: 'Billing', icon: <CreditCard size={20} />, path: '/billing' },
      { name: 'Payments', icon: <CreditCard size={20} />, path: '/payments' },
      { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
    ],
    ehr: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
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
    <div className="bg-sidebar text-sidebar-foreground w-64 flex-shrink-0 border-r border-gray-200 h-screen overflow-y-auto hidden md:block">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center">
          {/* Replace with your hospital logo */}
          <div className="w-10 h-10 rounded-full bg-medical-primary flex items-center justify-center text-white text-xl font-bold">A</div>
          <div className="ml-3">
            <h1 className="font-bold text-lg">ARCHMEDICS</h1>
            <p className="text-xs text-gray-500">Hospital Management System</p>
          </div>
        </div>
      </div>
      
      <div className="py-4">
        <div className="px-5 mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Main Navigation</p>
        </div>
        
        <nav>
          {navItems.map((item) => (
            <div key={item.path}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleCollapse(item.name)}
                    className="w-full flex items-center px-5 py-2.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                    <span className="ml-auto">
                      {collapsed[item.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  
                  {collapsed[item.name] && (
                    <div className="bg-sidebar-accent/50 pl-12 pr-5">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) => 
                            `block py-2 text-sm ${
                              isActive ? 'text-sidebar-primary font-medium' : 'text-sidebar-foreground'
                            } hover:text-sidebar-primary transition-colors`
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
                  className={({ isActive }) => 
                    `flex items-center px-5 py-2.5 text-sm ${
                      isActive 
                        ? 'bg-sidebar-primary/10 text-sidebar-primary font-medium' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    } transition-colors`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
