"use client";

// import { toast } from "sonner";
import { ICattle } from "@/interface";

import { EditCattle } from "../Model/EditCattle";
import AlertDelete from "../AlertDelete";
import { useDeleteCattleMutation } from "@/store/services/ManagerFarm";
interface IProps {
  cattel: ICattle;
}

const CattleTableAction = ({ cattel }: IProps) => {
  //1- state
  const [deleteCattle,{isLoading}]=useDeleteCattleMutation()

  //2- Handler
   const  onDelete = async(id:number)=>{
       await deleteCattle({id})
  }
  return (
    <>
      <EditCattle cattle={cattel} />
      <AlertDelete
        loadingDelete={isLoading}
        Delete={() => cattel.cattleID !== undefined && onDelete(cattel.cattleID)}

      />
    </>
  );
};

export default CattleTableAction;
