import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams } from 'react-router-dom';
import randomcolor from 'randomcolor';

import WaitingRoom from '../components/WaitingRoom';
import ResultPage from '../components/ResultPage';
import GameContainer from './GameContainer';
import { initGameSetting, startGame, disconnectGame, updateCurrentGame } from '../reducer/currentGame';
import { listenUpdateData } from '../utils/socket';
import { setRoute } from '../reducer/route';

const MASTER_INDEX = 0;

const WaitingContainer = () => {
  const { users, count, gameInfo } = useSelector((state) => state.currentGame);
  const { name, id, image } = useSelector((state) => state.user.info);
  const [ isClickedStart, setIsClickedStart ] = useState(false);
  const { game_id } = useParams();
  const dispatch = useDispatch();
  const isMaster = users[MASTER_INDEX] && users[MASTER_INDEX]._id === id;

  const handleStart = () => {
    if (isClickedStart) return;

    setIsClickedStart(true);
    dispatch(startGame({ gameId: game_id }));
  };

  useEffect(() => {
    dispatch(initGameSetting({
      gameId: game_id,
      userId: id,
      username: name,
      image,
      color: randomcolor(),
    }));
    listenUpdateData((data) => {
      dispatch(updateCurrentGame(data.game));
    });

    return () => dispatch(disconnectGame({ gameId: game_id }));
  }, []);

  return (
    <>
      <Route exact path='/games/:game_id'>
        <WaitingRoom
          users={users}
          isMaster={isMaster}
          onStart={handleStart}
          count={count}
        />
      </Route>
      <Route exact path='/games/:game_id/playing'>
        <GameContainer />
      </Route>
      <Route exact path='/games/:game_id/result'>
        <div>
          <ResultPage
            users={users}
            gameInfo={gameInfo}
            renderHome={() => dispatch(setRoute('/games'))}
          />
        </div>
      </Route>
    </>
  );
};

export default WaitingContainer;
