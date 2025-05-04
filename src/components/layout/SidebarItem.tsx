
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { NavItem } from '@/types/navigation';

interface SidebarItemProps {
  item: NavItem;
  isCollapsed: boolean;
  toggleCollapse: (key: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isCollapsed, toggleCollapse }) => {
  return (
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
              {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>
          
          {isCollapsed && (
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
  );
};

export default SidebarItem;
