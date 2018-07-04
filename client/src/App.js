import React, { Component } from 'react';
import ChatRoom from './components/chatroom.js';
import DashBoard from './components/dashboard.js';
import Login from './components/login.js';
import avatar from './images/avatar.png';
import io from 'socket.io-client';
import SketchField from './components/SketchField'

import './App.css';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://localhost:4000'),
      msg_database: [],
      todos: [],
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

  addTodo = (txt) => {
    this.setState({
      todos: [...this.state.todos, txt],
    })
  }


  callApi = async () => {
    const response = await fetch('/data');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    return (
      <div className="App">
        {/* <Login /> */}
        <ul className="navbar">
          <li className="group-title"><h3>顆顆顆顆顆小組</h3></li>
          <li className="user"><img src={avatar}></img><span>username</span></li>

          <li className="function-map">
            <div onClick={this.handleDashBoard}>Tasks</div>
          </li>
          <li className="channel-map">
            <span>channel</span>
            <ul className="inside-list">
              <li>channel 1</li>
              <li>channel 1</li>
            </ul>
          </li>
          <li className="direct-msg-map">
            <span>Direct Message</span>
            <ul className="inside-list">
              <li>channel 1</li>
              <li>channel 1</li>
              <li>channel 1</li>
              <li>channel 1</li>
            </ul>
          </li>
          <li className="online-user-map">
            <span>online users</span>
            <ul className="user-inside-list">
              <li>user 1</li>
              <li>user 1</li>
              <li>user 1</li>
              <li>user 1</li>
            </ul>
          </li>

          <li className="sign-out-map">
            <div className="sign-out">sign out</div>
          </li>

        </ul>
        <div className="content-wrapper">
          {/* <ChatRoom /> */}
          <ChatRoom socket={this.state.socket} username="test1" / >
          {/* <DashBoard todos={this.state.todos} addTodo={this.addTodo} /> */}
        </div>
      </div>
    );
  }
}

