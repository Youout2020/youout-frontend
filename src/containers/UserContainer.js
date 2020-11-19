import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Switch, Route } from 'react-router-dom';

import api from '../utils/api';
import Header from '../components/Header';
import UserPage from '../components/UserPage';
import HistoryPage from '../components/HistoryPage';
import GamePage from '../components/GamePage';
import ROUTE from '../constants/route';
import PATH from '../constants/path';
import HEADER_TITLE from '../constants/headerTitle';
import { initHistories, initGames } from '../reducer/user';
import { updateGame } from '../reducer/game';
import NewGameForm from '../components/NewGameForm';

const UserContainer = () => {
  const {
    image,
    name,
    email,
    histories,
    games
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const navigation = {
    moreHistories: () => history.push(ROUTE.user.histories),
    moreGames: () => history.push(ROUTE.user.games),
  };

  const handleRenderGameForm = (id) => {
    history.push('/user/games/' + id);
  };

  const handleUpdateGame = async (body, gameId) => {
    try {
      const path = `/games/${gameId}/update`;
      const response = await api.put({ path, body });
      dispatch(updateGame(response));
      history.push('/games');
    } catch (err) {
      history.push(ROUTE.error);
    }
  };

  useEffect(() => {
    if (histories.docs.length) return;

    (async () => {
      const histories = await api.get({ path: PATH.userHistory });
      dispatch(initHistories(histories));
    })();
  }, []);

  useEffect(() => {
    if (games.docs.length) return;

    (async () => {
      const games = await api.get({ path: PATH.userGames });
      dispatch(initGames(games));
    })();
  }, []);

  return (
    <>
      <Header title={HEADER_TITLE.user}>
        <Switch>
          <Route exact path={ROUTE.user.main}>
            <UserPage
              image={image}
              name={name}
              email={email}
              histories={histories.docs.slice(0, 4)}
              games={games.docs.slice(0, 4)}
              navigation={navigation}
            />
          </Route>
          <Route path={ROUTE.user.histories}>
            <HistoryPage histories={histories.docs}/>
          </Route>
          <Route exact path={ROUTE.user.games}>
            <GamePage games={games.docs} onUpdate={handleRenderGameForm} />
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
