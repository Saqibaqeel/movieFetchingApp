import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/api/auth";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData, {
        withCredentials: true,
      });
      toast.success("Signup successful!");
      return response.data.user;
    } catch (error) {
      const msg = error.response?.data?.msg || error.response?.data?.message || error.message || "Signup failed!";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData, {
        withCredentials: true,
      });
      toast.success("Login successful!");
      return response.data.user;
    } catch (error) {
      const msg = error.response?.data?.msg || error.response?.data?.message || error.message || "Login failed!";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      toast.success("Logged out");
      return true;
    } catch (error) {
      const msg = error.response?.data?.msg || error.response?.data?.message || error.message || "Logout failed!";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const check = createAsyncThunk(
  "auth/check",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/check`, {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      const msg = error.response?.data?.msg || error.response?.data?.message || error.message || "Auth check failed!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const initialState = {
  authUser: null,
  isLogout: false,
  isLogin: false,
  isSignUp: false,
  isUpdateProfile: false,
  isCheckingAuth: true,
  error: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isSignUp = false;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSignUp = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSignUp = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(login.pending, (state) => {
        state.isLogin = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLogin = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLogin = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(logout.pending, (state) => {
        state.isLogout = false;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
        state.isLogout = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLogout = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(check.pending, (state) => {
        state.isCheckingAuth = true;
        state.error = null;
      })
      .addCase(check.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
        state.error = null;
      })
      .addCase(check.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = null;
        state.error = action.payload || action.error?.message;
      });
  },
});

export default auth.reducer;
