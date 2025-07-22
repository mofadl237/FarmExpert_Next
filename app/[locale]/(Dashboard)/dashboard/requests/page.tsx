import ModelAddFarm from "@/components/Model/AddFarm"
import { RequestTable } from "@/components/Table/RequestTable"

const page = () => {
  return (
    <div className="space-y-6 mt-8 w-full">
      <ModelAddFarm/>
      <RequestTable/>
    </div>
  )
}

export default page