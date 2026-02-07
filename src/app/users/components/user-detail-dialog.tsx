"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Shield,
  Hash,
  CircleDot,
} from "lucide-react";
import { User } from "@/lib/users-data";

function StatusBadge({ status }: { status: User["estado"] }) {
  const config = {
    Activo: "bg-green-500/15 text-green-400 border-green-500/20",
    Inactivo: "bg-green-500/15 text-green-400 border-green-500/20",
    Pendiente: "bg-green-500/15 text-green-400 border-green-500/20",
  };

  return (
    <Badge variant="outline" className={config[status]}>
      <CircleDot className="mr-1.5 h-3 w-3" />
      {status}
    </Badge>
  );
}

function ProfileBadge({ profile }: { profile: User["perfil"] }) {
  const config: Record<string, string> = {
    Administrador: "bg-green-500/15 text-green-400 border-green-500/20",
    Editor: "bg-green-500/15 text-green-400 border-green-500/20",
    Viewer: "bg-green-500/15 text-green-400 border-green-500/20",
    Moderador: "bg-green-500/15 text-green-400 border-green-500/20",
  };

  return (
    <Badge variant="outline" className={config[profile]}>
      <Shield className="mr-1.5 h-3 w-3" />
      {profile}
    </Badge>
  );
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-4 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </div>
  );
}

interface UserDetailDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailDialog({
  user,
  open,
  onOpenChange,
}: UserDetailDialogProps) {
  if (!user) return null;

  const formattedDate = new Date(user.fechaCreacion).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border/50 bg-card p-0 shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-lg bg-linear-to-br from-green-600 to-emerald-600 px-6 pb-6 pt-8">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute -left-4 bottom-0 h-20 w-20 rounded-full bg-primary/5 blur-xl" />
          <DialogHeader className="relative z-10">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg shadow-primary/5">
              <UserIcon className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-xl font-semibold text-white">
              {user.nombreCompleto}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-2 pt-1">
              <StatusBadge status={user.estado} />
              <ProfileBadge profile={user.perfil} />
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="space-y-1">
            <DetailRow
              icon={<Hash className="h-4 w-4 text-muted-foreground" />}
              label="NIT"
              value={user.nit}
            />
            <Separator className="bg-border/50" />
            <DetailRow
              icon={<Mail className="h-4 w-4 text-muted-foreground" />}
              label="Correo Electronico"
              value={user.email}
            />
            <Separator className="bg-border/50" />
            <DetailRow
              icon={<Phone className="h-4 w-4 text-muted-foreground" />}
              label="Telefono"
              value={user.telefono}
            />
            <Separator className="bg-border/50" />
            <DetailRow
              icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
              label="Fecha de Creacion"
              value={formattedDate}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
