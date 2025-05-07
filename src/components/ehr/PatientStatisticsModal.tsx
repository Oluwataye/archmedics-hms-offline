
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, BarChart2, Users, UserCheck, Bed, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface PatientStatisticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sample data for charts
const patientAdmissionData = [
  { name: 'Jan', outpatient: 65, inpatient: 28 },
  { name: 'Feb', outpatient: 59, inpatient: 32 },
  { name: 'Mar', outpatient: 80, inpatient: 37 },
  { name: 'Apr', outpatient: 71, inpatient: 25 },
  { name: 'May', outpatient: 56, inpatient: 30 },
  { name: 'Jun', outpatient: 65, inpatient: 28 },
];

const wardOccupancyData = [
  { name: 'General', value: 35 },
  { name: 'Pediatric', value: 20 },
  { name: 'Surgical', value: 25 },
  { name: 'ICU', value: 15 },
  { name: 'Maternity', value: 5 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PatientStatisticsModal: React.FC<PatientStatisticsModalProps> = ({
  open,
  onOpenChange
}) => {
  const [timeRange, setTimeRange] = useState('6-months');
  
  // Summary statistics - in a real app, these would be calculated from actual data
  const summaryStats = {
    totalPatients: 1587,
    activePatients: 872,
    inpatientCount: 124,
    avgStayDuration: 4.3,
    dischargedThisMonth: 118,
    newPatientsThisMonth: 203
  };
  
  const handleExportReport = () => {
    toast.success('Patient statistics report exported successfully');
    // In a real application, this would generate a PDF or CSV file
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
            Patient Statistics & Reports
          </DialogTitle>
          <DialogDescription>
            View and export patient statistics and ward occupancy data
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Time Range:</span>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30-days">Last 30 Days</SelectItem>
                <SelectItem value="3-months">Last 3 Months</SelectItem>
                <SelectItem value="6-months">Last 6 Months</SelectItem>
                <SelectItem value="1-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleExportReport} className="flex items-center gap-2">
            <Download size={16} />
            Export Report
          </Button>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-2 mr-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Patients</div>
                  <div className="text-2xl font-bold">{summaryStats.totalPatients}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-2 mr-3">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Active Patients</div>
                  <div className="text-2xl font-bold">{summaryStats.activePatients}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-2 mr-3">
                  <Bed className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Current Inpatients</div>
                  <div className="text-2xl font-bold">{summaryStats.inpatientCount}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-2 gap-4">
          {/* Patient Admissions Chart */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Patient Admissions</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={patientAdmissionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="outpatient" fill="#0088FE" name="Outpatient" />
                  <Bar dataKey="inpatient" fill="#00C49F" name="Inpatient" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Ward Occupancy Chart */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Ward Occupancy</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={wardOccupancyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {wardOccupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="rounded-full bg-amber-100 p-2 mr-3">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">New Patients (Month)</div>
                  <div className="text-2xl font-bold">{summaryStats.newPatientsThisMonth}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                  <Bed className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Avg. Stay Duration</div>
                  <div className="text-2xl font-bold">{summaryStats.avgStayDuration} days</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="rounded-full bg-teal-100 p-2 mr-3">
                  <UserCheck className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Discharged (Month)</div>
                  <div className="text-2xl font-bold">{summaryStats.dischargedThisMonth}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientStatisticsModal;
