let INITIAL_STATE = {
  name: '',
  email: '',
  dataNascimeto: '',
  username: '',
  telefone: '',
};

function setName(name) {
  return { ...INITIAL_STATE, name: name };
}

function login(data) {
  const user = data[0];
  INITIAL_STATE.name = user.nome;
  INITIAL_STATE.email = user.email;
  INITIAL_STATE.username = user.username;
  INITIAL_STATE.dataNascimeto = user.dataNascimento;
  INITIAL_STATE.telefone = user.telefone;
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      login(action.payload);
      return {};
    case 'GET_STATE':
      return state;
    case 'SET_NAME':
      return setName(action.payload);
    default:
      return state;
  }
};

export default userReducer;
