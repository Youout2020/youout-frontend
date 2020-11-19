import React, { useState, useEffect } from 'react';
import GameRoom from './GameRoom';
import Button from './Button';
import styles from './GameList.module.scss';
import { useDispatch } from 'react-redux';
import { setRoute } from '../reducer/route';

const Address = ({ address }) => {
  return (
    <h1>{address}</h1>
  );
};

const GameList = ({
  gameList,
  playingGameList,
  setTarget,
  joinWaitingRoom,
  address,
}) => {
  const [ isSelected, setIsSelected ] = useState(true);
  const [ playingGameData, setPlayingGameData ] = useState([]);
  const dispatch = useDispatch();
  const handleFilter = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    const temp = {};
    playingGameList.forEach((game) => {
      temp[game._id] = game.users;
    });

    setPlayingGameData(temp);
  }, [playingGameList]);

  return (
    <div className={styles.container}>
      <div className={styles.gradient}/>
      <Address address={address}/>
      <Button
        className='toggleButton'
        text={isSelected ? 'All' : 'Waiting'}
        onClick={handleFilter}
      />
      {
        !gameList.length
          ? <div className={styles.message}>
              <span>방 없음🤐</span>
            </div>
          : (
              isSelected
                ? gameList
                : gameList = gameList.reduce((acc, cur) => {
                    if (!playingGameData[cur._id]) acc.push(cur);
                    return acc;
                  }, [])
            ).map((game, index) => {
              const lastGame = index === gameList.length - 1;
              const users = playingGameData[game._id];

              return (
                <GameRoom
                  key={game._id}
                  id={game._id}
                  isPlaying={!!users}
                  name={game.name || game.gameInfo.name}
                  setTarget={lastGame ? setTarget : null}
                  userCount={users?.length || 0}
                  joinWaitingRoom={joinWaitingRoom}
                />
              );
            })
      }
      <Button
        className='fixedButton'
        text='방 만들기'
        onClick={() => dispatch(setRoute('/games/new'))}
      />
    </div>
  );
};

export default GameList;
