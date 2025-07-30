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

import {  workerSchema } from "@/validation";
import { z } from "zod";
import { Edit, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useAddWorkMutation } from "@/store/services/ManagerFarm";

const ModelAddWork = () => {
  const [open, setOpen] = useState(false);
  const [addWork, { isLoading }] = useAddWorkMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //2- Handler
  const form = useForm<z.infer<typeof workerSchema>>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      name: "",
      nationalID: "",
       age: "" ,
    //   experience: "",
      specialty: "",
      phone: "",
      password:"",
      salary: '',
    //   code: "",
      email: "",
    //   imageUrl: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof workerSchema>) {
    
      console.log("Add work ====> ",values)
    try {
         const formData = new FormData();

    // Append each field
    formData.append("name", values.name);
    formData.append("nationalID", values.nationalID);
    formData.append("age", values.age);
    // formData.append("experience", values.experience);
    formData.append("specialty", values.specialty);
    formData.append("phone", values.phone);
    formData.append("salary", values.salary);
    // formData.append("code", values.code);
    formData.append("email", values.email);
    formData.append("password", values.password);

if (!selectedFile) {
  toast.error("Please upload an image.");
  return;
}
formData.append("image", selectedFile);


     await addWork(formData).unwrap(); 
    toast.success("Worker added successfully.");
    } catch (error: unknown) {
  const message =
    error instanceof Error ? error.message : "Something went wrong while adding the worker.";
  toast.error(message);
}

   form.reset();
    setOpen(false);
  }
  //3- Render

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-auto">
          <Edit /> Add Worker
        </Button>
      </DialogTrigger>
<DialogContent className="sm:max-w-[425px]  md:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Worker</DialogTitle>
          <DialogDescription>
            Do You Want Add New Worker. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
{/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* nationalID */}
            <FormField
              control={form.control}
              name="nationalID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* experience */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* specialty */}
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialty</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* salary */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* code */}
            {/* <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            

            

            {/* imagePath */}
           <FormField
  control={form.control}
  name="imageUrl"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Image</FormLabel>
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
            {isLoading ? <LoaderIcon /> : "Add Worker"}
          </Button>
        </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
};
export default ModelAddWork;
