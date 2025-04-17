"use client";
import React, { useState } from "react";
import RatingSystem from "./RatingSystem";
import CommentSection from "./CommentSection";
import ScreenshotGallery from "./ScreenshotGallery";

function GameDetailPage({ game, onBack }) {
  const [gameData, setGameData] = useState({
    ...game,
    rating: game.rating || 4.2,
    totalRatings: game.totalRatings || 128,
    comments: game.comments || [
      {
        id: 1,
        user: "GamerX",
        text: "This game is absolutely amazing! The graphics are stunning and the gameplay is super engaging.",
        date: "2023-05-15T10:30:00Z",
      },
      {
        id: 2,
        user: "RPGLover",
        text: "I've spent over 100 hours playing this. The story is deep and the character development is fantastic.",
        date: "2023-06-02T14:45:00Z",
      },
    ],
    description:
      game.description ||
      "An epic adventure awaits in this groundbreaking game that pushes the boundaries of what's possible in gaming. Immerse yourself in a richly detailed world full of challenges, mysteries, and unforgettable characters.",
    screenshots: game.screenshots || [
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
      "https://images.pexels.com/photos/7915509/pexels-photo-7915509.jpeg",
      "https://images.pexels.com/photos/7915255/pexels-photo-7915255.jpeg",
      "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg",
      "https://images.pexels.com/photos/159393/gamepad-video-game-controller-game-controller-controller-159393.jpeg",
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
    ],
  });

  const handleRateGame = (rating) => {
    const newTotalRatings = gameData.totalRatings + 1;
    const newRating =
      (gameData.rating * gameData.totalRatings + rating) / newTotalRatings;

    setGameData({
      ...gameData,
      rating: newRating,
      totalRatings: newTotalRatings,
    });
  };

  const handleAddComment = (comment) => {
    setGameData({
      ...gameData,
      comments: [comment, ...gameData.comments],
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto my-0 px-6 py-8 max-sm:px-4 max-sm:py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white text-opacity-80 hover:text-opacity-100 mb-6 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Store
      </button>

      <header className="relative h-[500px] rounded-xl overflow-hidden mb-8 max-sm:h-[300px]">
        <img
          src={gameData.image}
          alt={gameData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-sm:p-4">
          <h1 className="text-4xl font-bold mb-2 max-sm:text-3xl">
            {gameData.title}
          </h1>
          <p className="text-lg mb-4 text-white text-opacity-80">
            {gameData.genres}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-2xl font-semibold">{gameData.price}</span>
            <button className="px-6 py-3 font-medium bg-sky-400 rounded-lg cursor-pointer border-none text-black hover:bg-sky-300 transition-colors max-sm:px-4 max-sm:py-2">
              Add to Cart
            </button>
            <button className="px-6 py-3 font-medium bg-white bg-opacity-20 rounded-lg cursor-pointer border-none text-white hover:bg-opacity-30 transition-colors max-sm:px-4 max-sm:py-2">
              Add to Wishlist
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-white text-opacity-90 leading-relaxed">
              {gameData.description}
            </p>
          </section>

          <ScreenshotGallery screenshots={gameData.screenshots} />

          <CommentSection
            comments={gameData.comments}
            onAddComment={handleAddComment}
          />
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-neutral-800 rounded-lg p-6 sticky top-[90px]">
            <h2 className="text-2xl font-bold mb-6">Game Details</h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Rating</h3>
              <RatingSystem
                initialRating={gameData.rating}
                totalRatings={gameData.totalRatings}
                onRateGame={handleRateGame}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Genre</h3>
              <p className="text-white text-opacity-80">{gameData.genres}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Release Date</h3>
              <p className="text-white text-opacity-80">June 15, 2023</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Developer</h3>
              <p className="text-white text-opacity-80">Epic Game Studios</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Publisher</h3>
              <p className="text-white text-opacity-80">GameWorld Publishing</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default GameDetailPage;
