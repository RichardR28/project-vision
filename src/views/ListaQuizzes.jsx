import React, { useState, useEffect } from 'react';

import {
  Card,
  CardActions,
  CardContent,
  Modal,
  Paper,
} from '@material-ui/core';
import quiz from '../res/imagens/quiz.png';
import { useSelector } from 'react-redux';
import { listaQuizzes, realizarQuiz } from '../actions/QuizActions';
import { useDispatch } from 'react-redux';
import { host } from '../actions/backendConnection';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
export default function ListaQuizzes() {
  const list = useSelector((state) => state.quiz?.lista);
  const [infos, setInfos] = useState({});
  const [quizzes, setQuizes] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  function iniciarTeste(id) {
    realizarQuiz(dispatch, id, history);
  }

  useEffect(() => {
    listaQuizzes(dispatch);
  }, [dispatch]);

  useEffect(() => {
    criaCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  async function criaCards() {
    if (list?.length > 0) {
      const auxQuizzes = await list.map((item, index) => {
        let path = quiz;
        if (item.imagem) {
          path = `${host}/Images/${item.imagem}`;
        }
        return (
          <Card
            id={`card${index}`}
            key={item.id}
            style={{ display: 'none' }}
            className="listQuizzesItem"
          >
            <div className="cardHeader">{item.titulo}</div>
            <CardContent className="cardContent">
              <img
                onLoad={() => {
                  document.getElementById(`card${index}`).style.display =
                    'flex';
                }}
                src={path}
                alt="quizz"
              />
            </CardContent>
            <CardActions className="cardActions">
              <button
                className="play"
                onClick={() => {
                  setInfos(item);
                  setOpen(true);
                }}
              >
                Fazer
              </button>
            </CardActions>
          </Card>
        );
      });
      setQuizes(auxQuizzes);
    }
  }

  function closeModal() {
    setOpen(false);
    setInfos({});
  }

  return (
    <div className="listQuizzes">
      {quizzes}
      <div>
        <Modal
          open={open}
          style={{ overflow: 'scroll', paddingBottom: 20 }}
          onClose={() => closeModal()}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 80,
            }}
          >
            <Paper
              style={{
                width: '90%',
                maxWidth: 700,
                minWidth: 300,
                maxHeight: '90%',
                borderRadius: 15,
                overflow: 'hidden',
              }}
              elevation={5}
            >
              <div
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  padding: 10,
                  fontWeight: 600,
                  color: 'rgb(89 72 122)',
                }}
              >
                Informações do Quiz
              </div>
              <hr style={{ margin: 0 }} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: 10,
                  flexWrap: 'wrap',
                }}
              >
                <div className="modalInfos">
                  <div className="modalInfoTitle">Título</div>
                  <div>{infos.titulo}</div>
                </div>
                <div className="modalInfos">
                  <div className="modalInfoTitle">Data de Criação</div>
                  <div>
                    {infos.dataCriacao
                      ? moment(infos.dataCriacao).format('DD/MM/YYYY')
                      : ''}
                  </div>
                </div>
              </div>
              <hr style={{ margin: 0 }} />
              <div style={{ padding: 10 }}>
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 500,
                    color: 'rgb(89 72 122)',
                  }}
                >
                  Descrição
                </div>
                <div
                  style={{
                    fontSize: 22,
                    width: 'inherit',
                    textIndent: '1em',
                    padding: 10,
                  }}
                >
                  {infos.descricao}
                </div>
              </div>
              <hr style={{ margin: 0 }} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: 10,
                  flexWrap: 'wrap',
                }}
              >
                <div className="modalInfos">
                  <div className="modalInfoTitle">Nome Criador</div>
                  <div>{infos.nome}</div>
                </div>
                <div className="modalInfos">
                  <div className="modalInfoTitle">Email</div>
                  <div>{infos.email}</div>
                </div>
                <div className="modalInfos">
                  <div className="modalInfoTitle">Contato</div>
                  <div>{infos.telefone}</div>
                </div>
                <div className="modalInfos">
                  <div className="modalInfoTitle">Acessos</div>
                  <div>{infos.acessos}</div>
                </div>
              </div>
              <div className="modalButtons">
                <button
                  onClick={() => closeModal()}
                  style={{
                    width: '50%',
                    height: 50,
                    fontSize: 25,
                    background: '#c13535',
                    border: 'none',
                    color: 'white',
                    fontWeight: 700,
                  }}
                >
                  Fechar
                </button>
                <button
                  style={{
                    width: '50%',
                    height: 50,
                    fontSize: 25,
                    background: 'green',
                    border: 'none',
                    color: 'white',
                    fontWeight: 700,
                  }}
                  className="play"
                  onClick={() => iniciarTeste(infos.id)}
                >
                  Fazer
                </button>
              </div>
            </Paper>
          </div>
        </Modal>
      </div>
    </div>
  );
}
