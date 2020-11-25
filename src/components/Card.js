import React from 'react';
import styles from './Card.module.scss';
import Button from './Button';

export const Popup = ({ className, content, resultMessage, children }) => {
  return (
    <div className={styles[className]}>
      <div className={styles.popupContents}>
        <p>{content}</p>
        <p>{resultMessage}</p>
      </div>
      <div className={styles.popupChildren}>
        {children}
      </div>
    </div>
  );
};

const Card = ({ gamePhase, title, buttonText, onClick, children }) => {
  return (
    <div className={styles.container}>
      <h4>{gamePhase}</h4>
      <h3>{title}</h3>
      {children}
      {
        buttonText &&
        <Button text={buttonText} onClick={() => onClick()} />
      }
    </div>
  );
};

export default Card;
