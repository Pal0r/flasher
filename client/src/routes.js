import React  from 'react';
import {
  Route,
  Switch
} from 'react-router-dom'


import NotFoundPage from './components/pages/not-found-page';

import HomePage from './components/pages/home-page';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/require-auth';
import CardForm from './components/card'



export default () => (
  <Switch>
    <Route exact path="/" component={RequireAuth(HomePage)} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={RequireAuth(Dashboard)} />
    <Route path="/card/create" component={RequireAuth(CardForm)} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
)