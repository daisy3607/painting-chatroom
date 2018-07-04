import React, { Component } from 'react';
import painting from '../images/drawing.gif';
import typing from '../images/typing.gif';
import send from '../images/send.png';
import paint from '../images/paint.svg';
import img_example from '../images/mouse.jpg';
import avatar from '../images/avatar.png';
import SketchField from './SketchField';
import { animateScroll } from 'react-scroll';
import '../css/chatroom.css';

const TextMsg = ({ username, data }) => (
  <li>
    <div className="msg-Wrapper">
      <img className="author-img" src={avatar}></img>
      <div className="msg-body">
        <h5>{username}</h5>
        <div className="msg-block"><span>{data}</span></div>
      </div>
    </div>
  </li>
)

const ImageMsg = ({ username, data }) => (
  <li>
    <div className="msg-Wrapper">
      <img className="author-img" src={avatar}></img>
      <div className="msg-body">
        <h5>{username}</h5>
        <div className="msg-block"><img className="msg-gif" src={data}></img></div>
      </div>
    </div>
  </li>
)

const TypingMsg = ({ username }) => (
  <li>
    <div className="msg-Wrapper">
      <img className="author-img" src = {avatar}></img>
        <h5>{username}</h5>
        <div className="msg-block"><img className="gif-status" src={typing}></img></div>
    </div>
  </li>
)



export default class ChatRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawing: false,
      msg: [],
      messaging: [],
      curMsg: '',
    }
  }

  componentDidMount() {
    this.scrollToBottom();
    this.props.socket.on('new message', (msg) => {
      this.addMsg(msg);
    })
    this.props.socket.on('new messaging', (msg) => {
      this.addMessaging(msg);
    })
    this.props.socket.on('remove messaging', (msg) => {
      this.removeMessaging(msg);
    })
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "msg-container"
    });
  }

  handleSketchFieldOpen = () => {
    this.setState({
      drawId: this.props.socket.id,
      drawing: true,
    })
    this.props.socket.emit('new messaging', { username: this.props.username, type: 'image' })
  }

  handleSketchFieldClose = () => {
    this.setState({
      drawing: false,
      drawId: '',
    });
    this.props.socket.emit('remove messaging', { username: this.props.username, type: 'image' })
  }



  saveImage = (img) => {
    const msg = { username: this.props.username, data: img, type: 'image' };
    this.addMsg(msg);
    this.props.socket.emit('new message', msg);
  }

  handleCurMsgChange = (e) => {
    this.setState({ curMsg: e.target.value });
    if (this.state.curMsg.length === 0) {
      this.props.socket.emit('new messaging', { type: 'text', username: this.props.username} );
    }
    if (e.target.value.length === 0) {
      this.props.socket.emit('remove messaging', { username: this.props.username, type: 'text'});
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleEnterText();
    }
  }

  handleEditing = (id) => () => {
    this.setState({
      drawId: id,
      drawing: true,
    })
  }

  addMsg = (msg) => {
    this.setState({ msg: [...this.state.msg, msg]}, this.scrollToBottom);
  }

  addMessaging = (msg) => {
    this.setState({ messaging: [...this.state.messaging, msg]}, this.scrollToBottom);
  }

  removeMessaging = (msg) => {
    let { messaging } = this.state;
    const index = messaging.findIndex((el) => (el.type === msg.type && el.username === msg.username));
    if (index != -1) {
      messaging.splice(index, 1)
      this.setState({
        messaging,
      })
    }
  }

  handleEnterText = () => {
    const msg = { username: this.props.username, data: this.state.curMsg, type: 'text' }
    this.addMsg(msg);
    this.setState({ curMsg: '' });
    this.props.socket.emit('new message', msg);
    this.props.socket.emit('remove messaging', { username: this.props.username, type: 'text' });
  }

  renderMsg = ({ type, data, username }, key) => {
    if (type === 'image') {
      return <ImageMsg username={username} data={data} key={key.toString()} />
    }
    return <TextMsg username={username} data={data} key={key.toString()} />
  }

  renderMessaging = ({ type, username, id }, key) => {
    if (type === 'text') {
      return <TypingMsg username={username} key={key.toString()} />
    }
    return this.renderDrawingMsg(username, id ,key.toString());
  }

  renderDrawingMsg = (username, id, key) => (
    <li>
      <div className="msg-Wrapper">
        <img className="author-img" src={avatar}></img>
          <h5>{username}</h5>
          <div className="msg-block">
            <img className="gif-status" src={painting} onClick={this.handleEditing(id)}/>
          </div>
      </div>
    </li>
  )

  render() {
    console.log(this.state);
    return (
      <div className="ChatRoom-Container">
        <ul className="msg-room" id="msg-container">
          {this.state.msg.map(this.renderMsg)}
          {this.state.messaging.map(this.renderMessaging)}
        </ul>
        <div className="input-area">
          <input
            placeholder="typing or drawing something..."
            value={this.state.curMsg}
            onChange={this.handleCurMsgChange}
            onKeyPress={this.handleKeyPress}
          >
          </input>
          <button className="draw-btn btn" onClick={this.handleSketchFieldOpen}><img src={paint}></img></button>
          <button className="send-btn btn" onClick={this.handleEnterText}><img src={send}></img></button>
        </div>
        {
        this.state.drawing &&
        <SketchField close={this.handleSketchFieldClose} saveImage={this.saveImage} socket={this.props.socket} id={this.state.drawId} />
        }
      </div>
    );
  }
}

