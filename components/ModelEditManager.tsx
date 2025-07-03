"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { IManager } from "@/interface";
import { useUpdateManagerMutation } from "@/store/services/Manager";

interface IProps{
    manager:IManager;
}
const ModelEditManager = ({manager}:IProps) => {
    
    const [open,setOpen]=useState(false);
    const [updateManager,{isLoading}]=useUpdateManagerMutation();
   
  //2- Handler
  const form = useForm<z.infer<typeof formManager>>({
    resolver: zodResolver(formManager),
    defaultValues: {
      name: manager.name,
      farmId: String(manager.farm.id),
      email: manager.email,
      
    },
  });

  // 2. Define a submit handler.
  function  onSubmit(values: z.infer<typeof formManager>) {
    form.reset();
  //UPdate 
 const { farmId, ...rest } = values;

    const FarmIdNumber = Number(farmId);
    const updatedValues = {
      ...rest,
      farmId: FarmIdNumber,
    };
    console.log(updatedValues)

    updateManager({id:manager.id, body:updatedValues})
    setOpen(false)
  }
  //3- Render
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-auto"><Edit/> Edit manager</Button>
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
                    <Input  {...field} />
                  </FormControl>
                  <FormDescription>
                    This is Update Manager For Farm.
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
                    <Input placeholder="manager" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is Update Manager name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>manager Name</FormLabel>
                  <FormControl>
                    <Input type={'email'} {...field} />
                  </FormControl>
                  <FormDescription>
                    This is Update Email.
                  </FormDescription>
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
                    <Input   {...field} />
                  </FormControl>
                  <FormDescription>
                    This is Update.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" >Cancel</Button>
          </DialogClose>
          <Button type="submit"  className="cursor-pointer">{ isLoading ? <LoaderIcon/> : 'Update'}</Button>
        </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}
export default ModelEditManager;
