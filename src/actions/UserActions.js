import { host } from './backendConnection';

export const login = (username, password, dispatch, redirect = null) => {
  fetch(`${host}/users/login`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((req) => req.json())
    .then((data) => {
      if (data?.length > 0) {
        dispatch({
          type: 'LOGIN',
          payload: data,
        });
        redirect.push('/');
      } else {
        alert('Usuário e/ou senha incorreto(s).');
      }
    });
};

export const logout = (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
};

export const verificaEmail = (email) => {
  return fetch(`${host}/users/checkEmail`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status === 200) {
        alert('Foi enviada uma chave para a ateração para o seu e-mail!');
        return { status: 200, salt: data?.key };
      } else {
        alert('O e-mail informado não foi encontrado.');
        return { status: 500 };
      }
    });
};

export const redefineSenha = (email, senha, redirect = null) => {
  fetch(`${host}/users/redefineSenha`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status === 200) {
        alert('Senha redefinida com sucesso!');
        redirect.push('/login');
      } else if (data?.status === 500) {
        alert(data.msg);
      } else {
        alert('Houve um erro durante o processo. Por favor tente novamente.');
      }
    });
};

export const buscaInformacoesUsuario = (id, email, username) => {
  return fetch(`${host}/users/getUser`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, email, username }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status === 200) {
        return data.result;
      } else {
        alert('Ocorreu um erro ao buscar as informações do usuário.');
      }
    });
};

export const alteraInformacoesUsuario = (
  dispatch,
  id,
  telefone,
  pais,
  estado,
  cidade,
  redirect = null,
) => {
  fetch(`${host}/users/alteraUsuario`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, telefone, pais, estado, cidade }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'ALTERA_USUARIO',
          payload: { telefone, pais, estado, cidade },
        });
        alert('Informações alteradas com sucesso.');
        if (redirect) {
          redirect.push('/');
        }
      } else {
        alert('Ocorreu um erro na operação. Por favor tente novamente.');
      }
    });
};

export const alteraSenha = (id, senha, novaSenha, callback = () => {}) => {
  fetch(`${host}/users/alterarSenha`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, senha, novaSenha }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status === 200) {
        alert(data.msg);
        callback();
      } else if (data?.status === 500) {
        alert(data.msg);
      }
    });
};
