import io from 'socket.io-client';

export const socket = io.connect('https://api.youout.site', { secure: true });

const SOCKET = {
  userJoin: 'USER_JOIN',
  userLeave: 'USER_LEAVE',
  gameStart: 'GAME_START',
  gameUpdate: 'GAME_UPDATE',
  gameEnd: 'GAME_END',
  gameComplete: 'GAME_COMPLETE',
};

export const gameStart = (data) => {
  socket.emit(SOCKET.gameStart, data);
};

export const joinWaitingRoom = (data) => {
  socket.emit(SOCKET.userJoin, data);
};

export const updateData = (data) => {
  socket.emit(SOCKET.gameUpdate, data);
};

export const gameComplete = (data) => {
  socket.emit(SOCKET.gameComplete, data);
};

export const gameEnd = () => {
  socket.emit(SOCKET.gameEnd);
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
  socket.off(SOCKET.gameStart);
  socket.off(SOCKET.gameUpdate);
  socket.off(SOCKET.userLeave);

  socket.emit(SOCKET.userLeave, data);
};
