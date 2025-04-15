"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if user is authenticated and is an admin
  if (status === "unauthenticated") {
    router.push("/login?callbackUrl=/admin");
    return null;
  }

  if (status === "authenticated" && session?.user?.role !== "admin") {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <AdminNavbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        user={session?.user}
      />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : ""}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
