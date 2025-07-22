"use client";

// import { toast } from "sonner";
import { IAlert, IErrorResponse } from "@/interface";

import { toast } from "sonner";

import AlertDelete from "../Model/AlertDelete";
import { useDeleteNotificationMutation } from "@/store/services/ManagerFarm";
interface IProps {
  Alert: IAlert;
}

const AlertTableAction = ({ Alert }: IProps) => {
  //1- state
  const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

  //2- Handler
  const onDelete = async (id: number) => {
    try {
      await deleteNotification({ id }).unwrap();
      toast.success("Delete Notification successfully.");
    } catch (error: unknown) {
      const err = error as IErrorResponse;
      toast.error(err.data.message || "Something went wrong");
    }
  };
  return (
    <>
      {/* <EditNotification Alert={Alert} /> */}

      <AlertDelete
        loadingDelete={isLoading}
        Delete={() => onDelete(Alert.id)}
      />
    </>
  );
};

export default AlertTableAction;
