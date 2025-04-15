"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function GameForm({
  initialData,
  onSubmit,
  isLoading,
  isEdit = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    genres: [],
    releaseDate: "",
    developer: "",
    publisher: "",
    featured: false,
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});

  // Available genres
  const availableGenres = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Sports",
    "Racing",
    "Puzzle",
    "Shooter",
    "Platformer",
  ];

  // Initialize form with initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price?.toString() || "",
        discountPrice: initialData.discountPrice?.toString() || "",
        genres: initialData.genres || [],
        releaseDate: initialData.releaseDate || "",
        developer: initialData.developer || "",
        publisher: initialData.publisher || "",
        featured: initialData.featured || false,
        imageUrl: initialData.imageUrl || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleGenreChange = (genre) => {
    setFormData((prev) => {
      const newGenres = prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre];

      return { ...prev, genres: newGenres };
    });

    // Clear genre error
    if (errors.genres) {
      setErrors((prev) => ({ ...prev, genres: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) < 0
    ) {
      newErrors.price = "Price must be a valid number";
    }

    if (
      formData.discountPrice &&
      (isNaN(parseFloat(formData.discountPrice)) ||
        parseFloat(formData.discountPrice) < 0)
    ) {
      newErrors.discountPrice = "Discount price must be a valid number";
    }

    if (formData.genres.length === 0) {
      newErrors.genres = "At least one genre must be selected";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Format data for submission
    const gameData = {
      ...formData,
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice
        ? parseFloat(formData.discountPrice)
        : null,
    };

    onSubmit(gameData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 md:col-span-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Game Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-zinc-700 rounded-md text-white border ${
                errors.title ? "border-red-500" : "border-zinc-600"
              } focus:outline-none focus:ring-2 focus:ring-sky-400`}
              placeholder="Enter game title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-2 bg-zinc-700 rounded-md text-white border ${
                errors.description ? "border-red-500" : "border-zinc-600"
              } focus:outline-none focus:ring-2 focus:ring-sky-400`}
              placeholder="Enter game description"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              $
            </span>
            <input
              id="price"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleChange}
              className={`w-full pl-8 pr-4 py-2 bg-zinc-700 rounded-md text-white border ${
                errors.price ? "border-red-500" : "border-zinc-600"
              } focus:outline-none focus:ring-2 focus:ring-sky-400`}
              placeholder="0.00"
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="discountPrice"
            className="block text-sm font-medium mb-1"
          >
            Discount Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              $
            </span>
            <input
              id="discountPrice"
              name="discountPrice"
              type="text"
              value={formData.discountPrice}
              onChange={handleChange}
              className={`w-full pl-8 pr-4 py-2 bg-zinc-700 rounded-md text-white border ${
                errors.discountPrice ? "border-red-500" : "border-zinc-600"
              } focus:outline-none focus:ring-2 focus:ring-sky-400`}
              placeholder="0.00"
            />
          </div>
          {errors.discountPrice && (
            <p className="mt-1 text-sm text-red-500">{errors.discountPrice}</p>
          )}
        </div>

        <div>
          <label htmlFor="developer" className="block text-sm font-medium mb-1">
            Developer
          </label>
          <input
            id="developer"
            name="developer"
            type="text"
            value={formData.developer}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-700 rounded-md text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Enter developer name"
          />
        </div>

        <div>
          <label htmlFor="publisher" className="block text-sm font-medium mb-1">
            Publisher
          </label>
          <input
            id="publisher"
            name="publisher"
            type="text"
            value={formData.publisher}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-700 rounded-md text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Enter publisher name"
          />
        </div>

        <div>
          <label
            htmlFor="releaseDate"
            className="block text-sm font-medium mb-1"
          >
            Release Date
          </label>
          <input
            id="releaseDate"
            name="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-700 rounded-md text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
            Image URL <span className="text-red-500">*</span>
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-zinc-700 rounded-md text-white border ${
              errors.imageUrl ? "border-red-500" : "border-zinc-600"
            } focus:outline-none focus:ring-2 focus:ring-sky-400`}
            placeholder="Enter image URL"
          />
          {errors.imageUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Genres <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableGenres.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => handleGenreChange(genre)}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.genres.includes(genre)
                    ? "bg-sky-400 text-black"
                    : "bg-zinc-700 text-white"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
          {errors.genres && (
            <p className="mt-1 text-sm text-red-500">{errors.genres}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 bg-zinc-700 rounded border-zinc-600 text-sky-400 focus:ring-sky-400"
            />
            <span className="ml-2 text-sm">
              Feature this game on the homepage
            </span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Link
          href="/admin/games"
          className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-sky-400 text-black rounded font-medium hover:bg-sky-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {isEdit ? "Updating..." : "Saving..."}
            </span>
          ) : (
            <span>{isEdit ? "Update Game" : "Add Game"}</span>
          )}
        </button>
      </div>
    </form>
  );
}
