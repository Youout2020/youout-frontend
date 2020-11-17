import React from 'react';
import styles from './GameHeader.module.scss';

const GameHeader = ({ time, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div>힌트</div>
        <div>01:00</div>
        <div>종료</div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </div>
  );
};

export default GameHeader;
