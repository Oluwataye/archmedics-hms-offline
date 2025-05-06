
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Upload, File, X } from 'lucide-react';
import { toast } from 'sonner';

interface PDFImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (files: File[], patientId: string, recordType: string) => void;
  patientId?: string;
}

const PDFImportModal: React.FC<PDFImportModalProps> = ({ 
  open, 
  onOpenChange,
  onImport,
  patientId
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState(patientId || '');
  const [recordType, setRecordType] = useState('medical-record');
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    
    if (fileList) {
      // Convert FileList to array and filter for PDF files
      const filesArray = Array.from(fileList);
      const pdfFiles = filesArray.filter(file => 
        file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
      );
      
      if (pdfFiles.length !== filesArray.length) {
        toast.warning('Only PDF files are supported. Non-PDF files were ignored.');
      }
      
      if (pdfFiles.length === 0) {
        toast.error('Please select PDF files to import.');
        return;
      }
      
      setSelectedFiles(prev => [...prev, ...pdfFiles]);
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };
  
  const handleImportClick = () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one PDF file to import.');
      return;
    }
    
    if (!selectedPatientId) {
      toast.error('Please select a patient ID.');
      return;
    }
    
    setIsImporting(true);
    
    // Simulate import process
    setTimeout(() => {
      onImport(selectedFiles, selectedPatientId, recordType);
      
      // Reset and close modal
      setIsImporting(false);
      setSelectedFiles([]);
      onOpenChange(false);
      
      toast.success(`${selectedFiles.length} file(s) successfully imported.`);
    }, 1500);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const fileList = e.dataTransfer.files;
    
    if (fileList) {
      // Convert FileList to array and filter for PDF files
      const filesArray = Array.from(fileList);
      const pdfFiles = filesArray.filter(file => 
        file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
      );
      
      if (pdfFiles.length !== filesArray.length) {
        toast.warning('Only PDF files are supported. Non-PDF files were ignored.');
      }
      
      if (pdfFiles.length === 0) {
        toast.error('Please select PDF files to import.');
        return;
      }
      
      setSelectedFiles(prev => [...prev, ...pdfFiles]);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Import PDF Records</DialogTitle>
          <DialogDescription>
            Upload patient records in PDF format. Only PDF files are supported.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Patient ID Selection */}
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient ID</Label>
            <Input
              id="patientId"
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              placeholder="Enter patient ID"
              disabled={!!patientId}
            />
          </div>
          
          {/* Record Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="recordType">Record Type</Label>
            <Select 
              value={recordType}
              onValueChange={(value) => setRecordType(value)}
            >
              <SelectTrigger id="recordType">
                <SelectValue placeholder="Select record type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical-record">Medical Record</SelectItem>
                <SelectItem value="lab-result">Lab Result</SelectItem>
                <SelectItem value="imaging">Imaging</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="discharge">Discharge Summary</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* File Upload Area */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,application/pdf"
              multiple
              className="hidden"
            />
            <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
            <p className="text-sm font-medium mb-1">Drag and drop files here</p>
            <p className="text-xs text-gray-500 mb-2">or click to browse files</p>
            <Button variant="outline" size="sm" type="button">
              Select Files
            </Button>
            <p className="text-xs text-gray-500 mt-2">Only PDF files are supported</p>
          </div>
          
          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files ({selectedFiles.length})</Label>
              <div className="max-h-32 overflow-y-auto border rounded-md p-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border-b last:border-0">
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <File className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImportClick} disabled={isImporting || selectedFiles.length === 0}>
            {isImporting ? 'Importing...' : 'Import Files'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PDFImportModal;
