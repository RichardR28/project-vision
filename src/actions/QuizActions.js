export const sarvarQuiz = (body, redirect = null) => {
  const form = new FormData();
  body.forEach((item) => {
    console.log(item);
    form.append('imagem[]', item.imagem, 'teste.png');
  });
  form.append('test', 'ri');
  fetch('http://192.168.100.10:9000/quizzes/savarQuiz', {
    method: 'post',
    body: form,
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.status === 200) {
        redirect.push('/');
      }
    });
};
