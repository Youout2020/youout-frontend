import React, { useEffect } from 'react';
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
  onSetCardShowing,
  onSubmitAnswer,
  onAnswerChange,
}) => {
  const { keyword, quiz } = currentQuiz;

  //FIXME: minor한 effect라 위로 올려야 할지 고민
  useEffect(() => {
    const timerId = setTimeout(() => {
      onSetCardShowing(false);
    }, 4000);

    return () => clearTimeout(timerId);
  }, [isCardShowing]);

  return (
    <div className={styles.container}>
      {
        gamePhase === 'keyword'
          ? isCardShowing
            ? <Card
                gamePhase={gamePhase}
                title={keyword}
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
              <span>{resultMessage}</span>
              <input
                type='text'
                placeholder='정답을 입력하세요!'
                value={userAnswer}
                onChange={onAnswerChange}
              />
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
