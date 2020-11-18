import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { disconnectRoom, listenUpdateData } from '../utils/socket';
import { updateCurrentGame } from '../reducer/currentGame';
import CameraWrapper from '../components/CameraWrapper';
import GameHeader from '../components/GameHeader';
import { convertMsToMinutes } from '../utils/index';
import CardWrapper from '../components/Card';

const CameraContainer = () => {
  const dispatch = useDispatch();
  const { gameInfo } = useSelector((state) => state.currentGame);
  const { game_id } = useParams();

  const [dataUri, setDataUri] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);

  const [gameIndex, setGameIndex] = useState(-1);
  const [gamePhase, setGamePhase] = useState('keyword');

  useEffect(() => {
    listenUpdateData((data) => {
      dispatch(updateCurrentGame(data));
    });
    setGameIndex(0);
    setMinutes(convertMsToMinutes(gameInfo.timeLimit));

    return () => disconnectRoom({ gameId: game_id });
  }, []);

  const handleKeywordConfirm = () => {
    // Card 아래로 내려서 키워드 보여주기
    setGamePhase('quiz');
  };

  const handleKeywordRetry = () => {

  };

  const handleAnswerSubmit = () => {
      // 정답으로 카드 띄어주고
      // socket으로 정답 맞춤 알리고
      // gameIndex -> 다음으로 넘기고
      // gamePhase -> keyword로 변경하고 띄워줘야 함
    setGameIndex((prev) => prev + 1);
    setGamePhase('keyword');
  };

  const handleAnswerRetry = () => {

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
      />
      <CardWrapper
        currentQuiz={gameInfo.quizList[gameIndex]}
        gamePhase={gamePhase}
        onKeywordConfirm={handleKeywordConfirm}
        onKeywordRetry={handleKeywordRetry}
        onAnswerSubmit={handleAnswerSubmit}
        onAnswerRetry={handleAnswerRetry}
      />
    </>
  );
};

export default CameraContainer;
