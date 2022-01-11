const historyUser = localStorage.getItem('loggedUser')
  ? JSON.parse(localStorage.getItem('loggedUser'))
  : null;

let INITIAL_STATE = {
  id: historyUser?.id || '',
  name: historyUser?.name || '',
  email: historyUser?.email || '',
  dataNascimeto: historyUser?.dataNascimeto || '',
  username: historyUser?.username || '',
  telefone: historyUser?.telefone || '',
  creator: historyUser?.creator || '',
};

function setName(name) {
  return { ...INITIAL_STATE, name: name };
}

function login(data) {
  const user = data[0];
  INITIAL_STATE.id = user.id;
  INITIAL_STATE.name = user.nome;
  INITIAL_STATE.email = user.email;
  INITIAL_STATE.username = user.username;
  INITIAL_STATE.dataNascimeto = user.dataNascimento;
  INITIAL_STATE.telefone = user.telefone;
  INITIAL_STATE.creator = user.creator;
  localStorage.setItem('loggedUser', JSON.stringify(INITIAL_STATE));
}

function logout() {
  INITIAL_STATE.id = '';
  INITIAL_STATE.name = '';
  INITIAL_STATE.email = '';
  INITIAL_STATE.username = '';
  INITIAL_STATE.dataNascimeto = '';
  INITIAL_STATE.telefone = '';
  INITIAL_STATE.creator = '';
  localStorage.removeItem('loggedUser');
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
    case 'LOGOUT':
      logout();
      return state;
    default:
      return state;
  }
};

export default userReducer;
