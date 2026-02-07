"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import Logo from "/logo.png";
import Image from "next/image";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(email);
    if (success) {
      toast.success("Login exitoso");
      router.push("/users");
    } else {
      setError("Credenciales incorrectas. Intente de nuevo.");
      toast.error("Error al iniciar sesión");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-emerald-600 text-[hsl(0,0%,100%)]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="h-10 w-10 text-[hsl(0,0%,100%)]"
            />
            <span className="text-xl font-semibold tracking-tight">SGAMGC</span>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">
            Gestiona tus usuarios de manera eficiente y segura
          </h1>
          <p className="text-lg leading-relaxed text-green-200">
            Plataforma integral para la administracion de usuarios, perfiles y
            permisos de tu organizacion.
          </p>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-200">
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm text-green-200">
                Control total de perfiles y permisos
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-200">
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm text-green-200">
                Monitoreo en tiempo real de actividad
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-200">
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm text-green-200">
                Reportes y estadisticas detalladas
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-green-200">
          {"2026 SGAMGC. Todos los derechos reservados."}
        </p>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-green-50">
        <div className="w-full max-w-md flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:hidden mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground">
                SGAMGC
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Bienvenido de nuevo
            </h2>
            <p className="text-sm text-muted-foreground">
              Ingrese sus credenciales para acceder al panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Correo electronico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-card border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Contrasena
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contrasena"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-card border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={
                    showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  <span>Ingresando...</span>
                </div>
              ) : (
                "Iniciar Sesion"
              )}
            </Button>
          </form>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-xs font-medium text-foreground mb-2">
              Credenciales de prueba:
            </p>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <span>
                Email:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
                  admin@sistema.com
                </code>
              </span>
              <span>
                Password:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
                  admin123
                </code>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
