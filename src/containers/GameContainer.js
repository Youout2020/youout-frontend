import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Camera from '../components/Camera';
import GameHeader from '../components/GameHeader';
import { convertMsToMinutes, convertTimeToMs } from '../utils/index';
import CardWrapper from '../components/CardWrapper';
import awsRekognition from '../utils/aws';
import { updateData, listenUpdateData, gameComplete } from '../utils/socket';
import { Popup } from '../components/Card';
import Button from '../components/Button';
import { setRoute } from '../reducer/route';
import { disconnectGame } from '../reducer/currentGame';

const GameContainer = () => {
  const dispatch = useDispatch();
  const gameInfo = useSelector((state) => state.currentGame);
  const { gameInfo: { quizList, timeLimit }, users } = gameInfo;
  const { id: userId } = useSelector((state) => state.user.info);
  const { game_id } = useParams();

  const [ minutes, setMinutes ] = useState(0);
  const [ seconds, setSeconds ] = useState(10);

  const [ gameIndex, setGameIndex ] = useState(0);
  const [ gamePhase, setGamePhase ] = useState('keyword');
  const [ userAnswer, setUserAnswer ] = useState('');
  const [ resultMessage, setResultMessage ] = useState('');
  const [ userAlertList, setUserAlertList ] = useState([]);
  const [ isCardShowing, setIsCardShowing ] = useState(true);
  const [ isHintShowing, setIsHintShowing ] = useState(false);
  const [ isExitShowing, setIsExitShowing ] = useState(false);
  const [ recognizedKeywordList, setRecognizedKeywordList ] = useState([]);
  const [ isClickedAnswer, setIsClickedAnswer ] = useState(false);

  useEffect(() => {
    setGameIndex(0);
    setMinutes(5);
    // setMinutes(convertMsToMinutes(timeLimit));
  }, []);

  useEffect(() => {
    listenUpdateData((data) => {
      const target = users.find((user) => user._id === data.userId);
      setUserAlertList([ ...userAlertList, target ]);
    });
  }, [userAlertList]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setUserAlertList((prev) => {
        return prev.filter((item, index) => index !== 0);
      });
    }, 3000);

    return () => clearInterval(timerId);
  }, [userAlertList]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (seconds > 0) setSeconds((prev) => prev - 1);
      if (seconds === 0) {
        switch (minutes) {
          case 0 :
            dispatch(disconnectGame({ gameId: game_id }));
            dispatch(setRoute('/games'));
            clearTimeout(timerId);
            break;
          case 1:
            //TODO: 종료 1분 전 알림 (CSS 시 적용 예정)
            setMinutes((prev) => prev - 1);
            setSeconds(59);
            break;
          default:
            setMinutes((prev) => prev - 1);
            setSeconds(59);
        }
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [seconds]);

  const matchPhotoToKeyword = async (dataUri) => {
    if (gamePhase === 'quiz') return;

    const response = await awsRekognition.detectLabels(dataUri);
    const result = await awsRekognition.compareLabels({
      keyword: 'Accessories',
      // keyword: quizList[gameIndex].keyword,
      data: response,
    });

    if (result) {
      setGamePhase('quiz');
      setIsCardShowing(true);
      setResultMessage('');
      setRecognizedKeywordList([]);
      return;
    }

    setResultMessage('땡!');
    setRecognizedKeywordList(response.Labels.slice(0, 3).map((item) => item.Name));
  };

  const handleSubmitAnswer = () => {
    if (isClickedAnswer) return;

    setIsClickedAnswer(true);

    const isCorrectAnswer = userAnswer.trim() === quizList[gameIndex].answer;

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
      if (gameIndex === quizList.length - 1) {
        gameComplete({
          gameId: game_id,
          userId,
          clearTime: convertTimeToMs(minutes, seconds),
        });
        dispatch(setRoute(`/games/${game_id}/result`));
        return;
      }

      setGamePhase('keyword');
      setIsCardShowing(true);
      setResultMessage('');
      setUserAnswer('');
      setIsClickedAnswer(false);
    }, 2000);
  };

  const handleFindKeyword = () => setIsCardShowing(false);
  const handleHintToggle = () => setIsHintShowing(!isHintShowing);
  const handleCancelToggle = () => setIsExitShowing(!isExitShowing);
  const handleExitClick = () => dispatch(setRoute('/games'));
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
            className='hintPopup'
            content={
              gamePhase === 'quiz'
                ? quizList[gameIndex]?.hint
                : '아직 기다려요!'
            }
          >
            <Button className='popupButton' text='확인' onClick={handleHintToggle} />
          </Popup>
        }
        {
          isExitShowing &&
          <Popup className='exitPopup' content='정말 종료할건가요?🧨'>
            <Button className='popupButton' text='확인' onClick={handleExitClick} />
            <Button className='popupButton' text='취소' onClick={handleCancelToggle} />
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
          onSetCardShowing={setIsCardShowing}
          onFindKeyword={handleFindKeyword}
          onSubmitAnswer={handleSubmitAnswer}
          onAnswerChange={handleAnswerChange}
          recognizedKeywordList={recognizedKeywordList}
        />
      }
    </>
  );
};

export default GameContainer;
