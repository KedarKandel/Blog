export type IBlog = {
  id: number;
  title: string;
  description: string;
  genre: string;
  createdBy: string;
};
export type ParamsRequest = {
  searchTerm: string;
  filterOptions: string;
};

export type BlogResponse = {
  blogs: IBlog[];
  currentPage: number;
  total: number;
  totalPages: number;
};

export type UserType = {
  id: string,
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
