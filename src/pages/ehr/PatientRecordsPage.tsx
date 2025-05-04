import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Search, 
  User, 
  Calendar, 
  Stethoscope, 
  ListFilter,
  Heart,
  Activity,
  Printer,
  Share2,
  Download,
  Eye,
  PlusCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Sample patients data
const patientsData = [
  {
    id: 'P-10237',
    name: 'John Smith',
    age: 42,
    gender: 'Male',
    status: 'Active',
    lastVisit: 'Apr 25, 2025',
    doctor: 'Dr. Johnson',
    records: 3
  },
  {
    id: 'P-10892',
    name: 'Emily Davis',
    age: 35,
    gender: 'Female',
    status: 'Follow-up',
    lastVisit: 'Apr 22, 2025',
    doctor: 'Dr. Chen',
    records: 5
  },
  {
    id: 'P-10745',
    name: 'Michael Brown',
    age: 58,
    gender: 'Male',
    status: 'New',
    lastVisit: 'Today',
    doctor: 'Dr. Wilson',
    records: 1
  },
];

// Sample vital signs data
const vitalSigns = {
  bloodPressure: '120/80 mmHg',
  heartRate: '72 bpm',
  temperature: '98.6°F',
  oxygenSaturation: '98%',
  recordedTime: 'Today, 10:30 AM'
};

// Sample records data
const patientRecords = [
  {
    id: 1,
    date: 'Apr 25, 2025',
    type: 'Cardiology Consultation',
    provider: 'Dr. Johnson',
    status: 'Completed',
    statusColor: 'green'
  },
  {
    id: 2,
    date: 'Apr 20, 2025',
    type: 'Lab Results',
    provider: 'LabCorp',
    status: 'Reviewed',
    statusColor: 'blue'
  },
  {
    id: 3,
    date: 'Apr 15, 2025',
    type: 'X-ray Report',
    provider: 'Dr. Wilson',
    status: 'Pending',
    statusColor: 'yellow'
  }
];

const PatientRecordsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [patientStatus, setPatientStatus] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);
  const [recordType, setRecordType] = useState('');
  const [recordDate, setRecordDate] = useState('');
  const [recordNotes, setRecordNotes] = useState('');

  // Handle saving a new record
  const handleSaveRecord = () => {
    if (!recordType) {
      toast.error("Please select a record type");
      return;
    }

    toast.success(`Record saved for patient ${selectedPatient.name}`);
    setRecordType('');
    setRecordDate('');
    setRecordNotes('');
  };

  return (
    <div className="space-y-6">
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
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> New Record
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Import
          </Button>
        </div>
      </div>

      {/* Main Panel */}
      <Card>
        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search patients or records..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-4">
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Departments</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={patientStatus} onValueChange={setPatientStatus}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="discharged">Discharged</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">Last Updated:</span>
              <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1">
                <span className="font-medium text-gray-700">Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Records Content */}
        <div className="p-4">
          {/* Tabs Navigation */}
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> All Records
              </TabsTrigger>
              <TabsTrigger value="vitals" className="flex items-center gap-2">
                <Activity className="h-4 w-4" /> Vital Signs
              </TabsTrigger>
              <TabsTrigger value="procedures" className="flex items-center gap-2">
                <ListFilter className="h-4 w-4" /> Procedures
              </TabsTrigger>
              <TabsTrigger value="allergies" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> Allergies
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> History
              </TabsTrigger>
            </TabsList>

            {/* All Records Tab Content */}
            <TabsContent value="all" className="space-y-6">
              {/* Patient Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {patientsData.map((patient) => (
                  <div 
                    key={patient.id} 
                    className={`bg-white border ${selectedPatient.id === patient.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} rounded-lg p-4 transition-all duration-200 cursor-pointer hover:translate-y-[-2px] hover:shadow-md`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800">{patient.name}</h3>
                        <div className="text-sm text-gray-500">MRN: {patient.id}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full 
                        ${patient.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        patient.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                        {patient.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{patient.age} years, {patient.gender}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Last visit: {patient.lastVisit}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Stethoscope className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Primary: {patient.doctor}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-500">{patient.records} Records</span>
                        <span className="text-gray-500">Updated 2h ago</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Patient Record Details */}
              {selectedPatient && (
                <Card>
                  {/* Patient Header */}
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{selectedPatient.name}</h3>
                      <div className="text-sm text-gray-600">MRN: {selectedPatient.id} | {selectedPatient.age} years | {selectedPatient.gender}</div>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <Button variant="default" size="sm" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Printer className="h-4 w-4" /> Print
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" /> Share
                      </Button>
                    </div>
                  </div>

                  {/* Record Content */}
                  <CardContent className="p-4">
                    {/* Vital Signs Summary */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Heart className="h-5 w-5 text-red-500 mr-2" /> Vital Signs
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-xs text-blue-500 mb-1">Blood Pressure</div>
                          <div className="font-bold text-gray-800">{vitalSigns.bloodPressure}</div>
                          <div className="text-xs text-gray-500 mt-1">{vitalSigns.recordedTime}</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-xs text-green-500 mb-1">Heart Rate</div>
                          <div className="font-bold text-gray-800">{vitalSigns.heartRate}</div>
                          <div className="text-xs text-gray-500 mt-1">{vitalSigns.recordedTime}</div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="text-xs text-purple-500 mb-1">Temperature</div>
                          <div className="font-bold text-gray-800">{vitalSigns.temperature}</div>
                          <div className="text-xs text-gray-500 mt-1">{vitalSigns.recordedTime}</div>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <div className="text-xs text-yellow-500 mb-1">SpO2</div>
                          <div className="font-bold text-gray-800">{vitalSigns.oxygenSaturation}</div>
                          <div className="text-xs text-gray-500 mt-1">{vitalSigns.recordedTime}</div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Records */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-2" /> Recent Records
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {patientRecords.map((record) => (
                              <tr key={record.id}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{record.type}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{record.provider}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${record.statusColor}-100 text-${record.statusColor}-800`}>
                                    {record.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                  <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700 p-0 mr-2">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-0">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Add New Record */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <PlusCircle className="h-5 w-5 text-green-500 mr-2" /> Add New Record
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor="record-type">Record Type</Label>
                            <Select 
                              value={recordType} 
                              onValueChange={setRecordType}
                            >
                              <SelectTrigger id="record-type">
                                <SelectValue placeholder="Select record type..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="progress">Progress Note</SelectItem>
                                <SelectItem value="soap">SOAP Note</SelectItem>
                                <SelectItem value="discharge">Discharge Summary</SelectItem>
                                <SelectItem value="lab">Lab Result</SelectItem>
                                <SelectItem value="imaging">Imaging Report</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="record-date">Date</Label>
                            <Input 
                              id="record-date"
                              type="date" 
                              value={recordDate}
                              onChange={(e) => setRecordDate(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <Label htmlFor="record-notes">Notes</Label>
                          <Textarea
                            id="record-notes"
                            placeholder="Enter your notes here..."
                            className="min-h-[100px]"
                            value={recordNotes}
                            onChange={(e) => setRecordNotes(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleSaveRecord}>
                            Save Record
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Other tabs would have their specific content */}
            <TabsContent value="vitals">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Vital Signs History</h3>
                <p>Vital signs tracking and history would be displayed here.</p>
              </div>
            </TabsContent>

            <TabsContent value="procedures">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Procedures</h3>
                <p>Patient procedures and interventions would be listed here.</p>
              </div>
            </TabsContent>

            <TabsContent value="allergies">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Allergies</h3>
                <p>Patient allergies and adverse reactions would be listed here.</p>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Medical History</h3>
                <p>Complete medical history would be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default PatientRecordsPage;
