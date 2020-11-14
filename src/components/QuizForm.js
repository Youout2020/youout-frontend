import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

const QuizForm = ({ index, setPage, quizList, setQuizList }) => {
  const memo = quizList[index];
  const [ quiz, setQuiz ] = useState(memo || {});

  const handleQuizInputsChange = (event) => {
    const { name, value } = event.target;
    setQuiz({
      index,
      ...quiz,
      [name]: value,
    })
  };

  const handleQuizSubmitButton = () => {
    const prevQuizList = [...quizList];
    prevQuizList[index] = quiz;
    setQuizList(prevQuizList);
    setPage(2);
  };

  return (
    <div className='quizForm'>
      <Input
        type='text'
        id='keyword'
        labelName='다음 문제를 보여줄 사진 키워드'
        value={quiz['keyword']}
        name='keyword'
        placeholder='예) 바나나를 찍으세요'
        onChange={handleQuizInputsChange}
      />
      <Input
        type='text'
        id='quiz'
        labelName='문제를 입력하세요.'
        value={quiz['quiz']}
        name='quiz'
        placeholder='예) 바나나를 먹은 사람은?'
        onChange={handleQuizInputsChange}
      />
      <Input
        type='text'
        id='answer'
        labelName='문제를 입력하세요.'
        value={quiz['answer']}
        name='answer'
        placeholder='예) 나'
        onChange={handleQuizInputsChange}
      />
      <Input
        type='text'
        id='hint'
        labelName='문제를 입력하세요.'
        value={quiz['hint']}
        name='hint'
        placeholder='예) 그런거 안줘!'
        onChange={handleQuizInputsChange}
      />
      <Button text='완료' onClick={handleQuizSubmitButton}></Button>
    </div>
  );
};

export default QuizForm;
