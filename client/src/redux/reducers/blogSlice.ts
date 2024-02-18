import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBlog } from "../../types";
import * as apiClient from "../../api-client";

export type blogState = {
  loading: boolean;
  error: string | null;
  blogs: IBlog[];
};

const initialState: blogState = {
  loading: false,
  error: null,
  blogs: [],
};
// to continue from here
export const createBlogAsync = createAsyncThunk(
  "blogs/create",
  async (blog: IBlog) => {
    try {
      // If token is valid, proceed to create the blog
      const response = await apiClient.createBlog(blog);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createBlogAsync.fulfilled, (state, action) => {
      state.blogs.push(action.payload);
      state.error = null;
      state.loading = false;
    });
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
