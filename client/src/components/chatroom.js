import React, { Component } from 'react';


export default class ChatRoom extends Component {
  render() {
    return (
      <div className="ChatRoom-Container">
        <div className="msg-room">msg here</div>
        <textarea>msg</textarea>
      </div>
    );
  }
}

