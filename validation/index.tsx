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

export const NotificationSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: "Email must be a valid format like example@email.com",
  }),
  title: z.string().min(2, {
    message: "Title must be Required",
  }),
  message: z.string().min(2, {
    message: "Message must be Required",
  }),
});


export const EventSchema = z.object({
  EventType: z.string().min(2, {
    message: "Event Type must be",
  }),
  TagNumber: z.number({
    invalid_type_error: "TagNumber must be a number",
  }),
  Weight: z.number({
    invalid_type_error: "Weight must be a number",
  }).optional(),
  Notes: z.string().min(2, {
    message: "Notes must be Required",
  }).optional(),
  Medicine: z.string().min(2, {
    message: "Medicine must be Required",
  }).optional(),
  Dosage: z.string().min(2, {
    message: "Dosage must be Required",
  }).optional(),
  WithdrawalTime: z.string().min(2, {
    message: "WithdrawalTime must be Required",
  }).optional(),
  CalfGender: z.string().min(2, {
    message: "CalfGender must be Required",
  }).optional(),
  VaccineType: z.string().min(2, {
    message: "VaccineType must be Required",
  }).optional(),
  Date: z.date({
    required_error: "Date is required",
  }).optional(),
});

