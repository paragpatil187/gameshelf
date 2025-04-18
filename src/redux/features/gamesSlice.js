import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fallback mock data
const mockFeaturedGames = [
  {
    id: 1,
    title: "Game Title 1",
    genres: "Action, Adventure",
    price: "$59.99",
    imageUrl:
      "https://images.pexels.com/photos/31625371/pexels-photo-31625371.jpeg",
  },
  {
    id: 2,
    title: "Game Title 2",
    genres: "Action, Adventure",
    price: "$59.99",
    imageUrl:
      "https://images.pexels.com/photos/31625371/pexels-photo-31625371.jpeg",
  },
  {
    id: 3,
    title: "Game Title 3",
    genres: "Action, Adventure",
    price: "$59.99",
    imageUrl:
      "https://images.pexels.com/photos/31625371/pexels-photo-31625371.jpeg",
  },
  {
    id: 4,
    title: "Game Title 4",
    genres: "Action, Adventure",
    price: "$59.99",
    imageUrl:
      "https://images.pexels.com/photos/31625371/pexels-photo-31625371.jpeg",
  },
];

const mockPopularGames = [
  {
    id: 1,
    title: "Game Title 1",
    genres: "RPG, Adventure",
    price: "$29.99",
    imageUrl:
      "https://images.pexels.com/photos/18512919/pexels-photo-18512919.jpeg",
  },
  {
    id: 2,
    title: "Game Title 2",
    genres: "RPG, Adventure",
    price: "$29.99",
    imageUrl:
      "https://images.pexels.com/photos/18512919/pexels-photo-18512919.jpeg",
  },
  {
    id: 3,
    title: "Game Title 3",
    genres: "RPG, Adventure",
    price: "$29.99",
    imageUrl:
      "https://images.pexels.com/photos/18512919/pexels-photo-18512919.jpeg",
  },
  {
    id: 4,
    title: "Game Title 4",
    genres: "RPG, Adventure",
    price: "$29.99",
    imageUrl:
      "https://images.pexels.com/photos/18512919/pexels-photo-18512919.jpeg",
  },
  {
    id: 5,
    title: "Game Title 5",
    genres: "RPG, Adventure",
    price: "$29.99",
    imageUrl:
      "https://images.pexels.com/photos/18512919/pexels-photo-18512919.jpeg",
  },
  {
    id: 6,
    title: "Game Title 6",
    genres: "RPG, Adventure",
    price: "$29.99",
    imageUrl:
      "https://images.pexels.com/photos/18512919/pexels-photo-18512919.jpeg",
  },
  {
    id: 7,
    title: "Game Title 7",
    genres: "RPG, Adventure",
    price: "$29.99",
    imageUrl:
      "https://images.pexels.com/photos/18512919/pexels-photo-18512919.jpeg",
  },
  {
    id: 8,
    title: "Game Title 8",
    genres: "RPG, Adventure",
    price: "$29.99",
    imageUrl:
      "https://images.pexels.com/photos/18512919/pexels-photo-18512919.jpeg",
  },
];

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
  async (query, { rejectWithValue }) => {
    try {
      if (!query) {
        return mockPopularGames;
      }

      const filteredGames = mockPopularGames.filter((game) =>
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
