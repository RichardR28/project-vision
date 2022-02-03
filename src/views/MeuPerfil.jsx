import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { CustomField, SelectBox } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Inputmask from 'inputmask';
import {
  buscaInformacoesUsuario,
  alteraInformacoesUsuario,
  alteraSenha,
} from '../actions/UserActions';
import {
  buscaPaises,
  buscaEstados,
  buscaCidades,
} from '../actions/AddressActions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function MeuPerfil() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [editInfo, setEditInfo] = useState(false);
  const [ativaRedefinicao, setAtivaRedefinicao] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [listaPaises, setListaPaises] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);
  const [listaCidades, setListaCidades] = useState([]);
  const [senha, setSenha] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [senhaValida, setSenhaValida] = useState(false);

  async function buscaUsuario() {
    const aux = await buscaInformacoesUsuario(
      user.id,
      user.email,
      user.username,
    );
    setUserInfo(aux);
    populaCamposIniciais(aux);
  }

  async function populaCamposIniciais(obj) {
    const paises = await buscaPaises();
    const estados = await buscaEstados(obj.idPais);
    const cidades = await buscaCidades(obj.idEstado);
    setListaPaises(paises);
    setListaEstados(estados);
    setListaCidades(cidades);
  }

  async function selecionaPais(value) {
    setUserInfo((prev) => {
      return { ...prev, idPais: value, idEstado: null, idCidade: null };
    });
    if (value) {
      const estados = await buscaEstados(value);
      setListaEstados(estados);
    } else {
      setListaEstados([]);
      setListaCidades([]);
    }
  }

  async function selecionaEstado(value) {
    setUserInfo((prev) => {
      return { ...prev, idEstado: value, idCidade: null };
    });
    if (value) {
      const cidades = await buscaCidades(value);
      setListaCidades(cidades);
    } else {
      setListaCidades(null);
    }
  }

  function saveNewInfos() {
    const unmaskTelefone = userInfo.telefone
      ? Inputmask.unmask(userInfo.telefone, {
          mask: '(99) 9 9999-9999',
        })
      : null;
    alteraInformacoesUsuario(
      dispatch,
      user.id,
      unmaskTelefone,
      userInfo.idPais,
      userInfo.idEstado,
      userInfo.idCidade,
      history,
    );
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
    const senha = document.getElementById('novaSenha');
    const confirmarSenha = document.getElementById('confirmarNovaSenha');

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

  function limpaCampos() {
    setSenha('');
    setNovaSenha('');
    setConfirmarNovaSenha('');
    setAtivaRedefinicao(false);
  }

  function salvarNovaSenha() {
    alteraSenha(user.id, senha, novaSenha, limpaCampos);
  }

  useEffect(() => {
    Inputmask({ mask: '(99) 9 9999-9999' }).mask(
      document.getElementById('telefone'),
    );
    Inputmask({ mask: '999-999-999-99' }).mask(document.getElementById('cpf'));
    buscaUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 0',
        flexDirection: 'column',
      }}
    >
      <Paper
        className="formFields row"
        style={{
          width: '90%',
          minWidth: 300,
          maxWidth: 800,
          display: 'flex',
          justifyContent: 'center',
          zoom: 1.2,
        }}
        elevation={5}
      >
        <div className="col-xs-12 col-md-6">
          <CustomField
            id="email"
            name="email"
            label="E-mail"
            value={userInfo?.email || ''}
            disabled
          />
        </div>
        <div className="col-xs-12 col-md-6">
          <CustomField
            id="username"
            name="username"
            label="Usuário"
            value={userInfo?.username || ''}
            disabled
          />
        </div>
        <div className="col-xs-12 col-md-6">
          <CustomField
            id="name"
            name="name"
            label="Nome"
            value={userInfo?.nome || ''}
            disabled
          />
        </div>
        <div className="col-xs-12 col-md-6">
          <CustomField
            id="dataNascimento"
            name="dataNascimento"
            label="Data Nascimento"
            value={
              userInfo?.dataNascimento
                ? moment(userInfo.dataNascimento).format('DD/MM/YYYY')
                : ''
            }
            disabled
          />
        </div>
        <div className="col-xs-12 col-md-6">
          <CustomField
            id="cpf"
            name="cpf"
            label="CPF"
            value={userInfo?.cpf || ''}
            disabled
          />
        </div>
        <div className="col-xs-12 col-md-6">
          <SelectBox
            id="country"
            name="country"
            label="País"
            value={userInfo?.idPais || ''}
            onChange={(e) => selecionaPais(e)}
            list={listaPaises}
            idCol="id"
            valueCol="fips"
            complementCol="nome"
            disabled={!editInfo}
          />
        </div>
        <div className="col-xs-12 col-md-6">
          <SelectBox
            id="estado"
            name="estado"
            label="Estado"
            value={userInfo?.idEstado || ''}
            onChange={(e) => selecionaEstado(e)}
            list={listaEstados}
            idCol="id"
            valueCol="uf"
            complementCol="nome"
            disabled={!editInfo}
          />
        </div>
        <div className="col-xs-12 col-md-6">
          <SelectBox
            id="cidade"
            name="cidade"
            label="Cidade"
            value={userInfo?.idCidade || ''}
            onChange={(e) =>
              setUserInfo((prev) => {
                return { ...prev, idCidade: e };
              })
            }
            list={listaCidades}
            idCol="id"
            valueCol="nome"
            disabled={!editInfo}
          />
        </div>
        <div className="col-xs-12 col-md-6">
          <CustomField
            id="telefone"
            name="telefone"
            label="Telefone"
            onChange={(e) =>
              setUserInfo((prev) => {
                return { ...prev, telefone: e };
              })
            }
            value={userInfo?.telefone || ''}
            disabled={!editInfo}
          />
        </div>
        <div
          className="col-xs-12 col-md-6"
          style={{ display: 'flex', alignItems: 'end' }}
        >
          <div className="fieldEditButton">
            <button onClick={() => setEditInfo(true)}>
              Editar Informações
            </button>
          </div>
        </div>
        {editInfo && (
          <div className="fieldEditSaveButton">
            <button
              disabled={
                !editInfo ||
                !userInfo ||
                !userInfo.telefone ||
                !userInfo.idCidade ||
                !userInfo.idEstado ||
                !userInfo.idPais
              }
              onClick={() => saveNewInfos()}
            >
              Salvar Informações
            </button>
          </div>
        )}
      </Paper>
      <div className="redefinirSenha">
        <button onClick={() => setAtivaRedefinicao(true)}>
          Redefinir Senha
        </button>
      </div>
      {ativaRedefinicao && (
        <Paper
          elevation={5}
          className="formFields row"
          style={{
            width: '90%',
            minWidth: 300,
            maxWidth: 800,
            display: 'flex',
            justifyContent: 'center',
            zoom: 1.2,
            marginTop: 10,
          }}
        >
          <div className="col-xs-12 col-md-6">
            <CustomField
              id="novaSenha"
              name="novaSenha"
              label="Nova Senha"
              value={novaSenha}
              type="password"
              title="É necessário que a senha tenha no mínimo 8 caracteres, possuindo ao menos 1 número, 1 caracter especial, 1 letra maiúscula e 1 letra minúscula."
              onChange={(e) => {
                validaSenha();
                setNovaSenha(e);
              }}
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <CustomField
              id="confirmarNovaSenha"
              name="confirmarNovaSenha"
              label="Confirmar Nova Senha"
              value={confirmarNovaSenha}
              type="password"
              onChange={(e) => {
                validaSenha();
                setConfirmarNovaSenha(e);
              }}
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <CustomField
              id="senha"
              name="senha"
              label="Senha"
              value={senha}
              type="password"
              onChange={(e) => setSenha(e)}
            />
          </div>
          <div
            className="col-xs-12 col-md-6"
            style={{ display: 'flex', alignItems: 'end' }}
          >
            <div className="salvaNovaSenha">
              <button
                disabled={
                  !senhaValida || !senha || !novaSenha || !confirmarNovaSenha
                }
                onClick={() => salvarNovaSenha()}
              >
                Salvar Nova Senha
              </button>
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
}
