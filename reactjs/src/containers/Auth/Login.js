import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

import { handleLoginAPI } from "../../services/userService";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage:""
    };
  }
  handleLogin = async() => {
    this.setState({
      errMessage:''
    })
    try {
     let data= await handleLoginAPI(this.state.username, this.state.password)

     if(data && data.errCode !== 0){
      this.setState({
        errMessage : data.errMessage
      })}
      else if(data && data.errCode == 0){
        this.props.userLoginSuccess(data.user)
       
      }
     
    } catch (error) {
     if(error.response){
      if(error.response.data){
        this.setState({
          errMessage: error.response.data.errMessage
        })
      }
     }
    }
    
  };
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  }

  handleKeyDown=(event)=>{

    if(event.key === 'Enter'){
      this.handleLogin()
    }
  }

  render() {
    return (
      <div className="root">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="login">
           
              <label htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <input
                type="text"
              
                placeholder="Email"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
                onKeyDown={(event)=>this.handleKeyDown(event)}
              />
              <div className="fontawesome1">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event)=>this.handleKeyDown(event)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i className={this.state.isShowPassword ? "far fa-eye fontawesome" : "far fa-eye-slash fontawesome"}></i>
                </span>
                <div className="errMessage" >{this.state.errMessage} </div>
              </div>
              

              <button onClick={() => this.handleLogin()}>Login</button>
            
            <div className="social">
              <div className="go">
                <i className="fab fa-google"></i> Google
              </div>
              <div className="fb">
                <i className="fab fa-facebook"></i> Facebook
              </div>
            </div>
          </div>
          <div className="signup">
            
              <label htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <input type="text" placeholder="User name" />
              <input type="email"  placeholder="Email" />
              <input type="password"  placeholder="Password" />
              <button>Sign up</button>
            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
