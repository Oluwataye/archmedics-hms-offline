import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
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
    if (path === '/lab') return 'Laboratory Dashboard';
    if (path === '/lab/requests') return 'Test Requests';
    if (path === '/lab/results') return 'Test Results';
    if (path === '/lab/results/pending') return 'Pending Results';
    if (path === '/lab/results/completed') return 'Completed Results';
    if (path === '/lab/results/critical') return 'Critical Results';
    if (path === '/lab/inventory') return 'Lab Inventory';
    if (path === '/lab/quality') return 'Quality Control';
    if (path === '/lab/equipment') return 'Lab Equipment';
    
    return 'Dashboard';
  };

  // Handle profile click
  const handleProfileClick = () => {
    navigate('/ehr/profile');
    toast.info('Navigating to your profile');
  };

  // Handle settings click
  const handleSettingsClick = () => {
    navigate('/settings');
    toast.info('Navigating to settings');
  };

  // Handle logout with confirmation
  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
  };

  // Check if current user is cashier and on cashier dashboard
  const showCashierTotal = user?.role === 'cashier' && location.pathname.includes('/cashier');
  
  // Check if current user is lab tech and on lab pages
  const showLabMetrics = user?.role === 'labtech' && location.pathname.includes('/lab');

  // Dynamic total based on page
  const getCashierTotal = () => {
    // In a real app, this would be fetched from state or context
    if (location.pathname === '/cashier') return "$149.50";
    if (location.pathname === '/cashier/reports') return "$3,450.75"; 
    if (location.pathname === '/cashier/refunds') return "$0.00";
    return "$149.50"; // Default
  };
  
  // Get lab metrics based on the page
  const getPendingTestsCount = () => {
    return "12"; // This would be dynamic in a real app
  };
  
  const getCriticalResultsCount = () => {
    return "2"; // This would be dynamic in a real app
  };

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
            <span className="text-gray-800 font-bold text-sm">Total: {getCashierTotal()}</span>
          </div>
        )}
        
        {/* Show lab metrics for lab techs */}
        {showLabMetrics && (
          <>
            <div className="h-10 px-4 bg-blue-50 border border-blue-200 rounded flex items-center">
              <span className="text-gray-800 font-bold text-sm">Pending Tests: <span className="text-blue-600">{getPendingTestsCount()}</span></span>
            </div>
            <div className="h-10 px-4 bg-red-50 border border-red-200 rounded flex items-center">
              <span className="text-gray-800 font-bold text-sm">Critical Results: <span className="text-red-600">{getCriticalResultsCount()}</span></span>
            </div>
          </>
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
            <DropdownMenuItem onClick={handleProfileClick}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
