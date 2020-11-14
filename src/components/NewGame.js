import React from 'react';
import Header from '../components/Header';
import NewGameForm from '../components/NewGameForm';
// import styles from './GameRoom.module.scss';

const NewGame = () => {
  return (
    <Header title='게임 만들기'>
      <NewGameForm />
    </Header>
  );
};

export default NewGame;
