import { BlogType } from "../../server/src/sharedTypes";

export type SearchParams = {
  searchTerm?: string;
  filterOptions?: string;
  page?: string;
};

export type BlogResponse = {
  blogs: BlogType[];
  currentPage: number;
  total: number;
  totalPages: number;
};
