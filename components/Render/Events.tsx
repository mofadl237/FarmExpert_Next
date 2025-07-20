'use client'
import { useGetEventsQuery } from '@/store/services/ManagerFarm'
import EventAction from '../Action/EventAction';
import './Event.scss'

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
        <div key={event.id} className={`border-2 rounded-md p-4 space-y-3 ${event.eventType.split(" ")[0]}`}>
            <h2>Event Type : {event.eventType}</h2>
            <h3>Tag Number : {event.tagNumber}</h3>
            {/* Valid For Every Event */}
            {(event.eventType === 'Treated') && (
              <div>
                <p>Medicine : {event.medicine} </p>
                <p>Dosage : {event.dosage}</p>
                <p>WithdrawalTime : {event.withdrawalTime}</p>
              </div>
              
            )}
            {(event.eventType === 'Weighted') && (
              <div>
                <p>Weighted : {event.weight} </p>
              </div>
            )}
            {(event.eventType === 'Gives Birth') && (
              <div>
                <p>CalfGender : {event.calfGender}</p>
              </div>
            )}
            {(event.eventType === 'Vaccinated') && (
              <div>
                <p>Vaccine Type : {event.vaccineType}</p>
              </div>
            )}
            <p>Notes : {event.notes}</p>
            <EventAction Event={event} />
           
        </div>
    )) }
  </div>
  ) 
}

export default Events