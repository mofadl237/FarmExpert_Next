"use client";

import { toast } from "sonner";
import { ICattle,  } from "@/interface";

import { Button } from "../ui/button";
import { Edit, TrashIcon } from "lucide-react";
interface IProps{
  cattel:ICattle;
}

const CattleTableAction = ( {cattel} :  IProps) => {
  //1- state
    // const [loading, setIsLoading] =useState(false);
    
    //2- Handler
   const onClickAddFarm = async () => {
    console.log(cattel)
  try {
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
       <Edit/>
      </Button>
      <Button
        className="cursor-pointer"
        variant={"destructive"}
        onClick={onClickAddFarm}
      >
       {/* { loading ?  <Loader/> : <Trash />} */}
       <TrashIcon/>
      </Button>

      
    </>
  );
};

export default CattleTableAction;
