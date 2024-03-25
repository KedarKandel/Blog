// src/state/user/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterFormData } from "../../pages/Register";
import { LoginFormData } from "../../pages/Login";
import { UserType } from "../../../../server/src/sharedTypes";
import * as apiClient from "../../api-client";
import { EditProfileData } from "../../types";

export type UserState = {
  currentUser: Partial<UserType> | null;
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

export const currentUserAsync = createAsyncThunk(
  "user/currentUser",
  async () => {
    const response = await apiClient.fetchCurrentUser();
    return response;
  }
);

export const editUserProfileAsync = createAsyncThunk(
  "user/editProfile",
  async (data: EditProfileData) => {
    const response = await apiClient.editUserProfile(data);
    return response;
  }
);

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

export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
  const response = await apiClient.logout();
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerUserAsync.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = true;
    });

    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // current user
    builder
      .addCase(currentUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(currentUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(currentUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.currentUser = null;
        state.error = action.payload as string;
      });

    //login

    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
      });
    // logout
    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = null;
      state.currentUser = null;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
