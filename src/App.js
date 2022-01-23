import Game from "./components/Game";
import GameProvider from "./components/gameContext/context";
import "./App.css";

function App() {
  return (
    <div className="">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;
