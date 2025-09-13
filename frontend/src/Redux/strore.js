// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/slice/authSlice";
import movieReducer from "../Redux/slice/moveSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
  },
});
