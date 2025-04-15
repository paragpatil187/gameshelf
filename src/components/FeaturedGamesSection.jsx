import React from "react";
import GameCard from "./GameCard";

function FeaturedGamesSection({ games }) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">Featured Games</h2>
      <div className="flex overflow-x-auto gap-4 p-1 pb-2">
        {games.map((game) => (
          <GameCard key={game.id} game={game} isFeatured={true} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedGamesSection;
