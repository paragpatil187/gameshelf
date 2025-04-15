"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalGames: 0,
    featuredGames: 0,
    totalUsers: 0,
    totalOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }

    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll just use mock data
        setStats({
          totalGames: 42,
          featuredGames: 8,
          totalUsers: 156,
          totalOrders: 89,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchStats();
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
            value={stats.totalGames}
            icon="🎮"
            color="bg-blue-500"
          />
          <DashboardCard
            title="Featured Games"
            value={stats.featuredGames}
            icon="⭐"
            color="bg-yellow-500"
          />
          <DashboardCard
            title="Total Users"
            value={stats.totalUsers}
            icon="👤"
            color="bg-green-500"
          />
          <DashboardCard
            title="Total Orders"
            value={stats.totalOrders}
            icon="🛒"
            color="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-zinc-700 rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-600 rounded"></div>
                    <div>
                      <p className="font-medium">Game Title {i}</p>
                      <p className="text-sm text-zinc-400">Added 2 days ago</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold">$59.99</span>
                </div>
              ))}
            </div>
          </div>

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
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-zinc-700 rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center">
                      U{i}
                    </div>
                    <div>
                      <p className="font-medium">User {i}</p>
                      <p className="text-sm text-zinc-400">
                        user{i}@example.com
                      </p>
                    </div>
                  </div>
                  <span className="text-sm bg-zinc-600 px-2 py-1 rounded">
                    Member
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
