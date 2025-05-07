import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Search, Send, User, Mail } from 'lucide-react';

interface ShareRecordsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
  patientName: string;
}

// Sample staff data - in a real application, this would come from an API
const staffData = [
  { id: 'D-001', name: 'Dr. Johnson', role: 'Doctor', department: 'Cardiology', email: 'johnson@hospital.com' },
  { id: 'D-002', name: 'Dr. Wilson', role: 'Doctor', department: 'General Medicine', email: 'wilson@hospital.com' },
  { id: 'D-003', name: 'Dr. Smith', role: 'Doctor', department: 'Neurology', email: 'smith@hospital.com' },
  { id: 'N-001', name: 'Nurse Adams', role: 'Nurse', department: 'Cardiology', email: 'adams@hospital.com' },
  { id: 'N-002', name: 'Nurse Thompson', role: 'Nurse', department: 'Emergency', email: 'thompson@hospital.com' },
];

const ShareRecordsModal: React.FC<ShareRecordsModalProps> = ({
  open,
  onOpenChange,
  patientId,
  patientName
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [includeOptions, setIncludeOptions] = useState({
    demographics: true,
    medicalHistory: true,
    medications: true,
    labResults: true,
    visits: false,
    allergies: false,
    immunizations: false
  });
  const [note, setNote] = useState('');
  
  // Filter staff based on search term
  const filteredStaff = staffData.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle checkbox changes
  const handleStaffSelection = (staffId: string) => {
    if (selectedStaff.includes(staffId)) {
      setSelectedStaff(selectedStaff.filter(id => id !== staffId));
    } else {
      setSelectedStaff([...selectedStaff, staffId]);
    }
  };
  
  // Handle send records
  const handleSendRecords = () => {
    if (selectedStaff.length === 0) {
      toast.error('Please select at least one recipient');
      return;
    }
    
    // Get selected staff details
    const recipients = staffData.filter(staff => selectedStaff.includes(staff.id));
    
    // Get selected record types
    const selectedRecordTypes = Object.entries(includeOptions)
      .filter(([_, isSelected]) => isSelected)
      .map(([type]) => type);
    
    // In a real application, this would send an API request
    toast.success(
      `Patient records for ${patientName} sent to ${recipients.length} healthcare provider(s)`,
      { description: `Included: ${selectedRecordTypes.join(', ')}` }
    );
    
    // Close the modal
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Send className="h-5 w-5 mr-2 text-blue-500" />
            Share Patient Records
          </DialogTitle>
          <DialogDescription>
            Send {patientName}'s records (ID: {patientId}) to healthcare providers
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search healthcare providers */}
          <div>
            <h3 className="text-sm font-medium mb-2">Select Recipients</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name, department or role..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Healthcare providers list */}
          <div className="border rounded-md max-h-60 overflow-y-auto">
            {filteredStaff.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No matching healthcare providers found
              </div>
            ) : (
              <div className="divide-y">
                {filteredStaff.map((staff) => (
                  <div key={staff.id} className="flex items-center p-3 hover:bg-gray-50">
                    <Checkbox 
                      id={`staff-${staff.id}`}
                      checked={selectedStaff.includes(staff.id)}
                      onCheckedChange={() => handleStaffSelection(staff.id)}
                    />
                    <div className="ml-3 flex-1">
                      <Label htmlFor={`staff-${staff.id}`} className="font-medium">{staff.name}</Label>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{staff.role}</span>
                        <span>•</span>
                        <span>{staff.department}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {staff.email}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Record types to include */}
          <div>
            <h3 className="text-sm font-medium mb-2">Records to Include</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-demographics" 
                  checked={includeOptions.demographics} 
                  onCheckedChange={(checked) => setIncludeOptions({...includeOptions, demographics: !!checked})}
                />
                <Label htmlFor="include-demographics">Demographics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-medical-history" 
                  checked={includeOptions.medicalHistory} 
                  onCheckedChange={(checked) => setIncludeOptions({...includeOptions, medicalHistory: !!checked})}
                />
                <Label htmlFor="include-medical-history">Medical History</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-medications" 
                  checked={includeOptions.medications} 
                  onCheckedChange={(checked) => setIncludeOptions({...includeOptions, medications: !!checked})}
                />
                <Label htmlFor="include-medications">Medications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-lab-results" 
                  checked={includeOptions.labResults} 
                  onCheckedChange={(checked) => setIncludeOptions({...includeOptions, labResults: !!checked})}
                />
                <Label htmlFor="include-lab-results">Lab Results</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-visits" 
                  checked={includeOptions.visits} 
                  onCheckedChange={(checked) => setIncludeOptions({...includeOptions, visits: !!checked})}
                />
                <Label htmlFor="include-visits">Visit History</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-allergies" 
                  checked={includeOptions.allergies} 
                  onCheckedChange={(checked) => setIncludeOptions({...includeOptions, allergies: !!checked})}
                />
                <Label htmlFor="include-allergies">Allergies</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-immunizations" 
                  checked={includeOptions.immunizations} 
                  onCheckedChange={(checked) => setIncludeOptions({...includeOptions, immunizations: !!checked})}
                />
                <Label htmlFor="include-immunizations">Immunizations</Label>
              </div>
            </div>
          </div>
          
          {/* Additional note */}
          <div>
            <Label htmlFor="note" className="text-sm font-medium">Add a Note (optional)</Label>
            <Textarea 
              id="note" 
              placeholder="Include any additional information or instructions..." 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSendRecords}>Send Records</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareRecordsModal;
