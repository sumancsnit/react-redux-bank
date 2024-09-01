import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
// import './App.css';
import App from './App';
import store from './store';

store.dispatch({
  type: 'customer/createCustomer',
  payload: { fullName: 'Veda' },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
