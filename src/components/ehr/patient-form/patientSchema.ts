
import { z } from "zod";

export const patientFormSchema = z.object({
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
  profilePicture: z.instanceof(File).optional(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
