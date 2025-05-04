
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Droplet
} from 'lucide-react';

interface VitalSign {
  name: string;
  value: string;
  unit: string;
  recordedTime: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

interface PatientVitalsProps {
  patientId: string;
  patientName?: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  oxygenSaturation: string;
  recordedTime: string;
}

const PatientVitals = ({
  patientId,
  patientName,
  bloodPressure,
  heartRate,
  temperature,
  oxygenSaturation,
  recordedTime
}: PatientVitalsProps) => {
  // Construct vital signs data with visual styling
  const vitals: VitalSign[] = [
    {
      name: 'Blood Pressure',
      value: bloodPressure,
      unit: 'mmHg',
      recordedTime,
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-500'
    },
    {
      name: 'Heart Rate',
      value: heartRate,
      unit: 'bpm',
      recordedTime,
      icon: <Heart className="h-5 w-5 text-green-500" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-500'
    },
    {
      name: 'Temperature',
      value: temperature,
      unit: '°F',
      recordedTime,
      icon: <Thermometer className="h-5 w-5 text-purple-500" />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-500'
    },
    {
      name: 'Oxygen Saturation',
      value: oxygenSaturation,
      unit: '%',
      recordedTime,
      icon: <Droplet className="h-5 w-5 text-yellow-500" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-500'
    }
  ];

  return (
    <div className="mb-6">
      {patientName && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800 flex items-center">
            <Heart className="h-5 w-5 text-red-500 mr-2" /> Vital Signs
          </h4>
          <span className="text-sm text-gray-500">
            Patient: {patientName} ({patientId})
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vitals.map((vital, index) => (
          <Card key={index} className={`${vital.bgColor} border-0 shadow-sm`}>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                {vital.icon}
                <div className={`text-xs ${vital.textColor} ml-2 font-medium`}>{vital.name}</div>
              </div>
              <div className="flex items-baseline">
                <div className="font-bold text-lg text-gray-800">{vital.value}</div>
                <div className="ml-1 text-xs text-gray-500">{vital.unit}</div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{vital.recordedTime}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientVitals;
