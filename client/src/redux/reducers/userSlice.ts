// src/state/user/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interface';
import { register } from '../../api-client';
import { RegisterFormData } from '../../pages/Register';


interface UserState {
  data: null | IUser;
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};


// Create an async thunk for user registration
export const registerUserAsync = createAsyncThunk('user/register', async (formData: RegisterFormData) => {
  const response = await register(formData);
  return response 
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.data = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the async thunk actions
    builder.addCase(registerUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Registration failed.';
    });
  },
});

export const { registerStart, registerSuccess, registerFailure } = userSlice.actions;

export default userSlice.reducer;


