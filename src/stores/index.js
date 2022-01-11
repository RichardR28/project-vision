import { combineReducers, createStore } from 'redux';

import userReducer from './UserStore';
import gameReducer from './GameStore';

const rootReducers = combineReducers({
  user: userReducer,
  game: gameReducer,
});

const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
