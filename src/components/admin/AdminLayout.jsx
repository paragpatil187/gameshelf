"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [adminData, setAdminData] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    const fetchAdminDashboardData = async () => {
      try {
        const [profileRes, statsRes, gamesRes] = await Promise.all([
          fetch("/api/admin/profile"),
          fetch("/api/admin/stats"),
          fetch("/api/admin/recent-games"),
        ]);

        const [profile, stats, games] = await Promise.all([
          profileRes.json(),
          statsRes.json(),
          gamesRes.json(),
        ]);

        setAdminData(profile);
        setStats(stats);
        setRecentGames(games);
      } catch (err) {
        console.error("Error loading admin dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchAdminDashboardData();
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

      {/* Main Content */}
      <main className="flex-1 bg-zinc-900 p-6 space-y-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Users" value={stats?.totalUsers} color="bg-sky-600" />
          <StatCard label="Games" value={stats?.totalGames} color="bg-emerald-600" />
          <StatCard label="Orders" value={stats?.totalOrders} color="bg-purple-600" />
          <StatCard label="New Users Today" value={stats?.newUsersToday} color="bg-rose-600" />
        </div>

        {/* Recent Games */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Games</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentGames.map((game) => (
              <div
                key={game._id}
                className="bg-zinc-800 rounded-xl overflow-hidden shadow"
              >
                {game.image && (
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{game.title}</h3>
                  <p className="text-sm text-zinc-400">
                    {new Date(game.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Children (main route content) */}
        {children}
      </main>
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

function StatCard({ label, value, color }) {
  return (
    <div className={`rounded-xl shadow p-4 ${color}`}>
      <p className="text-sm text-zinc-100">{label}</p>
      <p className="text-xl font-bold">{value ?? "—"}</p>
    </div>
  );
}
