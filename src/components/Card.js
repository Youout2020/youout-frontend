import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Card.module.scss';
import Button from './Button';

export const MiniCard = ({ keyword, resultMessage }) => {
  return (
    <div className={styles.miniCardContainer}>
      <span>{keyword}</span>
      <span>{resultMessage}</span>
    </div>
  );
};

export const HintCard = ({ text, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className={styles.hintCardContainer}>
      <span>{text}</span>
      <Button text='확인' onClick={handleClick} />
    </div>
  );
};

export const ExitCard = ({ text, onClick }) => {
  const history = useHistory();
  const handleClick = () => {
    onClick();
    // socket 알림..
    history.push('/games');
  };

  return (
    <div className={styles.exitCardContainer}>
      <span>{text}</span>
      <Button text='확인' onClick={handleClick} />
    </div>
  );
};

const Card = ({
  gamePhase,
  title,
  buttonText,
  onClick,
  userAnswer,
  setUserAnswer,
  resultMessage,
  setResultMessage,
}) => {
  const handleClick = () => {
    onClick();
  };

  const handleChange = ({ target }) => {
    setResultMessage('');
    const { value } = target;
    setUserAnswer(value);
  };

  return (
    <div className={styles.container}>
      <h4>{gamePhase}</h4>
      <h3>{title}</h3>
      {
        gamePhase === 'quiz'
        &&
        <input
          type='text'
          placeholder='정답은?'
          value={userAnswer}
          onChange={handleChange}
        />
      }
      {
        <div>{resultMessage}</div>
      }
      <Button text={buttonText} onClick={handleClick} />
    </div>
  );
};

export default Card;
