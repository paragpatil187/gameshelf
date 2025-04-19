"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchGames, setSearchQuery } from "@/redux/features/gamesSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FeaturedGamesSection from "./FeaturedGamesSection";
import PopularGamesSection from "./PopularGamesSection";
import GameCarousel from "./GameCrousal";
import GameDetailPage from "./GameDetailPage";

function GameStoreApp() {
  const dispatch = useDispatch();
  const { featuredGames, popularGames, searchResults, searchQuery, isLoading } =
    useSelector((state) => state.games);
    const [selectedGame, setSelectedGame] = useState(null);

  // Handle search input
  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    dispatch(searchGames(query));
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    console.log("selscted game",game)
    // In a real app, you might want to update the URL here
    window.scrollTo(0, 0);
  };
  const handleBackToStore = () => {
    setSelectedGame(null);
  };

  // Determine which games to display
  const gamesToDisplay = searchQuery ? searchResults : popularGames;

  return (
    <div className="overflow-x-hidden w-full min-h-screen text-white bg-neutral-900 flex flex-col">
      <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
      {selectedGame?(
          <GameDetailPage game={selectedGame} onBack={handleBackToStore} />
      ):(
      <main className="px-6 py-8 mx-auto my-0 max-w-[1600px] max-sm:px-4 max-sm:py-6 flex-grow w-full">
      <GameCarousel games={featuredGames} onGameSelect={handleGameSelect} />
        {!searchQuery && <FeaturedGamesSection games={featuredGames} onGameSelect={handleGameSelect} />}
        <PopularGamesSection
          games={gamesToDisplay}
          title={searchQuery ? "Search Results" : "Popular Games"}
          isLoading={isLoading}
          onGameSelect={handleGameSelect}
        />
      </main>
        )}
      <Footer />
    </div>

  );
}

export default GameStoreApp;
