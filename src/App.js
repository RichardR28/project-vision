import './App.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Routes from './routes';
import { Menu } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation();
  const auxMenu = (
    <div style={{ position: 'fixed', width: '100%' }}>
      <Menu />
    </div>
  );
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
