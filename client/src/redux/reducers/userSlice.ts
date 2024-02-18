// src/state/user/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, register, validateToken, logout } from "../../api-client";
import { RegisterFormData } from "../../pages/Register";
import { LoginFormData } from "../../pages/Login";

export type UserState = {
  isLoggedIn: boolean;
  loading: boolean;
  error: null | string;
};

const initialState: UserState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Create an async thunk for user registration
export const registerUserAsync = createAsyncThunk(
  "user/register",
  async (formData: RegisterFormData) => {
    const response = await register(formData);
    return response;
  }
);
export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (loginData: LoginFormData) => {
    const response = await login(loginData);
    return response;
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const response = await logout();
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
      validateToken();
      userSlice.caseReducers.registerSuccess(state, action);
    });

    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //login
    builder.addCase(loginUserAsync.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = true;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = null;
    });
  },
});

export const { registerStart, registerFailure } = userSlice.actions;

export default userSlice.reducer;
