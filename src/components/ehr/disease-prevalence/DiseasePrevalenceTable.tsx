
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, FileSearch } from 'lucide-react';
import { DiseasePrevalenceData } from '@/types/diseasePrevalence';

interface DiseasePrevalenceTableProps {
  filteredData: DiseasePrevalenceData[];
  totalCount: number;
  onViewDetails: (id: string) => void;
}

const DiseasePrevalenceTable: React.FC<DiseasePrevalenceTableProps> = ({
  filteredData,
  totalCount,
  onViewDetails
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <FileSearch size={18} className="mr-2 text-blue-500" />
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
                      onClick={() => onViewDetails(item.id)}
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
              <span className="font-medium">{totalCount}</span> diseases
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiseasePrevalenceTable;
