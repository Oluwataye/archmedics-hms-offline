
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ClipboardList, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ActivityItem {
  id: number;
  action: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
}

const RecentActivity: React.FC = () => {
  const navigate = useNavigate();

  // Recent Activity data
  const recentActivity: ActivityItem[] = [
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

  return (
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
  );
};

export default RecentActivity;
