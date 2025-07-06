"use client";

import { toast } from "sonner";
import { IRequest } from "@/interface";
import { useAddFarmMutation } from "@/store/services/Farm";
import { useDeleteRequestsMutation } from "@/store/services/Request";
import { Button } from "../ui/button";
interface IProps{
  request:IRequest;
}

const MilkTableAction = ( {request} :  IProps) => {
  //1- state
    // const [loading, setIsLoading] =useState(false);
    const [addFarm]=useAddFarmMutation()
    const[deleteRequest]=useDeleteRequestsMutation()
    //2- Handler
   const onClickAddFarm = async () => {
  try {
    await addFarm({ name: request.farmName }).unwrap();
    deleteRequest(request.id)
    toast.success("Farm added successfully.");
  } catch (error: unknown) {
    const errorMessage =
      (error as { data?: { message?: string } })?.data?.message ||
      "Error adding the farm.";
    toast.error(errorMessage);
  }
};
  return (
    <>
      
      <Button
        className="cursor-pointer"
        variant={"secondary"}
        onClick={onClickAddFarm}
      >
       {/* { loading ?  <Loader/> : <Trash />} */}
       add
      </Button>

      
    </>
  );
};

export default MilkTableAction;
