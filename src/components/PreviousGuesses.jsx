import React from "react";
import { useGameState } from "./gameContext";

const CLASS_INDEX_MATCH = "inputIndexMatch";
const CLASS_INDEX_IN_WORD = "inputIndexInWord";
const CLASS_INDEX_NONE = "inputIndexNone";

const Guess = ({ guess }) => {
  const gameState = useGameState();
  const word = gameState.word;
  const wordAsArray = word.split("");
  const leftoverLetters = wordAsArray.map((item, index) => {
    if (item === guess[index]) {
      return null;
    }
    return item;
  });

  const getValue = (index) => {
    return guess[index].toLowerCase() || "";
  };

  const getInputClass = (index) => {
    if (!leftoverLetters[index]) {
      return CLASS_INDEX_MATCH;
    }

    const value = getValue(index);
    if (leftoverLetters.includes(value)) {
      return CLASS_INDEX_IN_WORD;
    }

    return CLASS_INDEX_NONE;
  };

  const renderInputBoxes = () =>
    guess.map((item, index) => (
      <span key={index}>
        <input
          value={getValue(index)}
          className={`letterInput ` + getInputClass(index)}
          disabled
        />
      </span>
    ));

  return <>{renderInputBoxes()}</>;
};

const PreviousGuesses = () => {
  const gameState = useGameState();
  const guesses = gameState.guesses;

  const renderGuesses = () =>
    guesses.map((item, index) => (
      <div key={index}>
        <Guess guess={item} />
      </div>
    ));

  return <>{renderGuesses()}</>;
};

export default PreviousGuesses;
