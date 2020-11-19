import React from 'react';
import styles from './Card.module.scss';
import Button from './Button';

export const Popup = ({ content, children }) => {
  return (
    <div className={styles.popupContainer}>
      <p>{content}</p>
      {children}
    </div>
  );
};

const Card = ({ gamePhase, title, buttonText, onClick, children }) => {
  return (
    <div className={styles.container}>
      <h4>{gamePhase}</h4>
      <h3>{title}</h3>
      {children}
      <Button text={buttonText} onClick={() => onClick()} />
    </div>
  );
};

export default Card;
