"use client";
import { useGetEventsQuery } from "@/store/services/ManagerFarm";
import EventAction from "../Action/EventAction";
import "./Event.scss";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import Paginator from "../Paginator";

function Events() {
  //1- state
  const [selectSort, setSelectSort] = useState("asc");
  const [selectType, setSelectType] = useState(" ");
  const [selectLimit, setSelectLimit] = useState("3");
  const [currentPage,setCurrentPage]=useState(1)

  const { data: EventsResponse, isLoading } = useGetEventsQuery({
    sort: selectSort,
    limit: parseInt(selectLimit),
    type: selectType,
    page:1
  });
  //2- Handler
 const onClickNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const onClickPrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  //3- Render
const {data:Events = []} = EventsResponse || {}
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Select
          value={selectSort}
          onValueChange={(value) => setSelectSort(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">ASC</SelectItem>
            <SelectItem value="desc">DESC</SelectItem>
          </SelectContent>
        </Select>
        {/* Select Event Type  */}

        <Select
          value={selectType}
          onValueChange={(value) => setSelectType(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="Dry off">Dry off</SelectItem>
            <SelectItem value="Treated">Treated/Medicated</SelectItem>
            <SelectItem value="Inseminated">Inseminated/Mated</SelectItem>
            <SelectItem value="Weighted">Weighted</SelectItem>
            <SelectItem value="Gives Birth">Gives Birth</SelectItem>
            <SelectItem value="Vaccinated">Vaccinated</SelectItem>
            <SelectItem value="Pregnant">Pregnant</SelectItem>
            <SelectItem value="Aborted Pregnancy">Aborted Pregnancy</SelectItem>
            <SelectItem value="Hoof Trimming">Hoof Trimming</SelectItem>
            <SelectItem value="Heed spraying">Heed spraying</SelectItem>
            <SelectItem value="Tagging">Tagging</SelectItem>
          </SelectContent>
        </Select>
        {/* Select Limit */}

        <Select
          value={selectLimit}
          onValueChange={(value) => setSelectLimit(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mb-4">
        {Events &&
          Events.map((event) => (
            // console.log("Event ====> ",event)
            // Add Class Color For Every Event
            <div
              key={event.id}
              className={`border-2 rounded-md p-4 space-y-3 ${
                event.eventType.split(" ")[0]
              } flex flex-col justify-between`}
            >
              <h2>Event Type : {event.eventType}</h2>
              <h3>Tag Number : {event.tagNumber}</h3>
              {/* Valid For Every Event */}
              {event.eventType === "Treated" && (
                <div>
                  <p>Medicine : {event.medicine} </p>
                  <p>Dosage : {event.dosage}</p>
                  <p>WithdrawalTime : {event.withdrawalTime}</p>
                </div>
              )}
              {event.eventType === "Weighted" && (
                <div>
                  <p>Weighted : {event.weight} </p>
                </div>
              )}
              {event.eventType === "Gives Birth" && (
                <div>
                  <p>CalfGender : {event.calfGender}</p>
                </div>
              )}
              {event.eventType === "Vaccinated" && (
                <div>
                  <p>Vaccine Type : {event.vaccineType}</p>
                </div>
              )}
              <p>Notes : {event.notes}</p>
              <EventAction Event={event} />
            </div>
          ))}
      </div>
      <Paginator
              total={EventsResponse?.totalCount ?? 1}
              pageCount={EventsResponse?.totalPages || 1}
              isLoading={isLoading}
              page={currentPage}
              onClickPrev={onClickPrev}
              onClickNext={onClickNext}
            />
    </div>
  );
}

export default Events;
