import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store';
import AppContainer from './containers/AppContainer';
import './styles/global.module.scss';

document.cookie = 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi67CV6rK97JqwIiwiZW1haWwiOiJnZWV3b285NEBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tSi05UEIwZEpHLTgvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQU1adXVjbWRqUS1jQlVZaFVUTTRHRm1VM1VrMXdrNjdJZy9zOTYtYy9waG90by5qcGciLCJpZCI6IjVmYjIzYjRiOTI1NTY4MTY5YmFlZWM5YSIsImlhdCI6MTYwNjAzMzg2N30.VJi53gJqmDYcLZCGc7i3UwydTWeohbk0S8CvKeSqmik';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
