// src/store/moviesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to load all movies
export const setMovies = createAsyncThunk(
  "movies/setMovies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://api.imdbapi.dev/titles");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk to search movie by name
export const getMovieByName = createAsyncThunk(
  "movies/getMovieByName",
  async (name, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`https://api.imdbapi.dev/search/titles?query=${name}`);
      const { usrerSearchHistory } = getState().movies;

      // replicate Zustand logic: remove duplicates, keep latest 5
      const newHistory = [name, ...usrerSearchHistory.filter(item => item !== name)].slice(0, 5);

      return { movies: res.data, usrerSearchHistory: newHistory };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    usrerSearchHistory: [],
    ismoviesLoading: false,
  },
  reducers: {
    clearHistory: (state) => {
      state.usrerSearchHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // setMovies
      .addCase(setMovies.pending, (state) => { state.ismoviesLoading = true; })
      .addCase(setMovies.fulfilled, (state, action) => {
        state.ismoviesLoading = false;
        state.movies = action.payload;
      })
      .addCase(setMovies.rejected, (state) => { state.ismoviesLoading = false; })

      // getMovieByName
      .addCase(getMovieByName.pending, (state) => { state.ismoviesLoading = true; })
      .addCase(getMovieByName.fulfilled, (state, action) => {
        state.ismoviesLoading = false;
        state.movies = action.payload.movies;
        state.usrerSearchHistory = action.payload.usrerSearchHistory;
      })
      .addCase(getMovieByName.rejected, (state) => { state.ismoviesLoading = false; });
  },
});

export const { clearHistory } = moviesSlice.actions;
export default moviesSlice.reducer;
