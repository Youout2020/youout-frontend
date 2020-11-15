import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Error from '../components/Error';
import Login from '../components/Login';
import api from '../utils/api';
import { findCookie } from '../utils';
import { initUser } from '../reducer/user';
import ROUTE from '../constants/route';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import UserContainer from './UserContainer';
import GameContainer from './GameContainer';
import NewGame from '../components/NewGame';
import { addNewGame } from '../reducer/game';
import WaitingContainer from './WaitingContainer';
import queryString from 'query-string';

const Callback = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = queryString.parse(location.search);

  useEffect(() => {
    (async () => {
      document.cookie = `token=${token}`;
      const { user } = await api.get({ path: ROUTE.user.main });
      dispatch(initUser(user));
      history.push(ROUTE.games);
    })();
  }, []);

  return (
    <h1>loading...</h1>
  );
};

const AppContainer = () => {
  const [ errMessage, setErrMessage ] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = () => {
    window.location = 'http://192.168.0.80:4000/login';
  };

  const createNewGame = async (body) => {
    try {
      const response = await api.post({ path: ROUTE.games, body });
      dispatch(addNewGame(response));
      history.push(ROUTE.games);
    } catch (err) {
      setErrMessage(err.message);
      history.push(ROUTE.error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (findCookie('token')) {
          const { user } = await api.get({ path: ROUTE.user.main });
          dispatch(initUser(user));
          history.push(ROUTE.games);
          return;
        }

        history.push(ROUTE.login);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      {
        <Switch>
          <Route path={ROUTE.login}>
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path={ROUTE.games}>
            <GameContainer />
          </Route>
          <Route exact path={`${ROUTE.games}/new`}>
            <NewGame onCreateNewGame={createNewGame} />
          </Route>
          <Route path={`${ROUTE.games}/:game_id`}>
            <WaitingContainer />
          </Route>
          <Route path={ROUTE.user.main}>
            <UserContainer />
          </Route>
          <Route path={ROUTE.error}>
            <Error message={errMessage} />
          </Route>
          <Route path='/callback'>
            <Callback />
          </Route>
        </Switch>
      }
    </div>
  );
};

export default AppContainer;
