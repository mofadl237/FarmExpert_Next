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

import { MilkECommerceSchema } from "@/validation";
import { z } from "zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { IErrorResponse, IMilk } from "@/interface";
import { useAddMilkECommerceMutation } from "@/store/services/ManagerFarm";
interface IProps {
  milk: IMilk;
}
const AddMilkProduct = ({ milk }: IProps) => {
  //1- state
  const [open, setOpen] = useState(false);
  const [addMilk] = useAddMilkECommerceMutation();
  
  //2- Handler
  const form = useForm<z.infer<typeof MilkECommerceSchema>>({
    resolver: zodResolver(MilkECommerceSchema),
    defaultValues: {
      pricePerKg: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof MilkECommerceSchema>) {
    const payload = { ...values, milkProductionID: milk.id || 0 };


    try {
      const response = await addMilk(payload);
      
      toast.success(response?.data?.message +" - " + response?.data?.milkProductID || "Add Success ECommerce");
    } catch (error: unknown) {
      console.log("Error Add Milk ===> ", error);
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
          <Plus /> Add ECommerce
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  md:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Milk ECommerce</DialogTitle>
          <DialogDescription>
            Do You Want Add New Milk Product For ECommerce. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {/* Am */}
            <FormField
              control={form.control}
              name="pricePerKg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price : </FormLabel>
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

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">
                {/* {isLoading ? <LoaderIcon /> : "Add Milk"} */}
                Add ECommerce
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddMilkProduct;
