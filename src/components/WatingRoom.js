import React from 'react';

import Header from './Header';
import styles from './WaitingRoom.module.scss';

const Users = ({ users }) => {
  return (
    <ul className={styles.users}>
      {users.map((user) => (
        <li key={user.socketId}>{user.username}{user.isMaster ? '(방장)' : ''}</li>
      ))}
    </ul>
  );
};

const StartButton = ({ isMaster }) => {
  return (
    isMaster
      ?
      <button className={styles.startButton}>시작</button>
      :
      <button className={styles.startButton}>대기</button>
  );
};

const WaitingRoom = ({ users, isMaster }) => {
  return (
    <Header title='대기방'>
      <div className={styles.waitingRoom}>
        <Users users={users}/>
        <StartButton isMaster={isMaster}/>
      </div>
    </Header>
  );
};

export default WaitingRoom;
