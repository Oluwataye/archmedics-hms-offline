
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Calendar, FileText, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StatItem {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  path: string;
}

const StatsOverview: React.FC = () => {
  const navigate = useNavigate();

  // Stats for dashboard
  const stats: StatItem[] = [
    { title: 'Total Patients', value: '1,247', icon: <User className="h-5 w-5 text-blue-600" />, color: 'bg-blue-100', path: '/ehr/patients' },
    { title: 'Appointments Today', value: '24', icon: <Calendar className="h-5 w-5 text-purple-600" />, color: 'bg-purple-100', path: '/ehr/appointments' },
    { title: 'Records Updated', value: '58', icon: <FileText className="h-5 w-5 text-green-600" />, color: 'bg-green-100', path: '/ehr/records' },
    { title: 'Critical Alerts', value: '3', icon: <AlertTriangle className="h-5 w-5 text-red-600" />, color: 'bg-red-100', path: '/ehr/alerts' },
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
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
  );
};

export default StatsOverview;
