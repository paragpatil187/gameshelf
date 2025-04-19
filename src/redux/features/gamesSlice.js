import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




// Fetch games from API and categorize them
export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/games");
      const games = await response.json();
      console.log(games, "jkwedkjbew")

      if (!Array.isArray(games)) {
        throw new Error("Invalid game data format");
      }

      const featuredGames = games.filter((game) => game.isFeatured);
      const popularGames = games.filter((game) => game.isPopular);

      return {
        featuredGames: featuredGames.length > 0 ? featuredGames : mockFeaturedGames,
        popularGames: popularGames.length > 0 ? popularGames : mockPopularGames,
      };
    } catch (error) {
      console.error("Failed to fetch games:", error.message);
      return {
        featuredGames: mockFeaturedGames,
        popularGames: mockPopularGames,
      };
    }
  }
);

// Search games locally (from mock data)
export const searchGames = createAsyncThunk(
  "games/searchGames",
  async (query, {getState, rejectWithValue }) => {
    try {
      const {games}=getState()
      const sourceGames = games.popularGames;
      if (!query) {
        return sourceGames;
      }

      const filteredGames = sourceGames.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase())
      );

      return filteredGames;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  featuredGames: [],
  popularGames: [],
  searchResults: [],
  searchQuery: "",
  isLoading: false,
  error: null,
};

// Slice
const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchGames
      .addCase(fetchGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.featuredGames = action.payload.featuredGames;
        state.popularGames = action.payload.popularGames;
        state.isLoading = false;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // searchGames
      .addCase(searchGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchGames.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.isLoading = false;
      })
      .addCase(searchGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery } = gamesSlice.actions;

export default gamesSlice.reducer;
