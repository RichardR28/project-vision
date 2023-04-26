import { host } from './backendConnection';

export const saveSolicitacao = (body, dispatch, redirect = null) => {
  fetch(`${host}/games/saveSolicitacoes`, {
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
        redirect.push('/minhasSolicitacoes');
      } else {
        alert('Houve um erro durante a operação, por favor tente novamente!');
      }
    });
};

export const listaSolicitacoes = (dispatch, redirect = null) => {
  fetch(`${host}/games/getSolicitacoes`, {
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

export const recusaSolicitacao = (dispatch, id, redirect = null) => {
  fetch(`${host}/games/declineSolicitation`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'RECUSA_SOLICITACAO',
          payload: { id },
        });
        alert('Solicitação respondida com sucesso!');
      } else {
        alert('Ocorreu um erro durante a operação. Por favor tente novamente!');
      }
    });
};

export const aceitaSolicitacao = (dispatch, id, redirect = null) => {
  fetch(`${host}/games/acceptSolicitation`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'ACEITA_SOLICITACAO',
          payload: { id },
        });
        alert('Solicitaçãoo respondida com sucesso!');
      } else {
        alert('Ocorreu um erro durante a operação. Por favor tente novamente!');
      }
    });
};

export const listaSolicitacoesUsuario = (dispatch, id) => {
  fetch(`${host}/games/getSolicitacoesUsuarios`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({
        type: 'SET_SOLICITACOES',
        payload: data,
      });
    });
};

export const registraPontuacao = (dispatch, user, gameId, pontuacao, executorName) => {
  fetch(`${host}/games/registraPontuacao`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      userId: user.id,
      gameId,
      resultado01: pontuacao.start,
      resultado02: pontuacao.middle,
      resultado03: pontuacao.end,
      media: pontuacao.total,
      executor: executorName,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'FINALIZA_GAME',
        });
        alert('Pontuação registrada com sucesso!');
      } else {
        alert('Ocorreu um erro durante a operação. Por favor tente novamente!');
      }
    });
};

export const listaJogosAtivos = (dispatch) => {
  fetch(`${host}/games/listaJogosAtivos`)
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'SET_LISTA_JOGOS',
          payload: data.result,
        });
      } else {
        alert('Ocorreu um erro durante a operação. Por favor tente novamente!');
      }
    });
};

export const listaPontuacoesUsuario = (dispatch, id) => {
  fetch(`${host}/games/listaPontuacoesUsuario`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'SET_SCORES',
          payload: data.result,
        });
      } else {
        alert('Ocorreu um erro durante a operação. Por favor tente novamente!');
      }
    });
};
