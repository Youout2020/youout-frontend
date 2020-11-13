import React, { useEffect, useState } from 'react';
import Header from './Header';
import styles from './Games.module.scss';
import GameList from './GameList';

const Games = ({ gameList, onGetList, onGetNextList }) => {
  const [ target, setTarget ] = useState(null);

  useEffect(() => {
    (async () => await onGetList())();
  }, []);

  useEffect(() => {
    if (!target) return;
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }

    return () => observer.unobserve(target);
  }, [target]);

  const onIntersect = async ([{ isIntersecting }]) => {
    if (isIntersecting) {
      await onGetNextList();
    }
  };

  return (
    <>
      <Header title='너, 나가' />
      <div className={styles.container}>
        <GameList list={gameList} />
      </div>
      <div ref={setTarget}></div>
    </>
  );
};

export default Games;
