"use client";
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
import { DataTableHeader } from "./DataTable-Header";
import { useMemo, useState } from "react";

export function DataTableAppointments() {
  const [filters, setFilters] = useState({
    patient: "",
    doctor: "",
    status: "all",
  });

  const {
    data: dataAppointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => AppointmentsAPI.list(),
  });

  const filtered = useMemo(() => {
    if (!dataAppointments) return [];

    return dataAppointments.filter((appointment) => {
      const patientMatch =
        filters.patient === "" ||
        (typeof appointment.patientId !== "string" &&
          appointment.patientId?.name
            .toLowerCase()
            .includes(filters.patient.toLowerCase()));

      const doctorMatch =
        filters.doctor === "" ||
        (typeof appointment.doctorId !== "string" &&
          appointment.doctorId?.name
            .toLowerCase()
            .includes(filters.doctor.toLowerCase()));

      const statusMatch =
        filters.status === "all" || appointment.status === filters.status;

      return patientMatch && doctorMatch && statusMatch;
    });
  }, [dataAppointments, filters]);

  if (isLoading) return <div>Carregando consultas</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="space-y-2.5">
      <DataTableHeader filters={filters} onChangeFilters={setFilters} />
      <div className="border rounded-2xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead className="w-[140px]">Data e Horário</TableHead>
              <TableHead className="w-[140px]">Status</TableHead>
              <TableHead className="w-[140px]">Doutor(a)</TableHead>
              <TableHead className="w-[140px]">Especialidade</TableHead>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((appointment) => (
              <DataTableRow key={appointment._id} appointment={appointment} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
