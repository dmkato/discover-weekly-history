import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Panel } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Panel className="loginPanel">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Discover Weekly History</h1>
          <Button className='loginButton'  href="http://localhost:3001/login">Login</Button>
        </Panel>
      </div>
    );
  }
}

export default App;
