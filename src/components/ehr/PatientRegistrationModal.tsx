
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

// Import the modular form field components
import PersonalInfoFields from "./patient-form/PersonalInfoFields";
import ContactInfoFields from "./patient-form/ContactInfoFields";
import MedicalInfoFields from "./patient-form/MedicalInfoFields";

const patientFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Age must be a valid number.",
  }),
  gender: z.string().min(1, { message: "Please select a gender." }),
  dob: z.string().min(1, { message: "Please enter date of birth." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  insurance: z.string().optional(),
  status: z.string().min(1, { message: "Please select a status." }),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;

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
              <PersonalInfoFields form={form} />
              
              {/* Contact Information Section */}
              <ContactInfoFields form={form} />
              
              {/* Medical Information Section */}
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
