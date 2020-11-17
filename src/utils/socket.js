import io from 'socket.io-client';

const socket = io.connect('', { secure: true });

const SOCKET = {
  userJoin: 'USER_JOIN',
  userLeave: 'USER_LEAVE',
  gameUpdate: 'GAME_UPDATE',
  gameStart: 'GAME_START',
  initGame: 'INIT_GAME',
};

export const initGameData = async (gameId, callback) => {
  socket.on(SOCKET.initGame, (data) => {
    console.log(data);
    callback(data);
  });
  console.log(gameId);
  socket.emit(SOCKET.initGame, { gameId });
};

export const gameStart = (data) => {
  socket.emit(SOCKET.gameStart, data);
};

export const joinWaitingRoom = (data) => {
  socket.emit(SOCKET.userJoin, data);
};

export const listenGameStart = (callback) => {
  socket.on(SOCKET.gameStart, (gameInfo) => {
    callback(gameInfo);
  });
};

export const listenJoinUser = (callback) => {
  socket.on(SOCKET.userJoin, (users) => {
    callback(users);
  });
};

export const listenUpdateData = (callback) => {
  socket.on(SOCKET.gameUpdate, (gameInfo) => {
    callback(gameInfo);
  });
};

export const disconnectRoom = (data) => {
  socket.off(SOCKET.userJoin);
  socket.emit(SOCKET.userLeave, data);
};
