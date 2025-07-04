

import { z } from "zod"

 export const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name Farm must be at least 3 characters.",
  }),
})
 export const formManager = z.object({
  name: z.string().min(3, {
    message: "Name Manager must be at least 3 characters.",
  }),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Email must be a valid format like example@email.com",
    }),
  password: z.string().min(3, {
    message: "Password Manager must be at least 3 characters.",
  }),
  farmId: z.string(),
})
 //Valid Contact Us 
export const formContact = z.object({
  farmName: z.string().min(2, {
    message: "Farm Name must be at least 2 characters.",
  }),
   email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Email must be a valid format like example@email.com",
    }),
    phoneNumber: z.string().min(2, {
    message: "Phone Number must be Required",
  }),

})