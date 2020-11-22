import React from 'react';
import styles from './ToastMessage.module.scss';

const ToastMessage = ({ username, gameIndex, color }) => {
  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      {username}님이 {gameIndex + 1}번을 풀었습니다!
    </div>
  );
};

export default ToastMessage;
