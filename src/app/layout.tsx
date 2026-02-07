import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Dashboard from "@/components/dashboard";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SGAMGC",
  description: "Sistema de Gestión de Auditoría Médica y Gestión de Calidad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} antialiased`}>
        <Dashboard>
          <Toaster position="top-right" />
          {children}
        </Dashboard>
      </body>
    </html>
  );
}
