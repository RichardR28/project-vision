export const buscaPaises = () => {
  return fetch('http://192.168.100.10:9000/address/getPaises')
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        return data;
      } else {
        alert('Erro ao buscar países.');
      }
    });
};

export const buscaEstados = (id) => {
  return fetch('http://192.168.100.10:9000/address/getEstados', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        return data;
      } else {
        alert('Erro ao buscar estados.');
      }
    });
};

export const buscaCidades = (id) => {
  return fetch('http://192.168.100.10:9000/address/getCidades', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        return data;
      } else {
        alert('Erro ao buscar cidades.');
      }
    });
};
