import React from 'react';

const CardWrapper = () => {
  return (
    <div>
      {
        !gameInfo.quizList[gameIndex]
          ?
          <h1>이제 끝</h1>
          :
          gamePhase === 'keyword'
            ?
            <Card
              type='keyword'
              title='키워드를 찾아라'
              content={gameInfo.quizList[gameIndex].keyword}
              buttonText='확인'
              onClick={handleKeywordClick}
            />
            :
            <Card
              type='quiz'
              title='문제를 풀어라'
              content={gameInfo.quizList[gameIndex].quiz}
              buttonText='제출'
              onClick={handleAnswerCheck}
            />
      }
    </div>
  );
};

export default CardWrapper;