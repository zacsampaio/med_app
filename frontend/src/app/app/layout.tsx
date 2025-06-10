"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideMenu } from "@/components/sideMenu";
import { SignOut } from "@/components/singOut";

const routeLabels: Record<string, string> = {
  appointments: "Consultas",
  prescriptions: "Prescrições",
  patient: "Paciente",
  create: "Criar",
  upload: "Upload",
  "": "Dashboard",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);

  const translated = segments
    .slice(1) // Ignora o "app"
    .map((segment) => routeLabels[segment] || segment)
    .join(" > ");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/auth/sign-in");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <SidebarProvider className="flex h-full flex-col">
      <div className="flex">
        <SideMenu />
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
  );
}
