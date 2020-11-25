import React from 'react';
import DetailGameInfo from './DetailGameInfo';
import Button from './Button';
import PropTypes from 'prop-types';
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
          <Button className='basicButton' text='Update' onClick={handleRenderGameForm} />
          <Button className='basicButton' text='Delete' onClick={handleDeleteGame} />
        </div>
      </DetailGameInfo>
    </div>
  );
};

GameDetail.propTypes = {
  quizList: PropTypes.object.isRequired,
  gameInfo: PropTypes.object.isRequired,
  handleRenderGameForm: PropTypes.func.isRequired,
  handleDeleteGame: PropTypes.func.isRequired,
};

export default GameDetail;
