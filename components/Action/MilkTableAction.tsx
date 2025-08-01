"use client";

import { IMilk } from "@/interface";

import EditMilk from "../Model/EditMilk";
import AlertDelete from "../Model/AlertDelete";
import { useDeleteMilkMutation } from "@/store/services/ManagerFarm";
interface IProps {
  milk: IMilk;
}

const MilkTableAction = ({ milk }: IProps) => {
  //1- state
  const [deleteMilk, { isLoading }] = useDeleteMilkMutation();

  //2- Handler
  const onDelete = async (id: number) => {
    await deleteMilk({ id });
  };
  return (
    <>
      <EditMilk milk={milk} />

      <AlertDelete
        loadingDelete={isLoading}
        Delete={() => onDelete(milk.id!)}
      />
    </>
  );
};

export default MilkTableAction;
