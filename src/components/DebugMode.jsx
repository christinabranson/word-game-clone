import React from "react";
import { useGameState } from "./gameContext";

const DebugMode = () => {
  const gameState = useGameState();
  if (process.env.NODE_ENV === "development") {
    return (
      <div className="card">
        <div className="card-header text-center">Debug Mode</div>
        <div className="card-body">
          <code>{JSON.stringify(gameState, null, 2)}</code>
        </div>
      </div>
    );
  }
  return null;
};

export default DebugMode;
