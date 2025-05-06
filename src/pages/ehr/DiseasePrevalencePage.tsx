
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Download, 
  Filter, 
  Search,
  FileText,
  BarChart2,
  Virus
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

const DiseasePrevalencePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('all');
  const [ageGroup, setAgeGroup] = useState('all');
  const [gender, setGender] = useState('all');
  
  // Sample disease prevalence data
  const diseasePrevalenceData = [
    {
      id: 'DP-10045',
      disease: 'Hypertension',
      cases: 352,
      ageGroup: 'Adult (36-65)',
      gender: 'All',
      period: '2025 Q1',
      department: 'Cardiology',
      riskFactor: 'High',
      region: 'Urban',
      percentageIncrease: '+8%'
    },
    {
      id: 'DP-10046',
      disease: 'Type 2 Diabetes',
      cases: 278,
      ageGroup: 'Adult (36-65)',
      gender: 'All',
      period: '2025 Q1',
      department: 'Endocrinology',
      riskFactor: 'High',
      region: 'Urban',
      percentageIncrease: '+12%'
    },
    {
      id: 'DP-10047',
      disease: 'Asthma',
      cases: 192,
      ageGroup: 'All Ages',
      gender: 'All',
      period: '2025 Q1',
      department: 'Pulmonology',
      riskFactor: 'Medium',
      region: 'All',
      percentageIncrease: '+3%'
    },
    {
      id: 'DP-10048',
      disease: 'Influenza',
      cases: 423,
      ageGroup: 'All Ages',
      gender: 'All',
      period: '2025 Q1',
      department: 'General Medicine',
      riskFactor: 'Medium',
      region: 'All',
      percentageIncrease: '-15%'
    },
    {
      id: 'DP-10049',
      disease: 'COVID-19',
      cases: 118,
      ageGroup: 'All Ages',
      gender: 'All',
      period: '2025 Q1',
      department: 'Infectious Disease',
      riskFactor: 'Medium',
      region: 'All',
      percentageIncrease: '-42%'
    },
    {
      id: 'DP-10050',
      disease: 'Depression',
      cases: 245,
      ageGroup: 'Young Adult (18-35)',
      gender: 'All',
      period: '2025 Q1',
      department: 'Psychiatry',
      riskFactor: 'Medium',
      region: 'Urban',
      percentageIncrease: '+17%'
    }
  ];

  // Filter data based on selected filters and search term
  const filteredData = diseasePrevalenceData.filter(item => {
    const matchesSearch = 
      item.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTimeRange = timeRange === 'all' || 
      (timeRange === 'current' && item.period === '2025 Q1');
    
    const matchesAgeGroup = ageGroup === 'all' || 
      item.ageGroup.toLowerCase().includes(ageGroup.toLowerCase());
    
    const matchesGender = gender === 'all' || 
      item.gender.toLowerCase() === gender.toLowerCase() ||
      item.gender.toLowerCase() === 'all';
    
    return matchesSearch && matchesTimeRange && matchesAgeGroup && matchesGender;
  });

  // Handle export report
  const handleExportReport = () => {
    toast.success('Disease prevalence report exported successfully');
    // In a real application, this would generate a PDF or CSV file
  };

  // Handle view details
  const handleViewDetails = (id: string) => {
    toast.info(`Viewing details for disease prevalence ${id}`);
    // In a real application, this would open a modal or navigate to a details page
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Disease Prevalence Reports</h1>
          <p className="text-gray-500 text-sm">View and analyze disease prevalence statistics</p>
        </div>
        <Button 
          onClick={handleExportReport}
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Export Report
        </Button>
      </div>

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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={timeRange} onValueChange={setTimeRange}>
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
              <Select value={ageGroup} onValueChange={setAgeGroup}>
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
              <Select value={gender} onValueChange={setGender}>
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

      {/* Disease Prevalence Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Virus size={18} className="mr-2 text-blue-500" />
            <CardTitle>Disease Prevalence</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Disease</TableHead>
                <TableHead>Cases</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Age Group</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.disease}</TableCell>
                    <TableCell>{item.cases}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.ageGroup}</TableCell>
                    <TableCell>{item.period}</TableCell>
                    <TableCell className={item.percentageIncrease.startsWith('+') ? 'text-red-500' : 'text-green-500'}>
                      {item.percentageIncrease}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-blue-600"
                        onClick={() => handleViewDetails(item.id)}
                      >
                        <FileText size={14} className="mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    No disease prevalence data found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {filteredData.length > 0 && (
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <div>
                Showing <span className="font-medium">{filteredData.length}</span> of{" "}
                <span className="font-medium">{diseasePrevalenceData.length}</span> diseases
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiseasePrevalencePage;
