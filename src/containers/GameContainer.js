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
import { updateData } from '../utils/socket';

const GameContainer = () => {
  const dispatch = useDispatch();
  const gameInfo = useSelector((state) => state.currentGame);
  const { gameInfo: { quizList, timeLimit }, users } = gameInfo;
  const { id: userId } = useSelector((state) => state.user);
  const { game_id } = useParams();

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);

  const [gameIndex, setGameIndex] = useState(-1);
  const [gamePhase, setGamePhase] = useState('keyword');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCardShowing, setIsCardShowing] = useState(true);
  const [resultMessage, setResultMessage] = useState('');
  const [userAlertList, setUserAlertList] = useState([]);

  useEffect(() => {
    listenUpdateData((data) => {
      dispatch(updateCurrentGame(data.game));
    });

    setGameIndex(0);
    setMinutes(convertMsToMinutes(timeLimit));

    return () => disconnectRoom({ gameId: game_id });
  }, []);

  useEffect(() => {
    listenUpdateData((data) => {
      const target = users.find((user) => user._id === data.userId);

      setUserAlertList([
        ...userAlertList,
        target,
      ]);
    });
  }, [userAlertList]);

  const handleFindKeyword = () => {
    setIsCardShowing(false);
  };

  const matchPhotoToKeyword = async (dataUri) => {
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
      updateData({ gameId: game_id, userId });

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
        gamePhase={gamePhase}
        currentHint={quizList[gameIndex]?.hint}
      />
      <CameraWrapper
        gamePhase={gamePhase}
        setGamePhase={setGamePhase}
        setIsCardShowing={setIsCardShowing}
        matchPhotoToKeyword={matchPhotoToKeyword}
        setResultMessage={setResultMessage}
      />
      {
        quizList[gameIndex]
        &&
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
          userAlertList={userAlertList}
          setUserAlertList={setUserAlertList}
        />
      }
    </>
  );
};

export default GameContainer;
