import { createAction, createReducer } from '@reduxjs/toolkit';

export const INIT_GAME = 'gameReducer/INIT_GAME';
export const ADD_NEXT_GAME = 'gameReducer/ADD_NEXT_GAME';
export const ADD_NEW_GAME = 'gameReducer/ADD_NEW_GAME';

export const initGame = createAction(INIT_GAME);
export const addNextGame = createAction(ADD_NEXT_GAME);
export const addNewGame = createAction(ADD_NEW_GAME);

const initState = {
  docs: [],
  nextPage: 1,
  hasNextPage: true,
};

export default createReducer(initState, {
  [INIT_GAME]: (state, action) => {
    return state = action.payload;
  },
  [ADD_NEXT_GAME]: (state, action) => {
    const { docs, nextPage, hasNextPage } = action.payload;
    state.docs = [...state.docs, ...docs];
    state.nextPage = nextPage;
    state.hasNextPage = hasNextPage;
  },
  [ADD_NEW_GAME]: (state, action) => {
    return {
      ...state,
      docs: [action.payload, ...state.docs],
    };
  },
});