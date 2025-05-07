
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Activity, CalendarClock, Pill, TestTube, User, FileSearch } from 'lucide-react';

interface MedicalHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
  patientName: string;
}

const MedicalHistoryModal: React.FC<MedicalHistoryModalProps> = ({
  open,
  onOpenChange,
  patientId,
  patientName
}) => {
  const [activeTab, setActiveTab] = useState('general');
  
  // Sample medical history data - in a real application, this would come from an API
  const medicalHistory = {
    general: [
      { date: 'Apr 27, 2025', type: 'Consultation', description: 'Initial evaluation for hypertension', doctor: 'Dr. Johnson' },
      { date: 'Apr 15, 2025', type: 'Follow-up', description: 'Blood pressure check', doctor: 'Dr. Johnson' },
      { date: 'Mar 22, 2025', type: 'Emergency', description: 'Severe headache and dizziness', doctor: 'Dr. Wilson' }
    ],
    medications: [
      { date: 'Apr 27, 2025', medication: 'Lisinopril', dosage: '10mg daily', duration: '30 days', prescribedBy: 'Dr. Johnson' },
      { date: 'Apr 15, 2025', medication: 'Amlodipine', dosage: '5mg daily', duration: '30 days', prescribedBy: 'Dr. Johnson' },
      { date: 'Mar 22, 2025', medication: 'Ibuprofen', dosage: '400mg as needed', duration: '7 days', prescribedBy: 'Dr. Wilson' }
    ],
    labResults: [
      { date: 'Apr 27, 2025', test: 'Blood Panel', result: 'Normal', orderedBy: 'Dr. Johnson' },
      { date: 'Apr 15, 2025', test: 'Lipid Panel', result: 'High Cholesterol', orderedBy: 'Dr. Johnson' },
      { date: 'Mar 22, 2025', test: 'CT Scan', result: 'No abnormalities detected', orderedBy: 'Dr. Wilson' }
    ],
    hospitalizations: [
      { admitDate: 'Mar 22, 2025', dischargeDate: 'Mar 23, 2025', reason: 'Observation for severe hypertension', doctor: 'Dr. Wilson' }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <FileSearch className="h-5 w-5 mr-2 text-blue-500" />
            Medical History for {patientName}
          </DialogTitle>
          <DialogDescription>
            Patient ID: {patientId} | Comprehensive medical history record
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="labResults">Lab Results</TabsTrigger>
            <TabsTrigger value="hospitalizations">Hospitalizations</TabsTrigger>
          </TabsList>
          
          {/* General History Tab */}
          <TabsContent value="general">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" /> Visit History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Visit Type</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Doctor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {medicalHistory.general.map((visit, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 font-medium">{visit.date}</td>
                          <td className="px-4 py-2">{visit.type}</td>
                          <td className="px-4 py-2">{visit.description}</td>
                          <td className="px-4 py-2">{visit.doctor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Medications Tab */}
          <TabsContent value="medications">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Pill className="h-4 w-4 mr-2 text-blue-500" /> Medication History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Medication</th>
                        <th className="px-4 py-2">Dosage</th>
                        <th className="px-4 py-2">Duration</th>
                        <th className="px-4 py-2">Prescribed By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {medicalHistory.medications.map((med, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 font-medium">{med.date}</td>
                          <td className="px-4 py-2">{med.medication}</td>
                          <td className="px-4 py-2">{med.dosage}</td>
                          <td className="px-4 py-2">{med.duration}</td>
                          <td className="px-4 py-2">{med.prescribedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Lab Results Tab */}
          <TabsContent value="labResults">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <TestTube className="h-4 w-4 mr-2 text-blue-500" /> Laboratory Results
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Test</th>
                        <th className="px-4 py-2">Result</th>
                        <th className="px-4 py-2">Ordered By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {medicalHistory.labResults.map((lab, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 font-medium">{lab.date}</td>
                          <td className="px-4 py-2">{lab.test}</td>
                          <td className="px-4 py-2">{lab.result}</td>
                          <td className="px-4 py-2">{lab.orderedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Hospitalizations Tab */}
          <TabsContent value="hospitalizations">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <CalendarClock className="h-4 w-4 mr-2 text-blue-500" /> Hospitalization History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-2">Admission Date</th>
                        <th className="px-4 py-2">Discharge Date</th>
                        <th className="px-4 py-2">Reason</th>
                        <th className="px-4 py-2">Attending Doctor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {medicalHistory.hospitalizations.map((hosp, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 font-medium">{hosp.admitDate}</td>
                          <td className="px-4 py-2">{hosp.dischargeDate}</td>
                          <td className="px-4 py-2">{hosp.reason}</td>
                          <td className="px-4 py-2">{hosp.doctor}</td>
                        </tr>
                      ))}
                      {medicalHistory.hospitalizations.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                            No hospitalization records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <div className="flex gap-2">
            <Button variant="outline">Print History</Button>
            <Button>Export as PDF</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalHistoryModal;
