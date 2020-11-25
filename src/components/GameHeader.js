import React from 'react';
import { convertTimeFormat } from '../utils/index';
import { FaDoorClosed } from 'react-icons/fa';
import { ImKey } from 'react-icons/im';
import PropTypes from 'prop-types';
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

GameHeader.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  onHintToggle: PropTypes.func.isRequired,
  onCancelToggle: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default GameHeader;
