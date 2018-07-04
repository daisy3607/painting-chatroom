import React, { Component } from 'react';
import '../css/login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      failMsg: false,
    }
  }

  handleAccountChange = (e) => {
    this.setState({
      account: e.target.value,
    })
  }

  handlePassChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  }


  checkAccount = () => {
    
    if(this.state.account==="daisy" && this.state.password==="1234") {
      this.props.setLogin();
    }
    else {
      this.setState({
        failMsg: true,
      })
    }
    this.setState({
      account: '',
      password: '',
    })
    this.props.history.push('/')
  }

  registerAccount = () => {
    console.log(this.state.account, this.state.password);
  }
  
  handleKeyPress = (e) => {
    
    if(e.key === 'Enter'){
      this.checkAccount();
      if(e.preventDefault) {
        e.preventDefault();
      }
    }
  }

  render() {
    return (
      <div className="LoginContainer">
        <div className="LoginWrapper">
          <h2> Login </h2>
          <div className="inputPlace">
            <input type="text" className="input-frame" placeholder="username" value={this.state.account} onChange={(e) => this.handleAccountChange(e)}></input>
            <br/>
            <input type="password"  className="input-frame" placeholder="password" value={this.state.password} onChange={(e) => this.handlePassChange(e)} onKeyPress={this.handleKeyPress}></input>
          </div>
          <button className="log-in" onClick={this.checkAccount}>登入</button>
          <button className="register" onClick={this.registerAccount}>註冊</button>
          <br />
          {this.state.failMsg? <p>帳號或密碼輸入錯誤，請再次輸入</p>: null}
        </div>
      </div>
    );
  }
}