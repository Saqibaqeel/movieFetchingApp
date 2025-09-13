import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/auth";

// 🔹 Signup
export const signUp = createAsyncThunk("auth/signUp", async (userData) => {
  const response = await axios.post(`${BASE_URL}/signup`, userData, {
    withCredentials: true,
  });
  return response.data.user;
});

// 🔹 Login
export const login = createAsyncThunk("auth/login", async (userData) => {
  const response = await axios.post(`${BASE_URL}/login`, userData, {
    withCredentials: true,
  });
  return response.data.user;
});

// 🔹 Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
  return true;
});

// 🔹 Check Auth
export const check = createAsyncThunk("auth/check", async () => {
  const response = await axios.get(`${BASE_URL}/check`, {
    withCredentials: true,
  });
  return response.data.user;
});





export const auth = createSlice({
  name: "auth",
     initialState: {
        authUser:null,
    isLogout:false,
    isLogin:false,
    isSignUp:false,
    isUpdateProfile:false,
    isCheckingAuth:true,
     },
     extraReducers:(builder)=>{
        builder
        .addCase(signUp.pending,(state)=>{
            state.isSignUp=false;
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.authUser=action.payload;
            state.isSignUp=true;
        })
        .addCase(signUp.rejected,(state)=>{
            state.isSignUp=false;
        })
        .addCase(login.pending,(state)=>{
            state.isLogin=false;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.authUser=action.payload;
            state.isLogin=true;
        })
        .addCase(login.rejected,(state)=>{
            state.isLogin=false;
        })
        .addCase(logout.pending,(state)=>{
            state.isLogout=false;
        })
        .addCase(logout.fulfilled,(state)=>{
            state.authUser=null;
            state.isLogout=true;
        })
        .addCase(logout.rejected((state)=>{
            state.isLogout=false;
        }))
        .addCase(check.pending,(state)=>{
            state.isCheckingAuth=true;
        })
        .addCase(check.fulfilled,(state,action)=>{
            state.authUser=action.payload;
            state.isCheckingAuth=false;
        })
        .addCase(check.rejected((state)=>{
            state.isCheckingAuth=false;
            state.authUser=null;
        }))
     }




 
})
export default auth.reducer;

// Action creators are generated for each case reducer function
