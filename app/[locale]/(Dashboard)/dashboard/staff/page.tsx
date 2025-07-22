import ModelAddWork from "@/components/Model/AddWork"
import RenderWork from "@/components/Render/RenderWork"

const page = () => {
  return (
     <div className="space-y-6 mt-8 w-full">
      
      <ModelAddWork />
      <RenderWork />
    </div>
  )
}

export default page