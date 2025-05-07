
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface DiseasePrevalenceHeaderProps {
  onExportReport: () => void;
}

const DiseasePrevalenceHeader: React.FC<DiseasePrevalenceHeaderProps> = ({ 
  onExportReport 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold mb-1">Disease Prevalence Reports</h1>
        <p className="text-gray-500 text-sm">View and analyze disease prevalence statistics</p>
      </div>
      <Button 
        onClick={onExportReport}
        className="flex items-center gap-2"
      >
        <Download size={16} />
        Export Report
      </Button>
    </div>
  );
};

export default DiseasePrevalenceHeader;
