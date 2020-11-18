import React, { useState } from 'react';
import styles from './Card.module.scss';
import Button from './Button';

const Card = ({
  gamePhase,
  title,
  buttonText,
  onClick,
  userAnswer,
  setUserAnswer,
}) => {
  const handleClick = () => {
    onClick();
  };

  const handleChange = ({ target }) => {
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
      <Button text={buttonText} onClick={handleClick} />
    </div>
  );
};

export default Card;
