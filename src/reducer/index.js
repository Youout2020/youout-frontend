import { combineReducers } from 'redux';

import user from './user';
import game from './game';
import currentGame from './currentGame';

export default combineReducers({
  user,
  game,
  currentGame,
});
