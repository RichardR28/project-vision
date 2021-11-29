import React from 'react';
import { isAuthenticated } from './auth';
import { Login, About, CadastroUsuario } from './views';
import { Route, Switch, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
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

const Routes = () => (
  <Switch>
    <Route exact path="/" component={About} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/cadastroUsuario" component={CadastroUsuario} />
    <PrivateRoute></PrivateRoute>
  </Switch>
);

export default Routes;
