import { createAction, createReducer } from '@reduxjs/toolkit';

export const INIT_GAME = 'gameReducer/INIT_GAME';
export const ADD_NEXT_GAME = 'gameReducer/ADD_NEXT_GAME';
export const ADD_NEW_GAME = 'gameReducer/ADD_NEW_GAME';
export const UPDATE_GAME = 'gameReducer/UPDATE_GAME';
export const DELETE_GAME = 'gameReducer/DELETE_GAME';

export const initGame = createAction(INIT_GAME);
export const addNextGame = createAction(ADD_NEXT_GAME);
export const addNewGame = createAction(ADD_NEW_GAME);
export const updateGame = createAction(UPDATE_GAME);
export const deleteGame = createAction(DELETE_GAME);

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
  [UPDATE_GAME]: (state, action) => {
    const { payload } = action;
    const newDocs = state.docs.map((doc) => {
      if (doc._id === payload._id) {
        return payload;
      } else {
        return doc;
      }
    });

    return {
      ...state,
      docs: [...newDocs],
    };
  },
  [DELETE_GAME]: (state, action) => {
    const newDocs = state.filter((doc) => (
      doc._id !== action.payload.gameId
    ));
    return {
      ...state,
      docs: [...newDocs],
    };
  },
});
