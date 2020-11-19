import React, { useEffect, useState } from 'react';
import styles from './AlertBubble.module.scss';

const AlertBubble = ({ username, gameIndex }) => {
  return (
    <div className={styles.container}>
      {username}님이 {gameIndex + 1}번을 풀었습니다!
    </div>
  );
};

export default AlertBubble;
