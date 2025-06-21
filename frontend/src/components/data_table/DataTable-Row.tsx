import { Appointment } from "@/lib/types";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { CalendarPlus2 } from "lucide-react";
import { DataTableReschedule } from "./DataTable-Reschedule";
import { getStatusLabel } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppointmentsAPI } from "@/lib/api/appointments";
import { toast } from "sonner";

export interface DataTableAppointment {
  appointment: Appointment;
}

interface UpdateAppointmentStatus {
  id: string;
  status: string;
}

export function DataTableRow({ appointment }: DataTableAppointment) {
  const queryClient = useQueryClient();

  function updateAppointmentStatusOnCache(id: string, status: string) {
    queryClient.setQueriesData<Appointment[]>(
      { queryKey: ["appointments"], exact: false },
      (oldStatus) =>
        oldStatus
          ? oldStatus.map((appointment) =>
              appointment._id === id ? { ...appointment, status } : appointment
            )
          : oldStatus
    );

    queryClient.setQueryData<Appointment>(["appointment", id], (oldStatus) =>
      oldStatus ? { ...oldStatus, status } : oldStatus
    );
  }

  const { mutateAsync: startAppointment } = useMutation({
    mutationFn: ({ id, status }: UpdateAppointmentStatus) =>
      AppointmentsAPI.update(id, { status }),
    onSuccess: (_, variables) => {
      updateAppointmentStatusOnCache(variables.id, variables.status);
      toast.success("Consulta iniciada.");
    },
  });

  const { mutateAsync: finishAppointment } = useMutation({
    mutationFn: ({ id, status }: UpdateAppointmentStatus) =>
      AppointmentsAPI.update(id, { status }),
    onSuccess: (_, variables) => {
      updateAppointmentStatusOnCache(variables.id, variables.status);
      toast.success("Consulta finalizada.");
    },
  });

  const { mutateAsync: cancelAppointment } = useMutation({
    mutationFn: ({ id, status }: UpdateAppointmentStatus) =>
      AppointmentsAPI.update(id, { status }),
    onSuccess: (_, variables) => {
      updateAppointmentStatusOnCache(variables.id, variables.status);
      toast.success("Consulta finalizada.");
    },
  });

  const isButtonDisabled = appointment.status === "cancelled";

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
          minute: "2-digit",
        }) ?? "Sem data"}
      </TableCell>
      <TableCell>{getStatusLabel(appointment.status)}</TableCell>
      <TableCell>
        {typeof appointment.doctorId === "object" &&
        appointment.doctorId !== null
          ? appointment.doctorId.name
          : appointment.doctorId}
      </TableCell>
      <TableCell>
        {typeof appointment.doctorId === "object" &&
        appointment.doctorId?.specialtyId != null &&
        typeof appointment.doctorId.specialtyId === "object"
          ? appointment.doctorId.specialtyId.name
          : "Sem especialidade definida"}
      </TableCell>
      <TableCell>
        {(appointment.status === "scheduled" ||
          appointment.status === "rescheduled" ||
          appointment.status === "cancelled") && (
          <Button
            variant={"success"}
            className="rounded-xl w-full"
            disabled={isButtonDisabled}
            onClick={() =>
              startAppointment({ id: appointment._id, status: "in_progress" })
            }
          >
            Iniciar
          </Button>
        )}

        {appointment.status === "in_progress" && (
          <Button
            variant={"default"}
            className="rounded-xl w-full"
            disabled={isButtonDisabled}
            onClick={() =>
              finishAppointment({ id: appointment._id, status: "completed" })
            }
          >
            Finalizar
          </Button>
        )}

        {appointment.status === "completed" && (
          <Button variant={"ghost"} className="rounded-xl w-full" disabled>
            Concluída
          </Button>
        )}
      </TableCell>
      <TableCell>
        <DataTableReschedule _id={appointment._id} />
      </TableCell>
      <TableCell>
        {!(appointment.status === "completed") && (
          <Button
            variant={"ghost"}
            className="rounded-xl hover:bg-red-500 hover:text-zinc-50 dark:hover:bg-red-500 dark:hover:text-zinc-50"
            onClick={() =>
              cancelAppointment({ id: appointment._id, status: "cancelled" })
            }
          >
            Cancelar
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
