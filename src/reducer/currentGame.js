import { createAction, createReducer } from '@reduxjs/toolkit';

export const UPDATE_CURRENT_GAME = 'currentGameReducer/UPDATE_CURRENT_GAME';

export const updateCurrentGame = createAction(UPDATE_CURRENT_GAME);

const initState = null;

export default createReducer(initState, {
  [UPDATE_CURRENT_GAME]: (state, action) => {
    return state = action.payload;
  },
});
