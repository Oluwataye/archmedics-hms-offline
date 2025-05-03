
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Get current date and time formatted
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });

  // Get page title based on location
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/cashier') return 'Cashier Dashboard';
    if (path === '/cashier/reports') return 'Cashier Reports';
    if (path === '/cashier/reprint') return 'Receipt Reprint';
    if (path === '/cashier/refunds') return 'Process Refunds';
    if (path === '/pharmacy') return 'Pharmacy Dashboard';
    if (path === '/nurse') return 'Nurse Dashboard';
    
    return 'Dashboard';
  };

  // Check if current user is cashier and on cashier dashboard
  const showCashierTotal = user?.role === 'cashier' && location.pathname === '/cashier';

  return (
    <header className="bg-white border-b border-gray-200 h-20 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Show current transaction total for cashiers */}
        {showCashierTotal && (
          <div className="h-10 px-4 bg-blue-50 border border-blue-200 rounded flex items-center mr-6">
            <span className="text-gray-800 font-bold text-sm">Total: $149.50</span>
          </div>
        )}
      
        <span className="text-gray-500">{currentDate} | {currentTime}</span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <span className="mr-2 text-gray-700 hidden md:inline-block">
                {user?.role === 'doctor' ? `Dr. ${user?.name}` : user?.name}
              </span>
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user?.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
