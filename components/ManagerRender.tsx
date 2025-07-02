'use client'
import { useGetManagersQuery } from "@/store/services/Manager"
import ManagerCard from "./ManagerCard"

const ManagerRender = () => {
    const {isLoading,isError,data}=useGetManagersQuery();
    if(isLoading) return <h1>loading....</h1>
    if(isError) return <h1>Error</h1>
  return (
   <div className="  grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
         
         {
                 data?.map(manager =>  <ManagerCard key={manager.id} manager={manager}/> )
               }
       </div>
  )
}

export default ManagerRender