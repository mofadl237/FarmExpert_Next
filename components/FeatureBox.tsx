import { LucideIcon,  } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
interface IProps{
    icon:LucideIcon;
    title:string;
    description:string;
}
export function FeatureBox({icon:Icon, title, description}:IProps) {
  return (
    <Card className="text-center shadow-md hover:shadow-lg  relative transition duration-200 p-6 hover:-top-6 hover:scale-3d">
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-green-100 text-green-600 p-4 rounded-full">
          <Icon width={20} height={20} />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
