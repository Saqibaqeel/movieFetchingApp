import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// 1️⃣ Async thunks (Zustand actions → Redux thunks)

// checkAuth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/check", { withCredentials: true });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Server error");
    }
  }
);

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signUp", data, { withCredentials: true });
      toast.success("Account created");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Something went wrong");
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", data, { withCredentials: true });
      toast.success("Login success");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Invalid credentials");
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Invalid credentials");
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.get("http://localhost:3000/api/auth/logout", { withCredentials: true });
      toast.success("Logout success");
      return null; // clear authUser
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Something went wrong");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isLogin: false,
    isSignUp: false,
    isLogout: false,
    isUpdateProfile: false,
    isCheckingAuth: true,
  },
  reducers: {
    // add normal reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => { state.isCheckingAuth = true; })
      .addCase(checkAuth.fulfilled, (state, action) => { state.isCheckingAuth = false; state.authUser = action.payload; })
      .addCase(checkAuth.rejected, (state) => { state.isCheckingAuth = false; state.authUser = null; })

      // signup
      .addCase(signup.pending, (state) => { state.isSignUp = true; })
      .addCase(signup.fulfilled, (state, action) => { state.isSignUp = false; state.authUser = action.payload; })
      .addCase(signup.rejected, (state) => { state.isSignUp = false; })

      // login
      .addCase(login.pending, (state) => { state.isLogin = true; })
      .addCase(login.fulfilled, (state, action) => { state.isLogin = false; state.authUser = action.payload; })
      .addCase(login.rejected, (state) => { state.isLogin = false; })

      // logout
      .addCase(logout.pending, (state) => { state.isLogout = true; })
      .addCase(logout.fulfilled, (state) => { state.isLogout = false; state.authUser = null; })
      .addCase(logout.rejected, (state) => { state.isLogout = false; });
  }
});

export default authSlice.reducer;
