import React from "react";
import { useGameState } from "./gameContext";

const CLASS_INDEX_MATCH = "inputIndexMatch";
const CLASS_INDEX_IN_WORD = "inputIndexInWord";
const CLASS_INDEX_NONE = "inputIndexNone";

const Guess = ({ guess }) => {
  console.log({ guess });
  console.log(typeof guess);
  const gameState = useGameState();
  const word = gameState.word;
  const wordAsArray = word.split("");

  const getValue = (index) => {
    return guess[index] || "";
  };

  const getInputClass = (index) => {
    const value = getValue(index);
    if (wordAsArray.includes(value)) {
      if (wordAsArray[index] === value) {
        return CLASS_INDEX_MATCH;
      }
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
          readonly
          disabled
        />
      </span>
    ));

  return <>{renderInputBoxes()}</>;
};

const PreviousGuesses = () => {
  const gameState = useGameState();
  const guesses = gameState.guesses;
  console.log({ guesses });

  const renderGuesses = () =>
    guesses.map((item, index) => (
      <div key={index}>
        <Guess guess={item} />
      </div>
    ));

  return <>{renderGuesses()}</>;
};

export default PreviousGuesses;
