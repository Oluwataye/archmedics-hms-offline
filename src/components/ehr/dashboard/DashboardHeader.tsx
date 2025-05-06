
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface DashboardHeaderProps {
  onOpenModal: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onOpenModal }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Health Records Dashboard</h1>
      <div className="flex space-x-3">
        <Button 
          variant="default" 
          className="flex items-center gap-2"
          onClick={onOpenModal}
        >
          <PlusCircle className="h-4 w-4" />
          New Record
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
