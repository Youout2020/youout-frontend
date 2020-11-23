import React from 'react';
import styles from './ToastMessage.module.scss';

const ToastMessage = ({ username, gameIndex, color }) => {
  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      {username}님, {gameIndex + 1}번 문제 클리어!😈
    </div>
  );
};

export default ToastMessage;
