'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useGetRequestsQuery } from "@/store/services/Request";
import MilkTableAction from "./MilkTableAction";



export function MilkTable() {
    //1- state get Requests From Api 
    const {data:requests}=useGetRequestsQuery()
  return (
    <Table>
      <TableCaption>Requests </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >ID</TableHead>
          <TableHead>Farm Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>phoneNumber</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead>CreatedAt</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests?.length && requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.id}</TableCell>
            <TableCell>{request.farmName}</TableCell>
            <TableCell>{request.email}</TableCell>
            <TableCell>{request.phoneNumber}</TableCell>
            <TableCell>{request.completed ? <Badge variant="default">Added</Badge> : <Badge variant="destructive">Not Add</Badge>}</TableCell>
            <TableCell>{request.createdAt?.toLocaleString()}</TableCell>
            <TableCell className="flex space-x-2 item-center justify-end ">
                <MilkTableAction request={request}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">{requests?.length ? requests.length : 'you Do nt Any Todo Yet !!'}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
