import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apiClient from "../../api-client";
import {
  BlogSearchResponse,
  BlogType,
 
} from "../../sharedTypes";

export type blogState = {
  blogs: BlogType[];
  currentPage: number;
  totalPages: number;
  currentBlog?: BlogType;
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
    const response = await apiClient.addMyBlog(blog);
    return response;
  }
);

//thunk API to update the blog
export const updateBlogAsync = createAsyncThunk(
  "blogs/update",
  async ({
    blogId,
    updatedBlog,
  }: {
    blogId: string;
    updatedBlog: Partial<BlogType>;
  }) => {
    const response = await apiClient.updateMyBlogById(blogId, updatedBlog);
    return response;
  }
);

// Thunk api to delete the blog
export const deleteBlogAsync = createAsyncThunk(
  "blog/delete",
  async (blogId: string) => {
    try {
      const response = await apiClient.deleteMyBlog(blogId);
      return response;
    } catch (error) {
      throw new Error("err" + error);
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
      throw new Error("err" + error);
    }
  }
);

//thunk api to fetch blog by id
export const fetchBlogByIdAsync = createAsyncThunk(
  "blog/id",
  async (blogId: string) => {
    const response = await apiClient.getBlogById(blogId);
    return response;
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

// thunk api to like/unlike a blog
export const likeBlogAsync = createAsyncThunk(
  "blog/like",
  async ({ blogId }: { blogId: string }) => {
    try {
      const response = await apiClient.likeBlog(blogId);
      return response;
    } catch (error) {
      throw new Error("Failed to like the blog");
    }
  }
);

//thunk api for commenting  a blog
export const commentBlogAsync = createAsyncThunk(
  "blog/comment",
  async ({ blogId, content }: { blogId: string; content: string }) => {
    const response = await apiClient.commentBlog(blogId, content);
    return response;
  }
);

// thunk api to like/unlike a comment
export const likeCommentAsync = createAsyncThunk(
  "comment/like",
  async ({ blogId, commentId }: { blogId: string; commentId: string }) => {
    try {
      const response = await apiClient.likeComment(blogId, commentId);
      return response;
    } catch (error) {
      throw new Error("Failed to like the comment");
    }
  }
);

// thunk API to delete a comment
export const deleteCommentAsync = createAsyncThunk(
  "blog/deleteComment",
  async ({ commentId, blogId }: { commentId: string; blogId: string }) => {
    const response = await apiClient.deleteMyComment(commentId, blogId);
    return response;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createBlogAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogAsync.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        state.error = null;
        state.loading = false;
      })

      .addCase(createBlogAsync.rejected, (state, action) => {
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
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
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

    builder
      .addCase(likeBlogAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeBlogAsync.fulfilled, (state, action) => {
        const { blogId, userId, isLiked } = action.payload;
        if (state.currentBlog?._id === blogId) {
          const updatedCurrentBlog = { ...state.currentBlog, isLiked };
          if (isLiked) {
            updatedCurrentBlog.likes = [
              ...(updatedCurrentBlog.likes || []),
              userId,
            ];
          } else {
            updatedCurrentBlog.likes = (updatedCurrentBlog.likes || []).filter(
              (id) => id !== userId
            );
          }
          state.currentBlog = updatedCurrentBlog;
        }
      })

      .addCase(likeBlogAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Could not like the blog";
      });

    builder
      .addCase(fetchBlogByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchBlogByIdAsync.fulfilled, (state, action) => {
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch the blog";
      });

    builder
      .addCase(deleteBlogAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlogAsync.fulfilled, (state, action) => {
        const blog = action.payload;
        state.blogs = state.blogs.filter((b) => b._id !== blog?._id);
      })
      .addCase(deleteBlogAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete the blog";
      });

    builder
      .addCase(updateBlogAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateBlogAsync.fulfilled, (state, action) => {
        const updatedBlog = action.payload;
        state.blogs = state.blogs.map((blog) => {
          if (blog._id === updatedBlog?._id) {
            return { ...blog, ...updatedBlog };
          }
          return blog;
        });
      })
      .addCase(updateBlogAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update the blog";
      });
    builder
      .addCase(commentBlogAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentBlogAsync.fulfilled, (state, action) => {
        const updatedBlog = action.payload;

        // Find the index of the updated blog in the blogs array
        const index = state.blogs.findIndex(
          (blog) => blog._id === updatedBlog._id
        );

        // If the blog is found, update its comments
        if (index !== -1) {
          state.blogs[index].comments = updatedBlog.comments;
        }

        state.loading = false;
        state.error = null;
      })

      .addCase(commentBlogAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to comment on the blog";
      });

    builder
      .addCase(likeCommentAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(likeCommentAsync.fulfilled, (state, action) => {
        state.loading = false;

        const { commentId, userId, isLiked } = action.payload;

        // Find the blog containing the liked comment
        const blogIndex = state.blogs.findIndex((blog) =>
          blog.comments?.some((comment) => comment._id === commentId)
        );

        if (blogIndex !== -1) {
         
          state.blogs[blogIndex].comments = state.blogs[
            blogIndex
          ].comments?.map((comment) => {
            if (comment._id === commentId) {
              // Update the likes array of the comment
              if (isLiked) {
                return {
                  ...comment,
                  likes: [...(comment.likes || []), userId],
                };
              } else {
                return {
                  ...comment,
                  likes: (comment.likes || []).filter((id) => id !== userId),
                };
              }
            }
            return comment;
          });
        }
      })
      .addCase(likeCommentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to like the comment";
      });

    builder
      .addCase(deleteCommentAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })

      .addCase(deleteCommentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete the comment";
      });
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
