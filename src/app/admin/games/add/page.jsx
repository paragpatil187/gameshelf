"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import GameForm from "@/components/admin/GameForm";

export default function AddGame() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if not admin
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  const handleSubmit = async (gameData) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      console.log("Adding new game:", gameData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to games list
      router.push("/admin/games");
      alert("Game added successfully!");
    } catch (error) {
      console.error("Failed to add game:", error);
      alert("Failed to add game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
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
        <h1 className="text-2xl font-bold mb-6">Add New Game</h1>
        <GameForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AdminLayout>
  );
}
