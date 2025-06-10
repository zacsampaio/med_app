import Link from "next/link";
import { SignOut } from "./singOut";

export function Header() {
  return (
    <header className="flex border-b w-[calc(100% - 16rem)] ml-[calc(16rem)]">
      <div className="flex h-16 items-center justify-between px-6 w-full">
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
