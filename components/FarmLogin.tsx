"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
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
import { formLogin } from "@/validation";
import { useLoginMutation } from "@/store/services/Login";
import {  SetLocal } from "@/lib/utils";
import { useRouter } from "next/navigation";
export function LoginForm() {
    //1- State
    const router = useRouter();
  const [login] =useLoginMutation();
  //2-Handler

  const form = useForm<z.infer<typeof formLogin>>({
    resolver: zodResolver(formLogin),
    defaultValues: {
      email: "",
      password:"",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formLogin>) {
        

  
    try {
       const res = await login(values).unwrap();
       SetLocal(res.token);
      toast.success("Login Post successfully , Redirect Dashboard.");
      form.reset();
      router.push("/en/dashboard");
    } catch (error: unknown) {
        
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Error Login Dashboard.";
      toast.error(errorMessage);
    }
  }

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mx-auto"
        style={{ direction: "ltr" }}
      >

        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" !text-black">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="!bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="!text-black">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                type="password"
                  className="!bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mb-8" >Login</Button>
      </form>
    </Form>
  );
}
