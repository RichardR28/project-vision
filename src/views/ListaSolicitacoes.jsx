import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listaSolicitacoes,
  recusaSolicitacao,
  aceitaSolicitacao,
} from '../actions/GamesAction';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
const moment = require('moment');

export default function ListaSolicitacoes() {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const [solicitacoes, setSolicitacoes] = useState();
  const [expanded, setExpanded] = useState();

  function handleExpanded(id) {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  }

  useEffect(() => {
    listaSolicitacoes(dispatch);
  }, [dispatch]);
  useEffect(() => {
    setSolicitacoes(game.lista);
    console.log(game.lista);
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
      Em Aberto: {solicitacoes?.length || 0}
      {solicitacoes &&
        solicitacoes.length &&
        solicitacoes.map((item) => (
          <Accordion
            key={item.id}
            expanded={item.id === expanded}
            onChange={() => handleExpanded(item.id)}
            style={{
              maxWidth: 1400,
              width: '90%',
              margin: 15,
              borderRadius: 30,
            }}
          >
            <AccordionSummary
              expandIcon={<Icon path={mdiChevronDown} size={1.2} />}
            >
              <div
                className="listaSolicitacao"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  flexWrap: 'wrap',
                }}
              >
                <div>{moment(item.dataSolicitacao).format('DD/MM/YYYY')}</div>
                <div className="secondary">{item.username}</div>
                <div className="secondary">{item.email}</div>
                <div className="secondary">{item.nome}</div>
              </div>
            </AccordionSummary>
            <AccordionDetails>{item.descricao}</AccordionDetails>
            <AccordionActions className="solicitacoesActions">
              <button
                className="accept"
                onClick={() => aceitaSolicitacao(dispatch, item.id)}
              >
                Aceitar
              </button>
              <button
                className="decline"
                onClick={() => recusaSolicitacao(dispatch, item.id)}
              >
                Recusar
              </button>
            </AccordionActions>
          </Accordion>
        ))}
    </div>
  );
}
