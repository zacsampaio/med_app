import { Stethoscope } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { SignOut } from "./singOut";

export function Header() {
  return (
    <header className="border-b w-full">
      <div className="flex h-16 items-center gap-6 px-6 mx-auto">
        <Stethoscope className="h-8 w-8" />
        <Separator orientation="vertical" />
        <nav className="gap-6 flex ">
          <Link href="/">Home</Link>
          <Link href="/app/appointments">Agendamentos</Link>
          <Link href="/app/prescriptions">Prescrições</Link>
        </nav>
        
        <div className="ml-auto flex items-center gap-6">
          <SignOut />
        </div>
      </div>
    </header>
  );
}
