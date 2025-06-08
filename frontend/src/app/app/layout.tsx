"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Header } from "@/components/header";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sidebar } from "@/components/sidebar";


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

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
    <>
      <Header />
      <div className="flex w-full">
        <Sidebar />
        <main
          className="flex-1 px-6 py-4 border-l"
          style={{ height: "calc(100vh - 4.5rem)" }}
        >
          {children}

          <div className="absolute bottom-16 right-16">
            <ThemeToggle />
          </div>
        </main>
      </div>
    </>
  );
}
