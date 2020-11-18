import React, { useEffect } from 'react';
import styles from './GameHeader.module.scss';

const GameHeader = ({
  minutes,
  seconds,
  setMinutes,
  setSeconds,
  children,
  currentHint,
}) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (seconds > 0) {
        return setSeconds((prev) => prev - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          //TODO: 게임 종료 알림 (Socket, container에서 내려주기)
          return () => clearTimeout(timerId);
        }

        setMinutes((prev) => prev - 1);
        setSeconds(59);
      }
    }, 1000);
  }, [seconds]);

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div>힌트</div>
        <div>{`${minutes}:${seconds}`}</div>
        <div>종료</div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </div>
  );
};

export default GameHeader;
