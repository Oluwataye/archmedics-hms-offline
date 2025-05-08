
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface PatientSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  genderFilter: string;
  setGenderFilter: (gender: string) => void;
  onExport: () => void;
}

// Define constants for select options
const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Follow-up", label: "Follow-up" },
  { value: "New", label: "New" },
  { value: "Discharged", label: "Discharged" }
];

const GENDER_OPTIONS = [
  { value: "all", label: "All Genders" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" }
];

const PatientSearchFilters: React.FC<PatientSearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  genderFilter,
  setGenderFilter,
  onExport
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search patients..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
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
          <Select value={genderFilter} onValueChange={setGenderFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDER_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" title="More filters" className="hidden md:flex">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Export Button */}
      <Button 
        variant="outline" 
        className="flex items-center gap-2 whitespace-nowrap"
        onClick={onExport}
      >
        <Download className="h-4 w-4" />
        Export List
      </Button>
    </div>
  );
};

export default PatientSearchFilters;
