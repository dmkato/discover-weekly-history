import React, { Component } from 'react'
import logo from './logo.svg'
import './Login.css'
import { Panel } from 'react-bootstrap'

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <Panel className="loginPanel">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="Login-title">You did it!</h1>
        </Panel>
      </div>
    )
  }
}

export default Login;
