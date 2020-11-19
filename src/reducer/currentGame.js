import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { socket } from '../utils/socket';

const SOCKET = {
  userJoin: 'USER_JOIN',
  userLeave: 'USER_LEAVE',
  gameStart: 'GAME_START',
  gameUpdate: 'GAME_UPDATE',
  gameEnd: 'GAME_END',
};

const initGameInfo = {
  _id: '',
  name: '',
  owner: '',
  quizList: [],
  timeLimit: 0,
  location: {},
  address: '',
  addressDetail: '',
  createdAt: '',
  updatedAt: '',
};

export const INIT_GAME_SETTING = 'currentGameReducer/UPDATE_CURRENT_GAME';
export const SET_USERS = 'currentGameReducer/SET_USERS';
export const SET_GAME_INFO = 'currentGameReducer/SET_GAME_INFO';
export const COUNTDOWN = 'currentGameReducer/COUNTDOWN';
export const SET_COUNT = 'currentGameReducer/SET_COUNT';
export const SET_GAME_ID = 'currentGameReducer/SET_GAME_ID';
export const TOGGLE_IS_PLAYING = 'currentGameReducer/TOGGLE_IS_PLAYING';
export const START_GAME = 'currentGameReducer/START_GAME';
export const DISCONNECT_GAME = 'currentGameReducer/DISCONNECT_GAME';
export const UPDATE_CURRENT_GAME = 'currentGameReducer/UPDATE_CURRENT_GAME';

export const setUsers = createAction(SET_USERS);
export const setGameInfo = createAction(SET_GAME_INFO);
export const setCount = createAction(SET_COUNT);
export const setGameId = createAction(SET_GAME_ID);
export const toggleIsPlaying = createAction(TOGGLE_IS_PLAYING);
export const updateCurrentGame = createAction(UPDATE_CURRENT_GAME);

export const startGame = createAsyncThunk(
  START_GAME,
  async ({ gameId }, extra) => {
    socket.emit(SOCKET.gameStart, { gameId });
  },
);

export const initGameSetting = createAsyncThunk(
  INIT_GAME_SETTING,
  async ({ gameId, userId, username }, { dispatch }) => {
    socket.emit(SOCKET.userJoin, { gameId, userId, username });
    socket.on(SOCKET.userJoin, ({ users }) => {
      dispatch(setUsers(users));
    });
    socket.on(SOCKET.gameStart, (gameInfo) => {
      setGameInfo(gameInfo);
      dispatch(countdown(3));
    });

    dispatch(setGameId(gameId));
  },
);

export const countdown = createAsyncThunk(
  COUNTDOWN,
  async (countNumber, { dispatch, getState }) => {
    if (countNumber > 0) {
      dispatch(setCount(countNumber));
      setTimeout(() => {
        dispatch(countdown(countNumber - 1));
      }, 1000);
    } else {
      dispatch(toggleIsPlaying());
    }
  },
);

export const disconnectGame = createAsyncThunk(
  DISCONNECT_GAME,
  async ({ gameId }, { dispatch }) => {
    socket.off(SOCKET.userJoin);
    socket.off(SOCKET.gameStart);
    socket.off(SOCKET.gameUpdate);
    socket.off(SOCKET.userLeave);

    socket.emit(SOCKET.userLeave, { gameId });

    dispatch(setGameInfo(initGameInfo));
    dispatch(toggleIsPlaying());
    dispatch(setCount(-1));
    dispatch(setUsers([]));
  }
);

const initState = {
  gameInfo: initGameInfo,
  isPlaying: false,
  users: [],
  count: -1,
  gameId: '',
};

export default createReducer(initState, {
  [UPDATE_CURRENT_GAME]: (state, action) => action.payload,
  [SET_USERS]: (state, { payload }) => { state.users = payload; },
  [SET_GAME_INFO]: (state, { payload }) => { state.gameInfo = payload; },
  [SET_COUNT]: (state, { payload }) => { state.count = payload; },
  [SET_GAME_ID]: (state, { payload }) => { state.gameId = payload; },
  [TOGGLE_IS_PLAYING]: (state, payload) => { state.isPlaying = !state.isPlaying; },
});
