import React, { useState, useEffect } from 'react';
import { AppBar, Tab, Tabs, Paper } from '@material-ui/core';
import { game01 } from '../gamesConfigs/Game01';
import Icon from '@mdi/react';
import { mdiCheckboxMarkedCircleOutline } from '@mdi/js';
import { toInteger } from 'lodash';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registraPontuacao } from '../actions/GamesAction';
const _ = require('lodash');

export default function Game01() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const gameId = useSelector((state) => state.game.activeGame);
  const [activeTab, setActiveTab] = useState('start');
  const [answerCount, setAnswerCount] = useState(0);
  const [answers, setAnswers] = useState({ start: [], middle: [], end: [] });
  const [finish, setFinish] = useState(false);
  const [acertos, setAcertos] = useState({
    start: null,
    middle: null,
    end: null,
  });

  useEffect(() => {
    if (!gameId) {
      history.push('/listaJogos');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e, value) {
    setActiveTab(value);
  }

  function salvarTeste() {
    document.getElementById('teste').style.display = 'none';
    document.getElementById('resultado').style.display = '';
    setFinish(true);
    Object.entries(answers).forEach(([key, item]) => {
      let count = 0;
      item.forEach((resultado) => {
        if (resultado === true) {
          count++;
        }
      });
      acertos[key] = ((count / item.length) * 100).toFixed(0);
    });
    acertos['total'] = (
      (toInteger(acertos.start) +
        toInteger(acertos.middle) +
        toInteger(acertos.end)) /
      3
    ).toFixed(0);
    if (acertos?.total < 70) {
      document.getElementById('totalResult').style.color = 'red';
    }
    setAcertos({ ...acertos });
    registraPontuacao(dispatch, user, gameId, acertos);
  }

  function registraResposta(type) {
    answers[activeTab][answerCount] =
      type === game01[activeTab].levels[answerCount].alterColor;
    if (answerCount < 2) {
      const aux = answerCount + 1;
      setAnswerCount(aux);
    } else {
      if (activeTab === 'start') {
        setActiveTab('middle');
        setAnswerCount(0);
      } else if (activeTab === 'middle') {
        setActiveTab('end');
        setAnswerCount(0);
      } else {
        salvarTeste();
      }
    }
    setAnswers({ ...answers });
  }

  return (
    <>
      <div id="teste" style={{ padding: 30 }}>
        <AppBar
          style={{ background: 'transparent' }}
          position="static"
          elevation={0}
        >
          <Tabs
            value={activeTab}
            indicatorColor="primary"
            onChange={(e, value) => handleChange(e, value)}
            TabIndicatorProps={{
              style: {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Tab
              className="gameLevels"
              disabled={answers['start'].length === 3 || activeTab !== 'start'}
              value="start"
              label="1"
            />
            <Tab
              disabled={
                answers['middle'].length === 3 || activeTab !== 'middle'
              }
              className="gameLevels"
              value="middle"
              label="2"
            />
            <Tab
              disabled={answers['end'].length === 3 || activeTab !== 'end'}
              className="gameLevels"
              value="end"
              label="3"
            />
          </Tabs>
        </AppBar>
        {Object.entries(game01).map(([key, item]) => {
          const paperStyle = {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            padding: 10,
          };

          if (key !== activeTab) {
            paperStyle.display = 'none';
          }

          let squares = [];

          for (let i = 0; i < item.length; i++) {
            if (i === 0) {
              squares.push(item.levels[answerCount].alterColor);
            } else {
              squares.push(item.levels[answerCount].defaultColor);
            }
          }

          squares = _.shuffle(squares);

          return (
            <Paper key={key} style={paperStyle}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                }}
              >
                {squares.map((square, index) => {
                  const size = (90 / item.length) * 2;
                  const buttonStyle = {
                    width: `${size}%`,
                    minWidth: 120,
                    height: 120,
                    background: square,
                    margin: '20px 0px',
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: 30,
                    boxShadow: 'rgb(66 66 66 / 32%) 2px 3px',
                  };
                  if (finish) {
                    buttonStyle.cursor = 'not-allowed';
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => registraResposta(square)}
                      disabled={finish}
                      style={buttonStyle}
                    />
                  );
                })}
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-around',
                }}
              >
                <button
                  onClick={() => history.push('/listaJogos')}
                  style={{
                    width: '40%',
                    background: '#c13535',
                    height: 50,
                    color: 'white',
                    fontSize: 22,
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 30,
                  }}
                >
                  Voltar
                </button>
                <button
                  onClick={() => registraResposta(false)}
                  style={{
                    width: '40%',
                    background: '#5a5ac7fa',
                    height: 50,
                    color: 'white',
                    fontSize: 22,
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 30,
                  }}
                >
                  Pular
                </button>
              </div>
            </Paper>
          );
        })}
      </div>
      <div id="resultado" style={{ padding: 30, display: 'none' }}>
        <Paper
          style={{
            borderRadius: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'green',
            padding: 30,
          }}
        >
          <Icon
            style={{ color: 'green', background: 'transprent', maxWidth: 330 }}
            title="Fazer Login"
            path={mdiCheckboxMarkedCircleOutline}
            size={'145%'}
          />

          <div style={{ fontSize: 54, fontWeight: 700 }}>Completo!</div>
          <div
            className="pontuacaoGame"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginTop: 15,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div className="label">Level 1:</div>
              <div className="value">{acertos.start}%</div>
            </div>
            <div>
              <div className="label">Level 2:</div>
              <div className="value">{acertos.middle}%</div>
            </div>
            <div>
              <div className="label">Level 3:</div>
              <div className="value">{acertos.end}%</div>
            </div>
          </div>
          <div
            id="totalResult"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 15,
              fontSize: 38,
            }}
          >
            <div style={{ fontWeight: 700 }}>Resultado Geral:</div>
            <div style={{ marginLeft: 10 }}>{acertos.total}%</div>
          </div>
        </Paper>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => history.push('/listaJogos')}
            style={{
              borderRadius: 30,
              border: 'none',
              height: 45,
              width: '45%',
              fontSize: 24,
              fontWeight: 500,
              background: '#c13535',
              color: 'white',
              minWidth: 333,
              marginTop: 15,
            }}
          >
            Lista de Jogos
          </button>
          <button
            onClick={() => history.push('/pontuacoes')}
            style={{
              borderRadius: 30,
              border: 'none',
              height: 45,
              width: '45%',
              fontSize: 24,
              fontWeight: 500,
              background: '#5a5ac7fa',
              color: 'white',
              minWidth: 333,
              marginTop: 15,
            }}
          >
            Verificar Pontuações
          </button>
        </div>
      </div>
    </>
  );
}
