import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { buscaTeste, concluirTeste } from '../actions/QuizActions';
import { host } from '../actions/backendConnection';
import { CustomField } from '../components';
import {
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

export default function FazerQuiz() {
  const quiz = useSelector((state) => state.quiz);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [respostas, setRespostas] = useState({});
  const [executorName, setExecutorName] = useState('');

  useEffect(() => {
    if (quiz.activeQuiz) {
      buscaTeste(dispatch, quiz.activeQuiz, history);
    } else {
      history.push('/listaQuizzes');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChangeAnswer(id, value) {
    if (respostas[id]) {
      respostas[id].value = value;
    } else {
      respostas[id] = { perguntaId: id, value: value };
    }
    setRespostas({ ...respostas });
  }

  function validaTeste() {
    let response = true;
    if (Object.keys(respostas).length !== quiz.perguntas.length) {
      response = false;
    }

    Object.values(respostas).forEach((item) => {
      if (!item.value) {
        response = false;
      }
    });
    return response;
  }

  function finalizarTeste(hasExecutorName) {
    if (validaTeste()) {
      concluirTeste(dispatch, user.id, quiz.activeQuiz, respostas, hasExecutorName ? executorName : null, history);
    } else {
      alert('Por favor responda todas as perguntas.');
    }
  }
  const buttonsStyle = {};

  function verificaNomeExecutor() {
    document.getElementById('teste').style.display = 'none';
    document.getElementById('executor').style.display = 'flex';
  }

  return (
    <>
      <div
        id="teste"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {quiz.perguntas?.length > 0 &&
          quiz.perguntas.map((item, index) => {
            let img = item.imagem ? `${host}/Images/${item.imagem}` : null;
            const paperStyle = {
              maxWidth: 1000,
              width: '90%',
              margin: 15,
              borderRadius: 15,
            };
            if (img) {
              paperStyle['display'] = 'none';
              buttonsStyle['display'] = 'none';
            }
            return (
              <Paper
                id={`paper_${index}`}
                key={`paper_${index}`}
                className="viewPerguntas"
                elevation={5}
                style={paperStyle}
              >
                <div className="item">{item.pergunta}</div>
                {img && (
                  <div className="item imagem">
                    <img
                      onLoad={() => {
                        document.getElementById(`paper_${index}`).style.display =
                          '';
                        document.getElementById('saveAnswerQuiz').style.display =
                          '';
                      }}
                      src={img}
                      height={200}
                      style={{ borderRadius: 30 }}
                      alt="perg"
                    />
                  </div>
                )}
                {item.tipoResposta === 0 ? (
                  <div className="item">
                    <CustomField
                      value={respostas[item.id] ? respostas[item.id].value : ''}
                      onChange={(e) => handleChangeAnswer(item.id, e)}
                      label="Resposta"
                      maxLength={10}
                    />
                  </div>
                ) : (
                  <div className="item">
                    <FormControl>
                      <FormLabel>Opções:</FormLabel>
                      <RadioGroup
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        value={respostas[item.id] ? respostas[item.id].value : ''}
                        onChange={(e) =>
                          handleChangeAnswer(item.id, e.target.value)
                        }
                      >
                        <div className="opcoesRespostaQuiz">
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label={item.opcao1}
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label={item.opcao2}
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label={item.opcao3}
                          />
                          <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label={item.opcao4}
                          />
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}
              </Paper>
            );
          })}
        <div
          id="saveAnswerQuiz"
          className="botoesSalvarTeste"
          style={buttonsStyle}
        >
          <button
            className="cancel"
            onClick={() => history.push('/listaQuizzes')}
          >
            Voltar
          </button>
          <button className="save" onClick={() => verificaNomeExecutor()}>
            Finalizar
          </button>
        </div>
      </div>
      <div id="executor" style={{ padding: 30, display: 'none', justifyContent: 'center' }}>
      <Paper
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 30
          }}
        >
          <CustomField
              label="Caso queira informar um nome para a pessoa que concluiu o teste, insira abaixo"
              placeholder="Exemplo: Ana -> 5 ano"
              name="nome"
              id="nome"
              onChange={(e) => setExecutorName(e)}
              value={executorName}
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button 
                style={{
                  background: '#5a5ac7fa',
                  color: 'white',
                  border: 'none',
                  borderRadius: 30,
                  padding: '5px 15px',
                  marginTop: 15,
                }} 
                onClick={() => finalizarTeste(false)}
              >
                Não informar
              </button>
              <button
                style={{
                  background: '#5a5ac7fa',
                  color: 'white',
                  border: 'none',
                  borderRadius: 30,
                  padding: '5px 15px',
                  marginTop: 15,
                }} 
                onClick={() => finalizarTeste(true)}
              >
                  Informar
              </button>
            </div>
        </Paper>
      </div>
    </>
  );
}
