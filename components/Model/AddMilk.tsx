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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { MilkSchema } from "@/validation";
import { z } from "zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { IErrorResponse } from "@/interface";
import { useAddMilkMutation } from "@/store/services/ManagerFarm";

const AddMilk = () => {
  //1- state
  const [open, setOpen] = useState(false);
  const [addMilk] =useAddMilkMutation();
  //2- Handler
  const form = useForm<z.infer<typeof MilkSchema>>({
    resolver: zodResolver(MilkSchema),
    defaultValues: {
      tagNumber: "",
      am: 0,
      pm: 0,
      notes: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof MilkSchema>) {
    console.log("Add Milk ====> ", values);
    try {
      await addMilk(values).unwrap()
      toast.success("Milk added successfully.");
    } catch (error: unknown) {
      console.log("Error Add Milk ===> ",error)
      const message =
        (error as IErrorResponse)?.data?.message ||
        "Something went wrong while adding the milk.";
      toast.error(message);
    }

    form.reset();
    setOpen(false);
  }
  //3- Render

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-auto">
          <Plus /> Add Milk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  md:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Milk</DialogTitle>
          <DialogDescription>
            Do You Want Add New Milk Product . Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {/* Cow Id */}
            <FormField
              control={form.control}
              name="tagNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cow ID : </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Am */}
            <FormField
              control={form.control}
              name="am"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Am : </FormLabel>
                  <FormControl>
                    <Input
                    min={0}
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* pm */}
            <FormField
              control={form.control}
              name="pm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pm : </FormLabel>
                  <FormControl>
                    <Input
                    min={0}
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes : </FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                {/* {isLoading ? <LoaderIcon /> : "Add Milk"} */}
                Add Milk
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddMilk;
