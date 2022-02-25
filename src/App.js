import './App.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Routes from './routes';
import { Menu } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './stores';

function App() {
  const location = useLocation();
  const auxMenu = (
    <div style={{ position: 'fixed', width: '100%', zIndex: 99999 }}>
      <Menu />
    </div>
  );
  return (
    <div className="App">
      <Provider store={store}>
        {location.pathname !== '/login' ? auxMenu : null}

        <div
          style={
            location.pathname !== '/login'
              ? { marginTop: 50, width: '100%' }
              : { width: '100%' }
          }
        >
          <Routes />
        </div>
      </Provider>
    </div>
  );
}

export default App;
