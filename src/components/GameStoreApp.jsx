"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchGames, setSearchQuery } from "@/redux/features/gamesSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FeaturedGamesSection from "./FeaturedGamesSection";
import PopularGamesSection from "./PopularGamesSection";

function GameStoreApp() {
  const dispatch = useDispatch();
  const { featuredGames, popularGames, searchResults, searchQuery, isLoading } =
    useSelector((state) => state.games);

  // Handle search input
  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    dispatch(searchGames(query));
  };

  // Determine which games to display
  const gamesToDisplay = searchQuery ? searchResults : popularGames;

  return (
    <div className="overflow-x-hidden w-full min-h-screen text-white bg-neutral-900 flex flex-col">
      <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
      <main className="px-6 py-8 mx-auto my-0 max-w-[1600px] max-sm:px-4 max-sm:py-6 flex-grow w-full">
        {!searchQuery && <FeaturedGamesSection games={featuredGames} />}
        <PopularGamesSection
          games={gamesToDisplay}
          title={searchQuery ? "Search Results" : "Popular Games"}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
}

export default GameStoreApp;
