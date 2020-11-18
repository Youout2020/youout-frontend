import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {
  joinWaitingRoom,
  listenJoinUser,
  disconnectRoom,
  gameStart,
  listenGameStart,
} from '../utils/socket';
import WaitingRoom from '../components/WaitingRoom';
import { updateCurrentGame } from '../reducer/currentGame';

const MASTER_INDEX = 0;
const DEFAULT_COUNT = 3;

const WaitingContainer = () => {
  const [ users, setUsers ] = useState([]);
  const [ count, setCount ] = useState(-1);
  const { name, id } = useSelector((state) => state.user);
  const { game_id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isMaster = users[MASTER_INDEX] && users[MASTER_INDEX]._id === id;

  const handleStart = () => {
    gameStart({ gameId: game_id });
  };

  useEffect(() => {
    if (count < 0) return;
    if (count === 0) {
      history.push(`/games/${game_id}/camera`);
      return;
    }

    const timerId = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [count]);

  useEffect(() => {
    joinWaitingRoom({ gameId: game_id, userId: id, username: name });
    listenJoinUser((game) => {
      game.users[MASTER_INDEX].isMaster = true;
      setUsers(game.users);
    });
    listenGameStart((gameInfo) => {
      dispatch(updateCurrentGame(gameInfo));
      setCount(DEFAULT_COUNT);
    });

    return () => disconnectRoom({ gameId: game_id });
  }, []);

  return (
    <>
      <WaitingRoom
        users={users}
        isMaster={isMaster}
        onStart={handleStart}
        count={count}
      />
    </>
  );
};

export default WaitingContainer;
