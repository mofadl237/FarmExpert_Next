'use client'
import { useGetEventsQuery } from '@/store/services/ManagerFarm'
import EventAction from '../Action/EventAction';


function Events() {
    const {data:Events,isLoading} = useGetEventsQuery();
   if(isLoading){
    return <h1>Loading</h1>
   }
  return (
    // grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
  <div className='grid gap-3  grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
    {Events && Events.map((event)=>(
        // console.log("Event ====> ",event)
        // Add Class Color For Every Event
        <div key={event.id} className={`border-2 rounded-md p-4 space-y-3`}>
            <h1>Event Type : {event.eventType}</h1>
            <h1>Tag Number : {event.tagNumber}</h1>
            {/* Valid For Every Event */}
            <EventAction Event={event} />
           
        </div>
    )) }
  </div>
  ) 
}

export default Events