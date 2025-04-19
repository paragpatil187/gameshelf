"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchComments,
  addComment,
} from "../redux/features/Comments/commentSlice";

function CommentSection({ gameId }) {
  const dispatch = useDispatch();
  const { list: comments, loading, error } = useSelector((state) => state.comments);

  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    dispatch(fetchComments(gameId));
  }, [dispatch, gameId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      setLocalError("Please enter your name");
      return;
    }

    if (!newComment.trim()) {
      setLocalError("Please enter a comment");
      return;
    }

    const commentData = {
      user: userName,
      text: newComment,
    };

    await dispatch(addComment({ gameId, commentData }));

    setNewComment("");
    setLocalError("");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="mt-8">
      <h3 className="text-xl font-bold mb-4">
        Comments ({comments.length})
      </h3>

      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 bg-neutral-800 rounded-lg"
      >
        <h4 className="text-lg font-medium mb-4">Add a comment</h4>

        {localError && (
          <div className="p-3 mb-4 bg-red-900 bg-opacity-30 rounded text-red-400">
            {localError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="userName" className="block mb-2 text-sm font-medium">
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 bg-neutral-700 rounded border-none text-white"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block mb-2 text-sm font-medium">
            Your Comment
          </label>
          <textarea
            id="comment"
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 bg-neutral-700 rounded border-none text-white"
            placeholder="Share your thoughts about this game..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-sky-400 text-black font-medium rounded hover:bg-sky-300 transition-colors"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-400 text-center">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <article key={comment._id} className="p-4 bg-neutral-800 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold">{comment.user}</h4>
                <time className="text-sm text-gray-400">
                  {formatDate(comment.date)}
                </time>
              </div>
              <p className="text-white text-opacity-90">{comment.text}</p>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-400 py-4">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </section>
  );
}

export default CommentSection;
