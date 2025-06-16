import { Appointment } from "@/lib/types";
import { TableCell, TableRow } from "../ui/table";

interface DataTableAppointment {
  appointment: Appointment;
}

export function DataTableRow({ appointment }: DataTableAppointment) {
  const patientName =
    typeof appointment.patientId === "string"
      ? appointment.patientId
      : appointment.patientId?.name ?? "Sem paciente";

  const doctorName =
    typeof appointment.doctorId === "string"
      ? appointment.doctorId
      : appointment.doctorId?.name ?? "Sem médico";

  const specialtyName =
    typeof appointment.doctorId === "object" &&
    appointment.doctorId?.specialtyId &&
    typeof appointment.doctorId.specialtyId !== "string"
      ? appointment.doctorId.specialtyId.name
      : "Sem especialidade definida";

  const date = appointment.date ? new Date(appointment.date).toLocaleDateString() : "Sem data";

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell>
        {patientName}
      </TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{appointment.status}</TableCell>
      <TableCell>{doctorName}</TableCell>
      <TableCell>{specialtyName}</TableCell>
    </TableRow>
  );
}
