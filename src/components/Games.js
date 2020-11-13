import React, { useEffect, useState } from 'react';
import Header from './Header';
import styles from './Games.module.scss';
import GameList from './GameList';

const Games = ({ onGetList }) => {
  const [ gameList, setGameList ] = useState([]);

  useEffect(() => {
    (async () => {
      const gameList = await onGetList();
      setGameList(gameList);
      // setGameList([
      //   { name: '바코방', users: [ 1, 2, 3, 4], _id: 1, isPlaying: false },
      //   { name: '삼성역', users: [ 1, 2 ], _id: 2, isPlaying: false },
      //   { name: '우리집', users: [ 1, 2 ], _id: 3, isPlaying: true },
      //   { name: '바코방', users: [ 1, 2, 3, 4], _id: 4, isPlaying: true },
      //   { name: '삼성역', users: [], _id: 5, isPlaying: true },
      //   { name: '우리집', users: [ 1, 2 ], _id: 6, isPlaying: false },
      //   { name: '바코방', users: [ 1, 2, 3, 4], _id: 7, isPlaying: true},
      //   { name: '삼성역', users: [ 3, 4 ], _id: 8, isPlaying: false },
      //   { name: '우리집', users: [ 1, 2 ], _id: 9, isPlaying: true },
      //   { name: '바코방', users: [ 1, 2, 3, 4], _id: 10, isPlaying: false },
      //   { name: '삼성역', users: [], _id: 11, isPlaying: true },
      //   { name: '우리집', users: [ 1, 2 ], _id: 12, isPlaying: false },
      // ]);
    })();
  }, []);

  return (
    <>
      <Header title='너, 나가' />
      <div className={styles.container}>
        <GameList list={gameList} />
      </div>
    </>
  );
};

export default Games;
