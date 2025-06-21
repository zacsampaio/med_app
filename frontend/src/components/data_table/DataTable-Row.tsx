import { Appointment } from "@/lib/types";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { CalendarPlus2 } from "lucide-react";
import { DataTableReschedule } from "./DataTable-Reschedule";
import { getStatusLabel } from "@/lib/utils";

export interface DataTableAppointment {
  appointment: Appointment;
}

export function DataTableRow({ appointment }: DataTableAppointment) {



  return (
    <TableRow>
      <TableCell className="flex justify-center mt-2">
        <CalendarPlus2 className="h-5 w-5" />
      </TableCell>
      <TableCell>
        {typeof appointment.patientId === "object" &&
        appointment.patientId != null
          ? appointment.patientId.name
          : appointment.patientId}
      </TableCell>
      <TableCell>
        {appointment.date?.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }) ?? "Sem data"}
      </TableCell>
      <TableCell>{getStatusLabel(appointment.status)}</TableCell>
      <TableCell>
        {typeof appointment.doctorId === "object" &&
        appointment.doctorId !== null
          ? appointment.doctorId.name
          : appointment.doctorId}
      </TableCell>
      <TableCell>{
        typeof appointment.doctorId === "object" 
        && appointment.doctorId?.specialtyId != null 
        && typeof appointment.doctorId.specialtyId === "object"
          ? appointment.doctorId.specialtyId.name
          : "Sem especialidade definida"}</TableCell>
      <TableCell>
        <Button variant={"success"} className="rounded-xl">
          Iniciar
        </Button>
      </TableCell>
      <TableCell>
        <DataTableReschedule _id={appointment._id}/>
      </TableCell>
      <TableCell>
        <Button variant={"ghost"} className="rounded-xl hover:bg-red-500 hover:text-zinc-50 dark:hover:bg-red-500 dark:hover:text-zinc-50">
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
