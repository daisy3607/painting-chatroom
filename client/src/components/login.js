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
            <input type="text" placeholder="請輸入帳號" value={this.state.account} onChange={(e) => this.handleAccountChange(e)}></input>
            <br/>
            <input type="password" placeholder="請輸入密碼" value={this.state.password} onChange={(e) => this.handlePassChange(e)} onKeyPress={this.handleKeyPress}></input>
          </div>
          <button className="log-in" onClick={this.checkAccount}>登入</button>
          <button className="log-in" onClick={this.checkAccount}>註冊</button>
          <br />
          {this.state.failMsg? <p>帳號或密碼輸入錯誤，請再次輸入</p>: null}
        </div>
      </div>
    );
  }
}