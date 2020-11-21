import React from 'react';

import styles from './HistoryPage.module.scss';

const Text = ({ text }) => {
  return (
    <p className={styles.text}>{text}</p>
  );
};

const History = ({ histories, onClick }) => {
  return (
    <ul className={styles.history}>
      {histories.map((history) => (
        <li key={history._id} onClick={() => onClick(history._id)}>{history.game.name}</li>
      ))}
    </ul>
  );
};

const HistoryPage = ({ histories, onClick }) => {
  return (
    <div className={styles.HistoryPage}>
      <Text text='내가 플레이한 방'/>
      <History histories={histories} onClick={onClick}/>
    </div>
  );
};

export default HistoryPage;
