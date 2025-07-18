// API Service for ARCHMEDICS HMS
// This service provides a centralized interface for all API communications

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  status: 'active' | 'inactive' | 'discharged' | 'follow-up';
  assignedDoctor: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'consultation' | 'follow-up' | 'emergency' | 'surgery' | 'therapy';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  symptoms?: string;
  diagnosis?: string;
  treatment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  providerId: string;
  recordType: 'vital-signs' | 'lab-results' | 'imaging' | 'procedure' | 'medication' | 'note';
  date: string;
  title: string;
  content: any; // Flexible content based on record type
  attachments?: string[];
  status: 'draft' | 'final' | 'amended' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface VitalSigns {
  id: string;
  patientId: string;
  recordedBy: string;
  timestamp: string;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  weight?: number;
  height?: number;
  bmi?: number;
  notes?: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  orderedBy: string;
  performedBy: string;
  testType: string;
  testName: string;
  orderDate: string;
  collectionDate: string;
  resultDate: string;
  status: 'ordered' | 'collected' | 'in-progress' | 'completed' | 'cancelled';
  results: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    flag?: 'high' | 'low' | 'critical' | 'normal';
  }[];
  interpretation?: string;
  criticalValues?: boolean;
  attachments?: string[];
}

export interface Prescription {
  id: string;
  patientId: string;
  prescribedBy: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    quantity: number;
    refills: number;
  }[];
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  notes?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'doctor' | 'nurse' | 'pharmacist' | 'labtech' | 'cashier' | 'ehr';
  department?: string;
  specialty?: string;
  licenseNumber?: string;
  phone: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = process.env.REACT_APP_API_URL || 'http://localhost:3001/api') {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  // Authentication methods
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data) {
      this.token = response.data.token;
      localStorage.setItem('authToken', this.token);
    }

    return response;
  }

  async logout(): Promise<ApiResponse<void>> {
    const response = await this.request<void>('/auth/logout', {
      method: 'POST',
    });

    this.token = null;
    localStorage.removeItem('authToken');
    return response;
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const response = await this.request<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });

    if (response.success && response.data) {
      this.token = response.data.token;
      localStorage.setItem('authToken', this.token);
    }

    return response;
  }

  // Patient methods
  async getPatients(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    department?: string;
  }): Promise<ApiResponse<{ patients: Patient[]; total: number; page: number; totalPages: number }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{ patients: Patient[]; total: number; page: number; totalPages: number }>(
      `/patients?${queryParams.toString()}`
    );
  }

  async getPatient(id: string): Promise<ApiResponse<Patient>> {
    return this.request<Patient>(`/patients/${id}`);
  }

  async createPatient(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Patient>> {
    return this.request<Patient>('/patients', {
      method: 'POST',
      body: JSON.stringify(patient),
    });
  }

  async updatePatient(id: string, patient: Partial<Patient>): Promise<ApiResponse<Patient>> {
    return this.request<Patient>(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patient),
    });
  }

  async deletePatient(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/patients/${id}`, {
      method: 'DELETE',
    });
  }

  // Appointment methods
  async getAppointments(params?: {
    page?: number;
    limit?: number;
    date?: string;
    doctorId?: string;
    patientId?: string;
    status?: string;
  }): Promise<ApiResponse<{ appointments: Appointment[]; total: number; page: number; totalPages: number }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{ appointments: Appointment[]; total: number; page: number; totalPages: number }>(
      `/appointments?${queryParams.toString()}`
    );
  }

  async getAppointment(id: string): Promise<ApiResponse<Appointment>> {
    return this.request<Appointment>(`/appointments/${id}`);
  }

  async createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Appointment>> {
    return this.request<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  }

  async updateAppointment(id: string, appointment: Partial<Appointment>): Promise<ApiResponse<Appointment>> {
    return this.request<Appointment>(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointment),
    });
  }

  async cancelAppointment(id: string, reason?: string): Promise<ApiResponse<Appointment>> {
    return this.request<Appointment>(`/appointments/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Medical Records methods
  async getMedicalRecords(patientId: string, params?: {
    page?: number;
    limit?: number;
    recordType?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiResponse<{ records: MedicalRecord[]; total: number; page: number; totalPages: number }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{ records: MedicalRecord[]; total: number; page: number; totalPages: number }>(
      `/patients/${patientId}/records?${queryParams.toString()}`
    );
  }

  async createMedicalRecord(patientId: string, record: Omit<MedicalRecord, 'id' | 'patientId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<MedicalRecord>> {
    return this.request<MedicalRecord>(`/patients/${patientId}/records`, {
      method: 'POST',
      body: JSON.stringify(record),
    });
  }

  async updateMedicalRecord(patientId: string, recordId: string, record: Partial<MedicalRecord>): Promise<ApiResponse<MedicalRecord>> {
    return this.request<MedicalRecord>(`/patients/${patientId}/records/${recordId}`, {
      method: 'PUT',
      body: JSON.stringify(record),
    });
  }

  // Vital Signs methods
  async getVitalSigns(patientId: string, params?: {
    page?: number;
    limit?: number;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiResponse<{ vitals: VitalSigns[]; total: number; page: number; totalPages: number }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{ vitals: VitalSigns[]; total: number; page: number; totalPages: number }>(
      `/patients/${patientId}/vitals?${queryParams.toString()}`
    );
  }

  async createVitalSigns(patientId: string, vitals: Omit<VitalSigns, 'id' | 'patientId'>): Promise<ApiResponse<VitalSigns>> {
    return this.request<VitalSigns>(`/patients/${patientId}/vitals`, {
      method: 'POST',
      body: JSON.stringify(vitals),
    });
  }

  // Lab Results methods
  async getLabResults(patientId: string, params?: {
    page?: number;
    limit?: number;
    status?: string;
    testType?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiResponse<{ results: LabResult[]; total: number; page: number; totalPages: number }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{ results: LabResult[]; total: number; page: number; totalPages: number }>(
      `/patients/${patientId}/lab-results?${queryParams.toString()}`
    );
  }

  async createLabOrder(patientId: string, order: Omit<LabResult, 'id' | 'patientId' | 'resultDate' | 'results' | 'status'>): Promise<ApiResponse<LabResult>> {
    return this.request<LabResult>(`/patients/${patientId}/lab-orders`, {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateLabResult(patientId: string, resultId: string, result: Partial<LabResult>): Promise<ApiResponse<LabResult>> {
    return this.request<LabResult>(`/patients/${patientId}/lab-results/${resultId}`, {
      method: 'PUT',
      body: JSON.stringify(result),
    });
  }

  // Prescription methods
  async getPrescriptions(patientId: string, params?: {
    page?: number;
    limit?: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiResponse<{ prescriptions: Prescription[]; total: number; page: number; totalPages: number }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{ prescriptions: Prescription[]; total: number; page: number; totalPages: number }>(
      `/patients/${patientId}/prescriptions?${queryParams.toString()}`
    );
  }

  async createPrescription(patientId: string, prescription: Omit<Prescription, 'id' | 'patientId'>): Promise<ApiResponse<Prescription>> {
    return this.request<Prescription>(`/patients/${patientId}/prescriptions`, {
      method: 'POST',
      body: JSON.stringify(prescription),
    });
  }

  async updatePrescription(patientId: string, prescriptionId: string, prescription: Partial<Prescription>): Promise<ApiResponse<Prescription>> {
    return this.request<Prescription>(`/patients/${patientId}/prescriptions/${prescriptionId}`, {
      method: 'PUT',
      body: JSON.stringify(prescription),
    });
  }

  // User management methods
  async getUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
    department?: string;
    search?: string;
  }): Promise<ApiResponse<{ users: User[]; total: number; page: number; totalPages: number }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{ users: User[]; total: number; page: number; totalPages: number }>(
      `/users?${queryParams.toString()}`
    );
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`);
  }

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<User>> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async updateUser(id: string, user: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  }

  async deactivateUser(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}/deactivate`, {
      method: 'POST',
    });
  }

  // Analytics and reporting methods
  async getDashboardStats(params?: {
    dateFrom?: string;
    dateTo?: string;
    department?: string;
  }): Promise<ApiResponse<{
    totalPatients: number;
    newPatients: number;
    appointmentsToday: number;
    criticalAlerts: number;
    occupancyRate: number;
    averageStayDuration: number;
  }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request(`/analytics/dashboard?${queryParams.toString()}`);
  }

  async getPatientStatistics(params?: {
    dateFrom?: string;
    dateTo?: string;
    department?: string;
  }): Promise<ApiResponse<{
    admissionTrends: { date: string; count: number }[];
    ageDemographics: { ageGroup: string; count: number; percentage: number }[];
    genderDistribution: { gender: string; count: number; percentage: number }[];
    departmentDistribution: { department: string; count: number; percentage: number }[];
  }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request(`/analytics/patients?${queryParams.toString()}`);
  }

  // File upload methods
  async uploadFile(file: File, type: 'patient-photo' | 'medical-document' | 'lab-result' | 'imaging'): Promise<ApiResponse<{ url: string; filename: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const headers: HeadersInit = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();
export default apiService;

