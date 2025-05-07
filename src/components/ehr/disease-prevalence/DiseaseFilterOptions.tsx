
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
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="current">Current Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={ageGroup} onValueChange={onAgeGroupChange}>
              <SelectTrigger>
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Age Groups</SelectItem>
                <SelectItem value="Child">Children (0-17)</SelectItem>
                <SelectItem value="Young Adult">Young Adults (18-35)</SelectItem>
                <SelectItem value="Adult">Adults (36-65)</SelectItem>
                <SelectItem value="Senior">Seniors (65+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={gender} onValueChange={onGenderChange}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseFilterOptions;
