import React, { useState, useEffect } from 'react';
import GameRoom from './GameRoom';
import Button from './Button';
import styles from './GameList.module.scss';
import { useDispatch } from 'react-redux';
import { setRoute } from '../reducer/route';

const Address = ({ address }) => {
  return (
    <div className={styles.addressContainer}>
      <p>바로 지금 여기</p>
      <h4>{address}</h4>
      <p>에서 방탈출할 사람✋</p>
    </div>
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
  const handleFilter = () => setIsSelected(!isSelected);

  useEffect(() => {
    const temp = {};
    playingGameList.forEach((game) => {
      temp[game._id] = {
        users: game.users,
        isPlaying: game.isPlaying,
      };
    });

    setPlayingGameData(temp);
  }, [playingGameList]);

  return (
    <div className={styles.container}>
      <Address address={address}/>
      <Button
        className='toggleButton'
        text={isSelected ? 'All' : 'Waiting'}
        onClick={handleFilter}
      />
      <div className={styles.gameContainer}>
        {
          !gameList.length
            ? <div className={styles.message}>
                <span>방 없음🤐</span>
              </div>
            : (
                isSelected
                  ? gameList
                  : gameList = gameList.reduce((acc, cur) => {
                      if (!playingGameData[cur._id]?.isPlaying) acc.push(cur);
                      return acc;
                    }, [])
              ).map((game, index) => {
                const lastGame = index === gameList.length - 1;
                const data = playingGameData[game?._id];

                return (
                  <GameRoom
                    key={game._id}
                    id={game._id}
                    isPlaying={data ? data.isPlaying : false}
                    name={game.name || game.gameInfo.name}
                    setTarget={lastGame ? setTarget : null}
                    userCount={data ? data.users.length : 0}
                    joinWaitingRoom={joinWaitingRoom}
                  />
                );
              })
            }
      </div>
            <Button
              className='fixedButton'
              text='방 만들기'
              onClick={() => dispatch(setRoute('/games/new'))}
            />
    </div>
  );
};

export default GameList;
