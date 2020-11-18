import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { disconnectRoom, listenUpdateData } from '../utils/socket';
import { updateCurrentGame } from '../reducer/currentGame';
import CameraWrapper from '../components/CameraWrapper';
import GameHeader from '../components/GameHeader';
import { convertMsToMinutes } from '../utils/index';
import CardWrapper from '../components/CardWrapper';

const CameraContainer = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.currentGame);
  const { game_id } = useParams();

  const [dataUri, setDataUri] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);

  const [gameIndex, setGameIndex] = useState(-1);
  const [gamePhase, setGamePhase] = useState('keyword');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCardShowing, setIsCardShowing] = useState(true);

  useEffect(() => {
    listenUpdateData((data) => {
      dispatch(updateCurrentGame(data));
    });
    // 재접속한 경우 gameInfo에서 해당 유저의 gameIndex 가지고 와야함
    // 또는 disconnected 되는 순간 현재 유저의 gameIndex 서버로 전달
    setGameIndex(0);
    setMinutes(convertMsToMinutes(currentGame.gameInfo.timeLimit));

    return () => disconnectRoom({ gameId: game_id });
  }, []);

  const handleFindKeyword = () => {
    setIsCardShowing(false);
  };

  const handleRetryFindKeyword = () => {

  };

  const handleSubmitAnswer = () => {
    console.log(userAnswer);
      // 정답으로 카드 띄어주고
      // socket으로 정답 맞춤 알리고
      // gameIndex -> 다음으로 넘기고
      // gamePhase -> keyword로 변경하고 띄워줘야 함
    setGameIndex((prev) => prev + 1);
    setGamePhase('keyword');
  };

  const handleRetryAnswer = () => {

  };

  return (
    <>
      <GameHeader
        minutes={minutes}
        setMinutes={setMinutes}
        seconds={seconds}
        setSeconds={setSeconds}
      />
      <CameraWrapper
        dataUri={dataUri}
        setDataUri={setDataUri}
        setGamePhase={setGamePhase}
        setIsCardShowing={setIsCardShowing}
      />
      {
        currentGame.gameInfo.quizList[gameIndex] &&
        <CardWrapper
          currentQuiz={currentGame.gameInfo.quizList[gameIndex]}
          gamePhase={gamePhase}
          onFindKeyword={handleFindKeyword}
          onRetryKeyword={handleRetryFindKeyword}
          onSubmitAnswer={handleSubmitAnswer}
          onRetryAnswer={handleRetryAnswer}
          isCardShowing={isCardShowing}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
        />
      }
    </>
  );
};

export default CameraContainer;
