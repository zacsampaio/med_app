import { ThemeToggle } from "@/components/theme/theme-toggle";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideMenu } from "@/components/sideMenu";
import { SignOut } from "@/components/singOut";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <SidebarProvider className="flex h-full flex-col">
        <div className="flex">
          <SideMenu />
          <main className="flex-1 px-6 py-2">
            <header className="flex gap-4 text-accent-foreground border-b h-14 items-center w-full">
              <SidebarTrigger />
              Dashboard
              <div className="ml-auto flex items-center gap-6">
                <SignOut />
              </div>
            </header>

            <div className="absolute bottom-16 right-16">
              <ThemeToggle />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
