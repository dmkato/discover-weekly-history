import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import LoggedIn from './LoggedIn';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/loggedIn' component={LoggedIn} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker();
