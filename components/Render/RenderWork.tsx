"use client";

import { useGetWorkerQuery } from "@/store/services/ManagerFarm";
import WorkerCard from "../Card/WorkerCard";
import SkeltonWorker from "../Skelton/SkeltonWorker";

const RenderWork = () => {
  const { isError, data, error ,isLoading} = useGetWorkerQuery();
    // const [ deleteFarm ]=useDeleteFarmMutation();


  if (isError) {
    return (
      <div className="text-red-500">
        <h3>Error Details</h3>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
  if(  isLoading) {
    return (
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,(minmax(250px,1fr)))]">
      {Array.from({length:3}).map((_,i)=>(
        <SkeltonWorker key ={i}/>
      ))}
      </div>
  )}
  return (
    <div className="  grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
      {
        data?.map(worker => <WorkerCard key={worker.id} worker={worker}/> )
      }
      
      
    </div>
  );
};

export default RenderWork;
