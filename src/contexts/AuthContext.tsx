
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'pharmacist' | 'labtech' | 'cashier' | 'ehr';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for offline demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@archmedics.com',
    password: 'admin123',
    role: 'admin',
    avatar: '/avatars/admin.jpg'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@archmedics.com',
    password: 'doctor123',
    role: 'doctor',
    avatar: '/avatars/doctor.jpg'
  },
  {
    id: '3',
    name: 'Nurse Emma Davis',
    email: 'nurse@archmedics.com',
    password: 'nurse123',
    role: 'nurse',
    avatar: '/avatars/nurse.jpg'
  },
  {
    id: '4',
    name: 'Pharmacist Michael Chen',
    email: 'pharmacist@archmedics.com',
    password: 'pharm123',
    role: 'pharmacist',
    avatar: '/avatars/pharmacist.jpg'
  },
  {
    id: '5',
    name: 'Lab Tech James Wilson',
    email: 'labtech@archmedics.com',
    password: 'lab123',
    role: 'labtech',
    avatar: '/avatars/labtech.jpg'
  },
  {
    id: '6',
    name: 'Alice Brown',
    email: 'cashier@archmedics.com',
    password: 'cashier123',
    role: 'cashier',
    avatar: '/avatars/cashier.jpg'
  },
  {
    id: '7',
    name: 'EHR Staff Robert Lee',
    email: 'ehr@archmedics.com',
    password: 'ehr123',
    role: 'ehr',
    avatar: '/avatars/ehr.jpg'
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('archmedics_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be an API call to authenticate
      // For this demo, we're using the mock data
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword as User);
        localStorage.setItem('archmedics_user', JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${userWithoutPassword.name}`);
      } else {
        toast.error("Invalid email or password");
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('archmedics_user');
    toast.info("Successfully logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
