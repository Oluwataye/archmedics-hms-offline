
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, Users, UserCheck, Calendar } from 'lucide-react';
import { Patient } from '@/hooks/usePatientManagement';

interface PatientOverviewStatsProps {
  patients: Patient[];
  onViewStatistics: () => void;
}

const PatientOverviewStats: React.FC<PatientOverviewStatsProps> = ({
  patients,
  onViewStatistics
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
          Patient Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Patients</div>
              <div className="text-2xl font-bold">{patients.length}</div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Active Patients</div>
              <div className="text-2xl font-bold">
                {patients.filter(patient => patient.status === 'Active').length}
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">New This Month</div>
              <div className="text-2xl font-bold">
                {patients.filter(patient => patient.status === 'New').length}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            variant="link" 
            onClick={onViewStatistics}
            className="text-blue-600"
          >
            View Detailed Patient Statistics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientOverviewStats;
