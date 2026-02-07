"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./sidebar";
import Header from "./header";
import { AuthProvider, useAuth } from "@/lib/auth-context";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const excludedRoutes = ["/login", "/password-reset"];
  const isExcluded = excludedRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    if (!isLoading && !user && !isExcluded) {
      router.push("/login");
    }
  }, [user, isLoading, isExcluded, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (isExcluded) {
    return <main>{children}</main>;
  }

  // Si no hay usuario y no es una ruta excluida, no renderizamos nada mientras redirige
  if (!user && !isExcluded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            setIsOpen={setIsSidebarOpen}
            userName={user?.nombreCompleto || "Usuario"}
          />
          <main className="flex-1 overflow-y-auto p-4 relative">
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  );
}
