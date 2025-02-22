import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../actions/UserActions';
import logo from '../res/imagens/logo.png';

export default function Login() {
  const userStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (userStore?.name) {
    isLogged();
  }

  function isLogged() {
    history.push('/');
  }

  function logar() {
    if (username && password) {
      login(username, password, dispatch, history);
    } else {
      alert('Necessário o preenchimento de todos os campos.');
    }
  }

  function listener(e) {
    if (e.key === 'Enter') {
      logar();
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 500,
        height: '100%',
      }}
    >
      <Paper
        elevation={5}
        style={{
          background: '#fafafa',
          minWidth: 250,
          maxWidth: 300,
          width: '90%',
          zoom: 1.25,
          padding: '15px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', background: '#fafafa' }}>
            <div style={{ background: '#59487A', display: 'flex', padding: 10, borderRadius: 10 }}>
              <img src={logo} width={85} alt="logo" />
            </div>
          </div>
          <div className="loginForm">
            <div className="fields">
              <TextField
                className="inputText"
                label="Usuário"
                placeholder="Username ou email"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => listener(e)}
                inputProps={{
                  className: {
                    background: 'black',
                  },
                }}
              />
              <TextField
                className="inputText"
                label="Senha"
                type="password"
                placeholder="************"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => listener(e)}
                inputProps={{
                  className: {
                    background: 'black',
                  },
                }}
              />
            </div>
            <Button
              variant="contained"
              size="small"
              style={{
                background: '#47967e',
                color: 'white',
                width: '100%',
                marginTop: 25,
              }}
              onClick={() => logar()}
            >
              Login
            </Button>
            <div
              style={{
                fontSize: 14,
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              Não possui uma conta?
              <Link
                to="/cadastroUsuario"
                style={{
                  textDecoration: 'none',
                  marginLeft: 5,
                  color: 'rgb(0 143 128)',
                }}
              >
                Criar conta
              </Link>
            </div>
            <Link
              to="/esqueceuSenha"
              style={{
                textDecoration: 'none',
                fontSize: 14,
                color: 'rgb(0 143 128)',
              }}
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              fontSize: 14,
              color: 'rgb(223 70 41)',
            }}
          >
            Voltar
          </Link>
        </div>
      </Paper>
    </div>
  );
}
