"use client";

import {  useGetFarmsQuery } from "@/store/services/Farm";
import FarmCard from "./FarmCard";

const FarmRender = () => {
  const { isError, isLoading, data, error } = useGetFarmsQuery();
    // const [ deleteFarm ]=useDeleteFarmMutation();


  if (isError) {
    return (
      <div className="text-red-500">
        <h3>Error Details</h3>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
  if (isLoading) return <h1>Loading .....</h1>;
  return (
    <div className="  grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
      {
        data?.map(farm => <FarmCard key={farm.id} farm={farm}/> )
      }
      
      
    </div>
  );
};

export default FarmRender;
