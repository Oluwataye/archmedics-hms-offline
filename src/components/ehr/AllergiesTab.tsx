
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface AllergiesTabProps {
  allergies: any[];
  onAddRecordClick: () => void;
}

const AllergiesTab: React.FC<AllergiesTabProps> = ({
  allergies,
  onAddRecordClick
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Allergies</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allergen</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reaction</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allergies.length > 0 ? (
              allergies.map((record) => (
                <tr key={record.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {record.date instanceof Date ? 
                      record.date.toLocaleDateString() : 
                      new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.allergen}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.reaction}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${record.severity === 'mild' ? 'bg-green-100 text-green-800' :
                        record.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {record.severity.charAt(0).toUpperCase() + record.severity.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs">{record.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                  No allergies found. Add a new allergy record.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button onClick={onAddRecordClick}>
          <PlusCircle className="h-4 w-4 mr-2" /> Add Allergy
        </Button>
      </div>
    </div>
  );
};

export default AllergiesTab;
