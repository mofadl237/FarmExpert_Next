'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, BadgeCheck, Home } from "lucide-react";
import { IManager } from "@/interface";
import ModelEditManager from "./ModelEditManager";
import AlertDelete from "./AlertDelete";
import { useDeleteManagerMutation } from "@/store/services/Manager";

interface IProps {
  manager: IManager;
}

export default function ManagerCard({ manager }: IProps) {
  //1- state
  const [deleteManager,{isLoading}]=useDeleteManagerMutation();
  return (
    <Card className="w-full max-w-md rounded-md px-5 mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700 text-lg">
          <User className="w-5 h-5" />
          {manager?.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-green-600" />
          <span className="font-medium">Manager ID:</span>
          {manager?.id}
        </div>

        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-green-600" />
          <span className="font-medium">Email:</span>
          {manager?.email}
        </div>

        <div className="pt-4 border-t border-gray-200 space-y-2">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-green-600" />
            <span className="font-medium">Farm:</span>
            {manager?.farm?.name}
          </div>

          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-green-600" />
            <span className="font-medium">Farm ID:</span>
            {manager?.farm?.id}
          </div>
        </div>
         <div className="flex justify-between gap-2 pt-3">
                  <ModelEditManager manager={manager}/>
                  <AlertDelete
                    loadingDelete={isLoading}
                    Delete={() => deleteManager(manager.id)}
                  />
                </div>
      </CardContent>
    </Card>
  );
}
