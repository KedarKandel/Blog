import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBlog } from "../../interface";

const initialState: IBlog[] = [];

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addNewBlog: (state, action: PayloadAction<IBlog>) => {
      const newBlog = { ...action.payload, id: state.length + 1 };
      state.push(newBlog);
    },
  },
});

export const { addNewBlog } = blogSlice.actions;
export default blogSlice.reducer;
