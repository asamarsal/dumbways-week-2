"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-14">
          {/* Menu kiri */}
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className={cn(
                "transition",
                pathname === "/" 
                  ? "text-purple-600" 
                  : "hover:text-purple-600"
              )}
            >
              Dashboard
            </Link>
            <Link 
              href="/chatbot" 
              className={cn(
                "transition",
                pathname === "/chatbot" 
                  ? "text-purple-600" 
                  : "hover:text-purple-600"
              )}
            >
              MusicReq
            </Link>
            <Link 
              href="/summarizebot" 
              className={cn(
                "transition",
                pathname === "/summarizebot" 
                  ? "text-purple-600" 
                  : "hover:text-purple-600"
              )}
            >
              Summarize
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}