import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function CreateAppointment() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"} className="h-8 rounded-xl">
          Criar Consulta
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Consulta</DialogTitle>
          <DialogDescription>Crie uma nova consulta</DialogDescription>
        </DialogHeader>
        <form className="flex items-center justify-between">
          <fieldset className="space-y-2.5 w-full">
            <div className="flex gap-2.5">
              <Label htmlFor="patient">Paciente</Label>
              <Input id="patient" />
            </div>
            <div className="flex gap-2.5">
              <Label htmlFor="doctor">Doutor</Label>
              <Input id="doctor"/>
            </div>
            <div className="flex gap-2.5">
              <Label htmlFor="date">Informe o horário</Label>
              <Input
                id="date"
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                max="2100-12-31T20:00"
                className="w-[227px]"
              />
            </div>
            <Button type="submit" variant={"success"} className="w-full mt-4">
              Criar Consulta
            </Button>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
}
