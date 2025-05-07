
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DiseaseFilterOptionsProps {
  searchTerm: string;
  timeRange: string;
  ageGroup: string;
  gender: string;
  onSearchChange: (value: string) => void;
  onTimeRangeChange: (value: string) => void;
  onAgeGroupChange: (value: string) => void;
  onGenderChange: (value: string) => void;
}

// Define constants for select options to ensure consistent values
const TIME_RANGE_OPTIONS = [
  { value: "all", label: "All Time" },
  { value: "current", label: "Current Quarter" }
];

const AGE_GROUP_OPTIONS = [
  { value: "all", label: "All Age Groups" },
  { value: "Child", label: "Children (0-17)" },
  { value: "Young Adult", label: "Young Adults (18-35)" },
  { value: "Adult", label: "Adults (36-65)" },
  { value: "Senior", label: "Seniors (65+)" }
];

const GENDER_OPTIONS = [
  { value: "all", label: "All Genders" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" }
];

const DiseaseFilterOptions: React.FC<DiseaseFilterOptionsProps> = ({
  searchTerm,
  timeRange,
  ageGroup,
  gender,
  onSearchChange,
  onTimeRangeChange,
  onAgeGroupChange,
  onGenderChange
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Filter Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by disease or department..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Select value={timeRange} onValueChange={onTimeRangeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {TIME_RANGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={ageGroup} onValueChange={onAgeGroupChange}>
              <SelectTrigger>
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                {AGE_GROUP_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={gender} onValueChange={onGenderChange}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseFilterOptions;
