import React, { useState, useEffect } from "react";
import { useGameDispatch, useGameState, GAME_ACTIONS } from "./gameContext";
import { validateWord } from "../dictionary/handleWords";

const NewGuess = () => {
  const gameState = useGameState();
  const gameDispatch = useGameDispatch();

  const initialGuess = { 0: "", 1: "", 2: "", 3: "", 4: "" };

  const [guess, setGuess] = useState(initialGuess);
  const [errorMessage, setErrorMessage] = useState(null);

  const getValue = (index) => {
    return guess[index] || "";
  };

  const handleGuessInput = (event, index) => {
    console.log("handleGuessInput " + index);
    const getValue = () => {
      let value = event.target.value;
      console.log({ value });
      if (value.length > 1) {
        value = value[value.length - 1];
      }
      return value;
    };

    const value = getValue();
    console.log({ value });

    const newGuess = JSON.parse(JSON.stringify(guess));
    newGuess[index] = value;
    console.log({ newGuess });
    setGuess(newGuess);

    if (!value.length) {
      return;
    }

    const form = event.target.form;
    form.elements[index + 1].focus();
  };

  const renderInputBoxes = () =>
    Object.keys(guess).map((item, index) => (
      <span key={index}>
        <input
          value={getValue(index)}
          onChange={(event) => handleGuessInput(event, index)}
          className="letterInput"
        />
      </span>
    ));

  const handleSubmitGuess = async (event) => {
    event.preventDefault();
    const guessAsArray = Object.keys(guess).map((key) => guess[key]);
    const guessAsWord = guessAsArray.join("");

    const isWordValid = await validateWord(guessAsWord);

    if (!isWordValid) {
      setErrorMessage("Please use a valid word");
      return;
    }

    if (guessAsWord == gameState.word) {
      gameDispatch({
        type: GAME_ACTIONS.WIN_GAME,
        payload: { guess: guessAsArray },
      });
    } else {
      gameDispatch({
        type: GAME_ACTIONS.MAKE_GUESS,
        payload: { guess: guessAsArray },
      });
    }
    handleResetGuess();
  };

  if (gameState.isGameWon) {
    return null;
  }

  const handleResetGuess = () => {
    setGuess(initialGuess);
    setErrorMessage(null);
  };

  return (
    <form>
      <pre>{false && JSON.stringify(guess, null, 2)}</pre>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div>{renderInputBoxes()}</div>
      <div className="btnFooter">
        <button
          onClick={handleSubmitGuess}
          type="submit"
          className="btn btn-outline-primary btn-sm"
        >
          Guess
        </button>
        <button
          onClick={handleResetGuess}
          type="button"
          className="btn btn-outline-danger btn-sm"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default NewGuess;
