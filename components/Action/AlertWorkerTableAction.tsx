"use client";

// import { toast } from "sonner";
import { IAlert, IErrorResponse,  } from "@/interface";

import { toast } from "sonner";

import { Button } from "../ui/button";
import { Eye, Loader } from "lucide-react";
import { useReadAlertMutation } from "@/store/services/ManagerFarm";
interface IProps {
  Alert: IAlert;
}

const AlertWorkerTableAction = ({ Alert }: IProps) => {
  //1- state
  const [readAlert, { isLoading }] = useReadAlertMutation();
  //2- Handler
  const onClickRead = async (id: number) => {
   
    try {
      await readAlert({ id }).unwrap();
      toast.success("Read Notification successfully.");
    } catch (error: unknown) {
      const err = error as IErrorResponse;
      toast.error(err?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <Button onClick={() => onClickRead(Alert.id)}>
        {isLoading ? <Loader /> : <Eye />}{" "}
      </Button>
    </>
  );
};

export default AlertWorkerTableAction;
