import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <div style={{ height: '100%' }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>,
  document.getElementById('root'),
);
