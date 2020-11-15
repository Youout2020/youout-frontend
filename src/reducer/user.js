import { createAction, createReducer } from '@reduxjs/toolkit';

export const INIT_USER = 'userReducer/INIT_USER';
export const INIT_HISTORIES = 'userReducer/INIT_HISTORIES';
export const INIT_GAMES = 'userReducer/INIT_GAMES';

export const initUser = createAction(INIT_USER);
export const initHistories = createAction(INIT_HISTORIES);
export const initGames = createAction(INIT_GAMES);

const initState = {
  name: '',
  email: '',
  image: '',
  histories: { docs: [] },
  games: { docs: [] },
};

export default createReducer(initState, {
  [INIT_USER]: (state, action) => {
    return state = { ...state, ...action.payload };
  },
  [INIT_HISTORIES]: (state, action) => {
    state.histories = action.payload;
  },
  [INIT_GAMES]: (state, action) => {
    state.games = action.payload;
  },
});
