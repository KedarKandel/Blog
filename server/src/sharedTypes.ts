

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type BlogType = {
  _id: string;
  title: string;
  description: string;
  comments?: CommentType[];
  likes?: string[];
  genre: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type CommentType = {
  _id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  likes?: string[];
  replies?: CommentType[];
};

export type SearchParams = {
  searchTerm?: string;
  filterOption?: string;
  page?: string;
};

export type BlogSearchResponse = {
  blogs: BlogType[];
  currentPage: number;
  total: number;
  totalPages: number;
};
