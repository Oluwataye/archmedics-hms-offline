
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, PlusCircle } from 'lucide-react';
import PDFImportModal from './PDFImportModal';
import { toast } from 'sonner';

interface PageHeaderProps {
  onNewRecordClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onNewRecordClick }) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  
  const handleImport = (files: File[], patientId: string, recordType: string) => {
    // In a real app, this would upload the files to a server
    console.log('Importing files:', files);
    console.log('Patient ID:', patientId);
    console.log('Record Type:', recordType);
    
    toast.success(`${files.length} file(s) imported successfully for patient ${patientId}`);
  };
  
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
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setIsImportModalOpen(true)}
        >
          <FileText className="h-4 w-4" /> Import
        </Button>
      </div>
      
      <PDFImportModal
        open={isImportModalOpen}
        onOpenChange={setIsImportModalOpen}
        onImport={handleImport}
      />
    </div>
  );
};

export default PageHeader;
