/** From lowercase to Sentence Case */
export const capitalise = (str?: string | null): string | null | undefined => {
  if (!str) return str;
  const words = str.split(" ");
  const capsedWords = words.map(
    (word) => word[0].toUpperCase() + word.slice(1).toLowerCase()
  );
  return capsedWords.join(" ");
};
