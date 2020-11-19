import React from 'react';
import { convertTimeFormat } from '../utils/index';
import styles from './GameHeader.module.scss';

const GameHeader = ({
  minutes,
  seconds,
  onHintToggle,
  onCancelToggle,
  children
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div onClick={onHintToggle}>힌트</div>
        <div>
          {convertTimeFormat(minutes)}:{convertTimeFormat(seconds)}
        </div>
        <div onClick={onCancelToggle}>종료</div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </div>
  );
};

export default GameHeader;
