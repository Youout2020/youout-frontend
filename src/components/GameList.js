import React, { useState, useEffect } from 'react';
import GameRoom from './GameRoom';
import Button from './Button';
import styles from './GameList.module.scss';
import { useDispatch } from 'react-redux';
import { setRoute } from '../reducer/route';

const GameList = ({ gameList, playingGameList, setTarget, joinWaitingRoom }) => {
  const [ isSelected, setIsSelected ] = useState(false);
  const [ playingGameIds, setPlayingGameIds ] = useState([]);
  const dispatch = useDispatch();
  const handleFilter = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    const playingGameIds = playingGameList.map((game) => {
      return game.isPlaying ? game._id : null;
    });

    setPlayingGameIds(playingGameIds);
  }, [playingGameList]);

  return (
    <div className={styles.container}>
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
                ? gameList = playingGameList.filter((game) => !game.isPlaying)
                : gameList
            ).map((game, index) => {
              const lastGame = index === gameList.length - 1;
              return (
                <GameRoom
                  key={game._id}
                  id={game._id}
                  isPlaying={playingGameIds.includes(game._id)}
                  name={game.name || game.gameInfo.name}
                  setTarget={lastGame ? setTarget : null}
                  userCount={game.users?.length || 0}
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
