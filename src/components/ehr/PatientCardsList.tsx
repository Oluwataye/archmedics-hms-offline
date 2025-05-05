
import React from 'react';
import { User, Calendar, Stethoscope } from 'lucide-react';
import { healthRecordsService } from '@/services/healthRecordsService';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  status: string;
  lastVisit: string;
  doctor: string;
  records: number;
}

interface PatientCardsListProps {
  patients: Patient[];
  selectedPatient: Patient;
  onSelectPatient: (patient: Patient) => void;
}

const PatientCardsList: React.FC<PatientCardsListProps> = ({
  patients,
  selectedPatient,
  onSelectPatient
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {patients.map((patient) => (
        <div 
          key={patient.id} 
          className={`bg-white border ${selectedPatient.id === patient.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} rounded-lg p-4 transition-all duration-200 cursor-pointer hover:translate-y-[-2px] hover:shadow-md`}
          onClick={() => onSelectPatient(patient)}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-800">{patient.name}</h3>
              <div className="text-sm text-gray-500">MRN: {patient.id}</div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full 
              ${patient.status === 'Active' ? 'bg-green-100 text-green-800' : 
              patient.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-blue-100 text-blue-800'}`}>
              {patient.status}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <User className="h-4 w-4 mr-2 text-gray-400" />
            <span>{patient.age} years, {patient.gender}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>Last visit: {patient.lastVisit}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Stethoscope className="h-4 w-4 mr-2 text-gray-400" />
            <span>Primary: {patient.doctor}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between text-xs">
              <span className="text-blue-500">{
                healthRecordsService.getRecordsByPatient(patient.id).length || patient.records
              } Records</span>
              <span className="text-gray-500">Updated 2h ago</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientCardsList;
