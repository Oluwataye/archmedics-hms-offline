
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, BarChart2 } from 'lucide-react';

interface PatientManagementHeaderProps {
  onAddPatient: () => void;
  onViewStatistics: () => void;
}

const PatientManagementHeader: React.FC<PatientManagementHeaderProps> = ({
  onAddPatient,
  onViewStatistics
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Patient Management</h1>
        <div className="text-sm text-gray-500 flex items-center mt-1">
          <span>Health Records</span>
          <span className="mx-2">›</span>
          <span className="text-blue-500">Patient Management</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={onViewStatistics} variant="outline" className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          Patient Statistics
        </Button>
        <Button onClick={onAddPatient} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Patient
        </Button>
      </div>
    </div>
  );
};

export default PatientManagementHeader;
