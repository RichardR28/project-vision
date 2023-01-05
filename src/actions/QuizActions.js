import { host } from './backendConnection';
export const sarvarQuiz = (
  user,
  titulo,
  descricao,
  logo,
  perguntas,
  redirect = null,
) => {
  const form = new FormData();
  form.append('titulo', titulo);
  form.append('descricao', descricao);
  form.append('logo', logo, '-logoPergunta.png');
  form.append('id', user.id);
  perguntas.forEach((item, index) => {
    if (item.imagem) {
      form.append('imagem[]', item.imagem, `-${index}-imagemPergunta.png`);
    }
  });
  form.append('perguntas', JSON.stringify(perguntas));
  fetch(`${host}/quizzes/savarQuiz`, {
    method: 'post',
    body: form,
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        redirect.push('/meusQuizzes');
      }
    });
};

export const listaQuizesUsuario = (dispatch, id) => {
  fetch(`${host}/quizzes/listaQuizzesUsuario`, {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'SET_QUIZZES',
          payload: data.result,
        });
      } else {
        alert('Ocorreu um erro durante o processo.');
      }
    });
};

export const desativaQuiz = (dispatch, id) => {
  fetch(`${host}/quizzes/desativaQuiz`, {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'DESATIVA_QUIZ',
          payload: { id },
        });
      } else {
        alert('Ocorreu um erro durante o processo. Por favor tente novamente.');
      }
    });
};

export const ativaQuiz = (dispatch, id) => {
  fetch(`${host}/quizzes/ativaQuiz`, {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'ATIVA_QUIZ',
          payload: { id },
        });
      } else {
        alert('Ocorreu um erro durante o processo. Por favor tente novamente.');
      }
    });
};

export const listaQuizzes = (dispatch) => {
  fetch(`${host}/quizzes/listaQuizzes`, {
    method: 'get',
    headers: { 'Content-type': 'application/json' },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'SET_QUIZZES',
          payload: data.result,
        });
      } else {
        alert('Ocorreu um erro durante o processo. Por favor tente novamente.');
      }
    });
};

export const realizarQuiz = (dispatch, id, redirect) => {
  dispatch({
    type: 'SELECIONA_QUIZ',
    payload: { id },
  });
  redirect.push('/responderQuiz');
};

export const buscaTeste = (dispatch, id, redirect) => {
  fetch(`${host}/quizzes/buscaTeste`, {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'SET_LISTA_PERGUNTAS',
          payload: data.result,
        });
      } else {
        alert('Não foi possivel Encontrar o teste. Por favor tente novamente.');
        redirect.push('/listaQuizzes');
      }
    });
};

export const concluirTeste = (
  dispatch,
  userId,
  quizId,
  respostas,
  redirect,
) => {
  fetch(`${host}/quizzes/salvarRespostas`, {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ quizId, userId, respostas }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        alert(
          'Teste finalizado com sucesso!. Verifique o resultado na página "Meus Resultados".',
        );
        dispatch({
          type: 'TESTE_CONCLUIDO',
        });
        redirect.push('/resultados');
      } else {
        alert('Ocorreu um erro durante o processo. Por favor tente novamente.');
      }
    });
};

export const buscaResultados = (dispatch, id) => {
  fetch(`${host}/quizzes/buscarResultados`, {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ userId: id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        dispatch({
          type: 'SET_QUIZZES_RESULTS',
          payload: data.result,
        });
      } else {
        alert('Ocorreu um erro durante o processo. Por favor tente novamente.');
      }
    });
};
