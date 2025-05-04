
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import React from 'react';

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

// Nurse Pages
import NurseDashboard from "@/pages/nurse/NurseDashboard";
import NursePatientsPage from "@/pages/nurse/PatientsPage";
import VitalsPage from "@/pages/nurse/VitalsPage";
import MedicationPage from "@/pages/nurse/MedicationPage";

// Pharmacy Pages
import PharmacistDashboard from "@/pages/pharmacy/PharmacistDashboard";
import PrescriptionsPage from "@/pages/pharmacy/PrescriptionsPage";
import InventoryPage from "@/pages/pharmacy/InventoryPage";
import DispensaryPage from "@/pages/pharmacy/DispensaryPage";
import AlertsPage from "@/pages/pharmacy/AlertsPage";

// Cashier Pages
import CashierDashboard from "@/pages/cashier/CashierDashboard";
import ReportsPage from "@/pages/cashier/ReportsPage";
import ReprintPage from "@/pages/cashier/ReprintPage";
import RefundsPage from "@/pages/cashier/RefundsPage";

// Lab Technician Pages
import LabDashboard from "@/pages/lab/LabDashboard";
import LabRequestsPage from "@/pages/lab/LabRequestsPage";
import ResultsPage from "@/pages/lab/ResultsPage";
import PendingResultsPage from "@/pages/lab/PendingResultsPage";
import CompletedResultsPage from "@/pages/lab/CompletedResultsPage";
import CriticalResultsPage from "@/pages/lab/CriticalResultsPage";
import LabInventoryPage from "@/pages/lab/InventoryPage";
import QualityControlPage from "@/pages/lab/QualityControlPage";
import EquipmentPage from "@/pages/lab/EquipmentPage";

// Create a new QueryClient instance in a more stable way
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
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
                <Route path="/dashboard" element={<DashboardPage />} />
                
                {/* Doctor routes */}
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/consultations" element={<h1>Consultations Page</h1>} />
                <Route path="/prescriptions" element={<h1>Prescriptions Page</h1>} />
                
                {/* Nurse routes */}
                <Route path="/nurse" element={<NurseDashboard />} />
                <Route path="/nurse/patients" element={<NursePatientsPage />} />
                <Route path="/nurse/vitals" element={<VitalsPage />} />
                <Route path="/nurse/medication" element={<MedicationPage />} />
                <Route path="/nurse/tasks" element={<h1>Nurse Tasks Page</h1>} />
                <Route path="/nurse/wards" element={<h1>Nurse Wards Page</h1>} />
                <Route path="/nurse/alerts" element={<h1>Nurse Alerts Page</h1>} />
                <Route path="/nurse/communication" element={<h1>Nurse Communication Page</h1>} />
                
                {/* Pharmacy routes */}
                <Route path="/pharmacy" element={<PharmacistDashboard />} />
                <Route path="/pharmacy/prescriptions" element={<PrescriptionsPage />} />
                <Route path="/pharmacy/inventory" element={<InventoryPage />} />
                <Route path="/pharmacy/dispensary" element={<DispensaryPage />} />
                <Route path="/pharmacy/alerts" element={<AlertsPage />} />
                <Route path="/pharmacy/sales" element={<h1>Pharmacy Sales Page</h1>} />
                <Route path="/pharmacy/orders" element={<h1>Purchase Orders Page</h1>} />
                <Route path="/pharmacy/reports" element={<h1>Pharmacy Reports Page</h1>} />
                
                {/* Cashier routes */}
                <Route path="/cashier" element={<CashierDashboard />} />
                <Route path="/cashier/reports" element={<ReportsPage />} />
                <Route path="/cashier/reprint" element={<ReprintPage />} />
                <Route path="/cashier/refunds" element={<RefundsPage />} />
                
                {/* Lab routes */}
                <Route path="/lab" element={<LabDashboard />} />
                <Route path="/lab/requests" element={<LabRequestsPage />} />
                <Route path="/lab/results" element={<ResultsPage />} />
                <Route path="/lab/results/pending" element={<PendingResultsPage />} />
                <Route path="/lab/results/completed" element={<CompletedResultsPage />} />
                <Route path="/lab/results/critical" element={<CriticalResultsPage />} />
                <Route path="/lab/inventory" element={<LabInventoryPage />} />
                <Route path="/lab/quality" element={<QualityControlPage />} />
                <Route path="/lab/equipment" element={<EquipmentPage />} />
                
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
};

export default App;
