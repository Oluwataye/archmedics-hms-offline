
import React from 'react';
import { Button } from '@/components/ui/button';

interface PatientsTablePaginationProps {
  totalCount: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const PatientsTablePagination: React.FC<PatientsTablePaginationProps> = ({
  totalCount,
  currentPage = 1,
  onPageChange = () => {}
}) => {
  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <div className="text-gray-500">
        Showing <span className="font-medium">1</span> to{" "}
        <span className="font-medium">{totalCount}</span> of{" "}
        <span className="font-medium">{totalCount}</span> patients
      </div>
      <div className="flex space-x-1">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-blue-50 border-blue-200"
        >
          {currentPage}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={true} // In this example, there's only one page
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PatientsTablePagination;
