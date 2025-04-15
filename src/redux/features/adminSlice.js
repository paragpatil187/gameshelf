import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching games
export const fetchAdminGames = createAsyncThunk(
  "admin/fetchGames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/games");

      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for adding a game
export const addGame = createAsyncThunk(
  "admin/addGame",
  async (gameData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error("Failed to add game");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for updating a game
export const updateGame = createAsyncThunk(
  "admin/updateGame",
  async ({ id, gameData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/games/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error("Failed to update game");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for deleting a game
export const deleteGame = createAsyncThunk(
  "admin/deleteGame",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/games/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete game");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  games: [],
  selectedGame: null,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSelectedGame: (state, action) => {
      state.selectedGame = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch games
      .addCase(fetchAdminGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminGames.fulfilled, (state, action) => {
        state.games = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAdminGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add game
      .addCase(addGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addGame.fulfilled, (state, action) => {
        state.games.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update game
      .addCase(updateGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        const index = state.games.findIndex(
          (game) => game.id === action.payload.id,
        );
        if (index !== -1) {
          state.games[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updateGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete game
      .addCase(deleteGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.games = state.games.filter((game) => game.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedGame, clearError } = adminSlice.actions;

export default adminSlice.reducer;
