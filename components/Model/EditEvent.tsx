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
import { Edit2, LoaderIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { IErrorResponse, IEvent } from "@/interface";
import { useUpdateEventMutation } from "@/store/services/ManagerFarm";

interface IProps{
    event:IEvent;
}
export function EditEvent({event}:IProps) {
  //1- State
  const [open, setOpen] = useState(false);
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  //2- Handler addEvent

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      Date: event?.date ? new Date(event.date) : new Date(),
      CalfGender:event?.calfGender,
      Dosage:event?.dosage,
      EventType:event?.eventType,
      TagNumber:event?.tagNumber,
      Medicine:event?.medicine,
      Notes:event?.notes,
      VaccineType:event?.vaccineType,
      Weight:event?.weight,
      WithdrawalTime:event?.withdrawalTime,
    },
  });
  const selectedType = form.watch("EventType");

  async function onSubmit(data: z.infer<typeof EventSchema>) {
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

      await updateEvent({id:event.id! , body:formData}).unwrap();
      toast.success("Event Updated successfully.");
      form.reset();
      setOpen(false);
    } catch (error: unknown) {
      const message =
        (error as IErrorResponse)?.data?.message ||
        "Something went wrong while Updated the Event.";
      toast.error(message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-auto">
          <Edit2 /> Edit Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  max-h-[90vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Do You Want Edit New Event. Click save when you&apos;re done.
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
                      <SelectItem value="Treated">Treated/Medicated</SelectItem>
                      <SelectItem value="Inseminated">
                        Inseminated/Mated
                      </SelectItem>
                      <SelectItem value="Weighted">Weighted</SelectItem>
                      <SelectItem value="Gives Birth">Gives Birth</SelectItem>
                      <SelectItem value="Vaccinated">Vaccinated</SelectItem>
                      <SelectItem value="Pregnant">Pregnant</SelectItem>
                      <SelectItem value="Aborted Pregnancy">Aborted Pregnancy</SelectItem>
                      <SelectItem value="Hoof Trimming">Hoof Trimming</SelectItem>
                      <SelectItem value="Heed spraying">Heed spraying</SelectItem>
                      <SelectItem value="Tagging">Tagging</SelectItem>
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
            {/* 4- valid Weighted */}

            {selectedType === "Weighted" && (
              <>
                <FormField
                  control={form.control}
                  name="Weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight : </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
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

            {/* 5- valid Gives Birth */}
            {selectedType === "Gives Birth" && (
              <>
                <FormField
                  control={form.control}
                  name="CalfGender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CalfGender : </FormLabel>
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
            {/* 6- valid Vaccinated */}
            {selectedType === "Vaccinated" && (
              <>
                <FormField
                  control={form.control}
                  name="VaccineType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vaccine Type : </FormLabel>
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
            {/* 7- valid Pregnant  || "Aborted Pregnancy" || "Hoof Trimming" */}
            {(selectedType === "Pregnant" || selectedType === "Aborted Pregnancy" ||  selectedType === "Hoof Trimming" || selectedType === "Heed spraying" || selectedType === "Tagging") && (
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
                {isLoading ? <LoaderIcon /> : "Update Event"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
