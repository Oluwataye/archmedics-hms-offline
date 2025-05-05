
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PatientFormValues } from "./patientSchema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<PatientFormValues>;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ form }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle file selection
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Update the form
    form.setValue("profilePicture", file);
    
    // Create a preview URL
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
  };

  // Get initials for the avatar fallback
  const getInitials = () => {
    const name = form.watch("name");
    if (!name) return "PA";
    
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      {/* Profile Picture Upload */}
      <FormField
        control={form.control}
        name="profilePicture"
        render={({ field: { onChange, value, ...fieldProps } }) => (
          <FormItem className="col-span-2 flex flex-col items-center">
            <FormLabel className="self-center">Profile Picture</FormLabel>
            <FormControl>
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24 cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary">
                  <AvatarImage src={previewUrl || ""} alt="Profile preview" />
                  <AvatarFallback className="text-lg bg-secondary/20">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <label htmlFor="profile-upload" className="flex cursor-pointer items-center rounded-md bg-secondary/20 px-3 py-1 text-sm hover:bg-secondary/30">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </label>
                  <Input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                    {...fieldProps}
                  />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Smith" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input type="number" placeholder="42" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalInfoFields;
