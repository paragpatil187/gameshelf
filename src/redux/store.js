import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import gamesReducer from "./features/gamesSlice";
import commentsReducer from "./features/Comments/commentSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
    comments: commentsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
