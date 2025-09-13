// movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  userSearchHistory: [],
  isMoviesLoading: false,
  error: null,
};

// Thunk to fetch movies by search query
export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.imdbapi.dev/search/titles?query=${query}`
      );
      return { movies: res.data, query };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch movies");
    }
  }
);

// Thunk to fetch all movies initially
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("https://api.imdbapi.dev/titles");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch movies");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.userSearchHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // --- fetchMovies ---
      .addCase(fetchMovies.pending, (state) => {
        state.isMoviesLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.isMoviesLoading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isMoviesLoading = false;
        state.error = action.payload;
      })

      // --- searchMovies ---
      .addCase(searchMovies.pending, (state) => {
        state.isMoviesLoading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.userSearchHistory = [
          action.payload.query,
          ...state.userSearchHistory.filter((q) => q !== action.payload.query),
        ].slice(0, 5);
        state.isMoviesLoading = false;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isMoviesLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHistory } = movieSlice.actions;
export default movieSlice.reducer;
