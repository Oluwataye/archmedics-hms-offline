
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Edit, 
  Printer, 
  Share2 
} from 'lucide-react';

interface PatientInfoCardProps {
  patient: {
    id: string;
    name: string;
    age?: number;
    gender?: string;
    dob?: string;
    address?: string;
    phone?: string;
    email?: string;
    status?: string;
  };
  onEdit?: () => void;
  onPrint?: () => void;
  onShare?: () => void;
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({
  patient,
  onEdit,
  onPrint,
  onShare
}) => {
  // Get status color based on status
  const getStatusColor = (status?: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Follow-up':
        return 'bg-yellow-100 text-yellow-800';
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Discharged':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center">
              <h3 className="font-bold text-lg text-gray-800">{patient.name}</h3>
              {patient.status && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              MRN: {patient.id} {patient.dob && `| DOB: ${patient.dob}`} {patient.gender && `| ${patient.gender}`}
            </div>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            {onEdit && (
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={onEdit}
              >
                <Edit className="h-4 w-4" /> Edit
              </Button>
            )}
            {onPrint && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={onPrint}
              >
                <Printer className="h-4 w-4" /> Print
              </Button>
            )}
            {onShare && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={onShare}
              >
                <Share2 className="h-4 w-4" /> Share
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {patient.age && patient.gender && (
            <div className="flex items-center">
              <User className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm">{patient.age} years, {patient.gender}</span>
            </div>
          )}
          {patient.dob && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm">DOB: {patient.dob}</span>
            </div>
          )}
          {patient.address && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm">{patient.address}</span>
            </div>
          )}
          {patient.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm">{patient.phone}</span>
            </div>
          )}
          {patient.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm">{patient.email}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;
