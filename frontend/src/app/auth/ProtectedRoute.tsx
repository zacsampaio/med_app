"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.replace("/auth/sign-in");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col h-screen items-center bg-accent justify-center gap-6">
        <h1 className="text-4xl font-bold text-accent-foreground">Carregando...</h1>
        <span className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) return null;

  return <>{children}</>;
}
