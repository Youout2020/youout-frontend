import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store';
import AppContainer from './containers/AppContainer';
import './styles/global.module.scss';

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
