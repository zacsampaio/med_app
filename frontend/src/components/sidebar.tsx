import Link from "next/link";
import { Separator } from "./ui/separator";


export function Sidebar() {
  return (
    <aside className="flex flex-col gap-4 w-[200px] h-full mt-2 p-4">
      <Link href="/app/doctor/list">Doutores</Link>
      <Separator />
      <Link href="/app/patient/create">Adicionar Pacientes</Link>
      <Separator />
      <Link href="/app/appointments/create">Agendar consulta</Link>
      <Separator />
      <Link href="/app/prescriptions/create">Adicionar prescrição</Link>
      <Separator />
      <Link href="/app/prescriptions/upload">Enviar prescrição</Link>
    </aside>
  );
}
