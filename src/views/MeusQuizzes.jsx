import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listaQuizesUsuario,
  desativaQuiz,
  ativaQuiz,
} from '../actions/QuizActions';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
const moment = require('moment');

export default function MeusQuizzes() {
  const quiz = useSelector((state) => state.quiz);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [quizzes, setQuizzes] = useState();
  const [expanded, setExpanded] = useState();

  function handleExpanded(id) {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  }

  useEffect(() => {
    listaQuizesUsuario(dispatch, user.id);
  }, [dispatch, user.id]);
  useEffect(() => {
    setQuizzes(quiz.lista);
  }, [quiz]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10,
        height: '90%',
      }}
    >
      {quizzes?.length > 0 ? (
        quizzes.map((item) => {
          let status = '';
          const auxStyle = {};
          if (item.status === 1) {
            status = 'Ativo';
            auxStyle['color'] = '#56a056';
          } else if (item.status === 0) {
            status = 'Inativo';
            auxStyle['color'] = 'red';
          }
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
              }}
            >
              <AccordionSummary
                className="accordion"
                style={{ display: 'flex', flexDirection: 'column' }}
                expandIcon={<Icon path={mdiChevronDown} size={1.2} />}
              >
                <div
                  className="listaSolicitacao"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    flexWrap: 'wrap',
                    textAlign: 'center',
                  }}
                >
                  <div className="listaQuizzesItem">
                    <div className="quizzesManagementColumn">Título</div>
                    <div>{item.titulo}</div>
                  </div>
                  <div className="listaQuizzesItem">
                    <div className="quizzesManagementColumn">
                      Data de Criação
                    </div>
                    <div>
                      {moment(item.dataSolicitacao).format('DD/MM/YYYY')}
                    </div>
                  </div>
                  <div className="listaQuizzesItem">
                    <div className="quizzesManagementColumn">Acessos</div>
                    <div className="secondary">{item.acessos}</div>
                  </div>
                  <div className="listaQuizzesItem">
                    <div className="quizzesManagementColumn">Status</div>
                    <div>{status}</div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>{item.descricao}</AccordionDetails>
              <AccordionActions className="solicitacoesActions">
                <button
                  className="accept"
                  onClick={() => ativaQuiz(dispatch, item.id)}
                >
                  Ativar
                </button>
                <button
                  className="decline"
                  onClick={() => desativaQuiz(dispatch, item.id)}
                >
                  Desativar
                </button>
              </AccordionActions>
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
