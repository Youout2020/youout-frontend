import React, { useEffect } from 'react';
import Card from './Card';
import { MiniCard } from './Card';
import AlertBubble from './AlertBubble';
import styles from './CardWrapper.module.scss';

const CardWrapper = ({
  currentQuiz,
  gamePhase,
  onFindKeyword,
  onSubmitAnswer,
  isCardShowing,
  setIsCardShowing,
  userAnswer,
  setUserAnswer,
  resultMessage,
  setResultMessage,
  userAlertList,
  setUserAlertList,
}) => {
  const { keyword, quiz } = currentQuiz;

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setIsCardShowing(false);
  //   }, 2000);

  //   return () => clearTimeout(timerId);
  // }, [isCardShowing]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setUserAlertList((prev) => {
        return prev.filter((item, index) => index !== 0);
      });
    }, 3000);

    return () => clearInterval(timerId);
  }, [userAlertList]);

  return (
    <>
      {
        gamePhase === 'keyword'
        ?
        isCardShowing
          ?
          <Card
            gamePhase={gamePhase}
            title={keyword}
            buttonText='찾기'
            onClick={onFindKeyword}
          />
          :
          <MiniCard
            keyword={keyword}
            resultMessage={resultMessage}
          />
        :
        <Card
          gamePhase={gamePhase}
          title={quiz}
          buttonText='제출'
          onClick={onSubmitAnswer}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          resultMessage={resultMessage}
          setResultMessage={setResultMessage}
        />
      }

      <div className={styles.bubbleContainer}>
        {
          userAlertList.length > 0
          &&
          userAlertList.map((user, index) => {
            return (
              <AlertBubble
                key={index}
                username={user.username}
                gameIndex={user.gameIndex + 1}
              />
            );
          })
        }
      </div>
    </>
  );
};

export default CardWrapper;
