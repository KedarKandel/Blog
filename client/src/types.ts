export type SearchParams = {
  searchTerm?: string;
  filterOptions?: string;
  page?: string;
};

export type EditProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};
