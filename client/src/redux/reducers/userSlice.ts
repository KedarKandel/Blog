// src/state/user/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterFormData } from "../../pages/Register";
import { LoginFormData } from "../../pages/Login";

import * as apiClient from "../../api-client";
import { UserType } from "../../types";

export type UserState = {
  currentUser: UserType | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: null | string;
};

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// current user

export const currentUserAsync = createAsyncThunk("user/currentUser", async () => {
  const response = await apiClient.fetchCurrentUser();
  return response;
});

// register
export const registerUserAsync = createAsyncThunk(
  "user/register",
  async (formData: RegisterFormData) => {
    const response = await apiClient.register(formData);
    return response;
  }
);

// login
export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (loginData: LoginFormData) => {
    const response = await apiClient.login(loginData);
    return response;
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const response = await apiClient.logout();
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.isLoggedIn = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      userSlice.caseReducers.registerSuccess(state, action);
    });

    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // current user
    builder.addCase(currentUserAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.isLoggedIn = true;
    });

    //login
    builder.addCase(loginUserAsync.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = true;
    });
    // logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = null;
    });
  },
});

export const { registerStart, registerFailure } = userSlice.actions;

export default userSlice.reducer;
