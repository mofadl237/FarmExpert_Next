import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IFarm } from "@/interface";
import { User, Mail, Home,  Tag,  } from "lucide-react";
import {
  useDeleteFarmMutation,
} from "@/store/services/Farm";
import AlertDelete from "../Model/AlertDelete";
import ModelEditFarm from "../Model/EditFarm";

interface IProps {
  farm: IFarm;
}

export default function FarmCard({ farm }: IProps) {
  //1- state
  const [deleteFarm, { isLoading: loadingDelete }] = useDeleteFarmMutation();
  //2- handler


  const onDelete = (id: number) => {
    deleteFarm(id);
  };
  return (
    <Card className="w-full max-w-md rounded-md px-5 mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Home className="w-5 h-5" />
          {farm.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <Tag className="w-4 h-4 text-green-600" />
          <span className="font-medium">ID :</span> {farm.id}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4 text-green-600" />
          <span>{farm?.manager?.name ? farm.manager.name : "Add Name"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="w-4 h-4 text-green-600" />
          <span>{farm?.manager?.email ? farm?.manager?.email : "Email"}</span>
        </div>

        <div className="flex justify-between gap-2 pt-3">
          <ModelEditFarm farm={farm}/>
          <AlertDelete
            loadingDelete={loadingDelete}
            Delete={() => onDelete(farm.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
