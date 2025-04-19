"use client";
import React, { useState, useEffect, useCallback } from "react";

function GameCarousel({ games, onGameSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === games.length - 1 ? 0 : prevIndex + 1,
    );
  }, [games.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? games.length - 1 : prevIndex - 1,
    );
  }, [games.length]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  if (!games || games.length === 0) {
    return null;
  }

  return (
    <section className="relative mb-12 h-[500px] max-sm:h-[300px]">
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        {games.map((game, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            onClick={() => onGameSelect(game)}
          >
            <img
              src={game.imageUrl?game.imageUrl:"/wuthering-waves-video-1q1d7.jpg"}
              alt={game.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
              <h2 className="text-4xl font-bold mb-2 max-sm:text-2xl">
                {game.title}
              </h2>
              <p className="text-lg mb-4 text-white text-opacity-80 max-sm:text-base">
                {game.genres}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold max-sm:text-xl">
                  {game.price}
                </span>
                <button
                  className="px-6 py-3 font-medium bg-sky-400 rounded-lg cursor-pointer border-none text-black hover:bg-sky-300 transition-colors max-sm:px-4 max-sm:py-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic would go here
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="px-6 py-3 font-medium bg-white bg-opacity-20 rounded-lg cursor-pointer border-none text-white hover:bg-opacity-30 transition-colors max-sm:px-4 max-sm:py-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onGameSelect(game);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {games.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default GameCarousel;
