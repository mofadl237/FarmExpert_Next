
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  z } from "zod";

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
import { registerUserSchema } from "@/validation";
import { AnimatedHeader } from "@/components/Animation/AnimatedHeader";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRegisterUserMutation } from "@/store/services/ECommerceAuth";
import { toast } from "sonner";

export default function Page() {
  // 1- state
  const pathname = usePathname();
const [registerUser] = useRegisterUserMutation()
  const isArabic = pathname.startsWith("/ar");

  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      ConfirmPassword: "",
    },
  });

  // 2. Define a submit handler.
 async  function onSubmit(values: z.infer<typeof registerUserSchema>) {
  
    try {
      await registerUser(values);
      toast.success("Navigate To Login | Confirm Email",{duration:8000});
      location.href = "/en/e-commerce/login";
      
    } catch (error: unknown) {
      
        const errorMessage =
          (error as {data:  string})?.data || " Error Login ECommerce.";
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
          <AnimatedHeader title={"Register"} center />
          <div className="px-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Mohamed" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="moFadl@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ConfirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-2/3  block">Submit</Button>
              </form>
            </Form>
            <div className=" mt-4 flex flex-col md:flex-row justify-between w-2/3 ">
              <Link href={"/en/e-commerce/login"}className="text-blue-600">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
