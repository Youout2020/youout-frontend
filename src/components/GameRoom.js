import React from 'react';
import styles from './GameRoom.module.scss';

const GameRoom = ({ id, isPlaying, name, setTarget, userCount, joinWaitingRoom }) => {
  return (
    <div
      className={`${styles.container} ${(userCount > 0 && !isPlaying) ? styles.playingRoom : ''} ${isPlaying ? styles.playingRoom : ''}`}
      ref={setTarget}
      onClick={() => joinWaitingRoom(id)}
      >
      <span className={isPlaying ? styles.bulletPlaying : styles.bulletWaiting}>
        {
          isPlaying ? 'Playing' : 'Waiting'
        }
      </span>
      <div className={styles.gameInfo}>
        <div className={`${styles.name} ${isPlaying ? styles.lineThrough : ''}`}>{name}</div>
        <div className={`${styles.users} ${isPlaying ? styles.lineThrough : ''}`}>{userCount}/4</div>
      </div>
    </div>
  );
};

export default GameRoom;
