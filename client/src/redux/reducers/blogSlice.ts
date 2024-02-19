import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogResponse, IBlog, ParamsRequest } from "../../types";
import * as apiClient from "../../api-client";

export type blogState = {
  blogs: IBlog[];
  currentPage: number;
  totalPages: number;
  total: number;
  loading: boolean;
  error: string | null;
};

const initialState: blogState = {
  blogs: [],
  currentPage: 1,
  totalPages: 1,
  total: 0,
  loading: false,
  error: null,
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

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async (params: ParamsRequest) => {
    try {
      const response = await apiClient.fetchAllBlogs(params);
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
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      const payload = action.payload; // Store action.payload in a variable
      if (payload) {
        const { blogs, currentPage, totalPages, total } = payload;
        state.blogs = blogs;
        state.currentPage = currentPage;
        state.totalPages = totalPages;
        state.total = total;
        state.loading = false;
        state.error = null;
      }
    });
    builder.addCase(createBlogAsync.rejected, (state, action) => {
      state.error = action.error.message || "Unknown error";
      state.loading = false;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.error = action.error.message || "Unknown error";
      state.loading = false;
    });
    builder.addCase(createBlogAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
