"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    const fetchAdminData = async () => {
      try {
        const res = await fetch("/api/admin/profile");
        const data = await res.json();
        setAdminData(data);
      } catch (err) {
        console.error("Failed to fetch admin profile", err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchAdminData();
    }
  }, [status, session, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-800 p-4 space-y-4">
        <div className="text-2xl font-bold mb-6">Admin Panel</div>
        <div>
          <p className="text-sm text-zinc-400 mb-1">Logged in as:</p>
          <p className="font-medium">{adminData?.name}</p>
          <p className="text-sm text-zinc-400">{adminData?.email}</p>
        </div>
        <nav className="mt-6 space-y-2">
          <SidebarLink href="/admin" label="Dashboard" />
          <SidebarLink href="/admin/games" label="Games" />
          <SidebarLink href="/admin/users" label="Users" />
          <SidebarLink href="/admin/orders" label="Orders" />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-zinc-900 p-6">{children}</main>
    </div>
  );
}

function SidebarLink({ href, label }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded hover:bg-zinc-700 transition-colors"
    >
      {label}
    </Link>
  );
}
