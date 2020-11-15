import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GameRoom from './GameRoom';
import Button from './Button';
import Loading from './Loading';
import ROUTE from '../constants/route';
import styles from './GameList.module.scss';

//TODO: '방 만들기' button onClick event 컴포넌트로 이동시키기
const GameList = ({ isLoading, list, setTarget, joinWaitingRoom }) => {
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
              users={item.status.users.length}
              key={item._id}
              setTarget={lastItem ? setTarget : null}
              id={item._id}
              joinWaitingRoom={joinWaitingRoom}
            />
          );
        })
      }
      <Button
        className='fixedButton'
        text='방 만들기'
        onClick={() => history.push(`${ROUTE.games}/new`)}
      />
    </div>
  );
};

export default GameList;
