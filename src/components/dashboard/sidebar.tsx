"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Users,
  FileBarChart,
  Settings,
  X,
  LogOut,
  MapPinHouse,
  UserPlus,
  FilePlus2,
  Files,
  UsersRound,
  UserRoundPlus,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: "Usuarios", href: "/users", icon: <Users size={20} /> },
    {
      name: "Crear usuario",
      href: "/create-user",
      icon: <UserPlus size={20} />,
    },
    {
      name: "Requirentes",
      href: "/compliance",
      icon: <UsersRound size={20} />,
    },
    {
      name: "Crear requirente",
      href: "/appointments",
      icon: <UserRoundPlus size={20} />,
    },
    { name: "Solicitudes", href: "/billing", icon: <Files size={20} /> },
    {
      name: "Crear solicitud",
      href: "/create-request",
      icon: <FilePlus2 size={20} />,
    },
    { name: "Reportes", href: "/report", icon: <FileBarChart size={20} /> },
  ];

  const bottomNavItems = [
    {
      name: "Configuraciones",
      href: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        className={`sidebar bg-white w-64 h-screen flex flex-col border-r border-gray-200 ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: "#00a651" }}
            >
              <MapPinHouse color="white" size={18} />
            </div>
            <span className="font-bold text-lg">SGAMGC</span>
          </div>
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 cursor-pointer rounded-full"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`sidebar-link ${
                    pathname === item.href ? "active" : ""
                  }`}
                  onClick={closeSidebar}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <ul className="space-y-1">
            {bottomNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`sidebar-link ${
                    pathname === item.href ? "active" : ""
                  }`}
                  onClick={closeSidebar}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center p-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0">
                <div className="w-10 h-10 bg-[#00a651] text-white rounded-full flex justify-center items-center">
                  O
                </div>
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <p className="font-medium truncate">Omar Bergson</p>
                <p className="text-sm text-gray-500 truncate">omarb@mail.com</p>
              </div>
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <LogOut size={18} onClick={handleLogout} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
