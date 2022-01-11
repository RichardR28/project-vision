import React from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { mdiForum, mdiGamepadSquare } from '@mdi/js';
import { Icon } from '@mdi/react';
import { useHistory } from 'react-router-dom';

export default function About() {
  const history = useHistory();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={5}
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1% 3%',
          marginBlock: 15,
        }}
      >
        <div style={{ fontSize: 40, margin: '10px 0 10px ' }}>Quem somos?</div>
        <div style={{ fontSize: 24, width: 'inherit', textIndent: '1em' }}>
          Um aluno do último período em bacharelado em sistemas da informação no
          instituto federal catarinense (IFC), tentando finalizar o curso e
          ajudar um grupo de pessoas de alguma forma durante esse porcesso. ;)
        </div>
        <div style={{ fontSize: 40, margin: '15px 0 10px ' }}>
          O que fazemos?
        </div>
        <div style={{ fontSize: 24, width: 'inherit', textIndent: '1em' }}>
          Procuramos fornecer um método simples e rápido para identificar, em
          nossos usuários, possíveis problemas voltados à área da saúde,
          inicialmete focados em alterações visuais como o daltonismo.
        </div>
        <div style={{ fontSize: 40, margin: '15px 0 10px ' }}>
          Como desejamos fazer?
        </div>
        <div style={{ fontSize: 24, width: 'inherit', textIndent: '1em' }}>
          Pretendemos cumprir essa tarefa de maneira que se adeque à todas as
          faixas etárias e necessidades pessoais, ou seja, se não tem muito
          tempo pode optar pelos quizzes, que são perguntas objetivas e de
          resposta simples para obter um resultado mais rapidamente. Já se não
          gosta desse formato de perguntas e respostas e quer algo mais
          divertido temos alguns joguinhos para deixar tudo mais leve e casual.
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 20,
            width: '100%',
          }}
        >
          <IconButton onClick={() => history.push('/listaQuizzes')}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon style={{ color: 'green' }} path={mdiForum} size={4.5} />
              <div style={{ fontSize: 30, color: 'green' }}>Quizzes</div>
            </div>
          </IconButton>
          <IconButton onClick={() => history.push('/listajogos')}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                style={{ color: 'red' }}
                path={mdiGamepadSquare}
                size={4.5}
              />
              <div style={{ fontSize: 30, color: 'red' }}>Jogos</div>
            </div>
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}
