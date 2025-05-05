
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import PatientVitals from './PatientVitals';
import { healthRecordsService } from '@/services/healthRecordsService';

interface VitalSignsTabProps {
  patientId: string;
  patientName?: string;
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygenSaturation: string;
    recordedTime: string;
  };
  onAddRecordClick: () => void;
}

const VitalSignsTab: React.FC<VitalSignsTabProps> = ({
  patientId,
  patientName,
  vitalSigns,
  onAddRecordClick
}) => {
  const vitalSignsRecords = healthRecordsService.getRecordsByType(patientId, 'vital-signs');

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Vital Signs History</h3>
      
      <div className="mb-4">
        <PatientVitals
          patientId={patientId}
          patientName={patientName}
          bloodPressure={vitalSigns.bloodPressure}
          heartRate={vitalSigns.heartRate}
          temperature={vitalSigns.temperature}
          oxygenSaturation={vitalSigns.oxygenSaturation}
          recordedTime={vitalSigns.recordedTime}
        />
      </div>
      
      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Pressure</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heart Rate</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O2 Saturation</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vitalSignsRecords.length > 0 ? (
                vitalSignsRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {record.date instanceof Date ? 
                        record.date.toLocaleDateString() : 
                        new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.bloodPressure} mmHg</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.heartRate} bpm</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.temperature}°F</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.oxygenSaturation}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                    No vital signs records found. Add a new record to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button onClick={onAddRecordClick}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Vital Signs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VitalSignsTab;
