"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCattleQuery } from "@/store/services/ManagerFarm";
import CattleTableAction from "./CattleTableAction";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

export function CattleTable() {
  //1- state get Cattles From Api
  const [selectType, setSelectType] = useState("Cow");
  const { data: Cattels } = useGetCattleQuery({ typeCattle: selectType });
  console.log(Cattels);
  return (
    <>
      <div>
        {" "}
        <Select
          value={selectType}
          onValueChange={(value) => setSelectType(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cow">Cow</SelectItem>
            <SelectItem value="Sheep">Sheep</SelectItem>
            <SelectItem value="Buffalo">Buffalo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>Cattle </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cattle Type</TableHead>
            <TableHead>Cattle Gender</TableHead>
            <TableHead>Cattle weight</TableHead>
            <TableHead>Cattle Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Cattels?.length &&
            Cattels.map((Cattel) => (
              <TableRow key={Cattel.cattleID}>
                <TableCell className="font-medium">{Cattel.cattleID}</TableCell>
                <TableCell>{Cattel.type}</TableCell>
                <TableCell>{Cattel.gender}</TableCell>
                <TableCell>{Cattel.weight}</TableCell>
                <TableCell>{Cattel.age}</TableCell>

                <TableCell className="flex space-x-2 item-center justify-end ">
                  <CattleTableAction cattel={Cattel} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              {Cattels?.length ? Cattels.length : "you Do nt Any Todo Yet !!"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
