import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import { IBlog, ParamsRequest } from "./types";

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
  console.log(blog);
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

export const fetchAllBlogs = async (params: ParamsRequest): Promise<IBlog> => {
  let url = `${API_BASE_URL}/api/blogs/`;

  const { searchTerm, filterOptions } = params;

  // If there are filter and search options, add them to the URL
  if (searchTerm) {
    url += `?search=${encodeURIComponent(searchTerm)}`;
  }
  if (filterOptions) {
    const filterParams = new URLSearchParams(filterOptions).toString();
    url += `${searchTerm ? "&" : "?"}${filterParams}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseBody = await response.json();
    if (!response.ok) {
      throw new Error(responseBody.message);
    }
    return responseBody;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
