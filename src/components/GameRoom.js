import React from 'react';
import styles from './GameRoom.module.scss';

const GameRoom = ({ id, isPlaying, name, setTarget, userCount, joinWaitingRoom }) => {
  return (
    <div className={styles.container} ref={setTarget} onClick={() => joinWaitingRoom(id)}>
      <div className={styles.status}>
        <span className={isPlaying ? styles.playingBullet : styles.waitingBullet}>
          {
            isPlaying ? 'Playing' : 'Waiting'
          }
        </span>
      </div>
      <div className={styles.gameInfo}>
        <div className={styles.name}>{name}</div>
        <div className={styles.users}>{userCount}/4</div>
      </div>
    </div>
  );
};

export default GameRoom;
