import React, { useState, useEffect } from 'react';
import {
  Paper,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { CustomField, SelectBox } from '../components';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

export default function CriarQuiz() {
  const [perguntas, setPerguntas] = useState([]);
  const [titulo, setTitulo] = useState('');
  function adicionaPergunta() {
    let seqMax = 0;
    perguntas.forEach((item) => {
      if (item.sequencia >= seqMax) {
        seqMax = item.sequencia + 1;
      }
    });
    perguntas.push({
      sequencia: seqMax,
      pergunta: '',
      tipo: 0,
      resposta: '',
      imagem: '',
      opcoes: [
        { id: 0, value: 'opção 1' },
        { id: 1, value: 'opção 2' },
        { id: 2, value: 'opção 3' },
        { id: 3, value: 'opção 4' },
      ],
    });
    setPerguntas([...perguntas]);
  }

  function removePergunta(index) {
    perguntas.splice(index, 1);
    setPerguntas([...perguntas]);
  }

  function trocaOrdem(index, value) {
    perguntas[index].sequencia = value;
    setPerguntas([...perguntas]);
  }

  function changeTipoPergunta(index, value) {
    perguntas[index].tipo = parseInt(value);
    setPerguntas([...perguntas]);
  }

  function changePergunta(index, value) {
    perguntas[index].pergunta = value;
    setPerguntas([...perguntas]);
  }

  useEffect(() => {
    if (perguntas?.length === 0) {
      adicionaPergunta();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChangeOption(index, e) {
    perguntas[index].resposta = e.target.value;
    setPerguntas([...perguntas]);
  }

  function handleChangeOptionText(index, value) {
    perguntas[index].resposta = value;
    setPerguntas([...perguntas]);
  }

  function handleChangeOptionValues(index, pos, value) {
    perguntas[index].opcoes[pos].value = value;
    setPerguntas([...perguntas]);
  }

  function handleChangeImagem(index, e) {
    perguntas[index].imagem = e.target.value;
    setPerguntas([...perguntas]);
  }

  const lista = Object.entries(perguntas).map(([index, item]) => {
    return (
      <Paper
        key={index}
        style={{
          maxWidth: 1400,
          width: '90%',
          margin: 15,
          borderRadius: 15,
        }}
      >
        <div style={{ padding: 10 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ maxWidth: 50, marginRight: 10 }}>
                <CustomField
                  noLabel
                  id={`sequencia_${index}`}
                  name={`sequencia_${index}`}
                  type="number"
                  value={item.sequencia}
                  onChange={(e) => trocaOrdem(index, e)}
                />
              </div>
              Indique o número para a ordenação
            </div>
            <div>
              <IconButton onClick={() => removePergunta(index)}>
                <Icon style={{ color: 'red' }} path={mdiDelete} size={1.2} />
              </IconButton>
            </div>
          </div>
          <textarea
            style={{
              width: '100%',
              border: '0.5px solid #b5b5b5',
              borderRadius: 10,
            }}
            id="question"
            name="question"
            rows={3}
            value={item.pergunta}
            onChange={(e) => changePergunta(index, e.target.value)}
          />
          <div style={{ display: 'flex' }}>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              value={item.imagem}
              onChange={(e) => handleChangeImagem(index, e)}
            />
          </div>
        </div>
        <div style={{ padding: 10 }}>
          <SelectBox
            id={`tipoResposta_${index}`}
            name={`tipoResposta_${index}`}
            value={item.tipo}
            onChange={(e) => changeTipoPergunta(index, e)}
            label="Selecione o tipo de resposta"
            idCol="id"
            valueCol="label"
            list={[
              { id: 0, label: 'Resposta escrita' },
              { id: 1, label: 'Resposta alternativa' },
            ]}
          />
        </div>
        <div style={{ padding: 10 }}>
          {item.tipo && item.tipo === 1 ? (
            <div>
              <FormControl style={{ width: '100%' }}>
                <FormLabel>Opções:</FormLabel>
                <RadioGroup
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  value={item.resposta}
                  onChange={(e) => handleChangeOption(index, e)}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label={
                      <CustomField
                        noLabel
                        value={item.opcoes[0].value}
                        onChange={(e) => handleChangeOptionValues(index, 0, e)}
                      />
                    }
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label={
                      <CustomField
                        noLabel
                        value={item.opcoes[1].value}
                        onChange={(e) => handleChangeOptionValues(index, 1, e)}
                      />
                    }
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label={
                      <CustomField
                        noLabel
                        value={item.opcoes[2].value}
                        onChange={(e) => handleChangeOptionValues(index, 2, e)}
                      />
                    }
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label={
                      <CustomField
                        noLabel
                        value={item.opcoes[3].value}
                        onChange={(e) => handleChangeOptionValues(index, 3, e)}
                      />
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>
          ) : (
            <div>
              <CustomField
                id={`campoResposta_${index}`}
                name={`campoResposta_${index}`}
                label="Resposta"
                value={item.resposta}
                onChange={(e) => handleChangeOptionText(index, e)}
              />
            </div>
          )}
        </div>
      </Paper>
    );
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10,
      }}
    >
      <div
        className="row"
        style={{
          maxWidth: 1400,
          width: '90%',
          margin: 10,
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ marginBottom: 10 }} className="col-xs-12 col-md-4">
          <CustomField
            noLabel
            id="titulo"
            name="titulo"
            value={titulo}
            placeholder="Escolha um título para esse quiz ;)"
            onChange={(e) => setTitulo(e)}
          />
        </div>
        <div style={{ marginBottom: 10 }} className="col-xs-12 col-md-4">
          <button
            className="botoesCriacaoQuiz adicionaPergunta"
            onClick={() => adicionaPergunta()}
          >
            Adicionar Nova Pergunta
          </button>
        </div>
        <div style={{ marginBottom: 10 }} className="col-xs-12 col-md-4">
          <button
            className="botoesCriacaoQuiz salvaQuizz"
            onClick={() => console.log(perguntas)}
          >
            Salvar Quiz
          </button>
        </div>
      </div>
      {lista}
    </div>
  );
}
