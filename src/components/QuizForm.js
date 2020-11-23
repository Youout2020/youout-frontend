import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { validateLength, validateSpace } from '../utils/validation';
import styles from './NewGameForm.module.scss';

const QuizForm = ({
  index,
  setPage,
  quizList,
  setQuizList,
  validationMessage,
  setValidationMessage,
}) => {
  const memo = quizList[index];
  const [ quiz, setQuiz ] = useState(memo || {
    index,
    keyword: '',
    quiz: '',
    answer: '',
    hint: '',
  });

  const handleQuizInputsChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'keyword':
        setValidationMessage({
          ...validationMessage,
          keyword: validateLength(1, 20, 'Keyword', value) || validateSpace(value),
        });
        break;
      case 'quiz':
        setValidationMessage({
          ...validationMessage,
          quiz: validateLength(3, 50, 'Quiz', value),
        });
        break;
      case 'answer':
        setValidationMessage({
          ...validationMessage,
          answer: validateLength(1, 50, 'Answer', value),
        });
        break;
      case 'hint':
        setValidationMessage({
          ...validationMessage,
          hint: validateLength(3, 50, 'Hint', value),
        });
        break;
      default:
        break;
    }

    setQuiz({
      index,
      ...quiz,
      [name]: value,
    });
  };

  const handleQuizSubmitButton = () => {
    const isAllInputsFilled =
      quiz.keyword
      && quiz.quiz
      && quiz.answer
      && quiz.hint;
    if (!isAllInputsFilled) return;

    const prevQuizList = [...quizList];
    prevQuizList[index] = quiz;
    setQuizList(prevQuizList);
    setPage(2);
  };

  return (
    <div className={styles.quizForm}>
      <Input
        type='text'
        id='keyword'
        labelName='다음 문제를 보여줄 사진 키워드'
        value={quiz['keyword']}
        name='keyword'
        placeholder='예) 바나나를 찍으세요'
        onChange={handleQuizInputsChange}
      />
      {
        validationMessage.keyword &&
        <div className={styles.validationMessage}>{validationMessage.keyword}</div>
      }
      <Input
        type='text'
        id='quiz'
        labelName='문제를 입력하세요.'
        value={quiz['quiz']}
        name='quiz'
        placeholder='예) 바나나를 먹은 사람은?'
        onChange={handleQuizInputsChange}
      />
      {
        validationMessage.quiz &&
        <div className={styles.validationMessage}>{validationMessage.quiz}</div>
      }
      <Input
        type='text'
        id='answer'
        labelName='답을 입력하세요.'
        value={quiz['answer']}
        name='answer'
        placeholder='예) 나'
        onChange={handleQuizInputsChange}
      />
      {
        validationMessage.answer &&
        <div className={styles.validationMessage}>{validationMessage.answer}</div>
      }
      <Input
        type='text'
        id='hint'
        labelName='힌트를 입력하세요.'
        value={quiz['hint']}
        name='hint'
        placeholder='예) 그런거 안줘!'
        onChange={handleQuizInputsChange}
      />
      {
        validationMessage.hint &&
        <div className={styles.validationMessage}>{validationMessage.hint}</div>
      }
      <Button
        className='basicButton'
        text='완료'
        onClick={handleQuizSubmitButton}
      />
    </div>
  );
};

export default QuizForm;
