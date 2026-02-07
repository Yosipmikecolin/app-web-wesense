"use client";

import { Users } from "lucide-react";
import { UsersTable } from "./components/user-table";

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Gestion de Usuarios
              </h1>
              <p className="text-sm text-muted-foreground">
                Administra y visualiza la informacion de todos los usuarios
                registrados en el sistema.
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <UsersTable />
      </div>
    </div>
  );
}
