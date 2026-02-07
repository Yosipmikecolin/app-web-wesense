"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Users,
  CircleDot,
  Shield,
  Filter,
  X,
} from "lucide-react";
import { UserDetailDialog } from "./user-detail-dialog";
import type { User, UserProfile, UserStatus } from "@/lib/users-data.ts";
import { users as allUsers } from "@/lib/users-data";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15];

function StatusBadge({ status }: { status: UserStatus }) {
  const config = {
    Activo: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    Inactivo: "bg-red-500/15 text-red-400 border-red-500/20",
    Pendiente: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  };

  return (
    <Badge variant="outline" className={config[status]}>
      <CircleDot className="mr-1.5 h-3 w-3" />
      {status}
    </Badge>
  );
}

function ProfileBadge({ profile }: { profile: UserProfile }) {
  const config: Record<string, string> = {
    Administrador: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    Editor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    Viewer: "bg-slate-500/15 text-slate-400 border-slate-500/20",
    Moderador: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  };

  return (
    <Badge variant="outline" className={config[profile]}>
      <Shield className="mr-1.5 h-3 w-3" />
      {profile}
    </Badge>
  );
}

export function UsersTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [profileFilter, setProfileFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    return allUsers.filter(
      (user: {
        nombreCompleto: string;
        nit: string | string[];
        email: string;
        telefono: string | string[];
        estado: string;
        perfil: string;
      }) => {
        const matchesSearch =
          search === "" ||
          user.nombreCompleto.toLowerCase().includes(search.toLowerCase()) ||
          user.nit.includes(search) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.telefono.includes(search);

        const matchesStatus =
          statusFilter === "all" || user.estado === statusFilter;
        const matchesProfile =
          profileFilter === "all" || user.perfil === profileFilter;

        return matchesSearch && matchesStatus && matchesProfile;
      },
    );
  }, [search, statusFilter, profileFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const hasActiveFilters = statusFilter !== "all" || profileFilter !== "all";

  const clearFilters = () => {
    setStatusFilter("all");
    setProfileFilter("all");
    setSearch("");
    setCurrentPage(1);
  };

  // Reset to page 1 when filters change
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleProfileFilter = (value: string) => {
    setProfileFilter(value);
    setCurrentPage(1);
  };

  const handleItemsPerPage = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6">
        {/* Filters bar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, NIT, email..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-10 border-border/50 bg-card pl-10 text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20"
            />
          </div>

          {/* Filter selects */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Filtros:
              </span>
            </div>

            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="h-9 w-[150px] border-border/50 bg-card text-sm">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
              </SelectContent>
            </Select>

            <Select value={profileFilter} onValueChange={handleProfileFilter}>
              <SelectTrigger className="h-9 w-[160px] border-border/50 bg-card text-sm">
                <SelectValue placeholder="Perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los perfiles</SelectItem>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
                <SelectItem value="Moderador">Moderador</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9 text-muted-foreground hover:text-foreground"
              >
                <X className="mr-1.5 h-3.5 w-3.5" />
                Limpiar
              </Button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1
              ? "usuario encontrado"
              : "usuarios encontrados"}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 bg-accent/50 hover:bg-accent/50">
                <TableHead className="font-semibold text-foreground">
                  Nombre Completo
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  NIT
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Perfil
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Estado
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Fecha de Creacion
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Telefono
                </TableHead>
                <TableHead className="text-center font-semibold text-foreground">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Users className="h-8 w-8 text-muted-foreground/50" />
                      <span>No se encontraron usuarios</span>
                      {hasActiveFilters && (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={clearFilters}
                          className="text-primary"
                        >
                          Limpiar filtros
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user: User) => (
                  <TableRow
                    key={user.id}
                    className="border-border/30 transition-colors hover:bg-accent/30"
                  >
                    <TableCell className="font-medium text-foreground">
                      {user.nombreCompleto}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {user.nit}
                    </TableCell>
                    <TableCell>
                      <ProfileBadge profile={user.perfil} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.estado} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.fechaCreacion).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.telefono}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                              onClick={() => handleView(user)}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">
                                Ver detalles de {user.nombreCompleto}
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Ver detalles</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:bg-amber-500/10 hover:text-amber-400"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">
                                Editar {user.nombreCompleto}
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Editar</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">
                                Eliminar {user.nombreCompleto}
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Eliminar</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Mostrar</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={handleItemsPerPage}
            >
              <SelectTrigger className="h-8 w-[70px] border-border/50 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>por pagina</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Pagina {currentPage} de {totalPages || 1}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-border/50 bg-card"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                  <span className="sr-only">Primera pagina</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Primera pagina</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-border/50 bg-card"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Pagina anterior</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pagina anterior</TooltipContent>
            </Tooltip>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  if (totalPages <= 5) return true;
                  if (page === 1 || page === totalPages) return true;
                  return Math.abs(page - currentPage) <= 1;
                })
                .map((page, index, arr) => {
                  const prevPage = arr[index - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;

                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsis && (
                        <span className="px-1 text-muted-foreground">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        className={`h-8 w-8 text-xs ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                            : "border-border/50 bg-card"
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    </div>
                  );
                })}
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-border/50 bg-card"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Pagina siguiente</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pagina siguiente</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-border/50 bg-card"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronsRight className="h-4 w-4" />
                  <span className="sr-only">Ultima pagina</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ultima pagina</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* View user dialog */}
      <UserDetailDialog
        user={selectedUser}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </TooltipProvider>
  );
}
