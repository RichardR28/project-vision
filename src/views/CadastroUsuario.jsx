import React, { Component } from 'react';
import { Paper, Button } from '@material-ui/core';
import { CustomField, SelectBox } from '../components';
import { cpf } from 'cpf-cnpj-validator';
import Inputmask from 'inputmask';

export default class CadastroUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCPF: '',
      nome: '',
      user: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      genero: '',
      dataNascimento: '',
      country: '',
      estado: '',
      cidade: '',
      telefone: '',
    };
  }

  populaPaises = () => {
    fetch('http://localhost:9000/address/getPaises')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ listaPaises: data });
      });
  };

  componentDidMount = async () => {
    Inputmask({ mask: '999.999.999-99' }).mask(document.getElementById('cpf'));
    Inputmask({ mask: '(99) 9 9999-9999' }).mask(
      document.getElementById('telefone'),
    );
    this.populaPaises();
  };

  validador = (senha) => {
    const regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;
    const valid = regex.test(senha);
    if (valid && senha.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  cpfValidator = (value) => {
    const x = cpf.format(value);
    if (cpf.isValid(x)) {
      document.getElementById('cpf').style.borderColor = 'green';
    } else {
      document.getElementById('cpf').style.borderColor = 'red';
    }
    this.setState({ userCPF: x });
  };

  validaSenha = () => {
    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmarSenha');

    if (this.validador(senha.value) && senha.value === confirmarSenha.value) {
      senha.style.borderColor = 'green';
      confirmarSenha.style.borderColor = 'green';
    } else {
      senha.style.borderColor = 'red';
      confirmarSenha.style.borderColor = 'red';
    }
  };

  render() {
    const { listaPaises } = this.state;

    return (
      <div
        className="formGroup"
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: '3%',
        }}
      >
        <Paper
          elevation={5}
          style={{
            minWidth: 300,
            width: '90%',
            maxWidth: 700,
            padding: 20,
            zoom: 1.2,
            marginBottom: 10,
          }}
        >
          <div style={{ fontSize: 24 }}>Dados Cadastrais</div>
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <CustomField
                label="Nome Completo"
                name="nome"
                id="nome"
                onChange={(e) => this.setState({ nome: e })}
                value={this.state.nome}
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <CustomField
                label="Usuário"
                name="user"
                id="user"
                onChange={(e) => this.setState({ user: e })}
                value={this.state.user}
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <CustomField
                label="E-mail"
                id="email"
                name="email"
                placeholder="exemplo@email.com.br"
                type="email"
                onChange={(e) => this.setState({ email: e })}
                value={this.state.email}
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <CustomField
                label="CPF"
                id="cpf"
                name="cpf"
                value={this.state.userCPF}
                onChange={(e) => this.cpfValidator(e)}
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <CustomField
                label="Senha"
                name="senha"
                id="senha"
                type="password"
                placeholder="Ex: 123@Senha"
                title="É necessário que a senha tenha no mínimo 8 caracteres, possuindo ao menos 1 número, 1 caracter especial, 1 letra maiúscula e 1 letra minúscula."
                onChange={(e) => {
                  this.validaSenha();
                  this.setState({ senha: e });
                }}
                value={this.state.senha}
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <CustomField
                label="Confirmar Senha"
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                onChange={(e) => {
                  this.validaSenha();
                  this.setState({ confirmarSenha: e });
                }}
                value={this.state.confirmarSenha}
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <SelectBox
                label="Gênero"
                name="genero"
                id="genero"
                onChange={(e) => {
                  this.setState({ genero: e });
                }}
                value={this.state.genero}
                list={[
                  { label: 'Selecione ...', value: '' },
                  { label: 'Masculino', value: 'masculino' },
                  { label: 'Feminino', value: 'feminino' },
                  { label: 'Outro', value: 'outro' },
                  { label: 'Prefiro não informar', value: 'naoInformado' },
                ]}
                idCol="value"
                valueCol="label"
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <CustomField
                label="Data de Nascimento"
                id="dataNascimento"
                name="dataNascimento"
                type="date"
                onChange={(e) => this.setState({ dataNascimento: e })}
                value={this.state.dataNascimento}
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <SelectBox
                label="País"
                name="country"
                id="country"
                onChange={(e) => this.setState({ country: e })}
                value={this.state.country}
                list={listaPaises}
                idCol="id"
                valueCol="fips"
                complementCol="nome"
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <CustomField
                label="Estado (UF)"
                id="estado"
                name="estado"
                onChange={(e) => this.setState({ estado: e })}
                value={this.state.estado}
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <CustomField
                label="Cidade"
                name="cidade"
                id="cidade"
                onChange={(e) => this.setState({ cidade: e })}
                value={this.state.cidade}
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <CustomField
                label="Telefone"
                id="telefone"
                name="telefone"
                type="tel"
                onChange={(e) => this.setState({ telefone: e })}
                value={this.state.telefone}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: 20,
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => (window.location = '/login')}
              style={{
                background: 'rgb(255 0 0)',
                color: 'white',
                width: '40%',
              }}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{
                background: '#47967e',
                color: 'white',
                width: '40%',
              }}
            >
              Salvar
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}
