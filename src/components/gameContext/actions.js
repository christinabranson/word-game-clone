import { getWord } from "../../dictionary/handleWords";

export const GAME_ACTIONS = {
  NEW_GAME: "gameContext/newGame",
  MAKE_GUESS: "gameContext/makeGuess",
  WIN_GAME: "gameContext/winGame",
  GIVE_UP: "gameContext/giveUp",
};

export const startNewGame = async (gameDispatch) => {
  const newWord = await getWord();
  gameDispatch({ type: GAME_ACTIONS.NEW_GAME, payload: { word: newWord } });
};
