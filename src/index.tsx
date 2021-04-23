import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import store from '@src/redux/store';
import HttpApi from '@src/utils/https';
import './index.less';

switch (process.env.REACT_APP_ENV) {
  case 'local':
    //mock数据
    HttpApi.baseURL = 'http://localhost:3000';
    break;
  case 'dev':
    HttpApi.baseURL = 'http://localhost:8090';
    break;
  case 'test':
    break;
  default:
    break;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
