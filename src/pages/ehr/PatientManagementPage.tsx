
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  PlusCircle, 
  User, 
  Phone, 
  Mail, 
  Home, 
  Calendar,
  File, 
  Edit,
  Trash,
  Download,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import PatientRegistrationModal from '@/components/ehr/PatientRegistrationModal';

// Sample patient data
const patientsData = [
  { 
    id: 'P-10237', 
    name: 'John Smith', 
    age: 42, 
    gender: 'Male', 
    contact: '(555) 123-4567',
    email: 'john.smith@example.com',
    address: '123 Main St, Cityville',
    dob: '1983-05-12',
    insurance: 'Blue Cross',
    status: 'Active',
    lastVisit: 'Apr 25, 2025'
  },
  { 
    id: 'P-10892', 
    name: 'Emily Davis', 
    age: 35, 
    gender: 'Female',
    contact: '(555) 987-6543',
    email: 'emily.davis@example.com',
    address: '456 Oak Ave, Townsville',
    dob: '1990-08-23',
    insurance: 'Aetna',
    status: 'Follow-up',
    lastVisit: 'Apr 22, 2025'
  },
  { 
    id: 'P-10745', 
    name: 'Michael Brown', 
    age: 58, 
    gender: 'Male',
    contact: '(555) 456-7890',
    email: 'michael.brown@example.com',
    address: '789 Pine Rd, Villagetown',
    dob: '1967-11-30',
    insurance: 'Medicare',
    status: 'New',
    lastVisit: 'Apr 27, 2025'
  },
  { 
    id: 'P-10478', 
    name: 'Sarah Johnson', 
    age: 29, 
    gender: 'Female',
    contact: '(555) 321-7654',
    email: 'sarah.johnson@example.com',
    address: '234 Elm St, Hamletville',
    dob: '1996-02-15',
    insurance: 'Cigna',
    status: 'Active',
    lastVisit: 'Apr 20, 2025'
  },
  { 
    id: 'P-10356', 
    name: 'David Wilson', 
    age: 64, 
    gender: 'Male',
    contact: '(555) 234-5678',
    email: 'david.wilson@example.com',
    address: '567 Maple Dr, Boroughville',
    dob: '1961-07-03',
    insurance: 'AARP',
    status: 'Discharged',
    lastVisit: 'Apr 15, 2025'
  },
  { 
    id: 'P-10589', 
    name: 'Jennifer Lee', 
    age: 41, 
    gender: 'Female',
    contact: '(555) 876-5432',
    email: 'jennifer.lee@example.com',
    address: '890 Cedar Ln, Districtville',
    dob: '1984-09-28',
    insurance: 'UnitedHealth',
    status: 'Active',
    lastVisit: 'Apr 23, 2025'
  }
];

const PatientManagementPage = () => {
  const [patients, setPatients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  // Filter patients based on search term and filters
  const filteredPatients = patients.filter(patient => {
    // Search by name, ID or email
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by status
    const matchesStatus = statusFilter ? patient.status === statusFilter : true;

    // Filter by gender
    const matchesGender = genderFilter ? patient.gender === genderFilter : true;

    return matchesSearch && matchesStatus && matchesGender;
  });

  // Handle adding a new patient
  const handleAddPatient = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleNewPatientSave = (data: any) => {
    // Generate a new patient ID
    const newPatientId = `P-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Create a new patient object
    const newPatient = {
      id: newPatientId,
      name: data.name,
      age: parseInt(data.age),
      gender: data.gender,
      dob: data.dob,
      address: data.address,
      contact: data.phone,
      email: data.email,
      insurance: data.insurance || 'Not provided',
      status: data.status,
      lastVisit: 'Today'
    };
    
    // Add the new patient to the list
    setPatients([newPatient, ...patients]);
    
    // Show success message
    toast.success(`Patient ${data.name} registered successfully with ID: ${newPatientId}`);
    
    // Close the modal
    setIsRegistrationModalOpen(false);
  };

  // Handle patient deletion
  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter(patient => patient.id !== id));
    toast.success(`Patient ${id} removed successfully`);
  };

  // Handle patient edit
  const handleEditPatient = (id: string) => {
    toast.info(`Edit patient ${id} details would open in a modal`);
  };

  // Status badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Follow-up':
        return 'bg-yellow-100 text-yellow-800';
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Discharged':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Management</h1>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <span>Health Records</span>
            <span className="mx-2">›</span>
            <span className="text-blue-500">Patient Management</span>
          </div>
        </div>
        <Button onClick={handleAddPatient} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      <PatientRegistrationModal
        open={isRegistrationModalOpen}
        onOpenChange={setIsRegistrationModalOpen}
        onSave={handleNewPatientSave}
      />

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Discharged">Discharged</SelectItem>
                </SelectContent>
              </Select>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" title="More filters" className="hidden md:flex">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Patient List */}
          <div className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Contact Info</th>
                    <th className="px-4 py-3">DOB</th>
                    <th className="px-4 py-3">Insurance</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Visit</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                        No patients found matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{patient.id}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{patient.name}</div>
                          <div className="text-xs text-gray-500">{patient.age} years, {patient.gender}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <Phone className="h-3 w-3 mr-1" /> {patient.contact}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Mail className="h-3 w-3 mr-1" /> {patient.email}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{patient.dob}</td>
                        <td className="px-4 py-3 text-gray-500">{patient.insurance}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{patient.lastVisit}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-blue-500" 
                              title="View Records"
                              onClick={() => toast.info(`View records for ${patient.name}`)}
                            >
                              <File className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-500" 
                              title="Edit Patient"
                              onClick={() => handleEditPatient(patient.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-gray-500"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => toast.info(`Download records for ${patient.name}`)}>
                                  <Download className="h-4 w-4 mr-2" /> Download Records
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeletePatient(patient.id)} className="text-red-500 focus:text-red-500">
                                  <Trash className="h-4 w-4 mr-2" /> Delete Patient
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredPatients.length > 0 && (
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="text-gray-500">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredPatients.length}</span> of{" "}
                  <span className="font-medium">{filteredPatients.length}</span> patients
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

export default PatientManagementPage;
