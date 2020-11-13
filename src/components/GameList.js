import React, { useState } from 'react';
import GameRoom from './GameRoom';
import Button from './Button';
import styles from './GameList.module.scss';
import Loading from './Loading';

//TODO: '방 만들기' button onClick event 컴포넌트로 이동시키기
const GameList = ({ isLoading, list, setTarget }) => {
  const [ isSelected, setIsSelected ] = useState(false);
  const handleFilter = () => {
    setIsSelected(!isSelected);
  };

  return (
    isLoading
    ?
    <Loading />
    :
    <div className={styles.container}>
      <Button
        className='toggleButton'
        text={isSelected ? 'All' : 'Waiting'}
        onClick={handleFilter}
      />
      {
        !list.length
        ?
        <div className={styles.message}>
          <span>방 없음🤐</span>
          <Button
            className='filterButton'
            text='방 만들기'
            onClick={() => '방 만들기로 이동'}
          />
        </div>
        :
        (
          isSelected
          ? list = list.filter((item) => !item.status.isPlaying)
          : list
        ).map((item, index) => {
          const lastItem = index === list.length - 1;
          return (
            <GameRoom
              isPlaying={item.status.isPlaying}
              name={item.name}
              users={item.users.length}
              key={item._id}
              setTarget={lastItem ? setTarget : null}
            />
          );
        })
      }
    </div>
  );
};

export default GameList;
