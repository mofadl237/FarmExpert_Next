import ManagerRender from "@/components/ManagerRender";
import ModelAddManager from "@/components/ModelAddManager";

const page = () => {
  return (
    <div className="space-y-6 mt-8 w-full">
      
      <ModelAddManager />
      <ManagerRender />
    </div>
  );
};

export default page;
