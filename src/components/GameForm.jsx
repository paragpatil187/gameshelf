"use client";
import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

function GameForm({ game, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    title: "",
    genres: "",
    price: "",
    image: "",
    description: "",
    releaseDate: "",
    developer: "",
    publisher: "",
    videoUrl: "",
    screenshots: [],
  });

  const [errors, setErrors] = useState({});
  const [newScreenshot, setNewScreenshot] = useState("");
  const [showVideoPreview, setShowVideoPreview] = useState(false);

  // Initialize form with game data if editing
  useEffect(() => {
    if (game) {
      setFormData({
        title: game.title || "",
        genres: game.genres || "",
        price: game.price || "",
        image: game.image || "",
        description: game.description || "",
        releaseDate: game.releaseDate || "",
        developer: game.developer || "",
        publisher: game.publisher || "",
        videoUrl: game.videoUrl || "",
        screenshots: game.screenshots || [],
      });

      if (game.videoUrl) {
        setShowVideoPreview(true);
      }
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Hide video preview when URL changes
    if (name === "videoUrl") {
      setShowVideoPreview(false);
    }
  };

  const addScreenshot = () => {
    if (!newScreenshot.trim()) return;

    setFormData((prev) => ({
      ...prev,
      screenshots: [...prev.screenshots, newScreenshot],
    }));

    setNewScreenshot("");
  };

  const removeScreenshot = (index) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.genres.trim()) newErrors.genres = "Genres are required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.developer.trim())
      newErrors.developer = "Developer is required";
    if (!formData.publisher.trim())
      newErrors.publisher = "Publisher is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const toggleVideoPreview = () => {
    setShowVideoPreview((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-800 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">
            {game ? "Edit Game" : "Add New Game"}
          </h2>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-3 bg-neutral-700 rounded border ${
              errors.title ? "border-red-500" : "border-transparent"
            } text-white`}
            placeholder="Game title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="genres" className="block text-sm font-medium mb-2">
            Genres <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="genres"
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            className={`w-full p-3 bg-neutral-700 rounded border ${
              errors.genres ? "border-red-500" : "border-transparent"
            } text-white`}
            placeholder="Action, Adventure, RPG"
          />
          {errors.genres && (
            <p className="mt-1 text-sm text-red-500">{errors.genres}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full p-3 bg-neutral-700 rounded border ${
              errors.price ? "border-red-500" : "border-transparent"
            } text-white`}
            placeholder="$59.99"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="releaseDate"
            className="block text-sm font-medium mb-2"
          >
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full p-3 bg-neutral-700 rounded border-transparent text-white"
          />
        </div>

        <div>
          <label htmlFor="developer" className="block text-sm font-medium mb-2">
            Developer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="developer"
            name="developer"
            value={formData.developer}
            onChange={handleChange}
            className={`w-full p-3 bg-neutral-700 rounded border ${
              errors.developer ? "border-red-500" : "border-transparent"
            } text-white`}
            placeholder="Game developer"
          />
          {errors.developer && (
            <p className="mt-1 text-sm text-red-500">{errors.developer}</p>
          )}
        </div>

        <div>
          <label htmlFor="publisher" className="block text-sm font-medium mb-2">
            Publisher <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className={`w-full p-3 bg-neutral-700 rounded border ${
              errors.publisher ? "border-red-500" : "border-transparent"
            } text-white`}
            placeholder="Game publisher"
          />
          {errors.publisher && (
            <p className="mt-1 text-sm text-red-500">{errors.publisher}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Main Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full p-3 bg-neutral-700 rounded border ${
              errors.image ? "border-red-500" : "border-transparent"
            } text-white`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image}</p>
          )}

          {formData.image && (
            <div className="mt-2">
              <p className="text-sm mb-2">Preview:</p>
              <img
                src={formData.image}
                alt="Game preview"
                className="h-40 object-cover rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/300x400?text=Invalid+Image+URL";
                }}
              />
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="videoUrl" className="block text-sm font-medium mb-2">
            Video URL (Trailer)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="flex-1 p-3 bg-neutral-700 rounded border-transparent text-white"
              placeholder="https://example.com/video.mp4"
            />
            {formData.videoUrl && (
              <button
                type="button"
                onClick={toggleVideoPreview}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
              >
                {showVideoPreview ? "Hide Preview" : "Show Preview"}
              </button>
            )}
          </div>

          {showVideoPreview && formData.videoUrl && (
            <div className="mt-4">
              <p className="text-sm mb-2">Video Preview:</p>
              <div className="aspect-video">
                <VideoPlayer
                  src={formData.videoUrl}
                  poster={formData.image}
                  controls={true}
                  className="w-full h-full rounded"
                />
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full p-3 bg-neutral-700 rounded border ${
              errors.description ? "border-red-500" : "border-transparent"
            } text-white`}
            placeholder="Game description"
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Screenshots</label>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newScreenshot}
              onChange={(e) => setNewScreenshot(e.target.value)}
              className="flex-1 p-3 bg-neutral-700 rounded border-transparent text-white"
              placeholder="Screenshot URL"
            />
            <button
              type="button"
              onClick={addScreenshot}
              className="px-4 py-2 bg-sky-400 text-black font-medium rounded hover:bg-sky-300 transition-colors"
            >
              Add
            </button>
          </div>

          {formData.screenshots.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {formData.screenshots.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Invalid+Image+URL";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeScreenshot(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove screenshot"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No screenshots added yet</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-neutral-700 text-white font-medium rounded hover:bg-neutral-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 font-medium rounded ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-sky-400 text-black hover:bg-sky-300 cursor-pointer"
          } transition-colors`}
        >
          {isLoading ? "Saving..." : game ? "Update Game" : "Add Game"}
        </button>
      </div>
    </form>
  );
}

export default GameForm;
