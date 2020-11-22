import React from 'react';
import DetailGameInfo from './DetailGameInfo';
import Button from './Button';
import style from './GameDetail.module.scss';

const GameDetail = ({
  quizList,
  gameInfo,
  handleRenderGameForm,
  handleDeleteGame,
}) => {
  return (
    <div className={style.container}>
      <DetailGameInfo
        quizList={quizList}
        gameInfo={gameInfo}
      >
        <div className={style.buttonContainer}>
          <Button text='Update' onClick={handleRenderGameForm} />
          <Button text='Delete ' onClick={handleDeleteGame} />
        </div>
      </DetailGameInfo>
    </div>
  );
};

export default GameDetail;
