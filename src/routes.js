import React from 'react';
import {
  Login,
  About,
  CadastroUsuario,
  CadastroQuiz,
  ListaQuizzes,
  ListaJogos,
  CriarJogo,
  ListaSolicitacoes,
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
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
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

const AdminRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  const localUser = localStorage.getItem('loggedUser')
    ? JSON.parse(localStorage.getItem('loggedUser'))
    : null;
  const username = user?.username || localUser?.username;
  const isAdmin = _.findIndex(adminUsers, username);
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
    <Route exact path="/criarJogo" component={CriarJogo} />
    <PublicRoute exact path="/login" component={Login} />
    <AdminRoute exact path="/listaSolicitacoes" component={ListaSolicitacoes} />
    <PrivateRoute
      exact
      path="/cadastroQuiz"
      component={CadastroQuiz}
    ></PrivateRoute>
  </Switch>
);

export default Routes;
