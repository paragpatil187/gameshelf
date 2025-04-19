// features/comments/commentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch comments for a specific game
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (gameId) => {
    const response = await axios.get(`/api/games/${gameId}/comments`);
    return response.data;
  }
);

// Add a comment to a game
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ gameId, commentData }) => {
    const response = await axios.post(`/api/games/${gameId}/comments`, commentData);
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearComments(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
