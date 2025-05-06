
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ListFilter } from 'lucide-react';

interface PatientSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  department: string;
  setDepartment: (department: string) => void;
  patientStatus: string;
  setPatientStatus: (status: string) => void;
}

const PatientSearchFilters: React.FC<PatientSearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  department,
  setDepartment,
  patientStatus,
  setPatientStatus
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search patient name, ID, or diagnosis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ListFilter className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">Filters:</span>
        </div>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="neurology">Neurology</SelectItem>
            <SelectItem value="pediatrics">Pediatrics</SelectItem>
            <SelectItem value="orthopedics">Orthopedics</SelectItem>
            <SelectItem value="internal">Internal Medicine</SelectItem>
            <SelectItem value="gynecology">Gynecology</SelectItem>
            <SelectItem value="oncology">Oncology</SelectItem>
          </SelectContent>
        </Select>
        <Select value={patientStatus} onValueChange={setPatientStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="follow-up">Follow-up</SelectItem>
            <SelectItem value="discharged">Discharged</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="new">New</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PatientSearchFilters;
