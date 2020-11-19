import React from 'react';

import styles from './GamePage.module.scss';

const Text = ({ text }) => {
  return (
    <p className={styles.text}>{text}</p>
  );
};

const Game = ({ id, name, onUpdate }) => {
  return (
    <li>
      {name}
      <button onClick={() => onUpdate(id)}>Update</button>
    </li>
  )
};

const Games = ({ games, onUpdate }) => {
  return (
    <ul className={styles.Games}>
      {games.map(({ _id, name }) => (
        <Game key={_id} id={_id} name={name} onUpdate={onUpdate}/>
      ))}
    </ul>
  );
};

const GamePage = ({ games, onUpdate }) => {
  return (
    <div className={styles.GamePage}>
      <Text text='내가 만든 방'/>
      <Games games={games} onUpdate={onUpdate}/>
    </div>
  );
};

export default GamePage;
