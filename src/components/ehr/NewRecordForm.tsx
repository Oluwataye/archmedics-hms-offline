
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the schema for the form validation
const recordFormSchema = z.object({
  recordType: z.string().min(1, { message: "Record type is required" }),
  recordDate: z.date({ required_error: "Date is required" }),
  notes: z.string().optional(),
  // Vital signs fields
  bloodPressure: z.string().optional(),
  heartRate: z.string().optional(),
  temperature: z.string().optional(),
  oxygenSaturation: z.string().optional(),
  // Procedure fields
  procedureName: z.string().optional(),
  procedureLocation: z.string().optional(),
  provider: z.string().optional(),
  // Allergy fields
  allergen: z.string().optional(),
  reaction: z.string().optional(),
  severity: z.string().optional(),
  // Medical history fields
  condition: z.string().optional(),
  diagnosisDate: z.date().optional(),
  treatment: z.string().optional(),
});

type RecordFormType = z.infer<typeof recordFormSchema>;

interface NewRecordFormProps {
  patientId: string;
  patientName: string;
  onSave: (record: any) => void;
  onCancel: () => void;
}

const NewRecordForm = ({ patientId, patientName, onSave, onCancel }: NewRecordFormProps) => {
  const [activeTab, setActiveTab] = useState<string>("vital-signs");
  
  const form = useForm<RecordFormType>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: {
      recordType: "vital-signs",
      notes: "",
    },
  });

  const watchRecordType = form.watch("recordType");

  // Update the active tab when record type changes
  const handleRecordTypeChange = (value: string) => {
    form.setValue("recordType", value);
    setActiveTab(value);
  };

  const onSubmit = (data: RecordFormType) => {
    // Prepare record data based on the type
    const recordData = {
      id: `REC-${Date.now().toString().slice(-6)}`,
      patientId,
      recordType: data.recordType,
      date: data.recordDate,
      notes: data.notes,
      createdAt: new Date(),
      status: "Completed",
      ...getSpecificFields(data),
    };

    // Save the record
    onSave(recordData);
    toast.success(`${getRecordTypeName(data.recordType)} record saved for ${patientName}`);
  };

  // Helper function to get record type specific fields
  const getSpecificFields = (data: RecordFormType) => {
    switch (data.recordType) {
      case "vital-signs":
        return {
          bloodPressure: data.bloodPressure,
          heartRate: data.heartRate,
          temperature: data.temperature,
          oxygenSaturation: data.oxygenSaturation,
        };
      case "procedures":
        return {
          procedureName: data.procedureName,
          procedureLocation: data.procedureLocation,
          provider: data.provider,
        };
      case "allergies":
        return {
          allergen: data.allergen,
          reaction: data.reaction,
          severity: data.severity,
        };
      case "history":
        return {
          condition: data.condition,
          diagnosisDate: data.diagnosisDate,
          treatment: data.treatment,
        };
      default:
        return {};
    }
  };

  // Helper function to get readable record type name
  const getRecordTypeName = (type: string) => {
    const names: Record<string, string> = {
      "vital-signs": "Vital Signs",
      "procedures": "Procedure",
      "allergies": "Allergy",
      "history": "Medical History"
    };
    return names[type] || type;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">New Health Record for {patientName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="recordType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record Type</FormLabel>
                    <Select 
                      onValueChange={(value) => handleRecordTypeChange(value)} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select record type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="vital-signs">Vital Signs</SelectItem>
                        <SelectItem value="procedures">Procedure</SelectItem>
                        <SelectItem value="allergies">Allergy</SelectItem>
                        <SelectItem value="history">Medical History</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="recordDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dynamic fields based on record type */}
            {watchRecordType === "vital-signs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bloodPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Pressure (mmHg)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 120/80" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heart Rate (bpm)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 72" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature (°F)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 98.6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="oxygenSaturation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Oxygen Saturation (%)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 98" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {watchRecordType === "procedures" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="procedureName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Procedure Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Echocardiogram" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Dr. Johnson" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="procedureLocation"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Cardiology Dept" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {watchRecordType === "allergies" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="allergen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allergen</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Penicillin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mild">Mild</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="severe">Severe</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reaction"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Reaction</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Rash, difficulty breathing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {watchRecordType === "history" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Condition</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Hypertension" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diagnosisDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diagnosis Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="treatment"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Treatment</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Lisinopril 10mg daily" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter additional notes here..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save Record</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewRecordForm;
