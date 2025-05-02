
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, User, FileText } from 'lucide-react';

// Mock data for appointments
const mockAppointments = [
  { 
    id: 1, 
    patientName: 'Jane Smith', 
    time: '09:00 AM',
    type: 'Follow-up',
    status: 'Confirmed',
    duration: 30,
  },
  { 
    id: 2, 
    patientName: 'Robert Johnson', 
    time: '10:00 AM',
    type: 'New Patient',
    status: 'Confirmed',
    duration: 45,
  },
  { 
    id: 3, 
    patientName: 'Mary Williams', 
    time: '11:15 AM',
    type: 'Follow-up',
    status: 'Confirmed',
    duration: 30,
  },
  { 
    id: 4, 
    patientName: 'David Brown', 
    time: '01:30 PM',
    type: 'Follow-up',
    status: 'Confirmed',
    duration: 30,
  },
  { 
    id: 5, 
    patientName: 'Elizabeth Taylor', 
    time: '02:15 PM',
    type: 'New Patient',
    status: 'Confirmed',
    duration: 45,
  },
  { 
    id: 6, 
    patientName: 'Michael Davis', 
    time: '03:30 PM',
    type: 'Follow-up',
    status: 'Confirmed',
    duration: 30,
  }
];

interface AppointmentCalendarProps {
  onSelectAppointment?: (appointment: any) => void;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ onSelectAppointment }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const handleSelectAppointment = (appointment: any) => {
    if (onSelectAppointment) {
      onSelectAppointment(appointment);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage your schedule and patient appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{date ? date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                }) : ''}</h3>
                <Button variant="outline" size="sm">
                  Add Appointment
                </Button>
              </div>
              
              <div className="space-y-3">
                {mockAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectAppointment(appointment)}
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-medical-primary rounded-full mr-3"></div>
                      <div>
                        <h4 className="font-medium">{appointment.time}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="h-3 w-3 mr-1" />
                          <span>{appointment.patientName}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AppointmentCalendar;
