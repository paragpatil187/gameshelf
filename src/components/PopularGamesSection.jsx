import React from "react";
import GameCard from "./GameCard";

function PopularGamesSection({
  games,

  title = "Popular Games",
  isLoading = false,
  onGameSelect
}) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-400"></div>
        </div>
      )}

      {!isLoading && games.length === 0 && (
        <div className="text-center py-12 text-zinc-400">
          <p>No games found</p>
        </div>
      )}
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] max-sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
        {games.map((game,index) => (
          <GameCard key={index} game={game} onClick={() => onGameSelect(game)} />
        ))}
      </div>
    </section>
  );
}

export default PopularGamesSection;
