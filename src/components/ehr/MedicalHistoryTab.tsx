
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface MedicalHistoryTabProps {
  medicalHistory: any[];
  onAddRecordClick: () => void;
}

const MedicalHistoryTab: React.FC<MedicalHistoryTabProps> = ({
  medicalHistory,
  onAddRecordClick
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Medical History</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {medicalHistory.length > 0 ? (
              medicalHistory.map((record) => (
                <tr key={record.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {record.date instanceof Date ? 
                      record.date.toLocaleDateString() : 
                      new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.condition}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {record.diagnosisDate instanceof Date ? 
                      record.diagnosisDate.toLocaleDateString() : 
                      record.diagnosisDate ? new Date(record.diagnosisDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.treatment}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs">{record.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                  No medical history found. Add a new history record.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button onClick={onAddRecordClick}>
          <PlusCircle className="h-4 w-4 mr-2" /> Add Medical History
        </Button>
      </div>
    </div>
  );
};

export default MedicalHistoryTab;
