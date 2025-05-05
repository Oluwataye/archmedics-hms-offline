
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, PlusCircle } from 'lucide-react';

interface PageHeaderProps {
  onNewRecordClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onNewRecordClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Patient Health Records</h1>
        <div className="text-sm text-gray-500 flex items-center mt-1">
          <span>Health Records</span>
          <span className="mx-2">›</span>
          <span className="text-blue-500">Patient Records</span>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button 
          className="flex items-center gap-2"
          onClick={onNewRecordClick}
        >
          <PlusCircle className="h-4 w-4" /> New Record
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" /> Import
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
