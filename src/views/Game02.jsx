import React, { useEffect, useState } from 'react';
import { AppBar, Tabs, Tab, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { mdiCheckboxMarkedCircleOutline } from '@mdi/js';
import { game02 } from '../gamesConfigs/Game02';
import { registraPontuacao } from '../actions/GamesAction';
import { toInteger } from 'lodash';
const _ = require('lodash');

export default function Game02() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const gameId = useSelector((state) => state.game.activeGame);
  const [activeTab, setActiveTab] = useState('start');
  const [answerCount, setAnswerCount] = useState(0);
  const [divisor, setDivisor] = useState(window.screen.width / 400);
  const [answers, setAnswers] = useState({ start: [], middle: [], end: [] });
  const [acertos, setAcertos] = useState({
    start: null,
    middle: null,
    end: null,
  });

  function calculation() {
    let value = window.screen.width / 400;
    // 2.4225
    value = value < 2 ? value : 2;
    setDivisor(value);
  }

  useEffect(() => {
    if (!gameId) {
      history.push('/listaJogos');
    }
    calculation();
    window.addEventListener('resize', calculation());
  }, [gameId, history]);

  function handleChange(e, value) {
    setActiveTab(value);
  }

  function unselectAll() {
    const selecionados = document.getElementsByClassName('circleSelected');
    Object.values(selecionados).forEach((sel) => {
      sel.className = '';
    });
  }

  function salvarTeste() {
    document.getElementById('teste').style.display = 'none';
    document.getElementById('resultado').style.display = '';
    acertos.start = toInteger((acertos.start / 12) * 100);
    acertos.middle = toInteger((acertos.middle / 9) * 100);
    acertos.end = toInteger((acertos.end / 6) * 100);
    acertos.total = toInteger(
      (acertos.start + acertos.middle + acertos.end) / 3,
    );
    setAcertos({ ...acertos });
    registraPontuacao(dispatch, user, gameId, acertos);
  }

  function registraResposta() {
    let successCount = 0;
    const list = document.getElementsByName('circle');
    list.forEach((item) => {
      if (
        item.className === 'circleSelected' &&
        item.style.background === game02[activeTab].levels[0].alterColor
      ) {
        successCount++;
      } else if (
        item.className === 'circleSelected' &&
        item.style.background === game02[activeTab].levels[0].defaultColor
      ) {
        if (successCount !== 0) {
          successCount--;
        }
      }
    });

    acertos[activeTab] += successCount;
    setAcertos({ ...acertos });
    unselectAll();
    console.log(successCount);

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
      <div
        id="teste"
        style={{ padding: 30, display: 'flex', justifyContent: 'center' }}
      >
        <AppBar
          style={{ background: 'transparent', maxWidth: 885 }}
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
          {Object.entries(game02).map(([key, item], index) => {
            const paperStyle = {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              padding: 20,
              maxWidth: 885,
            };
            if (key !== activeTab) {
              paperStyle.display = 'none';
            }

            let circles = [];
            const trueColor = item.levels[answerCount].alterColor;

            for (let i = 0; i < item.length; i++) {
              if (i < 4 - index) {
                circles.push(item.levels[answerCount].alterColor);
              } else {
                circles.push(item.levels[answerCount].defaultColor);
              }
            }

            circles = _.shuffle(circles);

            return (
              <Paper key={key} style={paperStyle}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}
                ></div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {circles.map((color, index) => {
                    let space = '';
                    if (index >= 0 && index <= 3) {
                      space = '25%';
                    } else if (index >= 4 && index <= 6) {
                      space = '25%';
                    } else if (index >= 7 && index <= 8) {
                      space = '26%';
                    } else {
                      space = '100%';
                    }

                    return (
                      <div
                        key={`${activeTab}_${index}`}
                        style={{
                          width: space,
                          display: 'flex',
                          justifyContent: 'center',
                          paddingTop: 15,
                          flexWrap: 'wrap',
                        }}
                      >
                        <button
                          id={`circle_${activeTab}_${index}`}
                          name="circle"
                          onClick={(e) => {
                            e.currentTarget.className =
                              e.currentTarget.className === 'circleSelected'
                                ? ''
                                : 'circleSelected';
                          }}
                          style={{
                            width: 40,
                            height: 40,
                            zoom: divisor,
                            borderRadius: 50,
                            background: color,
                            border: 'none',
                          }}
                        ></button>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 25,
                  }}
                >
                  <button
                    onClick={() => registraResposta()}
                    style={{
                      width: '80%',
                      maxWidth: 845,
                      background: '#5a5ac7fa',
                      minHeight: 50,
                      color: 'white',
                      fontSize: 22,
                      fontWeight: 700,
                      border: 'none',
                      borderRadius: 30,
                    }}
                  >
                    Adicionar ao copo
                  </button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 25,
                  }}
                >
                  <button
                    onClick={() => registraResposta()}
                    style={{ border: 'none', background: 'transparent' }}
                  >
                    <div
                      style={{
                        borderTop: '35px solid #dee2e6',
                        borderBottom: '50px solid #dee2e6',
                        borderLeft: '0px solid transparent',
                        borderRight: '0px solid transparent',
                        width: 250,
                        background: 'transparent',
                      }}
                    ></div>
                    <div
                      style={{
                        borderTop: `170px solid ${trueColor}`,
                        borderLeft: '50px solid transparent',
                        borderRight: '50px solid transparent',
                        borderBottom: '0px solid transparent',
                        width: 250,
                        background: 'transparent',
                      }}
                    ></div>
                  </button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-around',
                    paddingTop: 20,
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
                    onClick={() => registraResposta()}
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
        </AppBar>
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
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>Resultado Geral</div>
              <div style={{ marginLeft: 10 }}>{acertos.total}%</div>
            </div>
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
