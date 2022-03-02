const _ = require('lodash');

let INITIAL_STATE = {
  lista: [],
  jogos: [],
  activeGame: null,
  pontuacoes: [],
};

function setLista(payload) {
  INITIAL_STATE.lista = payload;
}

function setJogos(state, list) {
  return { ...state, jogos: list };
}

function remove(id) {
  _.remove(INITIAL_STATE.lista, {
    id: id,
  });
}

function setGameActive(state, id) {
  return { ...state, activeGame: id };
}

function setGameScores(state, scores) {
  return { ...state, pontuacoes: scores };
}

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SAVE_SOLICITACAO':
      return { status: 200 };
    case 'SET_SOLICITACOES':
      setLista(action.payload);
      return { ...state, lista: action.payload };
    case 'RECUSA_SOLICITACAO':
      remove(action.payload.id);
      return { ...state };
    case 'ACEITA_SOLICITACAO':
      remove(action.payload.id);
      return { ...state };
    case 'SET_LISTA_JOGOS':
      return setJogos(state, action.payload);
    case 'SET_ACTIVE_GAME':
      return setGameActive(state, action.payload);
    case 'FINALIZA_GAME':
      return { ...state, activeGame: null };
    case 'SET_SCORES':
      return setGameScores(state, action.payload);
    default:
      return state;
  }
};

export default gameReducer;
