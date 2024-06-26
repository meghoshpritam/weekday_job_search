import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import '@/styles/index.css';
import reduxStore from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
);
