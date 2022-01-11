let INITIAL_STATE = {
  lista: [],
};

function setLista(payload) {
  debugger;
  INITIAL_STATE.lista = payload;
}

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SAVE_SOLICITACAO':
      return { status: 200 };
    case 'SET_SOLICITACOES':
      setLista(action.payload);
      return { ...state, lista: action.payload };
    default:
      return state;
  }
};

export default gameReducer;
