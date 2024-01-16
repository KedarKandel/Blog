export interface IBlog {
    id: number;
    title: string;
    content: string;
    image: string
  }

  export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }

  export interface UserState {
    data: null | IUser;
    loading: boolean;
    error: null | string;
  }