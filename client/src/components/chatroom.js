import React, { Component } from 'react';
import painting from '../images/drawing.gif';
import typing from '../images/typing.gif';
import send from '../images/send.png';
import paint from '../images/paint.svg';
import img_example from '../images/mouse.jpg';
import '../css/chatroom.css';

export default class ChatRoom extends Component {
  render() {
    return (
      <div className="ChatRoom-Container">
        <ul className="msg-room">
          <li>
            <div className="msg">
              <h4>username</h4>
              <div className="msg-block">msg</div>
            </div>
          </li>

          <li>
            <div className="msg">
              <h4>username</h4>
              <div className="msg-block"><img classNmae="msg-gif" src = {img_example}></img></div>
            </div>
          </li>

          <li>
            <div className="msg">
              <h4>username</h4>
              <div className="msg-block"><img src = {typing}></img></div>
            </div>         
          </li>

          <li>
            <div className="msg">
              <h4>username</h4>
              <div className="msg-block"><img src = {painting}></img></div>
            </div>         
          </li>


        </ul>
        <div className="input-area">
          <input placeholder="typing or drawing something..."></input>
          <button className="draw btn"><img src={paint}></img></button>
          <button className="send btn"><img src={send}></img></button>
        </div>
                
      </div>
    );
  }
}

