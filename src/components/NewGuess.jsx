import React, { useState, useEffect } from "react";
import { useGameDispatch, useGameState, GAME_ACTIONS } from "./gameContext";
import { validateWord } from "../dictionary/handleWords";

const NewGuess = () => {
  const gameState = useGameState();
  const gameDispatch = useGameDispatch();
  const shouldShowFirstGuessMessage = gameState.guesses.length === 0;
  const [guess, setGuess] = useState(gameState.initialGuess);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setGuess(gameState.initialGuess);
  }, [gameState.initialGuess]);

  const getValue = (index) => {
    return guess[index] || "";
  };

  const handleGuessInput = (event, index) => {
    const getValue = () => {
      let value = event.target.value;
      if (value.length > 1) {
        value = value[value.length - 1];
      }
      return value;
    };

    setErrorMessage(null);

    const value = getValue();

    const newGuess = JSON.parse(JSON.stringify(guess));
    newGuess[index] = value;
    setGuess(newGuess);

    if (!value.length) {
      return;
    }

    const form = event.target.form;
    form.elements[index + 1].focus();
  };

  const renderInputBoxes = () =>
    Object.keys(gameState.initialGuess).map((item, index) => (
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
    /* Convert guess dict to an array, lowercase conversion is important! */
    const guessAsArray = Object.keys(guess).map((key) =>
      guess[key].toLowerCase()
    );
    const guessAsWord = guessAsArray.join("").toLowerCase();

    handleResetGuess();

    const isWordValid = await validateWord(guessAsWord, gameState.numLetters);

    if (!isWordValid) {
      setErrorMessage(
        `"${guessAsWord}" is not a valid dictionary word. Please try again.`
      );
      return;
    }

    if (guessAsWord === gameState.word) {
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
  };

  if (gameState.isGameWon) {
    return null;
  }

  const handleResetGuess = () => {
    setGuess(gameState.initialGuess);
  };

  return (
    <form>
      {shouldShowFirstGuessMessage && (
        <div className="ui green message" role="alert">
          <h2 class="ui header">Welcome to Word Game Clone!</h2>
          <h3 style={{marginTop: "-2px",fontStyle: "italic"}}>Where you can guess words, as many times as you want!</h3>
          <h4>
            Choose a valid <strong>{gameState.numLetters}</strong> letter word to get started.
          </h4>
          <p>
            Is <strong>{gameState.numLetters}</strong> letters too easy?
            <br /> Use the dropdown in the header to increase the number of
            letters per word.
          </p>
        </div>
      )}
      <div className="ui hidden divider"></div>

      <div>{renderInputBoxes()}</div>
      <div className="ui hidden divider"></div>
      {errorMessage && (
        <>
          <div className="ui hidden divider"></div>
          <div className="ui red message" role="alert">
            <h2 class="ui header">Error</h2>
            <p>{errorMessage}</p>
          </div>
        </>
      )}
      <div className="ui hidden divider"></div>
      <div className="btnFooter">
        <button
          onClick={handleSubmitGuess}
          type="submit"
          className="ui button green"
        >
          Guess
        </button>
      </div>
    </form>
  );
};

export default NewGuess;
