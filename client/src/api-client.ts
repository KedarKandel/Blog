import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import { BlogResponse, IBlog, ParamsRequest } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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

export const createBlog = async (blog: IBlog) => {
  const response = await fetch(`${API_BASE_URL}/api/blogs/`, {
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

export const fetchAllBlogs = async (params: ParamsRequest): Promise<BlogResponse> => {
  const url = new URL(`${API_BASE_URL}/api/blogs/`);

  const { searchTerm, filterOptions } = params;

  // Add search term to URL if provided
  if (searchTerm) {
    url.searchParams.append('search', searchTerm);
  }

  // Add filter options to URL if provided
  if (filterOptions) {
    Object.entries(filterOptions).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseBody = await response.json();
    if (!response.ok) {
      throw new Error(responseBody.message);
    }
    console.log(responseBody);
    return responseBody;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

