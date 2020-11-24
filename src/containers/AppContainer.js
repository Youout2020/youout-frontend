import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Login from '../components/Login';
import Loading from '../components/Loading';
import NewGameForm from '../components/NewGameForm';
import UserContainer from './UserContainer';
import WaitingContainer from './WaitingContainer';
import GameListContainer from './GameListContainer';
import { loadUser, setIsNative } from '../reducer/user';
import { createNewGame } from '../reducer/game';
import { findCookie } from '../utils';
import firebase from '../utils/firebase';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { updateData, gameComplete } from '../utils/socket';
import { TYPE, emit, log } from '../utils/native';

const AppContainer = () => {
  const { isLoading, isInitialized, info, error, isNative } = useSelector((state) => state.user);
  const route = useSelector((state) => state.route);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = () => firebase.googleLogin();
  const handleCreateNewGame = (body) => dispatch(createNewGame(body));

  useEffect(() => {
    if (isInitialized) return;

    findCookie('token')
      ? dispatch(loadUser({ hasToken: true }))
      : dispatch(loadUser({ hasToken: false }));
  }, []);

  useEffect(() => {
    history.push(route);
  }, [route]);

  useEffect(() => {
    if (!info) return;

    const listenNative = ({ data }) => {
      const { type, payload } = JSON.parse(data);

      switch (type) {
        case TYPE.onNative: {
          emit(TYPE.setUser, info);
          dispatch(setIsNative(true));
          break;
        }
        case TYPE.updateGame: {
          updateData(payload);
          break;
        }
        case TYPE.completeGame: {
          gameComplete(payload);
          break;
        }
      }
    };

    window.addEventListener('message', listenNative);

    return () => window.removeEventListener('message', listenNative);
  }, [info]);

  return (
    <div>
      {error}
      {isLoading
        ? <Loading />
        : <Switch>
          <Route path={'/login'}>
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path={'/games'}>
            <GameListContainer />
          </Route>
          <Route exact path={'/games/new'}>
            <NewGameForm onCreateNewGame={handleCreateNewGame} />
          </Route>
          <Route path={'/games/:game_id'}>
            <WaitingContainer />
          </Route>
          <Route path={'/user'}>
            <UserContainer />
          </Route>
        </Switch>}
    </div>
  );
};

export default AppContainer;
