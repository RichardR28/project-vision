import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listaSolicitacoesUsuario } from '../actions/GamesAction';
import { Paper } from '@material-ui/core';
const moment = require('moment');

export default function MinhasSolicitacoes() {
  const game = useSelector((state) => state.game);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [solicitacoes, setSolicitacoes] = useState();

  useEffect(() => {
    listaSolicitacoesUsuario(dispatch, user.id);
  }, [dispatch, user.id]);
  useEffect(() => {
    setSolicitacoes(game.lista);
  }, [game]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10,
      }}
    >
      {solicitacoes &&
        solicitacoes.length &&
        solicitacoes.map((item) => {
          let status = 'Aguardando Resposta';
          const auxStyle = {};
          if (item.retorno === 1) {
            status = 'Aprovado';
            auxStyle['color'] = '#56a056';
          } else if (item.retorno === 2) {
            status = 'Recusado';
            auxStyle['color'] = 'red';
          }
          return (
            <Paper
              style={{
                maxWidth: 1400,
                width: '90%',
                margin: 15,
                borderRadius: 30,
                minHeight: 52,
                padding: 10,
              }}
            >
              <div
                className="row"
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 52,
                }}
              >
                <div className="col-md-2">
                  {moment(item.dataSolicitacao).format('DD/MM/YYYY')}
                </div>
                <div className="col-md-2 secondary">{item.username}</div>
                <div className="col-md-3 secondary">{item.email}</div>
                <div className="col-md-3 secondary">{item.nome}</div>
                <div
                  className={
                    item.retorno === 0 ? 'col-md-2 secondary' : 'col-md-2'
                  }
                  style={auxStyle}
                >
                  {status}
                </div>
              </div>
            </Paper>
          );
        })}
    </div>
  );
}
