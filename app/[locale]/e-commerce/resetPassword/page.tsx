"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {  resetPasswordUserSchema } from "@/validation";
import { AnimatedHeader } from "@/components/Animation/AnimatedHeader";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/store/services/ECommerceAuth";

export default function Page() {
  // 1- state
  const pathname = usePathname();
const [resetPassword]=useResetPasswordMutation()
  const isArabic = pathname.startsWith("/ar");

  const form = useForm<z.infer<typeof resetPasswordUserSchema>>({
    resolver: zodResolver(resetPasswordUserSchema),
    defaultValues: {
     
      email: "",
      code:"",
      NewPassword:""
      
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof resetPasswordUserSchema>) {
    console.log(values)
    try {
      const { data } = await resetPassword(values);
      console.log("Data Str ===>  ",data?.str)
      toast.success( data?.str || "Update Password Success");
      location.href = "/en/e-commerce";
    } catch (error: unknown) {
      
      const errorMessage =
        (error as { data: string })?.data || " Error Update Password.";
      toast.error(errorMessage);
    }
  }
  return (
    <section className="bg-gradient-to-tr from-[#68CD75] to-[#2DB683] w-full h-screen  mt-16 flex justify-center items-center">
      <div
        className={`relative  w-[80%]  h-full bg-[url('/main-2.jpg')]  rounded-[4px] shadow-md bg-top`}
      >
        <div
          className={`absolute    h-[100%] w-full md:w-[60%] bg-[rgba(255,255,255,0.1)]  rounded-[4px] z-10 ${
            isArabic && "end-0"
          } `}
          style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
        >
          <AnimatedHeader title={"Reset Password"} center />
          <div className="px-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                
                <FormField
                
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="moFadl@gmail.com" className="border-primary w-[70%]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-primary w-[70%]"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="NewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password </FormLabel>
                      <FormControl>
                        <Input  {...field} className="border-primary w-[70%]"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                
                <Button type="submit" className="w-2/3  block">
                  Submit
                </Button>
              </form>
            </Form>
            
          </div>
        </div>
      </div>
    </section>
  );
}
