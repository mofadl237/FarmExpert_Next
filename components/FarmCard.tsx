import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IFarm } from "@/interface";
import { User, Mail, Home, Edit, Tag, Loader } from "lucide-react";
import {
  useDeleteFarmMutation,
  useUpdateFarmMutation,
} from "@/store/services/Farm";
import AlertDelete from "./AlertDelete";

interface IProps {
  farm: IFarm;
}

export default function FarmCard({ farm }: IProps) {
  //1- state
  const [deleteFarm, { isLoading: loadingDelete }] = useDeleteFarmMutation();
  const [updateFarm, { isLoading: loadingUpdate }] = useUpdateFarmMutation();
  //2- handler
  const onEdit = async (id: number) => {
  try {
    const res = await updateFarm({ id, name: "Esmail" }).unwrap();
    console.log("تم التحديث بنجاح:", res);
  } catch (error) {
    console.error("خطأ أثناء التحديث:", error);
  }
};

  const onDelete = (id: number) => {
    deleteFarm(id);
  };
  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
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

        <div className="flex justify-between  gap-2 pt-3">
          <Button
            variant="outline"
            className="flex-auto cursor-pointer"
            onClick={() => onEdit(farm.id)}
          >
            {loadingUpdate ? (
              <Loader />
            ) : (
              <>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </>
            )}
          </Button>
          <AlertDelete
            loadingDelete={loadingDelete}
            Delete={() => onDelete(farm.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
