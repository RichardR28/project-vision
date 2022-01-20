import React, { useState } from 'react';
import { CustomField } from '../components';
import { Paper } from '@material-ui/core';
import { verificaEmail, redefineSenha } from '../actions/UserActions';
import { useHistory } from 'react-router-dom';

const crypto = require('crypto');

export default function EsqueceuSenha() {
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [info, setInfo] = useState({});
  const [senhaValida, setSenhaValida] = useState(false);
  const history = useHistory();

  async function checkEmail() {
    const x = await verificaEmail(email);
    if (x.status === 200) {
      setIsValid(true);
      setInfo(x.salt);
    } else {
      setIsValid(false);
      setInfo('');
    }
  }

  function validaChave() {
    let hash = crypto.createHmac('sha512', info.salt);
    hash.update(codigo);
    hash = hash.digest('hex');
    if (hash === info.hash) {
      redefineSenha(email, senha, history);
    } else {
      alert('Chave inválida');
    }
  }

  function validador(senha) {
    const regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;
    const valid = regex.test(senha);
    if (valid && senha.length >= 8) {
      return true;
    } else {
      return false;
    }
  }

  function validaSenha() {
    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmarSenha');

    if (validador(senha.value) && senha.value === confirmarSenha.value) {
      senha.style.borderColor = 'green';
      confirmarSenha.style.borderColor = 'green';
      setSenhaValida(true);
    } else {
      senha.style.borderColor = 'red';
      confirmarSenha.style.borderColor = 'red';
      setSenhaValida(false);
    }
  }

  return (
    <div className="groupEsqueceuSenha">
      <Paper className="paperEsqueceuSenha" elevation={5}>
        <div className="row" style={{ margin: 15 }}>
          <div className="col-xs-12 col-md-6">
            <CustomField
              id="email"
              type="email"
              label="E-mail"
              name="email"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  checkEmail();
                }
              }}
              placeholder="exemplo@email.com.br"
              value={email}
              onChange={(e) => setEmail(e)}
            />
            <button
              className="verifyEmail"
              disabled={isValid}
              onClick={() => checkEmail()}
            >
              Verificar
            </button>
          </div>
          <div className="col-xs-12 col-md-6">
            <CustomField
              id="codigo"
              type="codigo"
              label="Chave"
              name="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e)}
              disabled={!isValid}
            />
          </div>
        </div>
        <div className="row" style={{ margin: 15 }}>
          <div className="col-xs-12 col-md-6">
            <CustomField
              id="senha"
              type="password"
              label="Senha"
              title="É necessário que a senha tenha no mínimo 8 caracteres, possuindo ao menos 1 número, 1 caracter especial, 1 letra maiúscula e 1 letra minúscula."
              name="senha"
              value={senha}
              onChange={(e) => {
                validaSenha();
                setSenha(e);
              }}
              disabled={!isValid}
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <CustomField
              id="confirmarSenha"
              type="password"
              label="Confirmar Senha"
              name="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => {
                validaSenha();
                setConfirmarSenha(e);
              }}
              disabled={!isValid}
            />
          </div>
        </div>
        <div className="confirmarRedefinicao">
          <button
            className="confirmarRedefinicao"
            disabled={
              !isValid ||
              !codigo ||
              !senha ||
              !confirmarSenha ||
              senha !== confirmarSenha ||
              !senhaValida
            }
            onClick={() => validaChave()}
          >
            Redefinir Senha
          </button>
        </div>
      </Paper>
    </div>
  );
}
