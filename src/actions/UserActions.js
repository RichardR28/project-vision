export const login = (username, password, dispatch, redirect = null) => {
  fetch('http://192.168.100.10:9000/users/login', {
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
        alert('Usuário não encontrado');
      }
    });
};

export const logout = (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
};

export const verificaEmail = (email) => {
  return fetch('http://192.168.100.10:9000/users/checkEmail', {
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
  fetch('http://192.168.100.10:9000/users/redefineSenha', {
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
        alert('Houve um erro durante o proocesso. Por favor tente novamente.');
      }
    });
};
