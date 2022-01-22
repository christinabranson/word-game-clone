import React, { useState, useEffect } from "react";
import { useGameDispatch, useGameState, startNewGame } from "./gameContext";
import NewGuess from "./NewGuess";
import PreviousGuesses from "./PreviousGuesses";

const Game = () => {
  const gameState = useGameState();
  const gameDispatch = useGameDispatch();
  console.log({ gameState });

  useEffect(() => {
    if (!gameState.word) {
      startNewGame(gameDispatch);
    }
  }, []);

  const handleStartNewGameClick = () => {
    startNewGame(gameDispatch);
  };

  const renderGameWonBanner = () => {
    if (gameState.isGameWon) {
      return (
        <div class="alert alert-success" role="alert">
          You won!
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        <h1>Just a Cool Word Game</h1>
      </div>

      <div className="card-body text-center">
        {renderGameWonBanner()}
        <PreviousGuesses />
        <hr />
        <NewGuess />

        <hr />
      </div>
      <div className="card-body text-left">
        <ul className="list-group">
          <li className="list-group-item">Instructions</li>
          <li className="list-group-item list-group-item-light">
            Guess a word.
          </li>
          <li className="list-group-item list-group-item-danger">
            If it's not a valid word, you'll get an error.
          </li>
          <li className="list-group-item list-group-item-success">
            If you get a correct letter in the correct position, it will turn
            green.{" "}
          </li>
          <li className="list-group-item list-group-item-warning">
            If you get a correct letter in the wrong position, it will turn
            orange.{" "}
          </li>
        </ul>
      </div>
      <div className="card-footer text-muted text-center">
        Give up?
        <br />
        <button
          onClick={handleStartNewGameClick}
          type="button"
          className="btn btn-outline-secondary btn-sm"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default Game;
