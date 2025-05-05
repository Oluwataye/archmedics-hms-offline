
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Activity, ListFilter, AlertTriangle, Clock } from 'lucide-react';

interface RecordTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

const RecordTabs: React.FC<RecordTabsProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-6">
        <TabsTrigger value="all" className="flex items-center gap-2">
          <FileText className="h-4 w-4" /> All Records
        </TabsTrigger>
        <TabsTrigger value="vital-signs" className="flex items-center gap-2">
          <Activity className="h-4 w-4" /> Vital Signs
        </TabsTrigger>
        <TabsTrigger value="procedures" className="flex items-center gap-2">
          <ListFilter className="h-4 w-4" /> Procedures
        </TabsTrigger>
        <TabsTrigger value="allergies" className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" /> Allergies
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <Clock className="h-4 w-4" /> History
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default RecordTabs;
