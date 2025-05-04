
// Simple in-memory storage for health records (in a real app, this would use an API or database)
let healthRecords: any[] = [];

export const healthRecordsService = {
  // Get all records
  getAllRecords: () => {
    return [...healthRecords];
  },
  
  // Get records by patient ID
  getRecordsByPatient: (patientId: string) => {
    return healthRecords.filter(record => record.patientId === patientId);
  },
  
  // Get records by type
  getRecordsByType: (patientId: string, type: string) => {
    return healthRecords.filter(
      record => record.patientId === patientId && record.recordType === type
    );
  },
  
  // Add a new record
  addRecord: (record: any) => {
    healthRecords.push(record);
    return record;
  },
  
  // Update a record
  updateRecord: (recordId: string, updatedData: any) => {
    const index = healthRecords.findIndex(record => record.id === recordId);
    if (index !== -1) {
      healthRecords[index] = { ...healthRecords[index], ...updatedData };
      return healthRecords[index];
    }
    return null;
  },
  
  // Delete a record
  deleteRecord: (recordId: string) => {
    const index = healthRecords.findIndex(record => record.id === recordId);
    if (index !== -1) {
      const deletedRecord = healthRecords[index];
      healthRecords = healthRecords.filter(record => record.id !== recordId);
      return deletedRecord;
    }
    return null;
  }
};
