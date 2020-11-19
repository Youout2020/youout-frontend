import React, { useEffect, useState } from 'react';
import styles from './GameHeader.module.scss';
import { ExitCard, HintCard } from './Card';

const GameHeader = ({
  minutes,
  seconds,
  setMinutes,
  setSeconds,
  children,
  currentHint,
  gamePhase,
}) => {
  const [isHintShowing, setIsHintShowing] = useState(false);
  const [isExistShowing, setIsExitShowing] = useState(false);

  const handleHintClick = () => {
    setIsHintShowing(!isHintShowing);
  };

  const handleExitClick = () => {
    setIsExitShowing(!isExistShowing);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (seconds > 0) {
        return setSeconds((prev) => prev - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          //TODO: 게임 종료 알림 (Socket, container에서 내려주기)
          clearTimeout(timerId);
          return;
        }
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [seconds]);

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div onClick={handleHintClick}>힌트</div>
        <div>
          {
            minutes < 10 ? `0${minutes}` : minutes
          }:{
            seconds < 10 ? `0${seconds}` : seconds
          }
        </div>
        <div onClick={handleExitClick}>종료</div>
      </div>
      <div className={styles.contents}>
        {children}
        {
          isHintShowing
          &&
          <HintCard
            text={
              gamePhase === 'quiz'
                ? currentHint
                : '아직 기다려요!'
            }
            onClick={handleHintClick}
          />
        }
        {
          isExistShowing
          &&
          <ExitCard
            text='정말 종료할건가요?🧨'
            onClick={handleExitClick}
          />
        }
      </div>
    </div>
  );
};

export default GameHeader;
