import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserLocation } from '../utils';
import api from '../utils/api';

export const UPDATE_GAME = 'gameReducer/UPDATE_GAME';
export const CREATE_NEW_GAME = 'gameReducer/CREATE_NEW_GAME';
export const LOAD_GAMES = 'gameReducer/LOAD_GAMES';
export const LOAD_MORE_GAMES = 'gameReducer/LOAD_MORE_GAMES';
export const SET_DOCS = 'gameReducer/SET_DOCS';
export const SET_NEXT_PAGE = 'gameReducer/SET_NEXT_PAGE';
export const SET_HAS_NEXT_PAGE = 'gameReducer/SET_HAS_NEXT_PAGE';

export const setDocs = createAction(SET_DOCS);
export const setNextPage = createAction(SET_NEXT_PAGE);
export const setHasNextPage = createAction(SET_HAS_NEXT_PAGE);

export const createNewGame = createAsyncThunk(
  CREATE_NEW_GAME,
  async (body, extra) => {
    await api.post({ path: '/games', body });
    window.location.reload();
  }
);

export const loadGames = createAsyncThunk(
  LOAD_GAMES,
  async (payload, { dispatch, getState }) => {
    const { nextPage: page, docs } = getState().game;
    const { lat, lng } = await getUserLocation();
    const path = `/games?type=location&lat=${lat}&lng=${lng}&page=${page}`;
    const { docs: newDocs, nextPage, hasNextPage } = await api.get({ path });

    dispatch(setDocs([...docs, ...newDocs]));
    dispatch(setNextPage(nextPage));
    dispatch(setHasNextPage(hasNextPage));
  }
);

export const loadMoreGames = createAsyncThunk(
  LOAD_MORE_GAMES,
  async (payload, { dispatch, getState }) => {
    const { nextPage: page, docs } = getState().game;
    const { lat, lng } = await getUserLocation();
    const path = `/games?type=location&lat=${lat}&lng=${lng}&page=${page}`;
    const { docs: newDocs, nextPage, hasNextPage } = await api.get({ path });

    dispatch(setDocs([...docs, ...newDocs]));
    dispatch(setNextPage(nextPage));
    dispatch(setHasNextPage(hasNextPage));
  }
);

export const updateGame = createAsyncThunk(
  UPDATE_GAME,
  async ({ body, gameId }, extra) => {
    const path = `/games/${gameId}/update`;
    await api.put({ path, body });
    window.location.reload();
  },
);

const initState = {
  docs: [],
  nextPage: 1,
  hasNextPage: true,
  isLoading: false,
  error: '',
};

const pending = createNewGame.pending ||
  loadGames.pending ||
  loadMoreGames.pending ||
  updateGame.pending;

const fulfilled = createNewGame.fulfilled ||
  loadGames.fulfilled ||
  loadMoreGames.fulfilled ||
  updateGame.fulfilled;

const rejected = createNewGame.rejected ||
  loadGames.rejected ||
  loadMoreGames.rejected ||
  updateGame.rejected;

export default createReducer(initState, {
  [SET_DOCS]: (state, { payload }) => { state.docs = payload; },
  [SET_NEXT_PAGE]: (state, { payload }) => { state.nextPage = payload; },
  [SET_HAS_NEXT_PAGE]: (state, { payload }) => { state.hasNextPage = payload; },
  [pending]: (state, action) => {
    state.isLoading = true;
  },
  [fulfilled]: (state, action) => {
    state.isLoading = false;
  },
  [rejected]: (state, action) => {
    if (action.payload) {
      state.error = action.payload.errorMessage;
      console.error(action.payload.errorMessage);
    } else {
      state.error = action.error.message;
      console.error(action.payload.errorMessage);
    }
  },
});
