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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Users,
} from "lucide-react";
import { mockUsers } from "@/lib/mock-user";

const ITEMS_PER_PAGE = 6;

function StatusBadge({ estado }: { estado: any["estado"] }) {
  const variants: Record<string, string> = {
    Activo:
      "bg-[hsl(152,60%,40%)]/15 text-[hsl(152,60%,35%)] border-[hsl(152,60%,40%)]/30",
    Inactivo: "bg-destructive/10 text-destructive border-destructive/30",
    Pendiente:
      "bg-[hsl(38,92%,50%)]/15 text-[hsl(30,80%,40%)] border-[hsl(38,92%,50%)]/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[estado]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          estado === "Activo"
            ? "bg-[hsl(152,60%,40%)]"
            : estado === "Inactivo"
              ? "bg-destructive"
              : "bg-[hsl(38,92%,50%)]"
        }`}
      />
      {estado}
    </span>
  );
}

function ProfileBadge({ perfil }: { perfil: string }) {
  const styles: Record<string, string> = {
    Administrador: "bg-primary/10 text-primary border-primary/20",
    Editor:
      "bg-[hsl(280,65%,60%)]/10 text-[hsl(280,65%,45%)] border-[hsl(280,65%,60%)]/20",
    Viewer: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${styles[perfil] ?? styles.Viewer}`}
    >
      {perfil}
    </span>
  );
}

export function UsersTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const lower = search.toLowerCase();
    return users.filter(
      (u) =>
        u.nombreCompleto.toLowerCase().includes(lower) ||
        u.nit.includes(search) ||
        u.email.toLowerCase().includes(lower) ||
        u.perfil.toLowerCase().includes(lower),
    );
  }, [search, users]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = () => {
    if (selectedUser) {
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-GT", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Usuarios
            </h1>
            <p className="text-sm text-muted-foreground">
              {filteredUsers.length} usuario
              {filteredUsers.length !== 1 ? "s" : ""} registrado
              {filteredUsers.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuario..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 h-10 bg-card border-border text-foreground"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
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
              <TableHead className="font-semibold text-foreground hidden lg:table-cell">
                Fecha de Creacion
              </TableHead>
              <TableHead className="font-semibold text-foreground hidden md:table-cell">
                Telefono
              </TableHead>
              <TableHead className="font-semibold text-foreground text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id} className="group">
                  <TableCell className="font-medium text-foreground">
                    {user.nombreCompleto}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {user.nit}
                  </TableCell>
                  <TableCell>
                    <ProfileBadge perfil={user.perfil} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge estado={user.estado} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden lg:table-cell">
                    {formatDate(user.fechaCreacion)}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    {user.telefono}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={() => {
                          setSelectedUser(user);
                          setViewDialogOpen(true);
                        }}
                        aria-label={`Ver detalles de ${user.nombreCompleto}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-[hsl(38,92%,50%)] hover:bg-[hsl(38,92%,50%)]/10"
                        onClick={() => {
                          setSelectedUser(user);
                          setEditDialogOpen(true);
                        }}
                        aria-label={`Editar ${user.nombreCompleto}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteDialogOpen(true);
                        }}
                        aria-label={`Eliminar ${user.nombreCompleto}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} a{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} de{" "}
            {filteredUsers.length} resultados
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              aria-label="Primera pagina"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              aria-label="Pagina anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              aria-label="Pagina siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              aria-label="Ultima pagina"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Detalles del Usuario
            </DialogTitle>
            <DialogDescription>
              Informacion completa del usuario seleccionado.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid grid-cols-2 gap-4">
              <DetailItem
                label="Nombre Completo"
                value={selectedUser.nombreCompleto}
              />
              <DetailItem label="NIT" value={selectedUser.nit} />
              <DetailItem label="Perfil" value={selectedUser.perfil} />
              <DetailItem label="Estado" value={selectedUser.estado} />
              <DetailItem label="Email" value={selectedUser.email} />
              <DetailItem
                label="Fecha de Creacion"
                value={formatDate(selectedUser.fechaCreacion)}
              />
              <DetailItem label="Telefono" value={selectedUser.telefono} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Editar Usuario
            </DialogTitle>
            <DialogDescription>
              Modifique los datos del usuario.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <EditUserForm
              user={selectedUser}
              onSave={(updated) => {
                setUsers((prev) =>
                  prev.map((u) => (u.id === updated.id ? updated : u)),
                );
                setEditDialogOpen(false);
              }}
              onCancel={() => setEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Eliminar Usuario
            </DialogTitle>
            <DialogDescription>
              {
                "Esta accion no se puede deshacer. Se eliminara permanentemente a "
              }
              <span className="font-semibold text-foreground">
                {selectedUser?.nombreCompleto}
              </span>
              {" del sistema."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function EditUserForm({
  user,
  onSave,
  onCancel,
}: {
  user: any;
  onSave: (user: any) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ...user });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-xs font-medium text-muted-foreground">
            Nombre Completo
          </label>
          <Input
            value={form.nombreCompleto}
            onChange={(e) =>
              setForm({ ...form, nombreCompleto: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            NIT
          </label>
          <Input
            value={form.nit}
            onChange={(e) => setForm({ ...form, nit: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Email
          </label>
          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Telefono
          </label>
          <Input
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Perfil
          </label>
          <select
            value={form.perfil}
            onChange={(e) => setForm({ ...form, perfil: e.target.value })}
            className="h-10 rounded-md border border-border bg-card px-3 text-sm text-foreground"
          >
            <option value="Administrador">Administrador</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Estado
          </label>
          <select
            value={form.estado}
            onChange={(e) =>
              setForm({
                ...form,
                estado: e.target.value as any["estado"],
              })
            }
            className="h-10 rounded-md border border-border bg-card px-3 text-sm text-foreground"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          onClick={() => onSave(form)}
          className="bg-primary text-primary-foreground"
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
