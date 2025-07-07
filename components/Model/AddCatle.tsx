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
import { CattleSchema } from "@/validation";
import { useState } from "react";
import { LoaderIcon, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useAddCattleMutation } from "@/store/services/ManagerFarm";
import { IErrorResponse } from "@/interface";

export function AddCattle() {
  //1- State
  const [open, setOpen] = useState(false);
  const [addCattle,{isLoading}] = useAddCattleMutation();

  //2- Handler

  const form = useForm<z.infer<typeof CattleSchema>>({
    resolver: zodResolver(CattleSchema),
    defaultValues: {
      gender: "",
      type: "",
      age: 0,
      weight: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof CattleSchema>) {
    try {
      const formData = new FormData();
      formData.append("Type", data.type);
      formData.append("Gender", data.gender);
      formData.append("weight", String(data.weight));
      formData.append("age", String(data.age));
      await addCattle(formData).unwrap();
      toast.success("Worker added successfully.");
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
          <Plus /> Add Cattle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle>Add Cattle</DialogTitle>
          <DialogDescription>
            Do You Want Add New Cattle. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-6"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type : </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified Type to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cow">Cow</SelectItem>
                      <SelectItem value="Sheep">Sheep</SelectItem>
                      <SelectItem value="Buffalo">Buffalo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender : </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified Type to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight : </FormLabel>
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
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age : </FormLabel>
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
                {isLoading ? <LoaderIcon /> : "Add Cattle"}
                
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
