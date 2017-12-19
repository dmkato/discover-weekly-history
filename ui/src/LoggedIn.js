import React, { Component } from 'react'
import logo from './logo.svg'
import './Login.css'
import { Button, Panel } from 'react-bootstrap'

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <Panel className="loginPanel">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="Login-title">Success! Checkout your new playlist!</h1>
          <Button className='showPlaylist' href="#">Go To Spotify</Button>
        </Panel>
      </div>
    )
  }
}

export default Login;
