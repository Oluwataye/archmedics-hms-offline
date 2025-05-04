
import React, { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { getNavigationItems } from '@/navigation/navigationConfig';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (key: string) => {
    setCollapsed({
      ...collapsed,
      [key]: !collapsed[key],
    });
  };

  const navItems = getNavigationItems(user?.role as UserRole);

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
          {navItems.map((item) => (
            <SidebarItem 
              key={item.path}
              item={item}
              isCollapsed={!!collapsed[item.name]}
              toggleCollapse={toggleCollapse}
            />
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
