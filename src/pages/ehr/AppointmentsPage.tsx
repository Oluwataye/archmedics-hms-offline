
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Search, PlusCircle, Clock, User, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const AppointmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const isMobile = useIsMobile();

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      patientName: 'Maria Rodriguez',
      patientId: 'PT-103958',
      date: '2025-05-05T10:30:00',
      doctor: 'Dr. Sarah Wilson',
      department: 'Cardiology',
      status: 'confirmed',
      location: 'Main Campus, Room 305',
      type: 'Follow-up',
      duration: 30,
    },
    {
      id: 2,
      patientName: 'John Davis',
      patientId: 'PT-104203',
      date: '2025-05-05T13:15:00',
      doctor: 'Dr. Michael Brown',
      department: 'Neurology',
      status: 'pending',
      location: 'West Wing, Room 212',
      type: 'Initial Consultation',
      duration: 60,
    },
    {
      id: 3,
      patientName: 'Emily Johnson',
      patientId: 'PT-102845',
      date: '2025-05-06T09:00:00',
      doctor: 'Dr. James Lee',
      department: 'Orthopedics',
      status: 'confirmed',
      location: 'Main Campus, Room 118',
      type: 'Post-operative',
      duration: 45,
    },
    {
      id: 4,
      patientName: 'Robert Thompson',
      patientId: 'PT-105672',
      date: '2025-05-02T11:00:00',
      doctor: 'Dr. Jennifer Adams',
      department: 'Gastroenterology',
      status: 'completed',
      location: 'East Wing, Room 405',
      type: 'Follow-up',
      duration: 30,
    },
    {
      id: 5,
      patientName: 'Sophia Martinez',
      patientId: 'PT-101247',
      date: '2025-05-01T14:30:00',
      doctor: 'Dr. David Chen',
      department: 'Dermatology',
      status: 'cancelled',
      location: 'Main Campus, Room 210',
      type: 'Consultation',
      duration: 45,
    },
    {
      id: 6,
      patientName: 'William Wilson',
      patientId: 'PT-106583',
      date: '2025-04-30T10:15:00',
      doctor: 'Dr. Elizabeth Taylor',
      department: 'Pulmonology',
      status: 'completed',
      location: 'West Wing, Room 308',
      type: 'Follow-up',
      duration: 30,
    }
  ];

  const today = new Date();
  
  const upcomingAppointments = appointments.filter(
    app => new Date(app.date) >= today && app.status !== 'cancelled'
  );
  
  const pastAppointments = appointments.filter(
    app => new Date(app.date) < today || app.status === 'cancelled' || app.status === 'completed'
  );
  
  const currentAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;
  
  const filteredAppointments = currentAppointments.filter(app => 
    app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200" variant="outline">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200" variant="destructive">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatAppointmentTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="container mx-auto py-4 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">EHR Appointments</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="whitespace-nowrap">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="upcoming" className="w-full sm:w-auto">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="w-full sm:w-auto">Past & Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader className="bg-gray-50 pb-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-1">
                          {appointment.patientName}
                        </CardTitle>
                        <CardDescription>{appointment.patientId}</CardDescription>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 pb-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{formatAppointmentDate(appointment.date)}</p>
                          <p className="text-muted-foreground">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{formatAppointmentTime(appointment.date)}</p>
                          <p className="text-muted-foreground">{appointment.duration} min</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{appointment.doctor}</p>
                          <p className="text-muted-foreground">{appointment.department}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="truncate">{appointment.location}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex flex-wrap gap-2">
                    <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex-1">
                      View Details
                    </Button>
                    <Button variant="secondary" size={isMobile ? "sm" : "default"} className="flex-1">
                      Reschedule
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex justify-center py-8">
                <p className="text-lg text-muted-foreground">No appointments found</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className={appointment.status === 'cancelled' ? "border-red-200" : ""}>
                  <CardHeader className={`pb-3 ${appointment.status === 'cancelled' ? "bg-red-50" : "bg-gray-50"}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-1">
                          {appointment.patientName}
                        </CardTitle>
                        <CardDescription>{appointment.patientId}</CardDescription>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 pb-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{formatAppointmentDate(appointment.date)}</p>
                          <p className="text-muted-foreground">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{formatAppointmentTime(appointment.date)}</p>
                          <p className="text-muted-foreground">{appointment.duration} min</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{appointment.doctor}</p>
                          <p className="text-muted-foreground">{appointment.department}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="truncate">{appointment.location}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" size={isMobile ? "sm" : "default"} className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex justify-center py-8">
                <p className="text-lg text-muted-foreground">No past appointments found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentsPage;
