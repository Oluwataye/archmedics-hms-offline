
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PatientFormValues } from "./patientSchema";

interface MedicalInfoFieldsProps {
  form: UseFormReturn<PatientFormValues>;
}

// Define the status options to ensure consistent values
const statusOptions = [
  { value: "New", label: "New" },
  { value: "Active", label: "Active" },
  { value: "Follow-up", label: "Follow-up" },
  { value: "Discharged", label: "Discharged" }
];

const MedicalInfoFields: React.FC<MedicalInfoFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="insurance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Insurance (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Blue Cross" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value || statusOptions[0].value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default MedicalInfoFields;
