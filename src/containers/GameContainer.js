import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { disconnectRoom, listenUpdateData } from '../utils/socket';
import { updateCurrentGame } from '../reducer/currentGame';
import CameraWrapper from '../components/CameraWrapper';
import GameHeader from '../components/GameHeader';
import { convertMsToMinutes } from '../utils/index';
import CardWrapper from '../components/CardWrapper';
import awsRekognition from '../utils/aws';

const CameraContainer = () => {
  const dispatch = useDispatch();
  const {
    gameInfo: {
      quizList,
      timeLimit,
    }
  } = useSelector((state) => state.currentGame);
  const { game_id } = useParams();

  const [dataUri, setDataUri] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);

  const [gameIndex, setGameIndex] = useState(-1);
  const [gamePhase, setGamePhase] = useState('keyword');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCardShowing, setIsCardShowing] = useState(true);
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    listenUpdateData((data) => {
      dispatch(updateCurrentGame(data));
    });
    // 재접속한 경우 gameInfo에서 해당 유저의 gameIndex 가지고 와야함
    // 또는 disconnected 되는 순간 현재 유저의 gameIndex 서버로 전달
    setGameIndex(0);
    setMinutes(convertMsToMinutes(timeLimit));

    return () => disconnectRoom({ gameId: game_id });
  }, []);

  const handleFindKeyword = () => {
    setIsCardShowing(false);
  };

  const matchPhotoToKeyword = async () => {
    const response = await awsRekognition.detectLabels(dataUri);
    return awsRekognition.compareLabels({
      keyword: 'Accessories',
      // keyword: quizList[gameIndex].keyword,
      response,
    });
  };

  const handleSubmitAnswer = () => {
    const isAnswerCorrect = userAnswer === quizList[gameIndex].answer;
    if (isAnswerCorrect) {
      setResultMessage('오~~~ 정답!🙆');

      setTimeout(() => {
        setGameIndex((prev) => prev + 1);
        setGamePhase('keyword');
        setUserAnswer('');
        setResultMessage('');
      }, 2000);

      return;
    }

    setResultMessage('땡! 다시!🙅‍♀️');
    setUserAnswer('');
    setGamePhase('quiz');
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
        setDataUri={setDataUri}
        setGamePhase={setGamePhase}
        setIsCardShowing={setIsCardShowing}
        matchPhotoToKeyword={matchPhotoToKeyword}
      />
      {
        quizList[gameIndex] &&
        <CardWrapper
          currentQuiz={quizList[gameIndex]}
          gamePhase={gamePhase}
          onFindKeyword={handleFindKeyword}
          onSubmitAnswer={handleSubmitAnswer}
          isCardShowing={isCardShowing}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          resultMessage={resultMessage}
          setResultMessage={setResultMessage}
        />
      }
    </>
  );
};

export default CameraContainer;
