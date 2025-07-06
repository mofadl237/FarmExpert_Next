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
import { Badge } from "@/components/ui/badge";
import MilkTableAction from "./MilkTableAction";
import { useGetMilkQuery } from "@/store/services/ManagerFarm";

export function MilkTable() {

  //1- state get Requests From Api
  const { data: milks } = useGetMilkQuery();
  
  return (
    <Table>
      <TableCaption>Requests </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID Cow</TableHead>
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
              <TableCell><Badge className="px-5" variant={'secondary'}>{milk.am}</Badge></TableCell>
              <TableCell><Badge className="px-5">{milk.pm}</Badge></TableCell>
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
            {milks?.length ?   milks.length : "you Do'nt Any Milk Yet !!"}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
