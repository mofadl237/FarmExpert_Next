"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  NotificationSchema } from "@/validation";
import { useState } from "react";
import {  LoaderIcon, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { IErrorResponse } from "@/interface";
import { Textarea } from "../ui/textarea";
import { useAddNotificationMutation, useGetWorkerQuery } from "@/store/services/ManagerFarm";

export function SendNotification() {
  //1- State
  const [open, setOpen] = useState(false);
  const {data} =useGetWorkerQuery();
  const [addNotification, {isLoading}] =useAddNotificationMutation()
  //2- Handler

  const form = useForm<z.infer<typeof NotificationSchema>>({
    resolver: zodResolver(NotificationSchema),
    defaultValues: {
      email: "",
      title: "",
      message: "",
      
    },
  });

  async function onSubmit(data: z.infer<typeof NotificationSchema>) {
    try {
      await addNotification(data)
      console.log(data)
      toast.success("Send Notification successfully.");
    } catch (error: unknown) {
      const message =
        (error as IErrorResponse)?.data?.message ||
        "Something went wrong while adding the manager.";
      toast.error(message);
    }
    form.reset();
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-auto">
          <Plus /> Send Notification
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle>Send Notification For Staff</DialogTitle>
          <DialogDescription>
            Do You Want Send. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Email Staff : </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified Email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.map((staff) => (

                      <SelectItem key={staff.id} value={staff.email}>{staff.email}</SelectItem>
                      ))}
                      
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
           

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title : </FormLabel>
                  <FormControl>
                    <Input
                    placeholder="Task Address"
                   {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message : </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description For Task" {...field}/>
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">
                {isLoading ? <LoaderIcon /> : "Send Notification"}
                {/* Send Notification */}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
