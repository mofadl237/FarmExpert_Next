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
import { useGetAlertsQuery } from "@/store/services/ManagerFarm";
import AlertTableAction from "../Action/AlertTableAction";
import { getMaxLength } from "@/lib/utils";
import { Badge } from "../ui/badge";
// import { jwtDecode } from "jwt-decode";
// import { IJwtPayload } from "@/interface";

export function AlertTable() {
  //1- state get Alerts From DB

const {data:Alerts} = useGetAlertsQuery();
  
  return (
    <>
      
      <Table>
        <TableCaption>Alerts </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-center">ID</TableHead>
            <TableHead className="font-medium text-center">User ID</TableHead>
            <TableHead className="font-medium text-center">User Name</TableHead>
            <TableHead className="font-medium text-center">User Email</TableHead>
            <TableHead className="font-medium text-center">Title</TableHead>
            <TableHead className="font-medium text-center">Message</TableHead>
            <TableHead className="font-medium text-center">Read</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Alerts?.length &&
            Alerts.map((Alert) => (
              <TableRow key={Alert.id}>
                <TableCell className="font-medium ">{Alert.id}</TableCell>
                <TableCell className="font-medium ">{Alert.userId}</TableCell>
                <TableCell className="font-medium ">{Alert.name}</TableCell>
                <TableCell className="font-medium ">{Alert.email}</TableCell>
                <TableCell className="font-medium ">{Alert.title}</TableCell>
                <TableCell className="font-medium ">{getMaxLength(Alert.message)}</TableCell>
                <TableCell className="font-medium ">{Alert.isRead ? <Badge className="px-5 bg-secondary">Read</Badge> :<Badge className=" bg-primary px-5">Not Read</Badge>}</TableCell>

                <TableCell className="flex space-x-2 item-center justify-end ">
                  <AlertTableAction Alert={Alert} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell className="text-right">
              {Alerts?.length ? Alerts.length : "you Do nt Any Alert Yet !!"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
