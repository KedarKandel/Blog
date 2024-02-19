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
    page: number
    limit: number
  }