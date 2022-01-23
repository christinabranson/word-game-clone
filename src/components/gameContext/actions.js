import { getWord } from "../../dictionary/handleWords";

export const GAME_ACTIONS = {
  SESSION_OR_NEW_GAME: "gameContext/sessionOrNewGame",
  NEW_GAME: "gameContext/newGame",
  MAKE_GUESS: "gameContext/makeGuess",
  WIN_GAME: "gameContext/winGame",
  GIVE_UP: "gameContext/giveUp",
};

export const resumeSessionOrNewGame = async (gameDispatch) => {
  const newWord = await getWord();
  gameDispatch({
    type: GAME_ACTIONS.SESSION_OR_NEW_GAME,
    payload: { word: newWord },
  });
};

export const startNewGame = async (gameDispatch) => {
  const newWord = await getWord();
  gameDispatch({ type: GAME_ACTIONS.NEW_GAME, payload: { word: newWord } });
};
