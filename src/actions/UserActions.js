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
