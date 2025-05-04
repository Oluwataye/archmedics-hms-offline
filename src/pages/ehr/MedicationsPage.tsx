
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Pill, 
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  User,
  Trash,
  Edit,
  PlusCircle,
  X,
  Calendar as CalendarIcon
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

// Sample medications data
const medicationsData = [
  {
    id: 'MED-1024',
    patientId: 'P-10237',
    patientName: 'John Smith',
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2025-04-10',
    endDate: '2025-07-10',
    prescribedBy: 'Dr. Sarah Johnson',
    status: 'Active',
    instructions: 'Take in the morning with food',
    interactions: ['Potassium supplements', 'NSAIDs'],
    sideEffects: ['Cough', 'Dizziness']
  },
  {
    id: 'MED-1025',
    patientId: 'P-10237',
    patientName: 'John Smith',
    medication: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    startDate: '2025-04-10',
    endDate: '2025-10-10',
    prescribedBy: 'Dr. Sarah Johnson',
    status: 'Active',
    instructions: 'Take in the evening',
    interactions: ['Grapefruit juice', 'Erythromycin'],
    sideEffects: ['Muscle pain', 'Headache']
  },
  {
    id: 'MED-1026',
    patientId: 'P-10892',
    patientName: 'Emily Davis',
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2025-04-15',
    endDate: '2025-07-15',
    prescribedBy: 'Dr. Michael Brown',
    status: 'Active',
    instructions: 'Take with meals',
    interactions: ['Alcohol', 'Contrast dyes'],
    sideEffects: ['Nausea', 'Diarrhea']
  },
  {
    id: 'MED-1027',
    patientId: 'P-10745',
    patientName: 'Michael Brown',
    medication: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Every 8 hours',
    startDate: '2025-04-20',
    endDate: '2025-04-30',
    prescribedBy: 'Dr. James Wilson',
    status: 'Completed',
    instructions: 'Take until completed, even if feeling better',
    interactions: ['Alcohol'],
    sideEffects: ['Nausea', 'Diarrhea', 'Rash']
  },
  {
    id: 'MED-1028',
    patientId: 'P-10745',
    patientName: 'Michael Brown',
    medication: 'Prednisone',
    dosage: '20mg tapering',
    frequency: 'Once daily',
    startDate: '2025-04-22',
    endDate: '2025-05-12',
    prescribedBy: 'Dr. Anna Martinez',
    status: 'Active',
    instructions: 'Taper dose as directed',
    interactions: ['NSAIDs', 'Live vaccines'],
    sideEffects: ['Increased appetite', 'Mood changes', 'Insomnia']
  },
  {
    id: 'MED-1029',
    patientId: 'P-10239',
    patientName: 'Robert Wilson',
    medication: 'Furosemide',
    dosage: '40mg',
    frequency: 'Once daily',
    startDate: '2025-04-15',
    endDate: '2025-06-15',
    prescribedBy: 'Dr. Lisa Taylor',
    status: 'Discontinued',
    instructions: 'Take in the morning',
    interactions: ['Digoxin', 'Lithium'],
    sideEffects: ['Dehydration', 'Electrolyte imbalance']
  }
];

const MedicationsPage = () => {
  const [medications, setMedications] = useState(medicationsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newMedication, setNewMedication] = useState({
    patientId: '',
    medication: '',
    dosage: '',
    frequency: '',
    instructions: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMedicationDetails, setViewMedicationDetails] = useState<string | null>(null);

  // Filter medications based on search term and status filter
  const filteredMedications = medications.filter(med => {
    const matchesSearch = 
      med.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? med.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-3 w-3 mr-1" />
        };
      case 'Completed':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <CheckCircle className="h-3 w-3 mr-1" />
        };
      case 'Discontinued':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <X className="h-3 w-3 mr-1" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: null
        };
    }
  };

  // Handle medication actions
  const handleEditMedication = (id: string) => {
    toast.info(`Edit medication ${id}`);
  };

  const handleDiscontinueMedication = (id: string) => {
    const updatedMedications = medications.map(med => 
      med.id === id ? { ...med, status: 'Discontinued' } : med
    );
    setMedications(updatedMedications);
    toast.success(`Medication ${id} discontinued successfully`);
  };

  const toggleMedicationDetails = (id: string) => {
    if (viewMedicationDetails === id) {
      setViewMedicationDetails(null);
    } else {
      setViewMedicationDetails(id);
    }
  };

  const handleAddMedication = () => {
    const requiredFields = ['patientId', 'medication', 'dosage', 'frequency'];
    const missingFields = requiredFields.filter(field => !newMedication[field as keyof typeof newMedication]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // In a real app, this would be an API call to add the medication
    toast.success('Medication added successfully');
    setNewMedication({
      patientId: '',
      medication: '',
      dosage: '',
      frequency: '',
      instructions: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Medications</h1>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <span>Health Records</span>
            <span className="mx-2">›</span>
            <span className="text-blue-500">Medications</span>
          </div>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="flex items-center gap-2"
        >
          {showAddForm ? (
            <>
              <X className="h-4 w-4" /> Cancel
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" /> Add Medication
            </>
          )}
        </Button>
      </div>

      {/* Add Medication Form */}
      {showAddForm && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Add New Medication</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patient-id">Patient ID</Label>
                <Input
                  id="patient-id"
                  placeholder="Enter patient ID"
                  value={newMedication.patientId}
                  onChange={(e) => setNewMedication({...newMedication, patientId: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="medication">Medication</Label>
                <Input
                  id="medication"
                  placeholder="Enter medication name"
                  value={newMedication.medication}
                  onChange={(e) => setNewMedication({...newMedication, medication: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  placeholder="Enter dosage"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select 
                  value={newMedication.frequency} 
                  onValueChange={(value) => setNewMedication({...newMedication, frequency: value})}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once daily">Once daily</SelectItem>
                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                    <SelectItem value="Three times daily">Three times daily</SelectItem>
                    <SelectItem value="Four times daily">Four times daily</SelectItem>
                    <SelectItem value="Every 4 hours">Every 4 hours</SelectItem>
                    <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                    <SelectItem value="Every 8 hours">Every 8 hours</SelectItem>
                    <SelectItem value="Every 12 hours">Every 12 hours</SelectItem>
                    <SelectItem value="As needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Input
                  id="instructions"
                  placeholder="Enter instructions for patient"
                  value={newMedication.instructions}
                  onChange={(e) => setNewMedication({...newMedication, instructions: e.target.value})}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleAddMedication}>Add Medication</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search medications or patients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Medications List */}
          <div className="mt-6">
            {filteredMedications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No medications found matching your search criteria.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMedications.map((med) => (
                  <Card key={med.id} className="overflow-hidden">
                    <div className="border-l-4 border-blue-500 hover:bg-gray-50">
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Pill className="h-5 w-5 text-blue-500" />
                            <h3 className="font-semibold text-lg">{med.medication}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(med.status).color} flex items-center`}>
                              {getStatusBadge(med.status).icon}
                              {med.status}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            <span>{med.dosage}, {med.frequency}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2 text-sm">
                            <div className="flex items-center text-gray-600">
                              <User className="h-3.5 w-3.5 mr-1" />
                              <span>{med.patientName}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>{med.startDate} to {med.endDate}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <User className="h-3.5 w-3.5 mr-1" />
                              <span>{med.prescribedBy}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleMedicationDetails(med.id)}
                          >
                            {viewMedicationDetails === med.id ? 'Hide Details' : 'View Details'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditMedication(med.id)}
                            title="Edit medication"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {med.status === 'Active' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDiscontinueMedication(med.id)}
                              title="Discontinue medication"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {viewMedicationDetails === med.id && (
                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Instructions</h4>
                              <p className="text-sm text-gray-700">{med.instructions}</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Potential Interactions</h4>
                              <div className="flex flex-wrap gap-1">
                                {med.interactions.map((item, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-yellow-50">{item}</Badge>
                                ))}
                              </div>
                              <h4 className="font-medium mb-2 mt-3">Possible Side Effects</h4>
                              <div className="flex flex-wrap gap-1">
                                {med.sideEffects.map((item, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-red-50">{item}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredMedications.length > 0 && (
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="text-gray-500">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredMedications.length}</span> of{" "}
                  <span className="font-medium">{filteredMedications.length}</span> medications
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-blue-50 border-blue-200">1</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationsPage;
