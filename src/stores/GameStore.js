const _ = require('lodash');

let INITIAL_STATE = {
  lista: [],
};

function setLista(payload) {
  INITIAL_STATE.lista = payload;
}

function remove(id) {
  _.remove(INITIAL_STATE.lista, {
    id: id,
  });
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
    default:
      return state;
  }
};

export default gameReducer;
