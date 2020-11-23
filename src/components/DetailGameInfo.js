import React from 'react';
import styles from './DetailGameInfo.module.scss';
import { convertMsToMinutes } from '../utils';
import { FaRegCheckCircle } from 'react-icons/fa';

const DetailGameInfo = ({
  quizList,
  gameInfo,
  children,
}) => {
  return (
    <div className={styles.thirdForm}>
        <h5 className={styles.title}>게임 이름</h5>
        <div className={styles.content}>{gameInfo.name}</div>
        <h5 className={styles.title}>주소</h5>
        <div className={styles.content}>{`${gameInfo.address} ${gameInfo.addressDetail}`}</div>
        <h5 className={styles.title}>제한시간</h5>
        <div className={styles.content}>{`${convertMsToMinutes(gameInfo.timeLimit) + 1}분`}</div>
        <h5 className={styles.title}>문제 리스트</h5>
        <ul>
          {quizList.map((quiz, index) => {
              return (
                <li className={styles.content} key={index}>
                  <FaRegCheckCircle /> {quiz.quiz}
                </li>
              );
            })}
        </ul>
      {children}
    </div>
  );
};

export default DetailGameInfo;
