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
import { Edit, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { IErrorResponse, IMilk } from "@/interface";
import { useUpdateMilkMutation } from "@/store/services/ManagerFarm";

interface IProps {
  milk: IMilk;
}

const EditMilk = ({ milk }: IProps) => {
  const [open, setOpen] = useState(false);
  const [updateMilk,{isLoading}]=useUpdateMilkMutation()
  //2- Handler
  const form = useForm<z.infer<typeof MilkSchema>>({
    resolver: zodResolver(MilkSchema),
    defaultValues: {
      tagNumber: milk.tagNumber ?? "",
      am: milk.am ?? 0,
      pm: milk.pm ?? 0,
      notes: milk.notes ?? "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof MilkSchema>) {
    try {
        await updateMilk({id:milk.id!, body :values})
      toast.success("Milk Updated successfully.");
    } catch (error: unknown) {
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
          <Edit /> Edit Milk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  md:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Milk</DialogTitle>
          <DialogDescription>
            Do You Want Edit New Milk Product . Click save when you&apos;re
            done.
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
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
                {isLoading ? <LoaderIcon /> : "Update Milk"}
                
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditMilk;
