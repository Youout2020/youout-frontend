import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_NATIVE = 'rnativeReducer/SET_NATIVE';

export const setIsNative = createAction(SET_NATIVE);

const initState = false;

export default createReducer(initState, {
  [SET_NATIVE]: (state, action) => {
    return true;
  },
});
