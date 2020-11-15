import React from 'react';

import styles from './GamePage.module.scss';

const Text = ({ text }) => {
  return (
    <p className={styles.text}>{text}</p>
  );
};

const Games = ({ games }) => {
  return (
    <ul className={styles.Games}>
      {games.map((game) => (
        <li key={game._id}>{game.name}</li>
      ))}
    </ul>
  );
};

const HistoryPage = ({ games }) => {
  return (
    <div className={styles.GamePage}>
      <Text text='내가 만든 방'/>
      <Games games={games}/>
    </div>
  );
};

export default HistoryPage;
