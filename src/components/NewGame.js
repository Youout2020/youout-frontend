import React from 'react';
import Header from '../components/Header';
import NewGameForm from '../components/NewGameForm';

const NewGame = ({ onCreateNewGame }) => {
  return (
    <Header title='게임 만들기'>
      <NewGameForm onCreateNewGame={onCreateNewGame} />
    </Header>
  );
};

export default NewGame;
