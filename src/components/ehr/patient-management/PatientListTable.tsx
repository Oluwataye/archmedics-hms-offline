
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileSearch, 
  Edit, 
  MoreHorizontal, 
  Send, 
  Bed, 
  Download, 
  Trash,
  Phone,
  Mail
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Patient } from '@/hooks/usePatientManagement';

interface PatientListTableProps {
  patients: Patient[];
  onViewMedicalHistory: (patient: Patient) => void;
  onEditPatient: (id: string) => void;
  onShareRecords: (patient: Patient) => void;
  onWardAssignment: (patient: Patient) => void;
  onDeletePatient: (id: string) => void;
}

const PatientListTable: React.FC<PatientListTableProps> = ({
  patients,
  onViewMedicalHistory,
  onEditPatient,
  onShareRecords,
  onWardAssignment,
  onDeletePatient
}) => {
  // Status badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
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
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Patient</th>
            <th className="px-4 py-3">Contact Info</th>
            <th className="px-4 py-3">DOB</th>
            <th className="px-4 py-3">Insurance</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Last Visit</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {patients.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                No patients found matching your search criteria.
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{patient.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{patient.name}</div>
                  <div className="text-xs text-gray-500">{patient.age} years, {patient.gender}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <Phone className="h-3 w-3 mr-1" /> {patient.contact}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Mail className="h-3 w-3 mr-1" /> {patient.email}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{patient.dob}</td>
                <td className="px-4 py-3 text-gray-500">{patient.insurance}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{patient.lastVisit}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-blue-500" 
                      title="Medical History"
                      onClick={() => onViewMedicalHistory(patient)}
                    >
                      <FileSearch className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500" 
                      title="Edit Patient"
                      onClick={() => onEditPatient(patient.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-500"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onShareRecords(patient)}>
                          <Send className="h-4 w-4 mr-2" /> Share Records
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onWardAssignment(patient)}>
                          <Bed className="h-4 w-4 mr-2" /> Ward Assignment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast.info(`Download records for ${patient.name}`)}>
                          <Download className="h-4 w-4 mr-2" /> Download Records
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeletePatient(patient.id)} className="text-red-500 focus:text-red-500">
                          <Trash className="h-4 w-4 mr-2" /> Delete Patient
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientListTable;
