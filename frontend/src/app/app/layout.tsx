"use client"
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SignOut } from "@/components/singOut";
import ProtectedRoute from "../auth/ProtectedRoute";
import { SidebarComponent } from "@/components/sidebarComponent";

const routeLabels: Record<string, string> = {
  appointments: "Consultas",
  prescriptions: "Prescrições",
  patient: "Paciente",
  create: "Criar",
  upload: "Upload",
  "": "Dashboard",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);

  const translated = segments
    .slice(1) // Ignorar o /app
    .map((segment) => routeLabels[segment] || segment)
    .join(" > ");

  return (
    <ProtectedRoute>
      <SidebarProvider className="flex h-full flex-col">
        <div className="flex">
          <SidebarComponent />
          <main className="flex-1 px-6 py-2">
            <header className="flex gap-4 text-accent-foreground border-b h-14 items-center w-full">
              <SidebarTrigger />
              {translated}
              <div className="ml-auto flex items-center gap-6">
                <SignOut />
              </div>
            </header>
            {children}
            <div className="absolute bottom-16 right-16">
              <ThemeToggle />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
