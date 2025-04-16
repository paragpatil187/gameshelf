import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import gamesReducer from "./features/gamesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
