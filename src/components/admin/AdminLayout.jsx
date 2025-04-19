"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🧠 Handle redirects in useEffect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [status, session, router]);

  // ⏳ Wait for session to resolve
  if (status === "loading") {
    return <div className="text-center p-12">Loading...</div>;
  }

  // Prevent rendering layout if user is being redirected
  if (
    status === "unauthenticated" ||
    (status === "authenticated" && session?.user?.role !== "admin")
  ) {
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
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "md:ml-64" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
