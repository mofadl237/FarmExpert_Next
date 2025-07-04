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
import { formContact } from "@/validation";
import { useAddRequestsMutation } from "@/store/services/Request";

export function ContactForm() {
  //1- State
  const [addRequest] = useAddRequestsMutation();
  //2-Handler

  const form = useForm<z.infer<typeof formContact>>({
    resolver: zodResolver(formContact),
    defaultValues: {
      email: "",
      farmName: "",
      phoneNumber: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formContact>) {
    console.log(values)
    try {
      await addRequest(values).unwrap();
      toast.success("Contact Post successfully.");
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Error adding the farm.";

      toast.error(errorMessage);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
        style={{ direction: "ltr" }}
      >
        <FormField
          control={form.control}
          name="farmName"
          render={({ field }) => (
            <FormItem className=" !text-black">
              <FormLabel>Farm Name</FormLabel>
              <FormControl>
                <Input
                  className="!bg-white !text-black relative z-40 w-[70%] !py-4 !ps-4"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" !text-black">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="!bg-white !text-black relative z-40 w-[70%] !py-4 !ps-4"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className=" !text-black">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  className="!bg-white !text-black relative z-40 w-[70%] !py-4 !ps-4"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
