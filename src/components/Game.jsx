import React, { useState, useEffect } from "react";
import {
  useGameDispatch,
  useGameState,
  resumeSessionOrNewGame,
  startNewGame,
  GAME_ACTIONS,
} from "./gameContext";
import NewGuess from "./NewGuess";
import PreviousGuesses from "./PreviousGuesses";
import DebugMode from "./DebugMode";

const Game = () => {
  const gameState = useGameState();
  const gameDispatch = useGameDispatch();
  const isInputEnabled = !gameState.shouldRevealWord && !gameState.isGameWon;

  useEffect(() => {
    if (!gameState.word) {
      resumeSessionOrNewGame(gameDispatch);
    }
  }, []);

  const handleStartNewGameClick = () => {
    startNewGame(gameDispatch);
  };

  const handleRevealWord = () => {
    gameDispatch({ type: GAME_ACTIONS.GIVE_UP });
  };

  const renderRevealWord = () => {
    if (gameState.shouldRevealWord) {
      return (
        <div className="alert alert-warning" role="alert">
          You have failed. Your word was <strong>{gameState.word}</strong>
          <br />
          <br />
          <button
            onClick={handleStartNewGameClick}
            type="button"
            className="btn btn-warning"
          >
            Start new game
          </button>
        </div>
      );
    }
    return null;
  };

  const renderGameWonBanner = () => {
    if (gameState.isGameWon) {
      return (
        <div className="alert alert-success" role="alert">
          <strong>You won!</strong>
          <br />
          <br />
          <button
            onClick={handleStartNewGameClick}
            type="button"
            className="btn btn-success"
          >
            Start new game
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <h1>Just A Cool Word Game</h1>
          <a
            href="https://github.com/christinabranson/word-game-clone"
            target="_blank"
            className="link-info"
          >
            Check out on GitHub.
          </a>
        </div>

        <div className="card-body text-center">
          {renderGameWonBanner()}
          {renderRevealWord()}
          <PreviousGuesses />
          {isInputEnabled && (
            <>
              <hr />
              <NewGuess />
              <hr />

              <div>
                Give up?{" "}
                <button
                  onClick={handleRevealWord}
                  type="button"
                  className="btn btn-danger btn-sm"
                >
                  Reveal word
                </button>
              </div>
            </>
          )}

          <hr />
        </div>
        <div className="card-body text-left">
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Instructions</strong>
            </li>
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
      <DebugMode />
    </>
  );
};

export default Game;
