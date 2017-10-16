import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter as Router } from "react-router-redux";

import { history } from './store'

import App from './app'
import store from './store'

import './react-toolbox/material-icons-font.css'


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Router>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
//
// const token = Cookies.get('token')
//
// if(token){store.dispatch({ type: AUTH_USER })}