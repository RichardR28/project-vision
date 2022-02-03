const historyUser = localStorage.getItem('loggedUser')
  ? JSON.parse(localStorage.getItem('loggedUser'))
  : null;

let INITIAL_STATE = {
  id: historyUser?.id || '',
  name: historyUser?.name || '',
  email: historyUser?.email || '',
  dataNascimento: historyUser?.dataNascimento || '',
  username: historyUser?.username || '',
  telefone: historyUser?.telefone || '',
  creator: historyUser?.creator || '',
};

function login(state, data) {
  const user = data[0];
  const userObj = {
    ...state,
    id: user.id,
    name: user.nome,
    email: user.email,
    username: user.username,
    dataNascimento: user.dataNascimento,
    telefone: user.telefone,
    creator: user.creator,
  };
  localStorage.setItem('loggedUser', JSON.stringify(userObj));
  return userObj;
}

function logout(state) {
  localStorage.removeItem('loggedUser');
  return {
    ...state,
    id: '',
    name: '',
    email: '',
    username: '',
    dataNascimento: '',
    telefone: '',
    creator: '',
  };
}

function alteraUsuario(state, payload) {
  const newInfos = { ...state, telefone: payload.telefone };
  return newInfos;
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return login(state, action.payload);
    case 'GET_STATE':
      return state;
    case 'LOGOUT':
      return logout(state);
    case 'ALTERA_USUARIO':
      return alteraUsuario(state, action.payload);
    default:
      return state;
  }
};

export default userReducer;
