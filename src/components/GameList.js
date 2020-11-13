import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GameRoom from './GameRoom';
import Button from './Button';
import Loading from './Loading';
import ROUTE from '../constants/route';
import styles from './GameList.module.scss';

const GameList = ({ isLoading, list, setTarget }) => {
  const history = useHistory();
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
      <Button
        className='newRoomButton'
        text='방 만들기'
        onClick={() => history.push(`${ROUTE.games}/new`)}
      />
    </div>
  );
};

export default GameList;
