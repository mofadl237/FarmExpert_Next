"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IWorker } from "@/interface";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

interface IProps {
  worker: IWorker;
}

export default function WorkerCard({ worker }: IProps) {
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
  const displayAge = age || "22";
  const displayExperience = experience || "2";
  const displaySpecialty = specialty || "Farmer";
  const displayPhone = phone || "01554491132";
  const displaySalary =
    typeof Number(salary) === "number"
      ? `${salary} EGP`
      : "0 EGP";
  const displayCode = code || "22";
  const displayEmail = email || "fadl@gmail.com";
  const displayImage =`https://farmxpertapi.runasp.net${imagePath}`
    
console.log(displayImage)
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
          <span className="font-medium">Experience:</span> {displayExperience} years
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
        <Button variant="outline" className="flex-1 gap-2">
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
        <Button variant="destructive" className="flex-1 gap-2">
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </Card>
  );
}
