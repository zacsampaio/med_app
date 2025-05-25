"use client";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Stethoscope } from "lucide-react";

export default function AuthLauout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <ThemeProvider>
      <div className="grid min-h-screen grid-cols-2 antialiased">
        <div className="h-full p-10 border-r border-foreground/5 bg-primary-foreground text-secondary-foreground  flex flex-col justify-between">
          <div className="flex items-center gap-3 text-lg font-medium text-foreground">
            <Stethoscope />
            <span className="font-semibold">med.app</span>
          </div>

          <footer className="text-sm">
            Sistemas de Consulta &copy; med.app - {new Date().getFullYear()}
          </footer>
        </div>

        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
