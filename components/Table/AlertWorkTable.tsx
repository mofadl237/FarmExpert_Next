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
import {useGetAlertsWorkerQuery } from "@/store/services/ManagerFarm";
import { getMaxLength, getToken } from "@/lib/utils";
import AlertWorkerTableAction from "../Action/AlertWorkerTableAction";
import { jwtDecode } from "jwt-decode";
import { IJwtPayload } from "@/interface";
export function AlertWorkTable() {
  //1- state get Alerts From DB
const {["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]:email}  = jwtDecode <IJwtPayload>(String(getToken()))
const {data:Alerts} = useGetAlertsWorkerQuery(email);
  
  return (
    <>
      
      <Table>
        <TableCaption>Alerts </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium ">ID</TableHead>
            <TableHead className="font-medium ">Title</TableHead>
            <TableHead className="font-medium ">Message</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Alerts?.length &&
            Alerts.map((Alert) => (
              <TableRow key={Alert.id}>
                <TableCell className="font-medium ">{Alert.id}</TableCell>
                <TableCell className="font-medium ">{Alert.title}</TableCell>
                <TableCell className="font-medium ">{getMaxLength(Alert.message)}</TableCell>

                <TableCell className="flex space-x-2 item-center justify-end ">
                  <AlertWorkerTableAction Alert={Alert} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {Alerts?.length ? Alerts.length : "you Do nt Any Alert Yet !!"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
