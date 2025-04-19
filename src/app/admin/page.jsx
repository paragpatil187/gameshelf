"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }

    const fetchDashboardData = async () => {
      try {
        const [statsRes, gamesRes, usersRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/recent-games"),
          fetch("/api/admin/recent-users"),
        ]);

        const statsData = await statsRes.json();
        const gamesData = await gamesRes.json();
        const usersData = await usersRes.json();

        setStats(statsData);
        setRecentGames(gamesData);
        setRecentUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchDashboardData();
    }
  }, [session, status, router]);

  if (status === "loading" || isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[calc(100vh-72px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-400"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Games"
            value={stats?.totalGames}
            icon="🎮"
            color="bg-blue-500"
          />
          <DashboardCard
            title="Featured Games"
            value={stats?.featuredGames}
            icon="⭐"
            color="bg-yellow-500"
          />
          <DashboardCard
            title="Total Users"
            value={stats?.totalUsers}
            icon="👤"
            color="bg-green-500"
          />
          <DashboardCard
            title="Total Orders"
            value={stats?.totalOrders}
            icon="🛒"
            color="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Games */}
          <div className="bg-zinc-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Games</h2>
              <Link
                href="/admin/games"
                className="text-sky-400 hover:text-sky-300 text-sm"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentGames.map((game) => (
                <div
                  key={game._id}
                  className="flex items-center justify-between p-3 bg-zinc-700 rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-600 rounded"></div>
                    <div>
                      <p className="font-medium">{game.title}</p>
                      <p className="text-sm text-zinc-400">
                        Added {game.createdAtRelative}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold">${game.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-zinc-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Users</h2>
              <Link
                href="/admin/users"
                className="text-sky-400 hover:text-sky-300 text-sm"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 bg-zinc-700 rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center">
                      {user.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-zinc-400">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-sm bg-zinc-600 px-2 py-1 rounded">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-zinc-400 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div
          className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
