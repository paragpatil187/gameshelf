import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  username: String,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genres: [String],
  price: { type: Number, required: true },
  imageUrl: String,
  previewVideo: String,
  description: String,
  rating: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isPopular: { type: Boolean, default: false },
  screenshots: [String],
  comments: [commentSchema],
});

export default mongoose.models.Game || mongoose.model("Game", gameSchema);
