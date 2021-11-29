import React, { Component } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  render() {
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
            }}
          >
            <div>LOGO</div>
            <div className="loginForm">
              <div className="fields">
                <TextField
                  className="inputText"
                  label="Usuário"
                  placeholder="Username ou email"
                  size="small"
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
                to="/"
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
}
