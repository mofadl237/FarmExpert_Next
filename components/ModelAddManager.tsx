"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { formManager } from "@/validation";
import { z } from "zod";
import { Edit, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useAddManagerMutation } from "@/store/services/Manager";

const ModelAddManager = () => {
  const [open, setOpen] = useState(false);
  const [addManager, { isLoading }] = useAddManagerMutation();

  //2- Handler
  const form = useForm<z.infer<typeof formManager>>({
    resolver: zodResolver(formManager),
    defaultValues: {
      name: "",
      farmId: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formManager>) {
    form.reset();

    //  update ID Because Type Number in Db & Get For String
    const { farmId, ...rest } = values;

    const finalFarmId = Number(farmId);
    const updatedValues = {
      ...rest,
      farmId: finalFarmId,
    };

    try {
      await addManager(updatedValues).unwrap();
      toast.success("Manager added successfully.");
      setOpen(false);
    } catch (error: any) {
      
      const errorMessage =
        error?.data?.message || "Something went wrong while adding the manager.";
      toast.error(errorMessage);
    }

    //  addManager(updatedValues);
    //  toast.success("Manager added successfully.");
    setOpen(false);
  }
  //3- Render

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-auto">
          <Edit /> Add manager
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add manager</DialogTitle>
          <DialogDescription>
            Do You Want Add New manager. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="farmId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>manager Farm ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is Add Manager For Farm.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>manager Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>This is Add Manager name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>manager Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription>This is Add Manager Email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>manager Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is Add Pass For Manager.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">
                {isLoading ? <LoaderIcon /> : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default ModelAddManager;
