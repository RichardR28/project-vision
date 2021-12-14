export const login = (username, password, dispatch) => {
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
      dispatch({
        type: 'LOGIN',
        payload: data,
      });
    });
};

export const getName = () => {
  return {
    type: 'GET_NAME',
  };
};
