import { GAME_ACTIONS } from "./actions";

export const initialState = {
  isGameStarted: false, // game starts on first guess
  isGameWon: false,
  numLetters: 5,
  word: null,
  guesses: [],
  errorMessage: null,
  shouldRevealWord: false,
};

export const GameContextReducer = (state, action) => {
  const getNewGuessesArray = (newGuess) => {
    const newGuessesArray = [...state.guesses];
    newGuessesArray.push(newGuess);
    return newGuessesArray;
  };
  switch (action.type) {
    case GAME_ACTIONS.NEW_GAME:
      return {
        ...initialState,
        word: action.payload.word,
      };
    case GAME_ACTIONS.MAKE_GUESS:
      return {
        ...state,
        guesses: getNewGuessesArray(action.payload.guess),
      };
    case GAME_ACTIONS.WIN_GAME:
      return {
        ...state,
        guesses: getNewGuessesArray(action.payload.guess),
        isGameWon: true,
      };
    case GAME_ACTIONS.GIVE_UP:
      return {
        ...state,
        shouldRevealWord: true,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
