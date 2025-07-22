"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IWorker } from "@/interface";
import Image from "next/image";

import { useDeleteWorkMutation } from "@/store/services/ManagerFarm";
import ModelEditWork from "../Model/EditWork";
import AlertDelete from "../Model/AlertDelete";

interface IProps {
  worker: IWorker;
}

export default function WorkerCard({ worker }: IProps) {
  const [deleteWork,{isLoading}]=useDeleteWorkMutation()
  //2- Handler
  const onDelete = (id: number) => {
   deleteWork({id});
  };
  const {
    name,
    nationalID,
    age,
    experience,
    specialty,
    phone,
    salary,
    code,
    email,
    imagePath,
  } = worker;

  const displayName = name || "Fadl";
  const displayNationalID = nationalID || "12345678910111213";
  const displayAge = age;
  const displayExperience = experience || "2";
  const displaySpecialty = specialty || "Farmer";
  const displayPhone = phone || "01554491132";
  const displaySalary =
    typeof Number(salary) === "number" ? `${salary} EGP` : "0 EGP";
  const displayCode = code || "22";
  const displayEmail = email || "fadl@gmail.com";
  const displayImage = `https://farmxpertapi.runasp.net${imagePath}`;

  return (
    <Card className="w-full max-w-md rounded-md shadow-lg hover:shadow-2xl transition-shadow px-4">
      <CardHeader className="flex flex-col items-center">
        <Image
          src={displayImage}
          alt={displayName}
          width={100}
          height={100}
          className="w-28 h-28  rounded-full border border-gray-300 shadow-md bg-center"
        />
        <CardTitle className="mt-4 text-xl font-bold">{displayName}</CardTitle>
        <p className="text-muted-foreground text-sm">{displaySpecialty}</p>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">ID:</span> {worker.id}
        </p>
        <p>
          <span className="font-medium">Age:</span> {displayAge}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {displayPhone}
        </p>
        <p>
          <span className="font-medium">Email:</span> {displayEmail}
        </p>
        <p>
          <span className="font-medium">National ID:</span> {displayNationalID}
        </p>
        <p>
          <span className="font-medium">Experience:</span> {displayExperience}{" "}
          years
        </p>
        <p>
          <span className="font-medium">Salary:</span> {displaySalary}
        </p>
        <p>
          <span className="font-medium">Code:</span>{" "}
          <span className="text-green-600">{displayCode}</span>
        </p>
      </CardContent>

      <div className="flex gap-4 pt-4">
        <ModelEditWork work={worker} />
        <AlertDelete
          loadingDelete={isLoading}
          Delete={() => onDelete(worker.id)}
        />
      </div>
    </Card>
  );
}
