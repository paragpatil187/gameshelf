// lib/models/Rating.js
import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    gameId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Rating || mongoose.model("Rating", RatingSchema);
