import React, { Component } from 'react';
import ChatRoom from './components/chatroom.js';
import Login from './components/login.js';
import io from 'socket.io-client';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://localhost:4000'),
      msg_database: [],
    };
  }

  componentDidMount() {
    this.callApi()
    .then(res => this.setState(console.log(res.data)))
    // .then(res => this.setState({ msg_database: res.data }))
    .catch(err => console.log(err));
    
    // this.state.socket.on('realtime chatting', this.handleNewMsg);  
  }

  // handleNewMsg = (author,  msg) => {

  //   let msg_data = {speaker: author, text: msg};
  //   this.setState({
  //     msg_database: {...this.state.msg_database, msg_data},
  //   })
  // }

  callApi = async () => {
    const response = await fetch('/data');    
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    return (
      <div className="App">
        <div className="register"><Login /></div>
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
          {/* <ChatRoom /> */}
        </div>
      </div>
    );
  }
}

