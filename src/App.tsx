
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import AppLayout from "@/components/layout/AppLayout";

// Pages
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFound from "@/pages/NotFound";

// Doctor Pages
import DoctorDashboardPage from "@/pages/doctor/DoctorDashboardPage";
import AppointmentsPage from "@/pages/doctor/AppointmentsPage";
import PatientsPage from "@/pages/doctor/PatientsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              
              {/* Dynamic dashboard based on role */}
              <Route path="/dashboard" element={<DoctorDashboardPage />} />
              
              {/* Doctor routes */}
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/consultations" element={<h1>Consultations Page</h1>} />
              <Route path="/prescriptions" element={<h1>Prescriptions Page</h1>} />
              
              {/* Nurse routes */}
              <Route path="/vitals" element={<h1>Vitals Page</h1>} />
              
              {/* Pharmacy routes */}
              <Route path="/pharmacy/inventory" element={<h1>Pharmacy Inventory Page</h1>} />
              <Route path="/pharmacy/dispensary" element={<h1>Dispensary Page</h1>} />
              <Route path="/pharmacy/sales" element={<h1>Pharmacy Sales Page</h1>} />
              
              {/* Lab routes */}
              <Route path="/lab/requests" element={<h1>Lab Requests Page</h1>} />
              <Route path="/lab/results" element={<h1>Lab Results Page</h1>} />
              <Route path="/lab/inventory" element={<h1>Lab Inventory Page</h1>} />
              
              {/* Billing routes */}
              <Route path="/billing" element={<h1>Billing Page</h1>} />
              <Route path="/payments" element={<h1>Payments Page</h1>} />
              
              {/* EHR routes */}
              <Route path="/records" element={<h1>Patient Records Page</h1>} />
              <Route path="/documents" element={<h1>Documents Page</h1>} />
              
              {/* Admin routes */}
              <Route path="/staff" element={<h1>Staff Management Page</h1>} />
              <Route path="/staff/roles" element={<h1>Roles & Permissions Page</h1>} />
              <Route path="/staff/schedule" element={<h1>Staff Schedule Page</h1>} />
              <Route path="/reports" element={<h1>Reports Page</h1>} />
              <Route path="/settings" element={<h1>Settings Page</h1>} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
