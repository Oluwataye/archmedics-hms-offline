
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { healthRecordsService } from '@/services/healthRecordsService';

interface ProceduresTabProps {
  patientId: string;
  procedures: any[];
  onAddRecordClick: () => void;
}

const ProceduresTab: React.FC<ProceduresTabProps> = ({
  patientId,
  procedures,
  onAddRecordClick
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Procedures</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Procedure</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {procedures.length > 0 ? (
              procedures.map((record) => (
                <tr key={record.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {record.date instanceof Date ? 
                      record.date.toLocaleDateString() : 
                      new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.procedureName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.provider}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.procedureLocation}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs">{record.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                  No procedures found. Add a new procedure record.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button onClick={onAddRecordClick}>
          <PlusCircle className="h-4 w-4 mr-2" /> Add Procedure
        </Button>
      </div>
    </div>
  );
};

export default ProceduresTab;
