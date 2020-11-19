import React, { useState, useEffect } from 'react';
import Header from './Header';
import Input from './Input';
import styles from './NewGameForm.module.scss';
import Button from './Button';
import QuizForm from './QuizForm';
import Map from './Map';
import { pageName, pageNavigation } from '../constants/page';
import PATH from '../constants/path';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const NewGameForm = ({
  onCreateNewGame,
}) => {
  const [gameInfo, setGameInfo] = useState({
    name: '',
    address: '',
    addressDetail: '',
    location: {},
    timeLimit: '',
  });
  const [ quizList, setQuizList ] = useState([]);
  const [ quizCount, setQuizCount ] = useState(5);
  const [ page, setPage ] = useState(1);
  const [ currentIndex, setCurrentIndex ] = useState(-1);
  const { game_id } = useParams();

  useEffect(() => {
    if (!game_id) return;

    (async () => {
      const path = PATH.gameId(game_id);
      const { name, address, addressDetail, location, timeLimit, quizList } = await api.get({ path });
      setGameInfo({
        name,
        address,
        addressDetail,
        location,
        timeLimit
      });
      setQuizList(quizList);
      setQuizCount(quizList.length);
    })();
  }, []);

  const handleInputsChange = ({ target }) => {
    const { name, value } = target;
    setGameInfo({
      ...gameInfo,
      [name]: value,
    });
  };

  const handleCounter = ({ target }) => {
    const { name } = target;
    name === 'increase'
     ? setQuizCount((prev) => {
       return prev + 1 > 10
        ? prev
        : prev + 1;
     })
     : setQuizCount((prev) => {
       return prev - 1 < 2
        ? prev
        : prev - 1;
     });
  };

  const handlePageNavigation = ({ target }) => {
    const isAllInputsFilled =
      gameInfo.name
      && gameInfo.address
      && gameInfo.addressDetail
      && gameInfo.timeLimit;
    const isAllQuizesFilled = quizList.every((quiz) => quiz.quiz);

    if (page === 1 && !isAllInputsFilled) return;
    if (page === 2 && !isAllQuizesFilled) return;

    const { name } = target;
    name === pageNavigation.PREV
      ? setPage((prev) => prev - 1)
      : setPage((prev) => prev + 1);
  };

  const handleQuizInputButton = (index) => {
    setCurrentIndex(index);
    setPage(pageName.QUIZ_FORM);
  };

  const handleSubmitButton = () => {
    onCreateNewGame({
      ...gameInfo,
      quizList,
    }, game_id ? game_id : '');
  };

  return (
    <>
      <Header title='게임 만들기'/>
      <form className={styles.container}>
        {
          page === pageName.FIRST &&
          <div className={styles.firstForm}>
            <Input
              type='text'
              id='name'
              labelName='게임 이름'
              value={gameInfo['name']}
              name='name'
              placeholder='게임 이름'
              onChange={handleInputsChange}
            />
            <Button
              text='현 위치로 주소 설정'
              onClick={() => setPage(pageName.MAP)}
            />
            <Input
              type='text'
              id='address'
              labelName='위치'
              value={gameInfo['address']}
              name='address'
              placeholder='예) 바코동'
              onChange={handleInputsChange}
              disabled
            />
            <Input
              type='text'
              id='address'
              labelName=''
              value={gameInfo['addressDetail']}
              name='addressDetail'
              placeholder='상세 주소'
              onChange={handleInputsChange}
            />
            <Input
              type='select'
              labelName='제한 시간'
              name='timeLimit'
              id='timeLimit'
              onChange={handleInputsChange}
            />
            <div className={styles.quizCounter}>
              <Button
                name='decrease'
                className='circleButton'
                onClick={handleCounter}
                text='-'
              />
              <span className={styles.quizCount}>{quizCount}</span>
              <Button
                name='increase'
                className='circleButton'
                onClick={handleCounter}
                text='+'
              />
            </div>
            <Button name={pageNavigation.NEXT} text='Next' onClick={handlePageNavigation} />
          </div>
        }
        {
          page === pageName.SECOND &&
          <div className={styles.secondForm}>
            {
              Array(quizCount).fill(0).map((quiz, index) => {
                return (
                  <div className={styles.quizContainer} key={index}>
                    <div className={styles.quizDone}>
                      {
                        quizList[index]?.quiz ? '✓' : '✕'
                      }
                    </div>
                    <Button
                      className='quizButton'
                      text={quizList[index]?.quiz || '문제를 입력하세요.'}
                      onClick={() => handleQuizInputButton(index)}
                    />
                  </div>
                );
              })
            }
            <div className={styles.buttonContainer}>
              <Button name={pageNavigation.PREV} text='Prev' onClick={handlePageNavigation} />
              <Button name={pageNavigation.NEXT} text='Next' onClick={handlePageNavigation} />
            </div>
          </div>
        }
        {
          page === pageName.THIRD &&
          <div className={styles.thirdForm}>
            <div className={styles.gameInfoContainer}>
              <h5 className={styles.title}>게임 이름</h5>
              <div className={styles.content}>{gameInfo.name}</div>
            </div>
            <div className={styles.gameInfoContainer}>
              <h5 className={styles.title}>위치</h5>
              <div className={styles.content}>{`${gameInfo.address} ${gameInfo.addressDetail}`}</div>
            </div>
            <div className={styles.gameInfoContainer}>
              <h5 className={styles.title}>제한시간</h5>
              <div className={styles.content}>{gameInfo.timeLimit}</div>
            </div>
            <div className={styles.gameInfoContainer}>
              <h5 className={styles.title}>문제 리스트</h5>
              {
                quizList.map((quiz, index) => {
                  return (
                    <div className={styles.content} key={index}>
                      {quiz.quiz}
                    </div>
                  );
                })
              }
            </div>
            <div className={styles.buttonContainer}>
              <Button name={pageNavigation.PREV} text='Prev' onClick={handlePageNavigation} />
              <Button text='만들기 ' onClick={handleSubmitButton} />
            </div>
          </div>
        }
        {
          page === pageName.QUIZ_FORM &&
          <QuizForm
            index={currentIndex}
            setPage={setPage}
            quizList={quizList}
            setQuizList={setQuizList}
          />
        }
        {
          page === pageName.MAP &&
          <Map
            setPage={setPage}
            gameInfo={gameInfo}
            setGameInfo={setGameInfo}
          />
        }
      </form>
    </>
  );
};

export default NewGameForm;
