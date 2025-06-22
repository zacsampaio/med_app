import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppointmentsAPI } from "@/lib/api/appointments";
import { useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { rescheduleSchema } from "@/lib/schemas/rescheduleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { DataTableAppointment } from "./DataTable-Row";
import { AppointmentCreateDTO } from "@/lib/types";

type FormData = z.infer<typeof rescheduleSchema>;

export function DataTableReschedule({ appointment }: DataTableAppointment) {
  const { _id, status } = appointment;
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDate, setPedingDate] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(rescheduleSchema),
  });

  const { mutateAsync: reschedule, isPending } = useMutation({
    mutationFn: ({ id, date }: { id: string; date: string }) =>
      AppointmentsAPI.reschedule(id, date, "rescheduled"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Consulta remarcada");
      reset();
      setOpen(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error?.message ?? "Tente novamente"}`);
    },
  });

  const { mutateAsync: createAppointment } = useMutation({
    mutationFn: (newAppointment: AppointmentCreateDTO) =>
      AppointmentsAPI.create(newAppointment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Nova consulta criada.");
      reset();
      setOpen(false);
    },
  });

  const onValid = async (data: FormData) => {
    const isoDate = new Date(data.date).toISOString();
    if (status !== "completed") {
      await reschedule({ id: _id, date: isoDate });
    } else {
      setPedingDate(isoDate);
      setConfirmOpen(open);
    }
  };

  const onInvalid = (errors: FieldErrors<FormData>) => {
    toast.error(errors.date?.message ?? "Dados inválidos");
  };

  const handleConfirm = async () => {
    if (!pendingDate) return;
    await createAppointment({
      date: pendingDate,
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      status: "scheduled",
    });
    setConfirmOpen(false);
    setPedingDate(null);
    setOpen(false);
    reset();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Remarcar</Button>
        </DialogTrigger>
        <DialogContent className="rounded-2xl w-[400px] justify-center">
          <DialogTitle>Remarcar Consulta</DialogTitle>
          <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <fieldset className="flex gap-2 items-center">
              <Label htmlFor="date">Informe o novo horário</Label>
              <Input
                id="date"
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                max="2100-12-31T20:00"
                {...register("date")}
                className="w-[180px]"
              />
            </fieldset>

            <Button
              type="submit"
              variant={"success"}
              className="w-full mt-4"
              disabled={isPending}
            >
              {isPending ? "Remarcando..." : "Remarcar"}
            </Button>
          </form>
          <DialogClose />
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmação da criação de uma nova consulta, CASO conluida. */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="rounded-2xl w-[400px]">
          <DialogTitle>Confirmação necessária</DialogTitle>
          <p>Essa ação criará uma nova consulta. Deseja continuar?</p>

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant={"outline"}>Cancelar</Button>
            </DialogClose>
            <Button variant={"destructive"} onClick={handleConfirm}>
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
