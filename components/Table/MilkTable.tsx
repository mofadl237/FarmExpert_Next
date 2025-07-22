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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "@/components/ui/badge";
import MilkTableAction from "../Action/MilkTableAction";
import { useGetMilkQuery } from "@/store/services/ManagerFarm";
import { Button } from "../ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import Paginator from "../Paginator";

export function MilkTable() {
  //1- state get Requests From Api
  const [selectSort, setSelectSort] = useState("asc");
  const [selectLimit, setSelectLimit] = useState("3");
    const [currentPage, setCurrenPage] = useState(1);
  
  const { data: milksResponse,isLoading } = useGetMilkQuery({
    limit: parseInt(selectLimit),
    sort: selectSort,
    page:currentPage,
  });
  const {data: milks = []} = milksResponse || {};
   //2- Handler
  const onClickNext = () => {
    setCurrenPage((prev) => prev + 1);
  };
  const onClickPrev = () => {
    setCurrenPage((prev) => prev - 1);
  };
  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Milk Report", 14, 10);
    autoTable(pdf, {
      startY: 20,
      head: [["Cow ID", "am", "pm", "Total", "Notes", "Date"]],
      body:
        milks?.map((milk) => [
          milk.tagNumber ?? "",
          milk.am ?? "",
          milk.pm ?? "",
          milk.total ?? "",
          milk.notes ?? "",
          milk.date ? new Date(milk.date).toLocaleDateString("en-GB") : "",
        ]) || [],
    });
    pdf.save("Milk.pdf");
  };
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Select
          value={selectSort}
          onValueChange={(value) => setSelectSort(value)}
          
        >
          <SelectTrigger className="w-[200px] ">
            <SelectValue placeholder="Select Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">ASC</SelectItem>
            <SelectItem value="desc">DESC</SelectItem>
          </SelectContent>
        </Select>
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
                  </SelectContent>
                </Select>
        <Button className="bg-secondary " onClick={downloadPDF}>
          DOWNLOAD PDF
        </Button>
      </div>
      <Table>
        <TableCaption>Milk Production </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cow ID</TableHead>
            <TableHead>Am</TableHead>
            <TableHead>Pm</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {milks?.length &&
            milks.map((milk) => (
              <TableRow key={milk.id}>
                <TableCell className="font-medium">{milk.tagNumber}</TableCell>
                <TableCell>
                  <Badge className="px-5" variant={"secondary"}>
                    {milk.am}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="px-5">{milk.pm}</Badge>
                </TableCell>
                <TableCell>{milk.total}</TableCell>
                <TableCell>{milk.notes}</TableCell>
                <TableCell>
                  {milk.date
                    ? (() => {
                        const date = new Date(milk.date);
                        const day = date.getDate();
                        const month = date.getMonth() + 1;
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                      })()
                    : "—"}
                </TableCell>

                <TableCell className="flex space-x-2 item-center justify-end ">
                  <MilkTableAction milk={milk} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Total Cows Milked</TableCell>
            <TableCell className="text-right">
              {milks?.length ? milks.length : "you Do'nt Any Milk Yet !!"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
       <Paginator
             
              total={milksResponse?.totalCount ?? 1}
              pageCount={milksResponse?.totalPages || 1}
              isLoading={isLoading}
              page={currentPage}
              onClickPrev={onClickPrev}
              onClickNext={onClickNext}
            />
    </div>
  );
}
