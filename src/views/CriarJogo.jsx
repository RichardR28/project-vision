import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { saveSolicitacao } from '../actions/GamesAction';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

export default function CriarJogo() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [descricao, setDescricao] = useState('');

  function salvaSolicitacao() {
    const dataSolicitacao = moment().format('YYYY-MM-DD');
    const body = { id: user.id, descricao, dataSolicitacao };
    saveSolicitacao(body, dispatch, history);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 20,
          fontSize: 22,
          margin: 20,
        }}
      >
        <div>
          Por favor descreva o jogo de maneira direta focando em evidenciar o
          objetivo, funcionamento e método de avaliação, para que possamos
          responder da melhor forma possível!
        </div>
        <div style={{ padding: '10px 0 0 0', width: '100%' }}>
          <textarea
            style={{ width: '100%' }}
            maxLength={2000}
            rows={15}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
          <li style={{ float: 'right' }}>
            O número máximo é de 2000 caracteres.
          </li>
        </div>
        <button className="saveGameCreate" onClick={() => salvaSolicitacao()}>
          Enviar Solicitação
        </button>
      </Paper>
    </div>
  );
}
