import React from "react";

function GameCard({ game, isFeatured = false,onClick }) {
  const { id, title, genres, price, imageUrl,screenshot } = game;

  return (
    <article
    onClick={onClick} 
      className={`
        overflow-hidden rounded-lg transition-transform cursor-pointer bg-neutral-800 duration-[0.2s] hover:transform hover:scale-[1.02]
        ${isFeatured ? "flex-[0_0_300px]" : ""}
      `}
    >
      <img
        className="object-cover overflow-hidden w-full aspect-[3/4]"
        src={imageUrl}
        alt={title}
      />
      <div className="p-4">
        <h3 className="mb-2 text-base">{title}</h3>
        <p className="mb-4 text-sm text-white text-opacity-60">{genres}</p>
        <div
          className={`${isFeatured ? "flex justify-between items-center" : ""}`}
        >
          <span className="text-lg font-semibold">{price}</span>
          {isFeatured && (
            <button className="px-4 py-2 font-medium bg-sky-400 rounded cursor-pointer border-[none] text-[black] hover:bg-sky-300 transition-colors">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default GameCard;
