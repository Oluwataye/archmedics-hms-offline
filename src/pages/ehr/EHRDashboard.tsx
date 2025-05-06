
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  User,
  Calendar,
  FileText,
  Activity,
  AlertTriangle,
  ClipboardList,
  PlusCircle,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import PatientVitals from '@/components/ehr/PatientVitals';
import PatientRegistrationModal from '@/components/ehr/PatientRegistrationModal';
import { ScrollArea } from '@/components/ui/scroll-area';

const EHRDashboard = () => {
  const navigate = useNavigate();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Stats for dashboard
  const stats = [
    { title: 'Total Patients', value: '1,247', icon: <User className="h-5 w-5 text-blue-600" />, color: 'bg-blue-100', path: '/ehr/patients' },
    { title: 'Appointments Today', value: '24', icon: <Calendar className="h-5 w-5 text-purple-600" />, color: 'bg-purple-100', path: '/ehr/appointments' },
    { title: 'Records Updated', value: '58', icon: <FileText className="h-5 w-5 text-green-600" />, color: 'bg-green-100', path: '/ehr/records' },
    { title: 'Critical Alerts', value: '3', icon: <AlertTriangle className="h-5 w-5 text-red-600" />, color: 'bg-red-100', path: '/ehr/alerts' },
  ];

  // Recent Activity
  const recentActivity = [
    {
      id: 1,
      action: 'Updated patient record for John Smith (P-10237)',
      time: '10 minutes ago',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      iconBg: 'bg-blue-100'
    },
    {
      id: 2,
      action: 'Added new lab results for Emily Davis (P-10892)',
      time: '25 minutes ago',
      icon: <ClipboardList className="h-4 w-4 text-green-600" />,
      iconBg: 'bg-green-100'
    },
    {
      id: 3,
      action: 'Vital signs recorded for Michael Brown (P-10745)',
      time: '1 hour ago',
      icon: <Activity className="h-4 w-4 text-purple-600" />,
      iconBg: 'bg-purple-100'
    },
  ];

  // Recent patients
  const recentPatients = [
    {
      id: 'P-10237',
      name: 'John Smith',
      age: 42,
      gender: 'Male',
      status: 'Active',
      lastVisit: 'Apr 25, 2025',
      records: 3
    },
    {
      id: 'P-10892',
      name: 'Emily Davis',
      age: 35,
      gender: 'Female',
      status: 'Follow-up',
      lastVisit: 'Apr 22, 2025',
      records: 5
    },
    {
      id: 'P-10745',
      name: 'Michael Brown',
      age: 58,
      gender: 'Male',
      status: 'New',
      lastVisit: 'Today',
      records: 1
    },
  ];

  const handleNewPatientSave = (data: any) => {
    // In a real app, this would call an API to save the patient data
    const newPatientId = `P-${Math.floor(10000 + Math.random() * 90000)}`;
    toast.success(`Patient ${data.name} registered successfully with ID: ${newPatientId}`);
    setIsRegistrationModalOpen(false);

    // Navigate to the patient records page after successful registration
    setTimeout(() => {
      navigate('/ehr/records');
    }, 1000);
  };

  // Filter patients based on search query
  const filteredPatients = searchQuery.trim() === '' 
    ? recentPatients 
    : recentPatients.filter(patient => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        patient.id.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() !== '') {
      toast.info(`Searching for: ${searchQuery}`);
      navigate(`/ehr/patients?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const handleCardClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <ScrollArea className="h-[calc(100vh-80px)]">
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Health Records Dashboard</h1>
          <div className="flex space-x-3">
            <Button 
              variant="default" 
              className="flex items-center gap-2"
              onClick={() => setIsRegistrationModalOpen(true)}
            >
              <PlusCircle className="h-4 w-4" />
              New Record
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/ehr/profile')}
            >
              My Profile
            </Button>
          </div>
        </div>

        <PatientRegistrationModal 
          open={isRegistrationModalOpen}
          onOpenChange={setIsRegistrationModalOpen}
          onSave={handleNewPatientSave}
        />

        {/* Quick Search */}
        <Card className="w-full md:w-2/3">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search patients, records, or diagnoses..."
                className="pl-8 pr-24"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-1 top-1 h-8"
                disabled={searchQuery.trim() === ''}
              >
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              onClick={() => handleCardClick(stat.path)}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4 flex items-center">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mr-3`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Patient Vitals */}
        <Card
          onClick={() => navigate('/ehr/vitals')}
          className="cursor-pointer hover:shadow-md transition-shadow"
        >
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Featured Patient Vitals</h2>
            <PatientVitals
              patientId="P-10237"
              patientName="John Smith"
              bloodPressure="120/80"
              heartRate="72"
              temperature="98.6"
              oxygenSaturation="98"
              recordedTime="Today, 10:30 AM"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Patients */}
          <Card 
            className="lg:col-span-2 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate('/ehr/patients')}
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">Recent Patients</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/ehr/patients');
                }}
              >
                View All
              </Button>
            </div>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {filteredPatients.map((patient) => (
                  <div 
                    key={patient.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/ehr/records?patient=${patient.id}`);
                    }}
                  >
                    <div className="flex items-start justify-between mb-1">
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
                    <div className="grid grid-cols-2 text-sm text-gray-600 mt-2">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-2 text-gray-400" />
                        <span>{patient.age} years, {patient.gender}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                        <span>Last visit: {patient.lastVisit}</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-500">{patient.records} Records</span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 h-auto text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/ehr/records?patient=${patient.id}`);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate('/ehr/activity')}
          >
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <CardContent className="p-4">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className={`${activity.iconBg} rounded-full p-2 mr-3`}>
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{activity.action}</p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="p-6 h-auto flex-col items-center justify-center gap-2 hover:bg-gray-50"
            onClick={() => navigate('/ehr/lab-results')}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
            <span className="mt-2 font-medium">Lab Results</span>
            <span className="text-xs text-gray-500">View all test results</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="p-6 h-auto flex-col items-center justify-center gap-2 hover:bg-gray-50"
            onClick={() => navigate('/ehr/medications')}
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <span className="mt-2 font-medium">Medications</span>
            <span className="text-xs text-gray-500">Manage patient medications</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="p-6 h-auto flex-col items-center justify-center gap-2 hover:bg-gray-50"
            onClick={() => navigate('/ehr/analytics/statistics')}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <span className="mt-2 font-medium">Analytics</span>
            <span className="text-xs text-gray-500">View patient statistics</span>
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default EHRDashboard;
