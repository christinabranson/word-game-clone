import { GAME_ACTIONS } from "./actions";

export const initialState = {
  isGameStarted: false, // game starts on first guess
  isGameWon: false,
  numLetters: 5,
  word: null,
  guesses: [],
  errorMessage: null,
};

export const GameContextReducer = (state, action) => {
  console.log({ action });
  const getNewGuessesArray = (newGuess) => {
    const newGuessesArray = [...state.guesses];
    console.log({ newGuessesArray });
    newGuessesArray.push(newGuess);
    console.log({ newGuessesArray });
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
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
