import React, { Component } from 'react';
import ChatRoom from './components/chatroom.js';
import Login from './components/login.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="register"><Login /></div> */}
        <nav className="navbar">
          <div className="user">
            user
            {/* <img src={avatar}></img> */}
            {/* <h3>{this.state.userName}</h3> */}
          </div>
          <div className="menu">
            <ul>
                <li onClick={this.handleDashBoard}>Dashboard</li>
                <li><div onClick={this.handleNoDashBoard}>BrainStorming</div></li>
            </ul>
          </div>  
        </nav>
        <div className="content-wrapper">        
          
          <div className="Chatroom-Wrapper"><ChatRoom /></div>
        </div>
      </div>
    );
  }
}

export default App;
