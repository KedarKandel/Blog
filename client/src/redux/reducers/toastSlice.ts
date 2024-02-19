// toastSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToastState = {
  message: string | null;
  type: "error" | "success" | null;
}

const initialState: ToastState = {
  message: null,
  type: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<{ message: string; type: "error" | "success" }>) {
      state.message = action.payload.message;
      state.type = action.payload.type
    },
    hideToast(state) {
      state.message = null;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
