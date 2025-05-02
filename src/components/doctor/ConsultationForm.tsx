
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ConsultationFormProps {
  patientName?: string;
  patientId?: string;
  onSave?: (data: any) => void;
  onClose?: () => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ 
  patientName = "Jane Smith", 
  patientId = "P1001", 
  onSave,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [consultationData, setConsultationData] = useState({
    notes: '',
    diagnosis: '',
    treatment: '',
    followUp: '',
    followUpDate: '',
    prescriptions: [{ medication: '', dosage: '', frequency: '', duration: '' }],
    labTests: [{ testName: '', instructions: '' }]
  });

  const handleInputChange = (section: string, value: string) => {
    setConsultationData({
      ...consultationData,
      [section]: value
    });
  };

  const handlePrescriptionChange = (index: number, field: string, value: string) => {
    const updatedPrescriptions = [...consultationData.prescriptions];
    updatedPrescriptions[index] = {
      ...updatedPrescriptions[index],
      [field]: value
    };
    
    setConsultationData({
      ...consultationData,
      prescriptions: updatedPrescriptions
    });
  };

  const addPrescription = () => {
    setConsultationData({
      ...consultationData,
      prescriptions: [
        ...consultationData.prescriptions,
        { medication: '', dosage: '', frequency: '', duration: '' }
      ]
    });
  };

  const handleLabTestChange = (index: number, field: string, value: string) => {
    const updatedLabTests = [...consultationData.labTests];
    updatedLabTests[index] = {
      ...updatedLabTests[index],
      [field]: value
    };
    
    setConsultationData({
      ...consultationData,
      labTests: updatedLabTests
    });
  };

  const addLabTest = () => {
    setConsultationData({
      ...consultationData,
      labTests: [
        ...consultationData.labTests,
        { testName: '', instructions: '' }
      ]
    });
  };

  const handleSave = () => {
    toast.success('Consultation saved successfully');
    if (onSave) {
      onSave(consultationData);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Patient Consultation</CardTitle>
        <CardDescription>
          Patient: {patientName} (ID: {patientId})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="prescription">Prescription</TabsTrigger>
            <TabsTrigger value="labTests">Lab Tests</TabsTrigger>
            <TabsTrigger value="followUp">Follow-up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="consultationNotes">Consultation Notes</Label>
              <Textarea
                id="consultationNotes"
                placeholder="Enter consultation notes here..."
                value={consultationData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Textarea
                id="diagnosis"
                placeholder="Enter diagnosis..."
                value={consultationData.diagnosis}
                onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="treatment">Treatment Plan</Label>
              <Textarea
                id="treatment"
                placeholder="Enter treatment plan..."
                value={consultationData.treatment}
                onChange={(e) => handleInputChange('treatment', e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="prescription" className="space-y-4">
            {consultationData.prescriptions.map((prescription, index) => (
              <div key={index} className="p-4 border rounded-md space-y-3">
                <div className="space-y-2">
                  <Label>Medication</Label>
                  <Select 
                    value={prescription.medication} 
                    onValueChange={(value) => handlePrescriptionChange(index, 'medication', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select medication" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paracetamol">Paracetamol</SelectItem>
                      <SelectItem value="amoxicillin">Amoxicillin</SelectItem>
                      <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
                      <SelectItem value="omeprazole">Omeprazole</SelectItem>
                      <SelectItem value="lisinopril">Lisinopril</SelectItem>
                      <SelectItem value="metformin">Metformin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>Dosage</Label>
                    <Input 
                      placeholder="e.g., 500mg" 
                      value={prescription.dosage}
                      onChange={(e) => handlePrescriptionChange(index, 'dosage', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Input 
                      placeholder="e.g., Twice daily" 
                      value={prescription.frequency}
                      onChange={(e) => handlePrescriptionChange(index, 'frequency', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input 
                      placeholder="e.g., 5 days" 
                      value={prescription.duration}
                      onChange={(e) => handlePrescriptionChange(index, 'duration', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              type="button"
              onClick={addPrescription}
            >
              Add Another Medication
            </Button>
          </TabsContent>
          
          <TabsContent value="labTests" className="space-y-4">
            {consultationData.labTests.map((test, index) => (
              <div key={index} className="p-4 border rounded-md space-y-3">
                <div className="space-y-2">
                  <Label>Test Name</Label>
                  <Select 
                    value={test.testName} 
                    onValueChange={(value) => handleLabTestChange(index, 'testName', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select test" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbc">Complete Blood Count</SelectItem>
                      <SelectItem value="urinalysis">Urinalysis</SelectItem>
                      <SelectItem value="lipidProfile">Lipid Profile</SelectItem>
                      <SelectItem value="bloodGlucose">Blood Glucose</SelectItem>
                      <SelectItem value="liverFunction">Liver Function Test</SelectItem>
                      <SelectItem value="kidneyFunction">Kidney Function Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Special Instructions</Label>
                  <Textarea
                    placeholder="Any special instructions for this test..."
                    value={test.instructions}
                    onChange={(e) => handleLabTestChange(index, 'instructions', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              type="button"
              onClick={addLabTest}
            >
              Request Another Test
            </Button>
          </TabsContent>
          
          <TabsContent value="followUp" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="followUpNotes">Follow-up Notes</Label>
              <Textarea
                id="followUpNotes"
                placeholder="Enter follow-up notes here..."
                value={consultationData.followUp}
                onChange={(e) => handleInputChange('followUp', e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="followUpDate">Follow-up Date</Label>
              <Input
                id="followUpDate"
                type="date"
                value={consultationData.followUpDate}
                onChange={(e) => handleInputChange('followUpDate', e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Consultation</Button>
      </CardFooter>
    </Card>
  );
};

export default ConsultationForm;
