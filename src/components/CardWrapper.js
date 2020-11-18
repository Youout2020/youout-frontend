import React from 'react';
import Card from './Card';
import styles from './CardWrapper.module.scss';

const MiniCard = ({ keyword }) => {
  return (
    <div className={styles.miniCardContainer}>
      <h3>{keyword}</h3>
    </div>
  );
};

const CardWrapper = ({
  currentQuiz,
  gamePhase,
  onFindKeyword,
  onRetryKeyword,
  onSubmitAnswer,
  onRetryAnswer,
  isCardShowing,
  userAnswer,
  setUserAnswer,
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
          <MiniCard keyword={keyword} />
        :
        <Card
          gamePhase={gamePhase}
          title={quiz}
          buttonText='제출'
          onClick={onSubmitAnswer}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
        />
      }
    </>
  );
};

export default CardWrapper;
