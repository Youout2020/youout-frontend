import React from 'react';
import styles from './Card.module.scss';
import Button from './Button';

export const MiniCard = ({ keyword }) => {
  return (
    <div className={styles.miniCardContainer}>
      <h3>{keyword}</h3>
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
