import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Search, X } from "lucide-react";
import { CreateAppointment } from "../CreateAppointment";

interface HeaderProps {
  filters: {
    patient: string;
    doctor: string;
    status: string;
  };
  onChangeFilters: (filter: HeaderProps["filters"]) => void;
}

export function DataTableHeader({ filters, onChangeFilters }: HeaderProps) {
  const { control, handleSubmit, reset, register } = useForm({
    defaultValues: filters,
  });

  function handleFilter(data: typeof filters) {
    onChangeFilters(data);
  }

  function handleClearFilter() {
    const empty = { patient: "", doctor: "", status: "all" };
    reset(empty);
    onChangeFilters(empty);
  }

  return (
    <div className="flex justify-between items-center gap-2 p-2">
      <form
        className="flex justify-start items-center gap-2"
        onSubmit={handleSubmit(handleFilter)}
      >
        <span className="text-sm font-semibold">Filtros:</span>
        <Input
          placeholder="Nome do paciente"
          className="h-8"
          {...register("patient")}
        />
        <Input
          placeholder="Nome do Doutor"
          className="h-8"
          {...register("doctor")}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            return (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="scheduled">Agendada</SelectItem>
                  <SelectItem value="rescheduled">Remarcada</SelectItem>
                  <SelectItem value="in_progress">Em andamento</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
                </SelectContent>
              </Select>
            );
          }}
        />
        <Button type="submit" variant={"secondary"} size={"xs"}>
          <Search className="h-4 w-4" />
          Filtrar resultados
        </Button>

        <Button variant={"outline"} size={"xs"} onClick={handleClearFilter}>
          <X className="h-4 w-4" />
          Remover Filtros
        </Button>
      </form>
      <CreateAppointment />
    </div>
  );
}
