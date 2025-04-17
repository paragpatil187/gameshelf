"use client";
import React, { useState } from "react";

function RatingSystem({ initialRating = 0, totalRatings = 0, onRateGame }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleRating = (rating) => {
    if (!hasRated) {
      setUserRating(rating);
      setHasRated(true);
      if (onRateGame) {
        onRateGame(rating);
      }
    }
  };

  const renderStars = (count, filled) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-6 h-6 cursor-pointer ${
            i < count ? "text-yellow-400" : "text-gray-400"
          } ${filled ? "" : "hover:text-yellow-300"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          onMouseEnter={() => !hasRated && setHoverRating(i + 1)}
          onMouseLeave={() => !hasRated && setHoverRating(0)}
          onClick={() => handleRating(i + 1)}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      ));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {renderStars(initialRating, true)}
        </div>
        <span className="text-lg font-medium">
          {initialRating.toFixed(1)} ({totalRatings}{" "}
          {totalRatings === 1 ? "rating" : "ratings"})
        </span>
      </div>

      {!hasRated ? (
        <div className="mt-2">
          <h4 className="text-lg font-medium mb-2">Rate this game:</h4>
          <div className="flex items-center gap-2">
            {renderStars(hoverRating, false)}
            <span className="ml-2 text-sm text-gray-300">
              {hoverRating > 0
                ? `${hoverRating} star${hoverRating !== 1 ? "s" : ""}`
                : "Click to rate"}
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-2 p-3 bg-green-900 bg-opacity-30 rounded-lg">
          <p className="text-green-400">
            Thanks for rating! You gave this game {userRating} star
            {userRating !== 1 ? "s" : ""}.
          </p>
        </div>
      )}
    </div>
  );
}

export default RatingSystem;
