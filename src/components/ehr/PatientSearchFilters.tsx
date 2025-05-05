
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PatientSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
  patientStatus: string;
  setPatientStatus: (value: string) => void;
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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search patients or records..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="oncology">Oncology</SelectItem>
            </SelectContent>
          </Select>
          <Select value={patientStatus} onValueChange={setPatientStatus}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="discharged">Discharged</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-gray-500 text-sm mr-2">Last Updated:</span>
        <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1">
          <span className="font-medium text-gray-700">Today</span>
        </div>
      </div>
    </div>
  );
};

export default PatientSearchFilters;
