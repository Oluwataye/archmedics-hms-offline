
import React from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardList, Activity, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickLinks: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button 
        variant="outline" 
        className="p-6 h-auto flex-col items-center justify-center gap-2 hover:bg-gray-50"
        onClick={() => navigate('/ehr/lab-results')}
      >
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <ClipboardList className="h-6 w-6 text-blue-600" />
        </div>
        <span className="mt-2 font-medium">Lab Results</span>
        <span className="text-xs text-gray-500">View all test results</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="p-6 h-auto flex-col items-center justify-center gap-2 hover:bg-gray-50"
        onClick={() => navigate('/ehr/medications')}
      >
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Activity className="h-6 w-6 text-green-600" />
        </div>
        <span className="mt-2 font-medium">Medications</span>
        <span className="text-xs text-gray-500">Manage patient medications</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="p-6 h-auto flex-col items-center justify-center gap-2 hover:bg-gray-50"
        onClick={() => navigate('/ehr/analytics/statistics')}
      >
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <FileText className="h-6 w-6 text-purple-600" />
        </div>
        <span className="mt-2 font-medium">Analytics</span>
        <span className="text-xs text-gray-500">View patient statistics</span>
      </Button>
    </div>
  );
};

export default QuickLinks;
