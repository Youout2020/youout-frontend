import React from 'react';
import { convertTimeFormat } from '../utils/index';
import styles from './GameHeader.module.scss';
import { FaDoorClosed } from 'react-icons/fa';
import { ImKey } from 'react-icons/im';

const GameHeader = ({
  minutes,
  seconds,
  onHintToggle,
  onCancelToggle,
  children
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <div onClick={onHintToggle}><ImKey size={'1.5em'} /></div>
        <div className={styles.timeLimit}>
          {convertTimeFormat(minutes, seconds)}
        </div>
        <div onClick={onCancelToggle}><FaDoorClosed size={'1.5em'} /></div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </div>
  );
};

export default GameHeader;
