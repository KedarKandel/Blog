import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apiClient from "../../api-client";
import { BlogSearchResponse, BlogType } from "../../../../server/src/sharedTypes";


export type blogState = {
  blogs: BlogType[];
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
  async (blog: Partial<BlogType>) => {
    try {
      const response = await apiClient.addMyBlog(blog);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async ({
    page,
    searchQuery,
    filter,
  }: {
    page: number;
    searchQuery: string;
    filter: string;
  }) => {
    try {
      const response = await apiClient.getAllBlogs(page, searchQuery, filter);
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
    builder.addCase(createBlogAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBlogAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.blogs.push(action.payload);
      }
      state.error = null;
      state.loading = false;
    });

    builder.addCase(createBlogAsync.rejected, (state, action) => {
      state.error = action.error.message || "Unknown error";
      state.loading = false;
    });

    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        const payload = action.payload as BlogSearchResponse | BlogSearchResponse[];

        if (Array.isArray(payload)) {
          const firstItem = payload[0];
          state.blogs = firstItem.blogs;
          state.currentPage = firstItem.currentPage;
          state.totalPages = firstItem.totalPages;
          state.total = firstItem.total;
        } else {
          state.blogs = payload.blogs;
          state.currentPage = payload.currentPage;
          state.totalPages = payload.totalPages;
          state.total = payload.total;
        }
        state.loading = false;
        state.error = null;
      });

    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.error = action.error.message || "Unknown error";
      state.loading = false;
    });
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
