// lib/models/Comment.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    gameId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
