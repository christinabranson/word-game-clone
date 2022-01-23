import React from "react";
import { useGameState, useGameDispatch, startNewGame } from "./gameContext";

const Header = () => {
  const gameState = useGameState();
  const gameDispatch = useGameDispatch();

  const handleStartNewGameClick = () => {
    startNewGame(gameDispatch);
  };
  return (
    <div class="ui fixed inverted menu">
      <div class="ui container">
        <div class="header item">Word Game Clone</div>
        <a onClick={handleStartNewGameClick} class="item">
          Start New Game
        </a>
      </div>
    </div>
  );
};

export default Header;
