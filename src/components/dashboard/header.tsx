"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
  setIsOpen: (isOpen: boolean) => void;
  userName: string;
}

export default function Header({ setIsOpen, userName }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 p-[18px] flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="md:hidden p-2 mr-2 rounded-full hover:bg-gray-100"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={20} />
        </button>
        <h2 className="text-lg font-medium">Bienvenido, {userName} 👋</h2>
      </div>

      {/*       <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Mail size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="ml-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50">
          Administrar widgets
        </button>
      </div> */}
    </header>
  );
}
