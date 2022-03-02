import React, { useState, useEffect } from 'react';
import { host } from '../actions/backendConnection';

import {
  Card,
  CardActions,
  CardContent,
  Modal,
  Paper,
} from '@material-ui/core';
import jogo from '../res/imagens/jogo.png';
import { listaJogosAtivos } from '../actions/GamesAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const moment = require('moment');

export default function ListaJogos() {
  const [lista, setLista] = useState([]);
  const [open, setOpen] = useState(false);
  const [infos, setInfos] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const jogos = useSelector((state) => state.game.jogos);

  useEffect(() => {
    listaJogosAtivos(dispatch);
  }, [dispatch]);
  useEffect(() => {
    setLista(jogos);
  }, [jogos]);

  function closeModal() {
    setOpen(false);
    setInfos({});
  }

  function direcionarAoJogo(id, gameCode) {
    switch (gameCode) {
      case 'game01':
        dispatch({
          type: 'SET_ACTIVE_GAME',
          payload: id,
        });
        history.push('/game01');
        break;
      default:
        break;
    }
  }

  return (
    <div className="listJogos">
      {lista &&
        lista.map((item) => {
          let path = jogo;
          if (item.imagem) {
            path = `${host}/Images/${item.imagem}`;
          }
          return (
            <Card
              key={item.id}
              id={`card_${item.id}`}
              style={{ display: 'none' }}
              className="listJogosItem"
            >
              <div className="cardHeader">{item.titulo}</div>
              <CardContent className="cardContent">
                <img
                  onLoad={() => {
                    document.getElementById(`card_${item.id}`).style.display =
                      'flex';
                  }}
                  src={path}
                  alt="game"
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
                  Jogar
                </button>
              </CardActions>
            </Card>
          );
        })}
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
              Informações do Jogo
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
                  background: 'rgb(219 57 57)',
                  border: 'none',
                  color: 'white',
                  fontWeight: 700,
                }}
              >
                Fechar
              </button>
              <button
                onClick={() => direcionarAoJogo(infos.id, infos.codigo)}
                style={{
                  width: '50%',
                  height: 50,
                  fontSize: 25,
                  background: 'green',
                  border: 'none',
                  color: 'white',
                  fontWeight: 700,
                }}
              >
                Jogar
              </button>
            </div>
          </Paper>
        </div>
      </Modal>
    </div>
  );
}
