
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PatientVitals from '@/components/ehr/PatientVitals';
import { useNavigate } from 'react-router-dom';

const FeaturedPatientVitals: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate('/ehr/vitals')}
      className="cursor-pointer hover:shadow-md transition-shadow"
    >
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Featured Patient Vitals</h2>
        <PatientVitals
          patientId="P-10237"
          patientName="John Smith"
          bloodPressure="120/80"
          heartRate="72"
          temperature="98.6"
          oxygenSaturation="98"
          recordedTime="Today, 10:30 AM"
        />
      </CardContent>
    </Card>
  );
};

export default FeaturedPatientVitals;
