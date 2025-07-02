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

import { formSchema } from "@/validation";
import { z } from "zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { IManager } from "@/interface";

interface IProps{
    manager:IManager;
}
const ModelEditManager = ({manager}:IProps) => {
    
    const [open,setOpen]=useState(false);
    
   
  //2- Handler
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: manager.name,
    },
  });

  // 2. Define a submit handler.
  function  onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    console.log("Data manager Name ===> ",values.name);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>manager Name</FormLabel>
                  <FormControl>
                    <Input placeholder="manager " {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" >Cancel</Button>
          </DialogClose>
          {/* <Button type="submit"  className="cursor-pointer">{ ? <LoaderIcon/> : 'Update'}</Button> */}
        </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}
export default ModelEditManager;
