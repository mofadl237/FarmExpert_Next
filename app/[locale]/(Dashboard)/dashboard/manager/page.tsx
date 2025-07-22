import ManagerRender from "@/components/Render/ManagerRender";
import ModelAddManager from "@/components/Model/AddManager";

const page = () => {
  return (
    <div className="space-y-6 mt-8 w-full">
      
      <ModelAddManager />
      <ManagerRender />
    </div>
  );
};

export default page;
