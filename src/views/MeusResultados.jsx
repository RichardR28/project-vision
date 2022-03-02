import React, { useState, useEffect } from 'react';
import { buscaResultados } from '../actions/QuizActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import { host } from '../actions/backendConnection';

export default function MeusResultados() {
  const [lista, setLista] = useState([]);
  const quiz = useSelector((state) => state.quiz);
  const user = useSelector((state) => state.user);
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    buscaResultados(dispatch, user.id);
  }, [dispatch, user.id]);

  useEffect(() => {
    if (quiz.resultados?.length > 0) {
      const aux = {};
      quiz.resultados.forEach((item) => {
        if (aux[item.serie]) {
          aux[item.serie].lista.push({
            resposta: item.resposta,
            gabarito: item.gabarito,
          });
        } else {
          aux[item.serie] = {
            email: item.email,
            imagem: item.imagem,
            nome: item.nome,
            quizId: item.quizId,
            telefone: item.telefone,
            username: item.username,
            descricao: item.descricao,
            titulo: item.titulo,
            lista: [{ resposta: item.resposta, gabarito: item.gabarito }],
          };
        }
      });
      setLista(aux);
    }
  }, [quiz.resultados]);

  function handleExpanded(index) {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {Object.values(lista).map((item, index) => {
        let score = 0;
        item.lista.forEach((resp) => {
          if (resp.resposta === resp.gabarito) {
            score++;
          }
        });
        score = (score / item.lista.length) * 100;
        const percentStyle = { fontSize: 42, fontWeight: 700 };
        if (score.toFixed(0) >= 70) {
          percentStyle.color = '#56a056';
        } else {
          percentStyle.color = 'red';
        }
        return (
          <Accordion
            id={`card_${index}`}
            key={index}
            expanded={index === selected}
            className="dadosCartao"
            style={{ display: 'none' }}
            onChange={() => handleExpanded(index)}
          >
            <AccordionSummary
              expandIcon={<Icon path={mdiChevronDown} size={1.2} />}
            >
              <div>
                <div>
                  <img
                    onLoad={() =>
                      (document.getElementById(`card_${index}`).style.display =
                        '')
                    }
                    height={300}
                    src={`${host}/Images/${item.imagem}`}
                    alt="img"
                  />
                </div>
                <div style={{ fontSize: 24 }}>{item.titulo}</div>
                <div style={percentStyle}>{score.toFixed(0)}%</div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div style={{ fontSize: 20, fontWeight: 500 }}>
                  Informações do Criador
                </div>
                <div>E-mail: {item.email}</div>
                <div>Nome: {item.nome}</div>
                <div>Telefone: {item.telefone}</div>
                <hr style={{ margin: 0 }} />
                <div style={{ fontSize: 20, fontWeight: 500 }}>Descrição</div>
                <div>{item.descricao}</div>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
