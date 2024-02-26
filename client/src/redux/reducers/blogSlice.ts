import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apiClient from "../../api-client";
import {
  BlogSearchResponse,
  BlogType,
} from "../../../../server/src/sharedTypes";

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

// thunk api to create a new blog
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

// thunk API to fetch all blogs
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

// thunk API to fetch blogs by the current user

export const fetchUserBlogsAsync = createAsyncThunk(
  "blogs/usersBlogs",
  async () => {
    const response = await apiClient.fetchMyBlogs();
    return response;
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
        const payload = action.payload as
          | BlogSearchResponse
          | BlogSearchResponse[];

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
    builder
      .addCase(fetchUserBlogsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBlogsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blogs = action.payload;
      })
      .addCase(fetchUserBlogsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blogs";
      });
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
