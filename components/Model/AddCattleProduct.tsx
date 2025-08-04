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

import { CattleECommerceSchema } from "@/validation";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { ICattle, IErrorResponse } from "@/interface";
import { useAddCattleECommerceMutation } from "@/store/services/ManagerFarm";
interface IProps {
  cattle: ICattle;
}
export function AddCattleProduct({ cattle }: IProps) {
  //1- State
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [addCattleECommerce, ] =
    useAddCattleECommerceMutation();

  //2- Handler

  const form = useForm<z.infer<typeof CattleECommerceSchema>>({
    resolver: zodResolver(CattleECommerceSchema),
    defaultValues: {
      price: "",
    },
  });

  async function onSubmit(data: z.infer<typeof CattleECommerceSchema>) {
    try {
      const formData = new FormData();

      formData.append("CattleID", String(cattle.cattleID));
      formData.append("Price", data.price);

      if (!selectedFile) {
        toast.error("Please upload an image.");
        return;
      }
      formData.append("imageFile", selectedFile);

      const response = await addCattleECommerce(formData);

      toast.success(response?.data?.message +" - "+response?.data?.productID  || "Add Success Store");
    } catch (error: unknown) {
      const message =
        (error as IErrorResponse)?.data?.message ||
        "Something went wrong while adding the Cattle.";
      toast.error(message);
    }
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-auto">
          <Plus /> Add ECommerce
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle>Add Cattle</DialogTitle>
          <DialogDescription>
            Do You Want Add New Cattle For ECommerce. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price : </FormLabel>
                  <FormControl>
                    <Input
                      // min={0}
                      //   type="number"
                      {...field}
                      //   onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price : </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          setSelectedFile(file);
                        }
                      }}
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
                {/* {isLoading ? <LoaderIcon /> : "Add ECommerce"} */}
                Add ECommerce
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
