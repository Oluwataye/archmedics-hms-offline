
import React, { createContext, useState, useEffect, useContext } from 'react';

// Define the User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string; // Added phone property
  specialty?: string; // Added specialty property
}

// Define the UserRole type
export type UserRole = 'admin' | 'doctor' | 'nurse' | 'pharmacist' | 'labtech' | 'cashier' | 'ehr';

// Define the profile update type
interface ProfileUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  specialty?: string;
}

// Define the AuthContext type
interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => void; // Added updateProfile method
}

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Admin credentials
    if (email === 'admin@archmedics.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'admin',
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }
    
    // Doctor credentials
    else if (email === 'doctor@archmedics.com' && password === 'doctor123') {
      const doctorUser: User = {
        id: '2',
        name: 'Dr. John Smith',
        email: email,
        role: 'doctor',
        specialty: 'Cardiology',
        phone: '(555) 123-4567',
      };
      setUser(doctorUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(doctorUser));
      return true;
    }
    
    // Nurse credentials
    else if (email === 'nurse@archmedics.com' && password === 'nurse123') {
      const nurseUser: User = {
        id: '3',
        name: 'Nurse Emma',
        email: email,
        role: 'nurse',
        phone: '(555) 234-5678',
      };
      setUser(nurseUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(nurseUser));
      return true;
    }
    
    // Pharmacist credentials
    else if (email === 'pharmacist@archmedics.com' && password === 'pharmacist123') {
      const pharmacistUser: User = {
        id: '4',
        name: 'Pharmacist Taylor',
        email: email,
        role: 'pharmacist',
        phone: '(555) 345-6789',
      };
      setUser(pharmacistUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(pharmacistUser));
      return true;
    }
    
    // Lab Technician credentials
    else if (email === 'labtech@archmedics.com' && password === 'labtech123') {
      const labtechUser: User = {
        id: '5',
        name: 'Lab Tech Alex',
        email: email,
        role: 'labtech',
        phone: '(555) 456-7890',
      };
      setUser(labtechUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(labtechUser));
      return true;
    }
    
    // Cashier credentials
    else if (email === 'cashier@archmedics.com' && password === 'cashier123') {
      const cashierUser: User = {
        id: '6',
        name: 'Cashier James',
        email: email,
        role: 'cashier',
        phone: '(555) 567-8901',
      };
      setUser(cashierUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(cashierUser));
      return true;
    }
    
    // EHR Manager credentials (NEW)
    else if (email === 'ehr@archmedics.com' && password === 'ehr123') {
      const ehrUser: User = {
        id: '7',
        name: 'Dr. Sarah Johnson',
        email: email,
        role: 'ehr',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        phone: '(555) 678-9012',
        specialty: 'Internal Medicine',
      };
      setUser(ehrUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(ehrUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Add updateProfile function
  const updateProfile = (data: ProfileUpdateData) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...data,
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return true;
    }
    return false;
  };

  const value: AuthContextProps = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
