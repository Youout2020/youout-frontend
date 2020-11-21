import React from 'react';

import styles from './GamePage.module.scss';

const Text = ({ text }) => {
  return (
    <p className={styles.text}>{text}</p>
  );
};

const Game = ({ id, name, onUpdate, onDelete }) => {
  return (
    <li>
      {name}
      <button onClick={() => onUpdate(id)}>Update</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

const Games = ({ games, onUpdate, onDelete }) => {
  return (
    <ul className={styles.Games}>
      {games.map(({ _id, name }) => (
        <Game key={_id} id={_id} name={name} onUpdate={onUpdate} onDelete={onDelete}/>
      ))}
    </ul>
  );
};

const GamePage = ({ games, onUpdate, onDelete }) => {
  return (
    <div className={styles.GamePage}>
      <Text text='내가 만든 방'/>
      <Games games={games} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
};

export default GamePage;
