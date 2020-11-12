import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Error from '../components/Error';
import Login from '../components/Login';
import firebase from '../utils/firebase';
import api from '../utils/api';
import { initUser } from '../reducer/user';
import ROUTE from '../constants/route';

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

        if (!user) {
          history.push(ROUTE.login);
          return;
        }

        const { email, displayName, photoURL } = user;
        const body = { email, name: displayName, image: photoURL };
        const data = await api.post({ path: ROUTE.login, body });

        dispatch(initUser(data));

        history.push(ROUTE.games);
      } catch (err) {
        console.error(err);
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
        <div>Loading.....</div>
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
