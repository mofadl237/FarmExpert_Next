import AddMilk from "@/components/Model/AddMilk";
import { MilkTable } from "@/components/Table/MilkTable";

const page = () => {
  return (
    <div className="space-y-6 mt-8 w-full">
      <AddMilk/>
      <MilkTable />
    </div>
  );
};

export default page;
