
import React, { useState } from 'react';
import { Search, CreditCard, FileText, RefreshCw, LogOut } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CashierDashboard = () => {
  const [activeTab, setActiveTab] = useState('New Payment');
  const [patientInfo, setPatientInfo] = useState({
    id: 'P-10237',
    name: 'John Smith'
  });
  
  // Date formatting for current date and time
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      {/* Breadcrumbs */}
      <div className="text-gray-500 text-sm mb-4">Cashier &gt; Dashboard</div>
      
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Cashier Dashboard</h1>
      
      {/* Main Panel */}
      <Card className="mb-6">
        {/* Quick Actions Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-4 py-3 font-semibold ${activeTab === 'New Payment' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
            onClick={() => handleTabChange('New Payment')}
          >
            New Payment
          </button>
          <button 
            className={`px-4 py-3 font-semibold ${activeTab === 'Pending' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
            onClick={() => handleTabChange('Pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-3 font-semibold ${activeTab === "Today's Summary" ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
            onClick={() => handleTabChange("Today's Summary")}
          >
            Today's Summary
          </button>
          <button 
            className={`px-4 py-3 font-semibold ${activeTab === 'Daily Close' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
            onClick={() => handleTabChange('Daily Close')}
          >
            Daily Close
          </button>
          <button 
            className={`px-4 py-3 font-semibold ${activeTab === 'Help' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
            onClick={() => handleTabChange('Help')}
          >
            Help
          </button>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-end mb-4">
            {/* Date and Clock */}
            <div className="w-56 h-9 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
              <span className="font-bold text-gray-800 text-sm">{currentDate} - {currentTime}</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="w-2/3">
              {/* Patient Information Form */}
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Patient Information</h2>
                
                <div className="mb-4">
                  <label className="block text-gray-500 text-sm mb-1">Patient ID/Name:</label>
                  <div className="flex">
                    <Input
                      readOnly
                      value={`${patientInfo.id} - ${patientInfo.name}`}
                      className="flex-1 mr-2"
                    />
                    <Button className="bg-blue-500">Search</Button>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-gray-500 text-sm mb-1">Department/Service:</label>
                    <div className="relative">
                      <select className="w-full border border-gray-300 rounded p-2 text-gray-800 appearance-none">
                        <option>Cardiology</option>
                        <option>Neurology</option>
                        <option>Orthopedics</option>
                        <option>Pediatrics</option>
                        <option>General Medicine</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <span className="text-gray-500">▼</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-500 text-sm mb-1">Service Date:</label>
                    <div className="relative">
                      <select className="w-full border border-gray-300 rounded p-2 text-gray-800 appearance-none">
                        <option>{currentDate}</option>
                        <option>Yesterday</option>
                        <option>Custom Date</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <span className="text-gray-500">▼</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Details Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Payment Details</h2>
                
                {/* Services Table */}
                <div className="mb-4">
                  <div className="bg-gray-100 p-2 grid grid-cols-12 font-bold text-sm text-gray-800">
                    <div className="col-span-7">Service</div>
                    <div className="col-span-3">Amount</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  
                  <div className="border border-gray-200 p-2 grid grid-cols-12 text-sm">
                    <div className="col-span-7">Echocardiogram</div>
                    <div className="col-span-3">$120.00</div>
                    <div className="col-span-2">
                      <button className="text-red-500">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path d="M8 8L16 16M8 16L16 8" strokeWidth="2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 border-t-0 p-2 grid grid-cols-12 text-sm">
                    <div className="col-span-7">Consultation Fee</div>
                    <div className="col-span-3">$75.00</div>
                    <div className="col-span-2">
                      <button className="text-red-500">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path d="M8 8L16 16M8 16L16 8" strokeWidth="2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-4 mb-4">
                  <Button variant="outline" className="text-blue-500 border-blue-500">+ Add Service</Button>
                  <Button variant="outline" className="text-blue-500 border-blue-500">Apply Discount</Button>
                </div>
                
                {/* Total Section */}
                <div className="bg-blue-50 border border-blue-200 p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-gray-800">Total Amount</div>
                      <div className="text-xs text-gray-500">(45.50 discount applied)</div>
                    </div>
                    <div className="text-xl font-bold text-gray-800">$149.50</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Options */}
            <div className="w-1/3">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 h-full">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Payment Options</h2>
                
                <div className="flex flex-col space-y-3">
                  <Button className="bg-blue-500 text-white py-2 rounded-full font-bold">Cash</Button>
                  <Button variant="outline" className="border-blue-500 text-blue-500 py-2 rounded-full">Credit Card</Button>
                  <Button variant="outline" className="border-blue-500 text-blue-500 py-2 rounded-full">Insurance</Button>
                  <Button variant="outline" className="border-blue-500 text-blue-500 py-2 rounded-full">Bank Transfer</Button>
                </div>
                
                <div className="mt-6">
                  <Button className="bg-green-600 text-white py-2 rounded w-full font-bold">Process Payment</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashierDashboard;
