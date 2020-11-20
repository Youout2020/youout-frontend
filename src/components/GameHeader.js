import React from 'react';
import { convertTimeFormat } from '../utils/index';
import styles from './GameHeader.module.scss';
import { FaPen, FaDoorOpen } from 'react-icons/fa';

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
        <div onClick={onHintToggle}><FaPen size={'1.5em'} /></div>
        <div>
          {convertTimeFormat(minutes, seconds)}
        </div>
        <div onClick={onCancelToggle}><FaDoorOpen size={'1.5em'} /></div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </div>
  );
};

export default GameHeader;
