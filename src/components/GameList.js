import React, { useState } from 'react';
import GameItem from '../components/GameItem';
import Button from './Button';
import styles from './GameList.module.scss';

//TODO: '방 만들기' button onClick event 컴포넌트로 이동시키기
const GameList = ({ list }) => {
  const [ isSelected, setIsSelected ] = useState(false);
  const handleFilter = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className={styles.container}>
      <Button className='filterButton' text='Wating only' onClick={handleFilter} />
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
          ? list.filter((item) => !item.isPlaying)
          : list
        ).map((item) => {
          return (
            <GameItem
              isPlaying={item.isPlaying}
              name={item.name}
              users={item.users.length}
              key={item._id}
            />
          );
        })
      }
    </div>
  );
};

export default GameList;
