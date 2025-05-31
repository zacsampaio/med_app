"use client";

import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors />
      </QueryClientProvider>
    </SessionProvider>
  );
}
