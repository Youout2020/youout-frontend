import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { updateCurrentGame } from '../reducer/currentGame';
import Camera from '../components/Camera';
import GameHeader from '../components/GameHeader';
import { convertMsToMinutes } from '../utils/index';
import CardWrapper from '../components/CardWrapper';
import awsRekognition from '../utils/aws';
import { updateData, listenUpdateData } from '../utils/socket';
import { Popup } from '../components/Card';
import Button from '../components/Button';
import { disconnectGame } from '../reducer/currentGame';

const GameContainer = () => {
  const dispatch = useDispatch();
  const gameInfo = useSelector((state) => state.currentGame);
  const { gameInfo: { quizList, timeLimit }, users } = gameInfo;
  const { id: userId } = useSelector((state) => state.user.info);
  const { game_id } = useParams();
  const history = useHistory();

  const [ minutes, setMinutes ] = useState(0);
  const [ seconds, setSeconds ] = useState(59);

  const [ gameIndex, setGameIndex ] = useState(-1);
  const [ gamePhase, setGamePhase ] = useState('keyword');
  const [ userAnswer, setUserAnswer ] = useState('');
  const [ resultMessage, setResultMessage ] = useState('');
  const [ userAlertList, setUserAlertList ] = useState([]);
  const [ isCardShowing, setIsCardShowing ] = useState(true);
  const [ isHintShowing, setIsHintShowing ] = useState(false);
  const [ isExitShowing, setIsExitShowing ] = useState(false);

  useEffect(() => {
    listenUpdateData((data) => {
      dispatch(updateCurrentGame(data.game));
    });

    setGameIndex(0);
    setMinutes(convertMsToMinutes(timeLimit));
  }, []);

  useEffect(() => {
    listenUpdateData((data) => {
      const target = users.find((user) => user._id === data.userId);
      setUserAlertList([ ...userAlertList, target ]);
    });

    return () => dispatch(disconnectGame({ gameId: game_id }));
  }, [userAlertList]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (seconds > 0) setSeconds((prev) => prev - 1);
      if (seconds === 0) {
        minutes === 0
          ? //TODO: 게임 종료 알림 (socket emit)
            clearTimeout(timerId)
          : setMinutes((prev) => prev - 1);
            setSeconds(59);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [seconds]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setUserAlertList((prev) => {
        return prev.filter((item, index) => index !== 0);
      });
    }, 3000);

    return () => clearInterval(timerId);
  }, [userAlertList]);

  const matchPhotoToKeyword = async (dataUri) => {
    if (gamePhase === 'quiz') return;

    const response = await awsRekognition.detectLabels(dataUri);
    const result = awsRekognition.compareLabels({
      keyword: 'Accessories',
      // keyword: quizList[gameIndex].keyword,
      response,
    });

    if (result) {
      setGamePhase('quiz');
      setIsCardShowing(true);
      setResultMessage('');
      return;
    }
    setResultMessage('땡!');
  };

  const handleSubmitAnswer = () => {
    const isCorrectAnswer = userAnswer === quizList[gameIndex].answer;

    if (!isCorrectAnswer) {
      setResultMessage('땡! 다시!🙅‍♀️');
      setUserAnswer('');
      setGamePhase('quiz');
      return;
    }

    setResultMessage('오~~~ 정답!🙆');
    updateData({ gameId: game_id, userId });

    setTimeout(() => {
      setGameIndex((prev) => prev + 1);
      setGamePhase('keyword');
      setResultMessage('');
      setUserAnswer('');
    }, 2000);
  };

  const handleFindKeyword = () => setIsCardShowing(false);
  const handleHintToggle = () => setIsHintShowing(!isHintShowing);
  const handleCancelToggle = () => setIsExitShowing(!isExitShowing);
  const handleExitClick = () => history.push('/games');
  const handleAnswerChange = ({ target }) => {
    setResultMessage('');
    setUserAnswer(target.value);
  };

  return (
    <>
      <GameHeader
        minutes={minutes}
        seconds={seconds}
        onHintToggle={handleHintToggle}
        onCancelToggle={handleCancelToggle}
      >
        {
          isHintShowing &&
          <Popup
            content={
              gamePhase === 'quiz'
                ? quizList[gameIndex]?.hint
                : '아직 기다려요!'
            }
          >
            <Button text='확인' onClick={handleHintToggle} />
          </Popup>
        }
        {
          isExitShowing &&
          <Popup content='정말 종료할건가요?🧨'>
            <Button text='확인' onClick={handleExitClick} />
            <Button text='취소' onClick={handleCancelToggle} />
          </Popup>
        }
      </GameHeader>
      <Camera
        matchPhotoToKeyword={matchPhotoToKeyword}
      />
      {
        quizList[gameIndex] &&
        <CardWrapper
          currentQuiz={quizList[gameIndex]}
          gamePhase={gamePhase}
          userAnswer={userAnswer}
          resultMessage={resultMessage}
          userAlertList={userAlertList}
          isCardShowing={isCardShowing}
          onFindKeyword={handleFindKeyword}
          onSubmitAnswer={handleSubmitAnswer}
          onAnswerChange={handleAnswerChange}
        />
      }
    </>
  );
};

export default GameContainer;
