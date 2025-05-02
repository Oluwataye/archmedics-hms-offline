
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, FileText, Users } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, trend }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 
            'text-gray-500'
          }`}>
            {change} {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  userRole: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ userRole }) => {
  // Different stats based on user role
  const roleStats = {
    admin: [
      { title: 'Total Patients', value: '3,854', icon: <User size={18} />, change: '+12% from last month', trend: 'up' as const },
      { title: 'Staff Members', value: '49', icon: <Users size={18} />, change: 'No change from last month', trend: 'neutral' as const },
      { title: 'Average Daily Visits', value: '120', icon: <Calendar size={18} />, change: '+8% from last month', trend: 'up' as const },
      { title: 'Monthly Revenue', value: '$58,439', icon: <FileText size={18} />, change: '+5% from last month', trend: 'up' as const }
    ],
    doctor: [
      { title: 'Today\'s Appointments', value: '12', icon: <Calendar size={18} />, change: '2 more than yesterday', trend: 'up' as const },
      { title: 'Pending Consultations', value: '3', icon: <FileText size={18} />, change: 'No change', trend: 'neutral' as const },
      { title: 'Recent Patients', value: '28', icon: <User size={18} />, change: 'This week', trend: 'neutral' as const },
      { title: 'Average Consultation Time', value: '18 min', icon: <Calendar size={18} />, change: '-2 min from last week', trend: 'down' as const }
    ],
    nurse: [
      { title: 'Patients to Attend', value: '8', icon: <User size={18} />, change: '1 less than yesterday', trend: 'down' as const },
      { title: 'Vital Signs Recorded', value: '24', icon: <FileText size={18} />, change: 'Today', trend: 'neutral' as const },
      { title: 'Admissions', value: '3', icon: <Users size={18} />, change: 'Today', trend: 'neutral' as const },
      { title: 'Pending Tasks', value: '5', icon: <Calendar size={18} />, change: '2 more than yesterday', trend: 'up' as const }
    ],
    pharmacist: [
      { title: 'Prescriptions to Fill', value: '9', icon: <FileText size={18} />, change: '3 more than yesterday', trend: 'up' as const },
      { title: 'Drugs Running Low', value: '12', icon: <Calendar size={18} />, change: 'Inventory alert', trend: 'neutral' as const },
      { title: 'Sales Today', value: '$1,845', icon: <FileText size={18} />, change: '+15% from yesterday', trend: 'up' as const },
      { title: 'Expired Medications', value: '3', icon: <Calendar size={18} />, change: 'Need disposal', trend: 'neutral' as const }
    ],
    labtech: [
      { title: 'Pending Tests', value: '15', icon: <Calendar size={18} />, change: '5 more than yesterday', trend: 'up' as const },
      { title: 'Results Ready', value: '8', icon: <FileText size={18} />, change: 'Need review', trend: 'neutral' as const },
      { title: 'Samples Collected', value: '23', icon: <User size={18} />, change: 'Today', trend: 'neutral' as const },
      { title: 'Average Turnaround Time', value: '4.2 hrs', icon: <Calendar size={18} />, change: '-0.3 hrs from last week', trend: 'down' as const }
    ],
    cashier: [
      { title: 'Transactions Today', value: '42', icon: <FileText size={18} />, change: '+12% from yesterday', trend: 'up' as const },
      { title: 'Total Revenue', value: '$5,480', icon: <FileText size={18} />, change: 'Today', trend: 'neutral' as const },
      { title: 'Pending Payments', value: '3', icon: <Calendar size={18} />, change: 'Need attention', trend: 'neutral' as const },
      { title: 'Average Transaction', value: '$130', icon: <User size={18} />, change: '+$5 from last week', trend: 'up' as const }
    ],
    ehr: [
      { title: 'Records Updated', value: '38', icon: <FileText size={18} />, change: 'Today', trend: 'neutral' as const },
      { title: 'New Patient Records', value: '5', icon: <User size={18} />, change: 'Today', trend: 'neutral' as const },
      { title: 'Record Requests', value: '12', icon: <Calendar size={18} />, change: '3 more than yesterday', trend: 'up' as const },
      { title: 'Records Requiring Update', value: '7', icon: <FileText size={18} />, change: 'Need attention', trend: 'neutral' as const }
    ]
  };

  const stats = roleStats[userRole as keyof typeof roleStats] || roleStats.admin;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
