import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listaPontuacoesUsuario } from '../actions/GamesAction';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import { toInteger } from 'lodash';
const moment = require('moment');

export default function MinhasPontuacoes() {
  const [lista, setLista] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const user = useSelector((state) => state.user);
  const pontuacoes = useSelector((state) => state.game.pontuacoes);
  const dispatch = useDispatch();

  useEffect(() => {
    listaPontuacoesUsuario(dispatch, user.id);
  }, [dispatch, user]);

  useEffect(() => {
    setLista(pontuacoes);
  }, [pontuacoes]);

  function handleExpanded(id) {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10,
      }}
    >
      {lista?.length > 0 ? (
        lista.map((item) => {
          return (
            <Accordion
              key={item.id}
              expanded={item.id === expanded}
              onChange={() => handleExpanded(item.id)}
              style={{
                maxWidth: 1400,
                width: '90%',
                margin: 15,
                borderRadius: 30,
                padding: 10,
              }}
            >
              <AccordionSummary
                className="accordion"
                expandIcon={<Icon path={mdiChevronDown} size={1.2} />}
              >
                <div
                  className="listaPontuacoes"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    flexWrap: 'wrap',
                    textAlign: 'center',
                  }}
                >
                  <div className="listaPontuacoesItem">
                    <div className="scoreColumnName">Data</div>
                    <div>
                      {moment(toInteger(item.serie)).format('DD/MM/YYYY')}
                    </div>
                  </div>
                  <div className="listaPontuacoesItem">
                    <div className="scoreColumnName">Título</div>
                    <div>{item.titulo}</div>
                  </div>
                  <div className="listaPontuacoesItem">
                    <div className="scoreColumnName">Pontuação Geral</div>
                    <div
                      style={
                        item.media >= 70 ? { color: 'green' } : { color: 'red' }
                      }
                    >
                      {item.media}%
                    </div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div
                  className="scoreExpandedDecription"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    flexWrap: 'wrap',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    <div className="scoreColumnName">Level 1</div>
                    <div
                      style={
                        item.resultado01 >= 70
                          ? { color: 'green' }
                          : { color: 'red' }
                      }
                    >
                      {item.resultado01}%
                    </div>
                  </div>
                  <div>
                    <div className="scoreColumnName">Level 2</div>
                    <div
                      style={
                        item.resultado02 >= 70
                          ? { color: 'green' }
                          : { color: 'red' }
                      }
                    >
                      {item.resultado02}%
                    </div>
                  </div>
                  <div>
                    <div className="scoreColumnName">Level 3</div>
                    <div
                      style={
                        item.resultado03 >= 70
                          ? { color: 'green' }
                          : { color: 'red' }
                      }
                    >
                      {item.resultado03}%
                    </div>
                  </div>
                </div>
                <div
                  className="scoreExpandedDecription"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    flexWrap: 'wrap',
                    textAlign: 'center',
                    paddingTop: 10,
                  }}
                >
                  <div>
                    <div className="scoreColumnName">Autor</div>
                    <div>{item.nome}</div>
                  </div>
                  <div>
                    <div className="scoreColumnName">Email</div>
                    <div>{item.email}</div>
                  </div>
                  <div>
                    <div className="scoreColumnName">Contato</div>
                    <div>{item.telefone}</div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zoom: 2.0,
            height: '100%',
            width: '100%',
          }}
        >
          Não foi encontrado nenhum quiz criado para o usuário logado ;)
        </div>
      )}
    </div>
  );
}
