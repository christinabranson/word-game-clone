import React from "react";
import { useGameState } from "./gameContext";

const CLASS_INDEX_MATCH = "inputIndexMatch";
const CLASS_INDEX_IN_WORD = "inputIndexInWord";
const CLASS_INDEX_NONE = "inputIndexNone";

const Guess = ({ guess }) => {
  const gameState = useGameState();
  const word = gameState.word;
  const wordAsArray = word.split("");

  /* Do some manipulation to ensure letters are lowercased */

  const leftoverLetters = wordAsArray.map((item, index) => {
    if (item.toLowerCase() === guess[index].toLowerCase()) {
      return null;
    }
    return item;
  });

  const getValue = (index) => {
    return guess[index].toLowerCase() || "";
  };

  const getInputClass = (index) => {
    let returnClass = CLASS_INDEX_NONE;

    if (!leftoverLetters[index]) {
      returnClass = CLASS_INDEX_MATCH;
    }

    const value = getValue(index);
    if (leftoverLetters.includes(value)) {
      returnClass = CLASS_INDEX_IN_WORD;
    }

    return returnClass;
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
