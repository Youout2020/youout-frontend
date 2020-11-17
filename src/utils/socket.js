import io from 'socket.io-client';

const { REACT_APP_SERVER_URI } = process.env;
const socket = io.connect(REACT_APP_SERVER_URI, { secure: true });

const SOCKET = {
  userJoin: 'USER_JOIN',
  userLeave: 'USER_LEAVE',
  gameUpdate: 'GAME_UPDATE',
};

export const joinWaitingRoom = (data) => {
  socket.emit(SOCKET.userJoin, data);
};

export const listenJoinUser = (callback) => {
  socket.on(SOCKET.userJoin, (users) => {
    callback(users);
  });
};

export const listenUpdateData = (callback) => {
  socket.on(SOCKET.gameUpdate, (data) => {
    callback(data);
  });
};

export const disconnectRoom = (data) => {
  socket.off(SOCKET.userJoin);
  socket.emit(SOCKET.userLeave, data);
};
