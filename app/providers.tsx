"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ToastProvider>
            {children}
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </SessionProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
