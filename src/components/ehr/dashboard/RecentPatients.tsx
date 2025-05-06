
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: string;
  lastVisit: string;
  records: number;
}

interface RecentPatientsProps {
  patients: Patient[];
  filteredPatients: Patient[];
}

const RecentPatients: React.FC<RecentPatientsProps> = ({ filteredPatients }) => {
  const navigate = useNavigate();
  
  return (
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
      <div className="p-0">
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
      </div>
    </Card>
  );
};

export default RecentPatients;
