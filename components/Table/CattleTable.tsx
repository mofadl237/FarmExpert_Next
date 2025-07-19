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
//PDF Library Install
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


import { useGetCattleQuery } from "@/store/services/ManagerFarm";
import CattleTableAction from "./CattleTableAction";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { Button } from '@/components/ui/button';

export function CattleTable() {
  //1- state get Cattles From Api
  const [selectType, setSelectType] = useState("Cow");
  const { data: Cattels } = useGetCattleQuery({ typeCattle: selectType });
  //2- Handler
  const downloadPDF = ()=>{
    const pdf = new jsPDF();
    pdf.text("Cattle Report", 14, 10);
    autoTable(pdf, {
      startY: 20,
      head: [["ID", "Type", "Gender", "Weight", "Age"]],
      body: Cattels?.map((cattel) => [
        cattel.cattleID ?? '',
        cattel.type ?? '',
        cattel.gender ?? '',
        cattel.weight ?? '',
        cattel.age ?? '',
      ]) || [],
    });
    pdf.save('Cattles.pdf')
  }
  return (
    <>
      <div>
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
            <TableHead className="text-center">Action</TableHead>
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
      <Button className='bg-secondary w-full'  onClick={downloadPDF}>DOWNLOAD PDF</Button>
    </>
  );
}
