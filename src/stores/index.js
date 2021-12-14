import { combineReducers, createStore } from 'redux';

import userReducer from './UserStore';

const rootReducers = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducers);

export default store;
