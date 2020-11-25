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
  recognizedKeywordList,
}) => {
  const { keyword, quiz } = currentQuiz;

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
            : <Popup
                className='keywordPopup'
                content={keyword}
                resultMessage={resultMessage}
              >
                <div className={styles.keywordContainer}>
                  {
                    recognizedKeywordList.length > 0 &&
                    recognizedKeywordList.map((keyword, index) => {
                      return <div key={index} className={styles.keyword}>{keyword}</div>;
                    })
                  }
                </div>
              </Popup>
          : <Card
              gamePhase={gamePhase}
              title={quiz}
              buttonText='도전'
              onClick={onSubmitAnswer}
            >
              <span>{resultMessage}</span>
              <input
                type='text'
                placeholder='요기에 정답✍️'
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
                color={user.color}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default CardWrapper;
