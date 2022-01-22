import rawText from "./5.txt";

const readAllWordsIntoArray = () => {
  return fetch(rawText)
    .then((r) => r.text())
    .then((text) => text.split(/\r?\n/));
};

export const getWord = async () => {
  const randomWord = await readAllWordsIntoArray().then((textArray) => {
    const randomWord = textArray[Math.floor(Math.random() * textArray.length)];
    return randomWord;
  });

  return randomWord;
};

export const validateWord = async (wordToCheck) => {
  const isValid = await readAllWordsIntoArray().then((textArray) => {
    return !!textArray.includes(wordToCheck);
  });

  return isValid;
};
