import ModelAddFarm from "@/components/ModelAddFarm"
import { RequestTable } from "@/components/RequestTable"

const page = () => {
  return (
    <div className="space-y-6 mt-8 w-full">
      <ModelAddFarm/>
      <RequestTable/>
    </div>
  )
}

export default page