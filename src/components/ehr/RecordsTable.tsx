
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';

interface RecordsTableProps {
  records: any[];
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.id}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {record.date instanceof Date ? 
                    record.date.toLocaleDateString() : 
                    new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.recordType === 'vital-signs' ? 'Vital Signs' :
                   record.recordType === 'procedures' ? 'Procedure' :
                   record.recordType === 'allergies' ? 'Allergy' :
                   record.recordType === 'history' ? 'Medical History' : record.recordType}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {record.provider || "N/A"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {record.status || "Completed"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700 p-0 mr-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                No records found. Add a new record to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;
