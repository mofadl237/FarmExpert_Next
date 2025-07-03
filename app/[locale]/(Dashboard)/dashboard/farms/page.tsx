import FarmRender from "@/components/FarmRender";
import ModelAddFarm from "@/components/ModelAddFarm";
import ModelAddManager from "@/components/ModelAddManager";

const page = () => {
  return (
    <div className="space-y-6 mt-8 w-full">
     <div className="flex">
       <ModelAddFarm/>
       <ModelAddManager/>
     </div>
      <FarmRender/>
    </div>
  );
};

export default page;