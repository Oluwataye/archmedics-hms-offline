import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectLabel,
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Bed, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface WardAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
  patientName: string;
}

// Sample ward data - in a real application, this would come from an API
const wardsData = [
  { id: 'W1', name: 'General Ward', totalBeds: 30, availableBeds: 12 },
  { id: 'W2', name: 'Surgical Ward', totalBeds: 20, availableBeds: 8 },
  { id: 'W3', name: 'Pediatric Ward', totalBeds: 15, availableBeds: 5 },
  { id: 'W4', name: 'Maternity Ward', totalBeds: 12, availableBeds: 3 },
  { id: 'W5', name: 'ICU', totalBeds: 10, availableBeds: 2 },
  { id: 'W6', name: 'Isolation Ward', totalBeds: 8, availableBeds: 4 },
];

// Sample doctors data
const doctorsData = [
  { id: 'dr-johnson', name: 'Dr. Johnson' },
  { id: 'dr-wilson', name: 'Dr. Wilson' },
  { id: 'dr-smith', name: 'Dr. Smith' },
  { id: 'dr-davis', name: 'Dr. Davis' },
];

const WardAssignmentModal: React.FC<WardAssignmentModalProps> = ({
  open,
  onOpenChange,
  patientId,
  patientName
}) => {
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [bedNumber, setBedNumber] = useState<string>('');
  const [admissionDate, setAdmissionDate] = useState<Date | undefined>(new Date());
  const [estimatedDischarge, setEstimatedDischarge] = useState<Date | undefined>();
  const [reason, setReason] = useState<string>('');
  const [doctor, setDoctor] = useState<string>('');
  
  // Get available beds for the selected ward
  const selectedWardDetails = wardsData.find(ward => ward.id === selectedWard);

  const handleAssign = () => {
    if (!selectedWard) {
      toast.error('Please select a ward');
      return;
    }
    
    if (!bedNumber) {
      toast.error('Please enter a bed number');
      return;
    }
    
    if (!admissionDate) {
      toast.error('Please select admission date');
      return;
    }
    
    if (!reason) {
      toast.error('Please enter reason for admission');
      return;
    }
    
    if (!doctor) {
      toast.error('Please select attending doctor');
      return;
    }
    
    // In a real application, this would make an API call to assign the ward and bed
    toast.success(
      `${patientName} assigned successfully to ${selectedWardDetails?.name}`,
      { description: `Bed #${bedNumber} | Admitted on ${format(admissionDate, 'PP')}` }
    );
    
    // Close the modal
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Bed className="h-5 w-5 mr-2 text-blue-500" />
            Ward Assignment
          </DialogTitle>
          <DialogDescription>
            Assign {patientName} (ID: {patientId}) to a hospital ward
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Ward Selection */}
          <div className="space-y-2">
            <Label htmlFor="ward-select">Ward</Label>
            <Select value={selectedWard} onValueChange={setSelectedWard}>
              <SelectTrigger>
                <SelectValue placeholder="Select ward" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {wardsData.map((ward) => (
                    <SelectItem 
                      key={ward.id} 
                      value={ward.id}
                      disabled={ward.availableBeds === 0}
                    >
                      {ward.name} ({ward.availableBeds} beds available)
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {/* Bed Number */}
          <div className="space-y-2">
            <Label htmlFor="bed-number">Bed Number</Label>
            <Input 
              id="bed-number" 
              placeholder="Enter bed number"
              value={bedNumber}
              onChange={(e) => setBedNumber(e.target.value)}
            />
            {selectedWardDetails && (
              <p className="text-xs text-gray-500">
                Available beds: {selectedWardDetails.availableBeds} of {selectedWardDetails.totalBeds}
              </p>
            )}
          </div>
          
          {/* Admission Date */}
          <div className="space-y-2">
            <Label>Admission Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !admissionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {admissionDate ? format(admissionDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={admissionDate}
                  onSelect={setAdmissionDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Estimated Discharge */}
          <div className="space-y-2">
            <Label>Estimated Discharge (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !estimatedDischarge && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {estimatedDischarge ? format(estimatedDischarge, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={estimatedDischarge}
                  onSelect={setEstimatedDischarge}
                  initialFocus
                  disabled={(date) => date < (admissionDate || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Reason for Admission */}
          <div className="space-y-2">
            <Label htmlFor="admission-reason">Reason for Admission</Label>
            <Input 
              id="admission-reason" 
              placeholder="Medical reason for admission"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          
          {/* Attending Doctor */}
          <div className="space-y-2">
            <Label htmlFor="attending-doctor">Attending Doctor</Label>
            <Select value={doctor} onValueChange={setDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctorsData.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAssign}>Assign Ward</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WardAssignmentModal;
