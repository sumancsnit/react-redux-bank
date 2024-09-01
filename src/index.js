import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import './App.css';
import App from './App';
import store from './store';

store.dispatch({ type: 'account/deposit', payload: 450 });

console.log('hello redux', store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
