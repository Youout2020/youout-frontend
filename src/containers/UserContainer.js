import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useParams } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';
import UserPage from '../components/UserPage';
import HistoryPage from '../components/HistoryPage';
import GamePage from '../components/GamePage';
import HEADER_TITLE from '../constants/headerTitle';
import { loadUserPage } from '../reducer/user';
import { updateGame, deleteGame } from '../reducer/game';
import { setRoute } from '../reducer/route';
import NewGameForm from '../components/NewGameForm';
import DetailGameInfo from '../components/DetailGameInfo';
import api from '../utils/api';

const UserContainer = () => {
  const {
    info,
    histories,
    games,
    isInitializedUserPage
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleUpdateGame = (body, gameId) => dispatch(updateGame({ body, gameId }));
  const handleDeleteGame = () => dispatch(deleteGame({ gameId }));
  const handleRenderGameForm = () => dispatch(setRoute(`/user/games/${gameId}/update`));
  const [gameId, setGameId] = useState('');
  const [quizList, setQuizList] = useState([]);
  const [gameInfo, setGameInfo] = useState({
    name: '',
    address: '',
    addressDetail: '',
    location: {},
    timeLimit: '',
  });

  const navigation = {
    moreHistories: () => dispatch(setRoute('/user/histories')),
    moreGames: () => dispatch(setRoute('/user/games')),
    showDetailGame: async (gameId) => {
      const path = `/games/${gameId}`;
      const response = await api.get({ path });
      setGameId(gameId);
      setGameInfo(response);
      setQuizList(response.quizList);
      dispatch(setRoute(`/user/games/${gameId}`));
    },
  };

  useEffect(() => {
    if (!info) return dispatch(setRoute('/login'));
    if (isInitializedUserPage) return;

    dispatch(loadUserPage());
  }, []);

  return (
    <>
      <Header title={HEADER_TITLE.user}>
        <Switch>
          <Route exact path='/user'>
            <UserPage
              image={info.image}
              name={info.name}
              email={info.email}
              histories={histories.docs.slice(0, 4)}
              games={games.docs.slice(0, 4)}
              navigation={navigation}
            />
          </Route>
          <Route path='/user/histories'>
            <HistoryPage histories={histories.docs}/>
          </Route>
          <Route exact path='/user/games'>
            <GamePage games={games.docs} onClick={navigation.showDetailGame}/>
          </Route>
          <Route exact path='/user/games/:game_id'>
            <DetailGameInfo
              quizList={quizList}
              gameInfo={gameInfo}
            >
              <div>
                <Button text='Update' onClick={handleRenderGameForm} />
                <Button text='Delete ' onClick={handleDeleteGame} />
              </div>
            </DetailGameInfo>
          </Route>
          <Route path='/user/games/:game_id/update'>
            <NewGameForm onCreateNewGame={handleUpdateGame}/>
          </Route>
        </Switch>
      </Header>
    </>
  );
};

export default UserContainer;
