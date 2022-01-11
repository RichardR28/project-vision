export const saveSolicitacao = (body, dispatch, redirect = null) => {
  fetch('http://192.168.100.10:9000/games/saveSolicitacoes', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({
        type: 'SAVE_SOLICITACAO',
        payload: data,
      });
      if (data?.status === 200) {
        alert('Solicitação enviada com sucesso!');
        redirect.push('/');
      } else {
        alert('Houve um erro durante a operação, por favor tente novamnte!');
      }
    });
};

export const listaSolicitacoes = (dispatch, redirect = null) => {
  fetch('http://192.168.100.10:9000/games/getSolicitacoes', {
    method: 'get',
  })
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({
        type: 'SET_SOLICITACOES',
        payload: data,
      });
    });
};
