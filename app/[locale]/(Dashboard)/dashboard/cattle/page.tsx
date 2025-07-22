import { AddCattle } from "@/components/Model/AddCatle";
import { CattleTable } from "@/components/Table/CattleTable";

const page = () => {
  return (
    <div className="space-y-6 mt-8 w-full">
      <AddCattle />
      <CattleTable />
    </div>
  );
};

export default page;
