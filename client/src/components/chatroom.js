import React, { Component } from 'react';
import painting from '../images/drawing.gif';
import typing from '../images/typing.gif';
import send from '../images/send.png';
import paint from '../images/paint.svg';
import img_example from '../images/mouse.jpg';
import avatar from '../images/avatar.png';
import '../css/chatroom.css';

export default class ChatRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paintingMode: 0, 
    }
  }

  changeInputMode = () => {
    this.setState({
      paintingMode: !this.state.paintingMode,
    })
    
  }

  render() {
    return (
      <div className="ChatRoom-Container">
        <ul className="msg-room">
          <li>
            <div className="msg-Wrapper">
              <img className="author-img" src = {avatar}></img>
              <div className="msg-body">              
                <h5>username</h5>
                <div className="msg-block"><span>msgmsgmsgmsgmsgmsgmsg</span></div>
              </div>
            </div>
          </li>

          <li>
            <div className="msg-Wrapper">
              <img className="author-img" src = {avatar}></img>
              <div className="msg-body"> 
                <h5>username</h5>
                <div className="msg-block"><img classNmae="msg-gif" src = {img_example}></img></div>
              </div>
            </div>
          </li>

          <li>
            <div className="msg-Wrapper">
              <img className="author-img" src = {avatar}></img>
                <h5>username</h5>
                <div className="msg-block"><img className="gif-status" src = {typing}></img></div>
            </div>         
          </li>

          <li>
            <div className="msg-Wrapper">
              <img className="author-img" src = {avatar}></img>          
              <h5>username</h5>
              <div className="msg-block"><img className="gif-status" src = {painting}></img></div>
            </div>         
          </li>


        </ul>
        <div className={`input-area${this.state.paintingMode? " sketch":""}`}>
          <input placeholder="typing or drawing something..."></input>
          <button className="draw-btn btn" onClick={this.changeInputMode}><img src={paint}></img></button>
          <button className="send-btn btn"><img src={send}></img></button>
        </div>
                
      </div>
    );
  }
}

