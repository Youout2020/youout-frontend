import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams } from 'react-router-dom';

import WaitingRoom from '../components/WaitingRoom';
import Header from '../components/Header';
import GameContainer from './GameContainer';
import { initGameSetting, startGame, disconnectGame, updateCurrentGame } from '../reducer/currentGame';
import { listenUpdateData } from '../utils/socket';
import Button from '../components/Button';
import { setRoute } from '../reducer/route';

const MASTER_INDEX = 0;

const WaitingContainer = () => {
  const { users, count, gameInfo } = useSelector((state) => state.currentGame);
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
          <Header title='결과'>
            {users.map((user) => (
              <div key={user._id}>
                <img src={user.image}/>
                {user.username} /
                클리어 시간: {user.clearTime} /
                맞춘 문제 수: {user.gameIndex + 1} / {gameInfo.quizList.length}
              </div>
            ))}
            <Button text='홈으로' onClick={() => dispatch(setRoute('/games'))}/>
          </Header>
        </div>
      </Route>
    </>
  );
};

export default WaitingContainer;
