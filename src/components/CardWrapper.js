import React from 'react';
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
  userAnswer,
  setUserAnswer,
  resultMessage,
  setResultMessage,
  userAlertList,
  setUserAlertList,
}) => {
  const { keyword, quiz } = currentQuiz;
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
          userAlertList?.length
          &&
          userAlertList.map((user, index) => {
            return (
              <AlertBubble
                key={index}
                username={user.username}
                gameIndex={user.gameIndex + 1}
                setUserAlertList={setUserAlertList}
              />
            );
          })
        }
      </div>
    </>
  );
};

export default CardWrapper;
