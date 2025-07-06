import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name Farm must be at least 3 characters.",
  }),
});
export const formManager = z.object({
  name: z.string().min(3, {
    message: "Name Manager must be at least 3 characters.",
  }),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: "Email must be a valid format like example@email.com",
  }),
  password: z.string().min(3, {
    message: "Password Manager must be at least 3 characters.",
  }),
  farmId: z.string(),
});
//Valid Contact Us
export const formContact = z.object({
  farmName: z.string().min(2, {
    message: "Farm Name must be at least 2 characters.",
  }),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: "Email must be a valid format like example@email.com",
  }),
  phoneNumber: z.string().min(2, {
    message: "Phone Number must be Required",
  }),
});
export const formLogin = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: "Email must be a valid format like example@email.com",
  }),
  password: z.string().min(2, {
    message: "Password must be Required",
  }),
});

export const workerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Email must be a valid format like example@email.com" }),
  phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, {
    message: "Phone must be a valid Egyptian number",
  }),
  password: z.string().min(1, { message: "Code is required" }),
  specialty: z.string().min(1, { message: "Specialty is required" }),

  nationalID: z
    .string()
    .length(14, { message: "National ID must be 14 digits" }),
  age: z.string().min(1, { message: "Age is required" }),
  // experience: z.string().min(1, { message: "Experience is required" }),

  salary: z.string({ message: "Salary must be a positive number" }),

  imageUrl: z.instanceof(File, { message: "Image is required" }),
});

export const CattleSchema = z.object({
  type: z.string({
    required_error: "Please select an email to display.",
  }),
  weight: z.number({
    required_error: "Weight is required",
    invalid_type_error: "Weight must be a number",
  }),
  gender:z.string({message:"Gender Is Required"}),
  age:z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  }),
});


export const MilkSchema = z.object({
  tagNumber: z.string({
   message: "Please Enter Cow Id.",
  }),
  am: z.number({
  invalid_type_error: "Am must be a number",
}).optional(),
  pm: z.number({
  invalid_type_error: "Pm must be a number",
}).optional(),

  notes:z.string({message:"Notes Is Required"}),
 
});
