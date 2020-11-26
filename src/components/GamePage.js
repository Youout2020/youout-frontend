import React from 'react';
import PropTypes from 'prop-types';
import styles from './GamePage.module.scss';

const Text = ({ text }) => {
  return (
    <p className={styles.text}>{text}</p>
  );
};

const Game = ({ id, name, onClick }) => {
  return (
    <li onClick={() => onClick(id)}>
      {name}
    </li>
  );
};

const Games = ({ games, onClick}) => {
  return (
    <ul className={styles.Games}>
      {games.map(({ _id, name }) => (
        <Game key={_id} id={_id} name={name} onClick={onClick}/>
      ))}
    </ul>
  );
};

const GamePage = ({ games, onClick }) => {
  return (
    <div className={styles.GamePage}>
      <Text text='내가 만든 방'/>
      <Games games={games} onClick={onClick}/>
    </div>
  );
};

Text.propTypes = {
  text: PropTypes.string.isRequired,
};

Game.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

GamePage.propTypes = {
  games: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GamePage;
