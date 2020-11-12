import React, { useEffect, useState } from 'react';
import Header from './Header';
import styles from './Games.module.scss';

const Games = ({ onGetList }) => {
  const [ gameList, setGameList ] = useState([
    { name: '바코방', users: [ 1, 2, 3, 4] },
    { name: '삼성역', users: [] },
    { name: '우리집', users: [ 1, 2 ] },
  ]);

  useEffect(() => {
    (async () => {
      const games = await onGetList();
      setGameList(games);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Header title='너, 나가' />
      <div className={styles.gameList}>
        {/* 게임 리스트 */}
      </div>
    </div>
  );
};

export default Games;
