import React from 'react';
import styles from './Card.module.scss';
import Button from './Button';

const Card = ({
  type,
  title,
  content,
  subContents,
  buttonText,
  onClick,
}) => {
  return (
    <div className={styles.container}>
      <div>{title}</div>
      <div>{content}</div>
      {
        type === 'quiz'
        && <input type='text' placeholder='정답은?' />
      }
      {
        <div>{subContents}</div>
      }
      <Button text={buttonText} onClick={onClick} />
    </div>
  );
};

export default Card;
