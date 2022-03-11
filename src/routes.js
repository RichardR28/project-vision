import React from 'react';
import {
  Login,
  About,
  CadastroUsuario,
  ListaQuizzes,
  ListaJogos,
  CriarJogo,
  ListaSolicitacoes,
  NotFound,
  EsqueceuSenha,
  CriarQuiz,
  MeuPerfil,
  MinhasSolicitacoes,
  MeusQuizzes,
  FazerQuiz,
  MeusResultados,
  MinhasPontuacoes,
  Game01,
  Game02,
  Game03,
} from './views';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const _ = require('lodash');

const adminUsers = ['Roling28'];

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  const localUser = localStorage.getItem('loggedUser')
    ? JSON.parse(localStorage.getItem('loggedUser'))
    : null;
  const isAuthenticated = user?.name || localUser?.name ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  const localUser = localStorage.getItem('loggedUser')
    ? JSON.parse(localStorage.getItem('loggedUser'))
    : null;
  const isAuthenticated = user?.name || localUser?.name ? false : true;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const CreatorRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  const localUser = localStorage.getItem('loggedUser')
    ? JSON.parse(localStorage.getItem('loggedUser'))
    : null;
  const isAuthenticated = user?.name || localUser?.name ? true : false;
  const isCreator = user?.creator === 1 || localUser?.creator === 1;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isCreator ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const AdminRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  const localUser = localStorage.getItem('loggedUser')
    ? JSON.parse(localStorage.getItem('loggedUser'))
    : null;
  const username = user?.username || localUser?.username;
  const isAdmin = _.indexOf(adminUsers, username) >= 0 ? true : false;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const Routes = () => (
  <Switch>
    <Route exact path="/" component={About} />
    <Route exact path="/cadastroUsuario" component={CadastroUsuario} />
    <Route exact path="/listaQuizzes" component={ListaQuizzes} />
    <Route exact path="/listaJogos" component={ListaJogos} />
    <PublicRoute exact path="/login" component={Login} />
    <PublicRoute exact path="/esqueceuSenha" component={EsqueceuSenha} />
    <PrivateRoute exact path="/criarJogo" component={CriarJogo} />
    <CreatorRoute exact path="/criarQuiz" component={CriarQuiz} />
    <CreatorRoute exact path="/meusQuizzes" component={MeusQuizzes} />
    <CreatorRoute
      exact
      path="/minhasSolicitacoes"
      component={MinhasSolicitacoes}
    />
    <PrivateRoute exact path="/minhaConta" component={MeuPerfil} />
    <PrivateRoute exact path="/responderQuiz" component={FazerQuiz} />
    <PrivateRoute exact path="/resultados" component={MeusResultados} />
    <PrivateRoute exact path="/pontuacoes" component={MinhasPontuacoes} />
    <PrivateRoute exact path="/game01" component={Game01} />
    <PrivateRoute exact path="/game02" component={Game02} />
    <PrivateRoute exact path="/game03" component={Game03} />
    <AdminRoute exact path="/listaSolicitacoes" component={ListaSolicitacoes} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
