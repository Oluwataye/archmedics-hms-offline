
import React, { useState, useEffect } from 'react';
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
import { toast } from "sonner";
import PatientVitals from '@/components/ehr/PatientVitals';
import PatientInfoCard from '@/components/ehr/PatientInfoCard';
import NewRecordForm from '@/components/ehr/NewRecordForm';
import { healthRecordsService } from '@/services/healthRecordsService';

// Sample patients data
const patientsData = [
  {
    id: 'P-10237',
    name: 'John Smith',
    age: 42,
    gender: 'Male',
    dob: '10/15/1982',
    address: '123 Main St, Anytown, CA',
    phone: '(555) 123-4567',
    email: 'john.smith@email.com',
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
    dob: '03/22/1990',
    address: '456 Oak Ave, Somewhere, CA',
    phone: '(555) 987-6543',
    email: 'emily.davis@email.com',
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
    dob: '11/07/1966',
    address: '789 Pine Rd, Nowhere, CA',
    phone: '(555) 456-7890',
    email: 'michael.brown@email.com',
    status: 'New',
    lastVisit: 'Today',
    doctor: 'Dr. Wilson',
    records: 1
  },
];

// Sample vital signs data - this will be replaced by records from our service
const defaultVitalSigns = {
  bloodPressure: '120/80',
  heartRate: '72',
  temperature: '98.6',
  oxygenSaturation: '98',
  recordedTime: 'Today, 10:30 AM'
};

const PatientRecordsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');
  const [patientStatus, setPatientStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);
  const [activeTab, setActiveTab] = useState('all');
  const [isNewRecordFormOpen, setIsNewRecordFormOpen] = useState(false);
  const [patientRecords, setPatientRecords] = useState<any[]>([]);
  const [vitalSigns, setVitalSigns] = useState(defaultVitalSigns);
  const [allergies, setAllergies] = useState<any[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<any[]>([]);

  // Load patient records when selected patient changes
  useEffect(() => {
    if (selectedPatient) {
      const records = healthRecordsService.getRecordsByPatient(selectedPatient.id);
      setPatientRecords(records);
      
      // Get vital signs records
      const vitals = healthRecordsService.getRecordsByType(selectedPatient.id, 'vital-signs');
      if (vitals.length > 0) {
        const latestVital = vitals[vitals.length - 1];
        setVitalSigns({
          bloodPressure: latestVital.bloodPressure || defaultVitalSigns.bloodPressure,
          heartRate: latestVital.heartRate || defaultVitalSigns.heartRate,
          temperature: latestVital.temperature || defaultVitalSigns.temperature,
          oxygenSaturation: latestVital.oxygenSaturation || defaultVitalSigns.oxygenSaturation,
          recordedTime: latestVital.date ? new Date(latestVital.date).toLocaleString() : defaultVitalSigns.recordedTime
        });
      } else {
        setVitalSigns(defaultVitalSigns);
      }

      // Get allergies records
      const allergyRecords = healthRecordsService.getRecordsByType(selectedPatient.id, 'allergies');
      setAllergies(allergyRecords);

      // Get procedures records
      const procedureRecords = healthRecordsService.getRecordsByType(selectedPatient.id, 'procedures');
      setProcedures(procedureRecords);

      // Get medical history records
      const historyRecords = healthRecordsService.getRecordsByType(selectedPatient.id, 'history');
      setMedicalHistory(historyRecords);
    }
  }, [selectedPatient]);

  const handleSaveRecord = (record: any) => {
    const savedRecord = healthRecordsService.addRecord(record);
    
    // Update local state based on record type
    setPatientRecords([...patientRecords, savedRecord]);
    
    // Close the form
    setIsNewRecordFormOpen(false);
    
    // Refresh specific record type data
    if (record.recordType === 'vital-signs') {
      setVitalSigns({
        bloodPressure: record.bloodPressure || defaultVitalSigns.bloodPressure,
        heartRate: record.heartRate || defaultVitalSigns.heartRate,
        temperature: record.temperature || defaultVitalSigns.temperature,
        oxygenSaturation: record.oxygenSaturation || defaultVitalSigns.oxygenSaturation,
        recordedTime: new Date(record.date).toLocaleString()
      });
    } else if (record.recordType === 'allergies') {
      setAllergies([...allergies, savedRecord]);
    } else if (record.recordType === 'procedures') {
      setProcedures([...procedures, savedRecord]);
    } else if (record.recordType === 'history') {
      setMedicalHistory([...medicalHistory, savedRecord]);
    }
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
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsNewRecordFormOpen(true)}
          >
            <PlusCircle className="h-4 w-4" /> New Record
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Import
          </Button>
        </div>
      </div>

      {/* Main Panel */}
      <Card>
        {/* Filters and Search */}
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
                    <SelectItem value="all">All Departments</SelectItem>
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
                    <SelectItem value="all">All Status</SelectItem>
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
          {isNewRecordFormOpen ? (
            <NewRecordForm 
              patientId={selectedPatient.id} 
              patientName={selectedPatient.name}
              onSave={handleSaveRecord}
              onCancel={() => setIsNewRecordFormOpen(false)}
            />
          ) : (
            <>
              {/* Tabs Navigation */}
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> All Records
                  </TabsTrigger>
                  <TabsTrigger value="vital-signs" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" /> Vital Signs
                  </TabsTrigger>
                  <TabsTrigger value="procedures" className="flex items-center gap-2">
                    <ListFilter className="h-4 w-4" /> Procedures
                  </TabsTrigger>
                  <TabsTrigger value="allergies" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Allergies
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
                            <span className="text-blue-500">{
                              healthRecordsService.getRecordsByPatient(patient.id).length || patient.records
                            } Records</span>
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
                      <PatientInfoCard 
                        patient={selectedPatient}
                        onEdit={() => toast.info("Edit patient information")}
                        onPrint={() => toast.info("Print patient records")}
                        onShare={() => toast.info("Share patient records")}
                      />

                      {/* Record Content */}
                      <CardContent className="p-4">
                        {/* Vital Signs Summary */}
                        <PatientVitals
                          patientId={selectedPatient.id}
                          patientName={selectedPatient.name}
                          bloodPressure={vitalSigns.bloodPressure}
                          heartRate={vitalSigns.heartRate}
                          temperature={vitalSigns.temperature}
                          oxygenSaturation={vitalSigns.oxygenSaturation}
                          recordedTime={vitalSigns.recordedTime}
                        />

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
                                {patientRecords.length > 0 ? (
                                  patientRecords.map((record) => (
                                    <tr key={record.id}>
                                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                        {record.date instanceof Date ? 
                                          record.date.toLocaleDateString() : 
                                          new Date(record.date).toLocaleDateString()}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {record.recordType === 'vital-signs' ? 'Vital Signs' :
                                         record.recordType === 'procedures' ? 'Procedure' :
                                         record.recordType === 'allergies' ? 'Allergy' :
                                         record.recordType === 'history' ? 'Medical History' : record.recordType}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                        {record.provider || selectedPatient.doctor}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                          {record.status || "Completed"}
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
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                                      No records found. Add a new record to get started.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Vital Signs Tab Content */}
                <TabsContent value="vital-signs">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Vital Signs History</h3>
                    
                    {selectedPatient && (
                      <div className="mb-4">
                        <PatientVitals
                          patientId={selectedPatient.id}
                          bloodPressure={vitalSigns.bloodPressure}
                          heartRate={vitalSigns.heartRate}
                          temperature={vitalSigns.temperature}
                          oxygenSaturation={vitalSigns.oxygenSaturation}
                          recordedTime={vitalSigns.recordedTime}
                        />
                      </div>
                    )}
                    
                    <div className="mt-6">
                      {selectedPatient && (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Pressure</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heart Rate</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O2 Saturation</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {healthRecordsService.getRecordsByType(selectedPatient.id, 'vital-signs').length > 0 ? (
                                healthRecordsService.getRecordsByType(selectedPatient.id, 'vital-signs').map((record) => (
                                  <tr key={record.id}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                      {record.date instanceof Date ? 
                                        record.date.toLocaleDateString() : 
                                        new Date(record.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.bloodPressure} mmHg</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.heartRate} bpm</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.temperature}°F</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.oxygenSaturation}%</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                                    No vital signs records found. Add a new record to get started.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          onClick={() => {
                            setActiveTab("all");
                            setIsNewRecordFormOpen(true);
                          }}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" /> Add Vital Signs
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Procedures Tab Content */}
                <TabsContent value="procedures">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Procedures</h3>
                    
                    {selectedPatient && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Procedure</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {procedures.length > 0 ? (
                              procedures.map((record) => (
                                <tr key={record.id}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                    {record.date instanceof Date ? 
                                      record.date.toLocaleDateString() : 
                                      new Date(record.date).toLocaleDateString()}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.procedureName}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.provider}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.procedureLocation}</td>
                                  <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs">{record.notes}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                                  No procedures found. Add a new procedure record.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        onClick={() => {
                          setActiveTab("all");
                          setIsNewRecordFormOpen(true);
                        }}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Procedure
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Allergies Tab Content */}
                <TabsContent value="allergies">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Allergies</h3>
                    
                    {selectedPatient && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allergen</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reaction</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {allergies.length > 0 ? (
                              allergies.map((record) => (
                                <tr key={record.id}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                    {record.date instanceof Date ? 
                                      record.date.toLocaleDateString() : 
                                      new Date(record.date).toLocaleDateString()}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.allergen}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.reaction}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                      ${record.severity === 'mild' ? 'bg-green-100 text-green-800' :
                                        record.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'}`}>
                                      {record.severity.charAt(0).toUpperCase() + record.severity.slice(1)}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs">{record.notes}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                                  No allergies found. Add a new allergy record.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        onClick={() => {
                          setActiveTab("all");
                          setIsNewRecordFormOpen(true);
                        }}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Allergy
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Medical History Tab Content */}
                <TabsContent value="history">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Medical History</h3>
                    
                    {selectedPatient && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {medicalHistory.length > 0 ? (
                              medicalHistory.map((record) => (
                                <tr key={record.id}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                    {record.date instanceof Date ? 
                                      record.date.toLocaleDateString() : 
                                      new Date(record.date).toLocaleDateString()}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.condition}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                    {record.diagnosisDate instanceof Date ? 
                                      record.diagnosisDate.toLocaleDateString() : 
                                      record.diagnosisDate ? new Date(record.diagnosisDate).toLocaleDateString() : 'N/A'}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.treatment}</td>
                                  <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs">{record.notes}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                                  No medical history found. Add a new history record.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        onClick={() => {
                          setActiveTab("all");
                          setIsNewRecordFormOpen(true);
                        }}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Medical History
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PatientRecordsPage;
