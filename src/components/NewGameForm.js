import React, { useState } from 'react';
import Input from './Input';
import styles from './NewGameForm.module.scss';
import Button from './Button';
import QuizForm from './QuizForm';
import Map from './Map';

const NewGameForm = () => {
  const [ gameInfo, setGameInfo ] = useState({});
  const [ quizCount, setQuizCount ] = useState(5);
  const [ page, setPage ] = useState(1);
  const [ quizList, setQuizList ] = useState([]);
  const [ currentIndex, setCurrentIndex ] = useState(-1);

  const handleInputsChange = (event) => {
    const { name, value } = event.target;
    setGameInfo({
      ...gameInfo,
      [name]: value,
    });
  };

  const handleCounter = (event) => {
    const { name } = event.target;
    name === 'increase'
      ? setQuizCount((prev) => prev + 1)
      : setQuizCount((prev) => prev - 1);
    setGameInfo({
      ...gameInfo,
      quizCount: quizCount,
    });
  };

  const handlePageNavigation = (event) => {
    const isAllInputsFilled = gameInfo.name && gameInfo.address && gameInfo.addressDetail && gameInfo.timeLimit;
    const isAllQuizesFilled = quizList.every((quiz) => quiz.quiz);

    if (page === 1 && !isAllInputsFilled) return;
    if (page === 2 && !isAllQuizesFilled) return;

    const { name } = event.target;
    name === 'prev'
      ? setPage((prev) => prev - 1)
      : setPage((prev) => prev + 1);
  };

  const handleQuizInputButton = (index) => {
    setCurrentIndex(index);
    setPage('quizForm');
  };

  const handleSubmitButton = () => {
    // 정보 axios 처리인데 App Container에서 진행하기
  };

  return (
    <form className={styles.container}>
      {
        page === 1 &&
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
            onClick={() => setPage('map')}
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
              onClick={handleCounter} text='-'
            />
            <span className={styles.quizCount}>{quizCount}</span>
            <Button
              name='increase'
              className='circleButton'
              onClick={handleCounter}
              text='+'
            />
          </div>
          <Button name='next' text='다음' onClick={handlePageNavigation} />
        </div>
      }
      {
        page === 2 &&
        <div className={styles.secondForm}>
          {
            Array(quizCount).fill(0).map((quiz, index) => {
              return (
                <div className={styles.quizContainer} key={index}>
                  <div className={styles.quizDone}>{ quizList[index]?.quiz ? 'O' : 'X' }</div>
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
            <Button name='prev' text='이전' onClick={handlePageNavigation} />
            <Button name='next' text='다음' onClick={handlePageNavigation} />
          </div>
        </div>
      }
      {
        page === 3 &&
        <div className='thirdForm'>
          <div className='gameInfoContainer'>
            <h5>게임 이름</h5>
            <div>{gameInfo.name}</div>
          </div>
          <div className='gameInfoContainer'>
            <h5>위치</h5>
            <div>{`${gameInfo.address} ${gameInfo.addressDetail}`}</div>
          </div>
          <div className='gameInfoContainer'>
            <h5>제한시간</h5>
            <div>{gameInfo.timeLimit}</div>
          </div>
          <div className='gameInfoContainer'>
            <h5>문제 리스트</h5>
            {
              quizList.map((quiz, index) => {
                return <div key={index}>{quiz.quiz}</div>;
              })
            }
          </div>
          <div className={styles.buttonContainer}>
            <Button name='prev' text='이전' onClick={handlePageNavigation} />
            <Button text='만들어' onClick={handleSubmitButton} />
          </div>
        </div>
      }
      {
        page === 'quizForm' &&
        <QuizForm
          index={currentIndex}
          setPage={setPage}
          quizList={quizList}
          setQuizList={setQuizList}
        />
      }
      {
        page === 'map' &&
        <Map
          setPage={setPage}
          gameInfo={gameInfo}
          setGameInfo={setGameInfo}
        />
      }
    </form>
  );
};

export default NewGameForm;
