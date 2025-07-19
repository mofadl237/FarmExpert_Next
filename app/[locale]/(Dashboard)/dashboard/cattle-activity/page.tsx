import { AddEvent } from "@/components/Model/AddEvent"
import Events from "@/components/Render/Events"


const page = () => {
  return (
    <div className="space-y-6 mt-8 w-full">
      <AddEvent/>
      <Events/>
    </div>
  )
}

export default page
