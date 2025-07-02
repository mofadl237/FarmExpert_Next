import FarmRender from "@/components/FarmRender";
import ModelAddFarm from "@/components/ModelAddFarm";

const page = () => {
  return (
    <div className="space-y-6 mt-8 w-full">
      <ModelAddFarm/>
      <FarmRender/>
    </div>
  );
};

export default page;
