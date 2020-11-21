import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from '../components/Header';
import UserPage from '../components/UserPage';
import HistoryPage from '../components/HistoryPage';
import GamePage from '../components/GamePage';
import ROUTE from '../constants/route';
import HEADER_TITLE from '../constants/headerTitle';
import { loadUserPage } from '../reducer/user';
import { updateGame, deleteGame } from '../reducer/game';
import { setRoute } from '../reducer/route';
import NewGameForm from '../components/NewGameForm';

const UserContainer = () => {
  const {
    info,
    histories,
    games,
    isInitializedUserPage
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleUpdateGame = (body, gameId) => dispatch(updateGame({ body, gameId }));
  const handleDeleteGame = (gameId) => dispatch(deleteGame({ gameId }));

  const handleRenderGameForm = (id) => dispatch(setRoute(`/user/games/${id}`));

  const navigation = {
    moreHistories: () => dispatch(setRoute('/user/histories')),
    moreGames: () => dispatch(setRoute('/user/games')),
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
          <Route exact path={ROUTE.user.main}>
            <UserPage
              image={info.image}
              name={info.name}
              email={info.email}
              histories={histories.docs.slice(0, 4)}
              games={games.docs.slice(0, 4)}
              navigation={navigation}
            />
          </Route>
          <Route path={ROUTE.user.histories}>
            <HistoryPage histories={histories.docs}/>
          </Route>
          <Route exact path={ROUTE.user.games}>
            <GamePage games={games.docs} onUpdate={handleRenderGameForm} onDelete={handleDeleteGame} />
          </Route>
          <Route path={ROUTE.user.gameId}>
            <NewGameForm onCreateNewGame={handleUpdateGame}/>
          </Route>
        </Switch>
      </Header>
    </>
  );
};

export default UserContainer;
