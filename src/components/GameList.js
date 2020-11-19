import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GameRoom from './GameRoom';
import Button from './Button';
import Loading from './Loading';
import ROUTE from '../constants/route';
import styles from './GameList.module.scss';

const GameList = ({ isLoading, gameList, playingGameList, setTarget, joinWaitingRoom }) => {
  const history = useHistory();
  const [ isSelected, setIsSelected ] = useState(false);
  const [ playingGameIds, setPlayingGameIds ] = useState([]);
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
    isLoading
      ? <Loading />
      : <div className={styles.container}>
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
            onClick={() => history.push(`${ROUTE.games}/new`)}
          />
    </div>
  );
};

export default GameList;
