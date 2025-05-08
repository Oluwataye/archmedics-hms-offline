
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

// Define constants for select options
const DEPARTMENT_OPTIONS = [
  { value: "all", label: "All Departments" },
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "internal", label: "Internal Medicine" },
  { value: "gynecology", label: "Gynecology" },
  { value: "oncology", label: "Oncology" }
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "follow-up", label: "Follow-up" },
  { value: "discharged", label: "Discharged" },
  { value: "critical", label: "Critical" },
  { value: "new", label: "New" }
];

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
            {DEPARTMENT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={patientStatus} onValueChange={setPatientStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PatientSearchFilters;
