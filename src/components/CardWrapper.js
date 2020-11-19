import React from 'react';
import Card, { Popup } from './Card';
import ToastMessage from './ToastMessage';
import styles from './CardWrapper.module.scss';

const CardWrapper = ({
  currentQuiz,
  gamePhase,
  userAnswer,
  resultMessage,
  userAlertList,
  isCardShowing,
  onFindKeyword,
  onSubmitAnswer,
  onAnswerChange,
}) => {
  const { keyword, quiz } = currentQuiz;

  return (
    <div className={styles.container}>
      {
        gamePhase === 'keyword'
          ? isCardShowing
            ? <Card
                gamePhase={gamePhase}
                title={keyword}
                buttonText='찾기'
                onClick={onFindKeyword}
              />
            : <Popup content={keyword}>
                <span>{resultMessage}</span>
              </Popup>
          : <Card
              gamePhase={gamePhase}
              title={quiz}
              buttonText='제출'
              onClick={onSubmitAnswer}
            >
              <input
                type='text'
                placeholder='정답을 입력하세요!'
                value={userAnswer}
                onChange={onAnswerChange}
              />
              <span>{resultMessage}</span>
            </Card>
      }

      <div className={styles.toastContainer}>
        {
          userAlertList.length > 0 &&
          userAlertList.map((user, index) => {
            return (
              <ToastMessage
                key={index}
                username={user.username}
                gameIndex={user.gameIndex + 1}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default CardWrapper;
