"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";

export default function AdminGames() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Redirect if not admin
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }

    // Fetch games
    const fetchGames = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll just use mock data
        const mockGames = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          title: `Game Title ${i + 1}`,
          price: i % 2 === 0 ? "$59.99" : "$29.99",
          genre: i % 3 === 0 ? "Action, Adventure" : "RPG, Strategy",
          featured: i % 5 === 0,
          createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        }));

        setGames(mockGames);
        setTotalPages(Math.ceil(mockGames.length / 10));
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchGames();
    }
  }, [session, status, router]);

  const handleDeleteGame = async (id) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      try {
        // In a real app, this would be an API call
        setGames(games.filter((game) => game.id !== id));
        alert("Game deleted successfully");
      } catch (error) {
        console.error("Failed to delete game:", error);
        alert("Failed to delete game");
      }
    }
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * 10,
    currentPage * 10,
  );

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Games Management</h1>
          <Link
            href="/admin/games/add"
            className="px-4 py-2 bg-sky-400 text-black rounded font-medium hover:bg-sky-300 transition-colors"
          >
            Add New Game
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="search"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 bg-zinc-700 rounded-md text-white border-none focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div className="bg-zinc-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                    Game
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-zinc-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {paginatedGames.map((game) => (
                  <tr key={game.id} className="hover:bg-zinc-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-zinc-600 rounded"></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">
                            {game.title}
                          </div>
                          <div className="text-sm text-zinc-400">
                            ID: {game.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {game.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {game.genre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {game.featured ? (
                        <span className="px-2 py-1 bg-yellow-500 bg-opacity-20 text-yellow-400 rounded-full">
                          Featured
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-zinc-600 rounded-full">
                          Regular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(game.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/games/edit/${game.id}`}
                          className="text-sky-400 hover:text-sky-300"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteGame(game.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 flex items-center justify-between border-t border-zinc-700">
              <div>
                <p className="text-sm text-zinc-400">
                  Showing {(currentPage - 1) * 10 + 1} to{" "}
                  {Math.min(currentPage * 10, filteredGames.length)} of{" "}
                  {filteredGames.length} results
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-zinc-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-zinc-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
