"use client"
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AppointmentsAPI } from "@/lib/api/appointments";
import { DataTableRow } from "./DataTable-Row";

export function DataTable() {
  const { data: dataAppointments, isLoading, error } = useQuery(
    {
      queryKey: ["consultas"],
      queryFn: () => AppointmentsAPI.list(),
    }
  );

  if (isLoading) return <div>Carregando consultas</div>
  if (error) return <div>Error: {(error as Error).message}</div>

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px]"></TableHead>
            <TableHead>Paciente</TableHead>
            <TableHead className="w-[140px]">Data</TableHead>
            <TableHead className="w-[140px]">Status</TableHead>
            <TableHead className="w-[140px]">Doutor(a)</TableHead>
            <TableHead className="w-[140px]">Especialidade</TableHead>
            <TableHead className="w-[164px]"></TableHead>
            <TableHead className="w-[132px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataAppointments &&
            dataAppointments.map((appointment) => {
              return <DataTableRow key={appointment._id} appointment={appointment}  />
            })}
        </TableBody>
      </Table>
    </>
  );
}
