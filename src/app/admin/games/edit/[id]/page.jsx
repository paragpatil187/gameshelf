"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import GameForm from "@/components/admin/GameForm";

export default function EditGame() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Redirect if not admin
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }

    // Fetch game data
    const fetchGame = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll just use mock data
        const mockGame = {
          id: parseInt(id),
          title: `Game Title ${id}`,
          description:
            "This is a detailed description of the game. It includes information about gameplay, story, and features.",
          price: 59.99,
          discountPrice: 49.99,
          genres: ["Action", "Adventure"],
          releaseDate: "2023-01-15",
          developer: "Game Studio",
          publisher: "Game Publisher",
          featured: true,
          imageUrl:
            "https://images.pexels.com/photos/31625371/pexels-photo-31625371.jpeg",
        };

        setGame(mockGame);
      } catch (error) {
        console.error("Failed to fetch game:", error);
        alert("Failed to load game data");
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchGame();
    }
  }, [id, session, status, router]);

  const handleSubmit = async (gameData) => {
    setIsSaving(true);
    try {
      // In a real app, this would be an API call
      console.log("Updating game:", { id, ...gameData });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to games list
      router.push("/admin/games");
      alert("Game updated successfully!");
    } catch (error) {
      console.error("Failed to update game:", error);
      alert("Failed to update game. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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
        <h1 className="text-2xl font-bold mb-6">Edit Game</h1>
        {game && (
          <GameForm
            initialData={game}
            onSubmit={handleSubmit}
            isLoading={isSaving}
            isEdit={true}
          />
        )}
      </div>
    </AdminLayout>
  );
}
