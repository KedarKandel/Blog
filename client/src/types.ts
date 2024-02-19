export type IBlog = {
    id: number;
    title: string;
    description: string
    image?: string
    createdBy: string
  }
  export type ParamsRequest = {
    searchTerm: string;
    filterOptions: string;
  }

  export type BlogResponse = {
    blogs: IBlog[],
    currentPage: number,
    total: number
    totalPages: number
  }
 

 