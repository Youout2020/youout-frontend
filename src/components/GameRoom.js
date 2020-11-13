import React from 'react';
import styles from './GameRoom.module.scss';
// import { useLazyObserver } from '../utils/hooks';

const GameRoom = ({ isPlaying, name, users, setTarget }) => {
  //TODO: users.length 들어올 때마다 업데이트 필요하여 socket으로 통제
  //TODO: lazyLoading const { roomRef } = useLazyObserver();

  return (
    <div className={styles.container} ref={setTarget}>
      <div className={styles.status}>
        <span className={isPlaying ? styles.playingBullet : styles.waitingBullet}>
          {
            isPlaying ? 'Playing' : 'Waiting'
          }
        </span>
      </div>
      <div className={styles.gameInfo}>
        <div className={styles.name}>{name}</div>
        <div className={styles.users}>{users}/4</div>
      </div>
    </div>
  );
};

export default GameRoom;
