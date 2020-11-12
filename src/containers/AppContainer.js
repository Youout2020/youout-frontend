import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Error from '../components/Error';
import Login from '../components/Login';
import Loading from '../components/Loading';
import firebase from '../utils/firebase';
import api from '../utils/api';
import { initUser } from '../reducer/user';
import ROUTE from '../constants/route';
import { findCookie } from '../utils';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const AppContainer = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ errMessage, setErrMessage ] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    history.push(ROUTE.home);
    firebase.googleLogin();
  };

  useEffect(() => {
    (async () => {
      try {
        const { user } = await firebase.listenRedirect();
        setIsLoading(false);

        if (findCookie('token')) {
          history.push(ROUTE.games);
          return;
        }

        if (!user) {
          history.push(ROUTE.login);
          return;
        }

        const { email, displayName, photoURL } = user;
        const body = { email, name: displayName, image: photoURL };
        const response = await api.post({ path: ROUTE.login, body });

        document.cookie = `token=${response.token}`;
        dispatch(initUser(response.user));

        history.push(ROUTE.games);
      } catch (err) {
        setErrMessage(err.message);
        history.push(ROUTE.error);
      }
    })();
  }, []);

  return (
    <div>
      {
        isLoading
        ?
        <Loading />
        :
          <Switch>
            <Route path={ROUTE.login}>
              <Login onLogin={handleLogin} />
            </Route>
            <Route path={ROUTE.games}>
              <div>games</div>
            </Route>
            <Route path={ROUTE.error}>
              <Error message={errMessage} />
            </Route>
          </Switch>
      }
    </div>
  );
};

export default AppContainer;
