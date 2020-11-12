import { createStore, applyMiddleware } from 'redux';
import Logger from 'redux-logger';

import reducer from './reducer';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(Logger);
}

export default createStore(reducer, applyMiddleware(...middleware));
