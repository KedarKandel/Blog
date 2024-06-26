import {
  BlogSearchResponse,
  BlogType,
  UserType,
} from "./sharedTypes";
import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import { EditProfileData } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// fetch current user
export const fetchCurrentUser = async (): Promise<Partial<UserType>> => {
  const response = await fetch(`${API_BASE_URL}/api/users/currentUser`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

//edit user information
export const editUserProfile = async (
  data: EditProfileData
): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/users/editProfile`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

// register an user
export const register = async (formData: RegisterFormData): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

// login an user
export const login = async (loginData: LoginFormData): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    let errorMessage = "";
    if (Array.isArray(responseBody.message)) {
      errorMessage = responseBody.message
        .map((error: any) => error.msg)
        .join(", ");
    } else {
      errorMessage = responseBody.message;
    }
    throw new Error(errorMessage);
  }
  return responseBody;
};

// logout user
export const logout = async () => {
  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
  });
};

// validate token
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Invalid token");
  }
  return response.json;
};

// add a new blog
export const addMyBlog = async (blog: Partial<BlogType>): Promise<BlogType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-blogs/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    let errorMessage = "";
    if (Array.isArray(responseBody.message)) {
      errorMessage = responseBody.message
        .map((error: any) => error.msg)
        .join(", ");
    } else {
      errorMessage = responseBody.message;
    }
    throw new Error(errorMessage);
  }
  return responseBody;
};

// update the blog
export const updateMyBlogById = async (
  blogId: string,
  updateBlogData: Partial<BlogType>
): Promise<BlogType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-blogs/${blogId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateBlogData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    let errorMessage = "";
    if (Array.isArray(responseBody.message)) {
      errorMessage = responseBody.message
        .map((error: any) => error.msg)
        .join(", ");
    } else {
      errorMessage = responseBody.message;
    }
    throw new Error(errorMessage);
  }
  return responseBody;
};

// Delete my blog
export const deleteMyBlog = async (blogId: string): Promise<BlogType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-blogs/${blogId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete the blog");
  }
  return response.json();
};

// fetch user's blogs
export const fetchMyBlogs = async (): Promise<BlogType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-blogs`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching blogs");
  }

  return response.json();
};

// fetch specific blog by user
export const fetchMyBlogById = async (blogId: string): Promise<BlogType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-blogs/${blogId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching blogs");
  }
  return response.json();
};

// fetch all blogs
export const getAllBlogs = async (
  page: number,
  searchQuery: string,
  filter: string
): Promise<BlogSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("page", String(page));
  if (searchQuery) {
    queryParams.append("searchQuery", searchQuery);
  }
  if (filter) {
    queryParams.append("filter", filter);

  }

  const url = `${API_BASE_URL}/api/blogs?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    const responseBody = await response.json();
    if (!response.ok) {
      throw new Error("Error fetching blogs");
    }
    return responseBody;
  } catch (error) {
    console.log(error);
    throw error;
  }

  
};

// get blog by id
export const getBlogById = async (blogId: string): Promise<BlogType> => {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}`);
  if (!response.ok) {
    throw new Error("Error fetching blogs");
  }

  return response.json();
};

// like a blog
export const likeBlog = async (
  blogId: string
): Promise<{ blogId: string; userId: string; isLiked: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}/like`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error liking the blog");
  }
  return response.json();
};

// comment a blog
export const commentBlog = async (
  blogId: string,
  content: string
): Promise<BlogType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-blogs/${blogId}/comment`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }), // Send the comment content in the request body
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

//Delete my comment
export const deleteMyComment = async (
  commentId: string,
  blogId: string
): Promise<BlogType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-blogs/${blogId}/comment/${commentId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }

  const responseBody = await response.json();
  return responseBody;
};

// like a comment
export const likeComment = async (
  blogId: string,
  commentId: string
): Promise<{
  blogId: string;
  commentId: string;
  userId: string;
  isLiked: boolean;
}> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-blogs/${blogId}/comments/${commentId}/like`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};
