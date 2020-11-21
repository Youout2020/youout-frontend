import React from 'react';
import styles from './DetailGameInfo.module.scss';
import { convertMsToMinutes } from '../utils';

const DetailGameInfo = ({
  quizList,
  gameInfo,
  children,
}) => {
  return (
    <div className={styles.thirdForm}>
      <div className={styles.gameInfoContainer}>
        <h5 className={styles.title}>게임 이름</h5>
        <div className={styles.content}>{gameInfo.name}</div>
      </div>
      <div className={styles.gameInfoContainer}>
        <h5 className={styles.title}>위치</h5>
        <div className={styles.content}>{`${gameInfo.address} ${gameInfo.addressDetail}`}</div>
      </div>
      <div className={styles.gameInfoContainer}>
        <h5 className={styles.title}>제한시간</h5>
        <div className={styles.content}>{`${convertMsToMinutes(gameInfo.timeLimit) + 1}분`}</div>
      </div>
      <div className={styles.gameInfoContainer}>
        <h5 className={styles.title}>문제 리스트</h5>
        {
          quizList.map((quiz, index) => {
            return (
              <div className={styles.content} key={index}>
                {quiz.quiz}
              </div>
            );
          })
        }
      </div>
      {children}
    </div>
  );
};

export default DetailGameInfo;
