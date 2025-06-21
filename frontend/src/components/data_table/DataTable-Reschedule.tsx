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

type FormData = z.infer<typeof rescheduleSchema>;

export function DataTableReschedule({ _id }: { _id: string }) {
  const [open, setOpen] = useState(false);
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

  const onValid = async (data: FormData) => {
    const isoDate = new Date(data.date).toISOString();
    await reschedule({ id: _id, date: isoDate });
  };

  const onInvalid = (errors: FieldErrors<FormData>) => {
    toast.error(errors.date?.message ?? "Dados inválidos");
  };

  return (
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
              min={(new Date().toDateString().slice(0, 16))}
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
  );
}
