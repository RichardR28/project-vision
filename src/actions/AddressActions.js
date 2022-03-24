import { host } from './backendConnection';

export const buscaPaises = () => {
  return fetch(`${host}/address/getPaises`)
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
  return fetch(`${host}/address/getEstados`, {
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
  return fetch(`${host}/address/getCidades`, {
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
