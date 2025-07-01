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
import { Edit, LoaderIcon } from "lucide-react";
import { useState } from "react";
import {  useUpdateFarmMutation } from "@/store/services/Farm";
import { IFarm } from "@/interface";
interface IProps{
    farm:IFarm;
}
const ModelEditFarm = ({farm}:IProps) => {
    
    const [open,setOpen]=useState(false);
      const [updateFarm, { isLoading: loadingUpdate }] = useUpdateFarmMutation();
    
   
  //2- Handler
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: farm.name,
    },
  });

  // 2. Define a submit handler.
  function  onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    console.log("DataFarm Name ===> ",values.name);
    updateFarm({ id:farm.id , name: values.name })
    setOpen(false)
  }
  //3- Render
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"><Edit/> Edit Farm</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Farm</DialogTitle>
          <DialogDescription>
            Do You Want Add New Farm. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Farm " {...field} />
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
          <Button type="submit"  className="cursor-pointer">{loadingUpdate ? <LoaderIcon/> : 'Update'}</Button>
        </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}
export default ModelEditFarm;
