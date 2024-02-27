export const truncateDescription = (description: string) => {
  const maxCharacters = 200; 
  if (description.length > maxCharacters) {
    return `${description.substring(0, maxCharacters)}...`;
  }
  return description;
};

export const splitTextIntoParagraphs = (text: string, maxWordsPerParagraph: number) => {
  const words = text.split(' ');
  const paragraphs = [];
  let currentParagraph = '';

  for (let i = 0; i < words.length; i++) {
    currentParagraph += words[i] + ' ';
    if (currentParagraph.trim().split(' ').length >= maxWordsPerParagraph) {
      paragraphs.push(currentParagraph.trim());
      currentParagraph = '';
    }
  }

  if (currentParagraph.trim() !== '') {
    paragraphs.push(currentParagraph.trim());
  }

  return paragraphs;
};
