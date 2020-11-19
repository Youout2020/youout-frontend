import React from 'react';
import Card from './Card';
import { MiniCard } from './Card';

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
    </>
  );
};

export default CardWrapper;
