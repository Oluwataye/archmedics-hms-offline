
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  FilterX,
  Download,
  FileText,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronDown,
  Eye,
  Printer
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample test results data
const testResults = [
  {
    id: 'LAB-10245',
    patientId: 'P-10237',
    patientName: 'John Smith',
    testType: 'Complete Blood Count',
    requestedBy: 'Dr. Sarah Johnson',
    date: '2025-04-27',
    time: '09:15 AM',
    status: 'Completed',
    priority: 'Routine',
    results: [
      { name: 'White Blood Cells', value: '7.8', unit: '10³/µL', reference: '4.5-11.0', flag: 'normal' },
      { name: 'Red Blood Cells', value: '5.2', unit: '10⁶/µL', reference: '4.5-5.9', flag: 'normal' },
      { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', reference: '13.5-17.5', flag: 'normal' },
      { name: 'Hematocrit', value: '42', unit: '%', reference: '41-50', flag: 'normal' },
      { name: 'Platelets', value: '250', unit: '10³/µL', reference: '150-450', flag: 'normal' },
    ]
  },
  {
    id: 'LAB-10246',
    patientId: 'P-10238',
    patientName: 'Emily Davis',
    testType: 'Lipid Profile',
    requestedBy: 'Dr. Michael Brown',
    date: '2025-04-27',
    time: '09:30 AM',
    status: 'Pending',
    priority: 'Routine',
    results: []
  },
  {
    id: 'LAB-10247',
    patientId: 'P-10239',
    patientName: 'Robert Wilson',
    testType: 'Troponin I',
    requestedBy: 'Dr. Lisa Taylor',
    date: '2025-04-27',
    time: '09:45 AM',
    status: 'Critical',
    priority: 'STAT',
    results: [
      { name: 'Troponin I', value: '1.8', unit: 'ng/mL', reference: '0.00-0.04', flag: 'high' },
    ]
  },
  {
    id: 'LAB-10248',
    patientId: 'P-10240',
    patientName: 'Maria Garcia',
    testType: 'Liver Function Test',
    requestedBy: 'Dr. James Wilson',
    date: '2025-04-27',
    time: '10:00 AM',
    status: 'Completed',
    priority: 'Routine',
    results: [
      { name: 'ALT', value: '22', unit: 'U/L', reference: '7-56', flag: 'normal' },
      { name: 'AST', value: '25', unit: 'U/L', reference: '5-40', flag: 'normal' },
      { name: 'ALP', value: '68', unit: 'U/L', reference: '44-147', flag: 'normal' },
      { name: 'Total Bilirubin', value: '0.8', unit: 'mg/dL', reference: '0.1-1.2', flag: 'normal' },
      { name: 'Albumin', value: '4.2', unit: 'g/dL', reference: '3.4-5.4', flag: 'normal' },
    ]
  },
  {
    id: 'LAB-10249',
    patientId: 'P-10241',
    patientName: 'Thomas Rodriguez',
    testType: 'Blood Glucose',
    requestedBy: 'Dr. Anna Martinez',
    date: '2025-04-27',
    time: '10:15 AM',
    status: 'Completed',
    priority: 'Routine',
    results: [
      { name: 'Fasting Glucose', value: '130', unit: 'mg/dL', reference: '70-100', flag: 'high' },
    ]
  },
  {
    id: 'LAB-10250',
    patientId: 'P-10242',
    patientName: 'Jennifer Lee',
    testType: 'Thyroid Panel',
    requestedBy: 'Dr. Robert Clark',
    date: '2025-04-27',
    time: '10:30 AM',
    status: 'Pending',
    priority: 'Routine',
    results: []
  }
];

const LabResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [testTypeFilter, setTestTypeFilter] = useState('');
  const [expandedResult, setExpandedResult] = useState<string | null>(null);
  
  const filteredResults = testResults.filter(result => {
    const matchSearch = 
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = statusFilter ? result.status === statusFilter : true;
    const matchTestType = testTypeFilter ? result.testType === testTypeFilter : true;
    
    return matchSearch && matchStatus && matchTestType;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setTestTypeFilter('');
  };

  // Handle view result detail
  const handleViewResult = (id: string) => {
    if (expandedResult === id) {
      setExpandedResult(null);
    } else {
      setExpandedResult(id);
    }
  };

  // Handle print result
  const handlePrintResult = (id: string) => {
    toast.info(`Printing lab result ${id}`);
  };

  // Handle download result
  const handleDownloadResult = (id: string) => {
    toast.success(`Lab result ${id} downloaded successfully`);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-3 w-3 mr-1" />
        };
      case 'Pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="h-3 w-3 mr-1" />
        };
      case 'Critical':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <AlertTriangle className="h-3 w-3 mr-1" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: null
        };
    }
  };

  // Get priority badge color
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'STAT':
        return 'bg-red-100 text-red-800';
      case 'Urgent':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Get flag color for test results
  const getFlagColor = (flag: string) => {
    switch(flag) {
      case 'high':
        return 'text-red-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lab Results</h1>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <span>Health Records</span>
            <span className="mx-2">›</span>
            <span className="text-blue-500">Lab Results</span>
          </div>
        </div>
        <div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => toast.info("Import lab results functionality would go here")}
          >
            <Download className="h-4 w-4" />
            Import Results
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by patient or ID..."
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
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <Select value={testTypeFilter} onValueChange={setTestTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Test Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Test Types</SelectItem>
                  <SelectItem value="Complete Blood Count">Complete Blood Count</SelectItem>
                  <SelectItem value="Lipid Profile">Lipid Profile</SelectItem>
                  <SelectItem value="Liver Function Test">Liver Function Test</SelectItem>
                  <SelectItem value="Blood Glucose">Blood Glucose</SelectItem>
                  <SelectItem value="Troponin I">Troponin I</SelectItem>
                  <SelectItem value="Thyroid Panel">Thyroid Panel</SelectItem>
                </SelectContent>
              </Select>
              {(searchTerm || statusFilter || testTypeFilter) && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  title="Clear filters"
                  onClick={clearFilters}
                >
                  <FilterX className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Lab Results Table */}
          <div className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test Type</TableHead>
                    <TableHead>Ordered By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No lab results found matching your criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredResults.map((result) => (
                      <React.Fragment key={result.id}>
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="font-medium">{result.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{result.patientName}</div>
                            <div className="text-xs text-gray-500">{result.patientId}</div>
                          </TableCell>
                          <TableCell>{result.testType}</TableCell>
                          <TableCell>{result.requestedBy}</TableCell>
                          <TableCell>
                            <div>{result.date}</div>
                            <div className="text-xs text-gray-500">{result.time}</div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(result.priority)}`}>
                              {result.priority}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(result.status).color} flex items-center w-fit`}>
                              {getStatusBadge(result.status).icon}
                              {result.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleViewResult(result.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handlePrintResult(result.id)}
                              >
                                <Printer className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleDownloadResult(result.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        
                        {/* Expanded Result View */}
                        {expandedResult === result.id && (
                          <TableRow>
                            <TableCell colSpan={8} className="bg-gray-50 p-0">
                              <div className="p-4">
                                <div className="mb-4">
                                  <h3 className="font-semibold text-gray-900">{result.testType} Results</h3>
                                  <div className="text-sm text-gray-500">Patient: {result.patientName} ({result.patientId})</div>
                                </div>
                                
                                {result.status === 'Pending' ? (
                                  <div className="text-yellow-600 italic">Results pending - test in progress</div>
                                ) : (
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                      <thead className="bg-gray-100">
                                        <tr>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reference Range</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200">
                                        {result.results.map((item, idx) => (
                                          <tr key={idx}>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                                            <td className={`px-4 py-2 whitespace-nowrap text-sm font-semibold ${getFlagColor(item.flag)}`}>{item.value}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.unit}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.reference}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                                <div className="mt-4 text-right">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleViewResult(result.id)}
                                  >
                                    Close Details
                                  </Button>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredResults.length > 0 && (
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="text-gray-500">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredResults.length}</span> of{" "}
                  <span className="font-medium">{filteredResults.length}</span> results
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-blue-50 border-blue-200">1</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabResultsPage;
