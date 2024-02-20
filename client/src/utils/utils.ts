export const truncateDescription = (description: string) => {
  const maxCharacters = 200; 
  if (description.length > maxCharacters) {
    return `${description.substring(0, maxCharacters)}...`;
  }
  return description;
};
