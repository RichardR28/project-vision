const _ = require('lodash');

let INITIAL_STATE = {
  lista: [],
};

function setLista(payload) {
  INITIAL_STATE.lista = payload;
}

function ativa(id) {
  const aux = _.findIndex(INITIAL_STATE.lista, (item) => {
    return item.id === id;
  });
  INITIAL_STATE.lista[aux].status = 1;
}

function desativa(id) {
  const aux = _.findIndex(INITIAL_STATE.lista, (item) => {
    return item.id === id;
  });
  INITIAL_STATE.lista[aux].status = 0;
}

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_QUIZZES':
      setLista(action.payload);
      return { ...state, lista: action.payload };
    case 'DESATIVA_QUIZ':
      desativa(action.payload.id);
      return { ...state };
    case 'ATIVA_QUIZ':
      ativa(action.payload.id);
      return { ...state };
    default:
      return state;
  }
};

export default quizReducer;
