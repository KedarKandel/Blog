import { BlogType, UserType } from "../../server/src/sharedTypes";
import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import { BlogResponse, SearchParams } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// fetch current user

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/currentUser`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

// register an user
export const register = async (formData: RegisterFormData) => {
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

export const login = async (loginData: LoginFormData) => {
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
    throw new Error(responseBody.message);
  }
  return responseBody;
};

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

// add a blog

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
    throw new Error(responseBody.message);
  }
  return responseBody;
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

export const updateMyBlogById = async (blogFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-blogs/${blogFormData.get("blogId")}`,
    {
      method: "PUT",
      body: blogFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

// fetch all blogs

export const getAllBlogs = async (): Promise<BlogResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/api/blogs`);
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error("Error fetching blogs");
  }
  console.log(response)
  return responseBody;
};

// fetch blogs with search and filter logic
export const searchBlogs = async (
  searchParams: SearchParams
): Promise<BlogResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("search", searchParams.searchTerm || "");
  queryParams.append("filter", searchParams.filterOptions || "");
  queryParams.append("page", searchParams.page || "");

  const response = await fetch(
    `${API_BASE_URL}/api/blogs/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  console.log(response);

  return response.json();
};
