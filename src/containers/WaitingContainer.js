import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import WaitingRoom from '../components/WaitingRoom';
import GameContainer from './GameContainer';
import { initGameSetting, startGame, disconnectGame } from '../reducer/currentGame';

const MASTER_INDEX = 0;

const WaitingContainer = () => {
  const { users, count, isPlaying } = useSelector((state) => state.currentGame);
  const { name, id, image } = useSelector((state) => state.user.info);
  const { game_id } = useParams();
  const dispatch = useDispatch();
  const isMaster = users[MASTER_INDEX] && users[MASTER_INDEX]._id === id;

  const handleStart = () => dispatch(startGame({ gameId: game_id }));

  useEffect(() => {
    dispatch(initGameSetting({
      gameId: game_id,
      userId: id,
      username: name,
      image,
    }));

    return () => dispatch(disconnectGame({ gameId: game_id }));
  }, []);

  return (
    <>
      {isPlaying
        ? <GameContainer />
        : <WaitingRoom
            users={users}
            isMaster={isMaster}
            onStart={handleStart}
            count={count}
          />}
    </>
  );
};

export default WaitingContainer;
