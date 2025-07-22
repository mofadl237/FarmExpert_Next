import ModelAddFarm from "@/components/Model/AddFarm";
import FarmRender from "@/components/Render/FarmRender";
// import ModelAddManager from "@/components/ModelAddManager";

const page =  () => {
  
  return (
    <div className="space-y-6 mt-8 w-full">
     <div className="flex gap-4 ">
       <ModelAddFarm/>
       {/* <ModelAddManager/> */}
     </div>
      <FarmRender/>
    </div>
  );
};

export default page;