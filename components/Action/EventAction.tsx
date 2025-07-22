
import { useDeleteEventMutation } from "@/store/services/ManagerFarm";
import AlertDelete from "../Model/AlertDelete";
import { IEvent } from "@/interface";
import { EditEvent } from "../Model/EditEvent";

interface IProps {
  Event: IEvent;
}

const EventAction = ({ Event }: IProps) => {
  //1- state
  const [deleteEvent, { isLoading }] = useDeleteEventMutation();
  //2- handler
  const Delete = async (id: number) => {
    await deleteEvent({ id });
  };
  
  return (
    <div className="flex gap-2 justify-between  ">
      <AlertDelete loadingDelete={isLoading} Delete={() => Delete(Event.id!)} />

     <EditEvent event={Event}/>
    </div>
  );
};

export default EventAction;
