import { combineReducers, createStore } from 'redux';

import userReducer from './UserStore';
import gameReducer from './GameStore';
import quizReducer from './QuizStore';

const rootReducers = combineReducers({
  user: userReducer,
  game: gameReducer,
  quiz: quizReducer,
});

const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
