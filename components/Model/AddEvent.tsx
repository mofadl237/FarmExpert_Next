"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { EventSchema } from "@/validation";
import { useState } from "react";
import { LoaderIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAddCattleActivityMutation } from "@/store/services/ManagerFarm";
import { toast } from "sonner";
import { IErrorResponse } from "@/interface";

export function AddEvent() {
  //1- State
  const [open, setOpen] = useState(false);
const [addEvent,{isLoading}] =useAddCattleActivityMutation();
  //2- Handler addEvent

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      Date:new Date(),
    },
  });
  const selectedType = form.watch("EventType");

  async function onSubmit(data: z.infer<typeof EventSchema>) {
  console.log("SUBMITTED");
  console.log("Data ===> ", data);

  try {
    const formData = new FormData();

    formData.append("EventType", data.EventType);
    formData.append("TagNumber", String(data.TagNumber));

  
    if (data.Weight !== undefined) {
      formData.append("Weight", String(data.Weight));
    }
    if (data.Notes) {
      formData.append("Notes", data.Notes);
    }
    if (data.Medicine) {
      formData.append("Medicine", data.Medicine);
    }
    if (data.Dosage) {
      formData.append("Dosage", data.Dosage);
    }
    if (data.WithdrawalTime) {
      formData.append("WithdrawalTime", data.WithdrawalTime);
    }
    if (data.CalfGender) {
      formData.append("CalfGender", data.CalfGender);
    }
    if (data.VaccineType) {
      formData.append("VaccineType", data.VaccineType);
    }
    if (data.Date) {
      formData.append("Date", data.Date.toISOString());
    }

    await addEvent(formData).unwrap();
    toast.success("Event added successfully.");
    form.reset();
    setOpen(false);
  } catch (error: unknown) {
    const message =
      (error as IErrorResponse)?.data?.message ||
      "Something went wrong while adding the Event.";
    toast.error(message);
  }
}


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-auto">
          <Plus /> Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  max-h-[90vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            Do You Want Add New Event. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
            <FormField
              control={form.control}
              name="EventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event : </FormLabel>
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
                      <SelectItem value="Dry off">Dry off</SelectItem>
                      <SelectItem value="Treated">
                        Treated/Medicated
                      </SelectItem>
                      <SelectItem value="Inseminated">
                        Inseminated/Mated
                      </SelectItem>
                      <SelectItem value="Weighted">
                        Weighted
                      </SelectItem>
                      <SelectItem value="Gives Birth">
                        Gives Birth
                      </SelectItem>
                      <SelectItem value="Vaccinated">
                        Vaccinated
                      </SelectItem>
                      <SelectItem value="Pregnant">
                        Pregnant
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date */}
            <FormField
              control={form.control}
              name="Date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date:</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value?.toISOString().split("T")[0]}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tag Number */}
            <FormField
              control={form.control}
              name="TagNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag Number : </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Valid For Each Event */}

            {/* 1- Valid Dry off */}
            {selectedType === "Dry off" && (
              <FormField
                control={form.control}
                name="Notes"
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
            )}

            {/* 2- valid Treated/Medicated*/}
            {selectedType === "Treated" && (
              <>
                <FormField
                  control={form.control}
                  name="Medicine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medicine : </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Dosage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage : </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="WithdrawalTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WithdrawalTime : </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Notes"
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
              </>
            )}

            {/* 3- valid Inseminated/Mated */}
            {selectedType === "Inseminated" && (
              <>
                <FormField
                  control={form.control}
                  name="Notes"
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
              </>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">
                {isLoading ? <LoaderIcon /> : "Add Event"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
