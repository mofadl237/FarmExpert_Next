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
import CattleTableAction from "../Action/CattleTableAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Paginator from "../Paginator";
import { SkeletonCattle } from "./SkeltonCattle";

export function CattleTable() {
  //1- state get Cattles From Api
  const [selectType, setSelectType] = useState("Cow");
  const [selectSort, setSelectSort] = useState("asc");
  const [selectLimit, setSelectLimit] = useState("3");
  const [currentPage, setCurrenPage] = useState(1);

  const { data: cattelsResponse, isLoading } = useGetCattleQuery({
  typeCattle: selectType,
  sort: selectSort,
  limit: parseInt(selectLimit),
  page:currentPage,
});
const { data: Cattels = [] } = cattelsResponse || {};

const { data: cowResponse } = useGetCattleQuery({
  typeCattle: "Cow",
  sort: selectSort,
  limit: parseInt(selectLimit),
  page:currentPage,

});
const { data: Cow = [] } = cowResponse || {};

const { data: buffaloResponse } = useGetCattleQuery({
  typeCattle: "Buffalo",
  sort: selectSort,
  limit: parseInt(selectLimit),
  page:currentPage,
});
const { data: Buffalo = [] } = buffaloResponse || {};

const { data: sheepResponse } = useGetCattleQuery({
  typeCattle: "Sheep",
  sort: selectSort,
  limit: parseInt(selectLimit),
  page:currentPage,
});
const { data: Sheep = [] } = sheepResponse || {};

   const AlllCattels = [...(Cow || []), ...(Buffalo || []), ...(Sheep || [])];
  //2- Handler
  const onClickNext = () => {
    setCurrenPage((prev) => prev + 1);
  };
  const onClickPrev = () => {
    setCurrenPage((prev) => prev - 1);
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Cattle Report", 14, 10);
    autoTable(pdf, {
      startY: 20,
      head: [["ID", "Type", "Gender", "Weight", "Age"]],
      body:
        AlllCattels?.map((cattel) => [
          cattel.cattleID ?? "",
          cattel.type ?? "",
          cattel.gender ?? "",
          cattel.weight ?? "",
          cattel.age ?? "",
        ]) || [],
    });
    pdf.save("Cattles.pdf");
  };
 if (isLoading ) {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <SkeletonCattle key={i} />
      ))}
    </>
  );
}

  return (
    <>
      <div className="flex justify-between items-center">
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
        {/* Select Sort */}
        <Select
          value={selectSort}
          onValueChange={(value) => setSelectSort(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">ASC</SelectItem>
            <SelectItem value="desc">DESC</SelectItem>
          </SelectContent>
        </Select>
        {/* Select Limit */}
        <Select
          value={selectLimit}
          onValueChange={(value) => setSelectLimit(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-secondary" onClick={downloadPDF}>
          DOWNLOAD PDF
        </Button>
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
              {Cattels?.length ? Cattels.length : "you Do nt Any Cattle Yet !!"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Paginator
        total={cattelsResponse?.totalCount ?? 1}
        pageCount={cattelsResponse?.totalPages || 1}
        isLoading={isLoading}
        page={currentPage}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
      />
    </>
  );
}
