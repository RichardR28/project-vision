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
  fetch('http://192.168.100.10:9000/quizzes/savarQuiz', {
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
  fetch('http://192.168.100.10:9000/quizzes/listaQuizzesUsuario', {
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
  fetch('http://192.168.100.10:9000/quizzes/desativaQuiz', {
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
  fetch('http://192.168.100.10:9000/quizzes/ativaQuiz', {
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
