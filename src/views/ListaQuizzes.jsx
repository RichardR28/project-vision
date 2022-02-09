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
import { listaQuizzes } from '../actions/QuizActions';
import { useDispatch } from 'react-redux';
import { host } from '../actions/backendConnection';
import moment from 'moment';
export default function ListaQuizzes() {
  const list = useSelector((state) => state.quiz?.lista);
  const [infos, setInfos] = useState({});
  const [quizzes, setQuizes] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function loaderStart() {
    document.getElementById('loader').style.display = '';
  }

  function loaderStop() {
    document.getElementById('loader').style.display = 'none';
  }

  useEffect(() => {
    loaderStart();
    listaQuizzes(dispatch);
  }, [dispatch]);

  useEffect(() => {
    criaCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  let count = 0;

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
                  count++;
                  if (count === list.length) {
                    loaderStop();
                  }
                  document.getElementById(`card${index}`).style.display =
                    'flex';
                }}
                src={path}
                alt="quizz"
              />
            </CardContent>
            <CardActions className="cardActions">
              <button className="play">Fazer</button>
              <button
                className="info"
                onClick={() => {
                  setInfos(item);
                  setOpen(true);
                }}
              >
                Informação
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
          onClose={() => closeModal()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="simpleModal">
            <Paper className="modalPaper" elevation={5}>
              <div className="modalTitle">Informaçõs do Quiz</div>
              <div className="modalBody">
                <div className="modalInfos row" style={{ margin: 0 }}>
                  <div className="col-xs-12 col-md-6 row">
                    <div className="col-xs-12 col-md-5 label">Título:</div>
                    <div className="col-xs-12 col-md-7 value">
                      {infos.titulo}
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-6 row">
                    <div className="col-xs-12 col-md-5 label">
                      Data de Criação:
                    </div>
                    <div className="col-xs-12 col-md-7 value">
                      {infos.dataCriacao
                        ? moment(infos.dataCriacao).format('DD/MM/YYYY')
                        : ''}
                    </div>
                  </div>
                </div>
                <div style={{ padding: '20px 50px' }}>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}
                  >
                    Descrição
                  </div>
                  <hr />
                  <div>{infos.descricao}</div>
                  <hr />
                </div>
                <div className="modalInfos row" style={{ margin: 0 }}>
                  <div className="col-xs-12 col-md-6 row">
                    <div className="col-xs-12 col-md-5 label">
                      Nome Criador:
                    </div>
                    <div className="col-xs-12 col-md-7 value">{infos.nome}</div>
                  </div>
                  <div className="col-xs-12 col-md-6 row">
                    <div className="col-xs-12 col-md-5 label">
                      Email de Contato:
                    </div>
                    <div className="col-xs-12 col-md-7 value">
                      {infos.email}
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-6 row">
                    <div className="col-xs-12 col-md-5 label">Contato:</div>
                    <div className="col-xs-12 col-md-7 value">
                      {infos.telefone}
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-6 row">
                    <div className="col-xs-12 col-md-5 label">Acessos:</div>
                    <div className="col-xs-12 col-md-7 value">
                      {infos.acessos}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modalButtons">
                <button
                  onClick={() => closeModal()}
                  style={{
                    width: '100%',
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
              </div>
            </Paper>
          </div>
        </Modal>
      </div>
    </div>
  );
}
