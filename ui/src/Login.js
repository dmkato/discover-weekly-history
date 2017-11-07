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
          <h1 className="Login-title">Save Each Weeks Discover Weekly To A Playlist Called DiscoverWeeklyHistory</h1>
          <Button className='loginButton'  href="http://localhost:3001/login">Login</Button>
        </Panel>
      </div>
    )
  }
}

export default Login;
