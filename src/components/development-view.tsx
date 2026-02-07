"use client";

import React from "react";
import { Construction, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DevelopmentViewProps {
  title: string;
}

export function DevelopmentView({ title }: DevelopmentViewProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-pulse bg-emerald-100 rounded-full blur-3xl opacity-50 h-64 w-64 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
        <div className="relative flex items-center justify-center w-24 h-24 bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-200 rotate-12 transition-transform hover:rotate-0 duration-500">
          <Construction size={48} className="text-white" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
        {title}
      </h1>

      <div className="max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-6 border border-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          VISTA EN DESARROLLO
        </div>

        <p className="text-gray-600 leading-relaxed mb-8">
          Estamos trabajando arduamente para brindarte la mejor experiencia en
          esta sección. Vuelve pronto para ver las nuevas funcionalidades que
          tenemos preparadas para ti.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2 h-11 px-6 rounded-xl border-gray-200"
          >
            <ArrowLeft size={18} />
            Regresar
          </Button>
          <Button
            onClick={() => router.push("/users")}
            className="flex items-center gap-2 h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700"
          >
            <Home size={18} />
            Ir al Inicio
          </Button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 w-full max-w-2xl opacity-40">
        <div className="h-2 bg-gray-200 rounded-full w-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-3/4 animate-pulse" />
        </div>
        <div className="h-2 bg-gray-200 rounded-full w-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-1/2 animate-pulse" />
        </div>
        <div className="hidden sm:block h-2 bg-gray-200 rounded-full w-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-2/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
