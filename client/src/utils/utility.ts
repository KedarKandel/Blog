export const truncateDescription = (description: string) => {
  const maxCharacters = 400;
  if (description.length > maxCharacters) {
    return `${description.substring(0, maxCharacters)}...`;
  }
  return description;
};

export const splitTextIntoParagraphs = (
  text: string,
  maxWordsPerParagraph: number
) => {
  const sentences = text.split("."); // Split the text into sentences based on full stops
  const paragraphs = [];
  let currentParagraph = "";

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim(); // Remove leading and trailing spaces from the sentence
    if (sentence !== "") { //the sentence is not empty
      if (sentence.endsWith("?")) { // Check if the sentence ends with a question mark
        currentParagraph += sentence;
      } else {
        currentParagraph += sentence + "."; // Add the sentence to the current paragraph
      }
      if (currentParagraph.split(" ").length >= maxWordsPerParagraph) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = ""; // Reset the current paragraph
      }
    }
  }

  if (currentParagraph.trim() !== "") {
    paragraphs.push(currentParagraph.trim());
  }

  return paragraphs;
};
