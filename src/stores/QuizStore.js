const _ = require('lodash');

let INITIAL_STATE = {
  lista: [],
  activeQuiz: '',
  perguntas: [],
  resultados: [],
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

function setActiveQuiz(state, id) {
  return { ...state, activeQuiz: id };
}

function setListaPerguntas(state, payload) {
  return { ...state, perguntas: payload };
}

function finalizaTesteQuiz(state) {
  return { ...state, activeQuiz: '', perguntas: [] };
}

function setResultados(state, lista) {
  return { ...state, resultados: lista };
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
    case 'SELECIONA_QUIZ':
      return setActiveQuiz(state, action.payload.id);
    case 'SET_LISTA_PERGUNTAS':
      return setListaPerguntas(state, action.payload);
    case 'TESTE_CONCLUIDO':
      return finalizaTesteQuiz(state);
    case 'SET_QUIZZES_RESULTS':
      return setResultados(state, action.payload);
    default:
      return state;
  }
};

export default quizReducer;
