
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Import the schema and form field components
import { patientFormSchema, PatientFormValues } from "./patient-form/patientSchema";
import PersonalInfoFields from "./patient-form/PersonalInfoFields";
import ContactInfoFields from "./patient-form/ContactInfoFields";
import MedicalInfoFields from "./patient-form/MedicalInfoFields";
import SectionHeader from "./patient-form/SectionHeader";

interface PatientRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: PatientFormValues) => void;
}

const PatientRegistrationModal: React.FC<PatientRegistrationModalProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      dob: "",
      address: "",
      phone: "",
      email: "",
      insurance: "",
      status: "New",
      profilePicture: undefined,
    },
  });

  const handleSubmit = (data: PatientFormValues) => {
    onSave(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Register New Patient</DialogTitle>
          <DialogDescription>
            Enter patient details to create a new patient record.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Personal Information Section */}
              <SectionHeader 
                title="Personal Information" 
                description="Basic information about the patient"
              />
              <PersonalInfoFields form={form} />
              
              {/* Contact Information Section */}
              <SectionHeader 
                title="Contact Information" 
                description="How to reach the patient"
              />
              <ContactInfoFields form={form} />
              
              {/* Medical Information Section */}
              <SectionHeader 
                title="Medical Information" 
                description="Patient's medical details and status"
              />
              <MedicalInfoFields form={form} />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Register Patient</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientRegistrationModal;
