import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import InputComponent from './../components/InputComponent';
import { connect } from "react-redux";
import { SignInUser } from "./../Store/Actions/authActions";

class SignInPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      pass: ""
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  
  handleOnChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleOnSubmit(e) {
    e.preventDefault();

    this.props.signInUser(this.state.email, this.state.pass);
  }

  componentWillReceiveProps(nextProps) {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    this.props.userSignedInStatus ? nextProps.history.push(from) : null
  }

  render() {
    return (
      <div className="pageDiv">
        <h3 id="heading">Sign In</h3>

        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="userName">ENTER EMAIL</label>
          <br />
          <InputComponent inputFieldClassName="inputStyle" divClassName="userInputBox" type="email" name="email" id="userNameS" initialBorderColor="darkgrey" focusBorderColor="orange" onChange={this.handleOnChange} value={this.state.email}  />
          <br />
          <label htmlFor="key">ENTER PASSWORD</label>
          <br />
          <InputComponent inputFieldClassName="inputStyle" divClassName="userInputBox" type="password" name="pass" id="keyS" initialBorderColor="darkgrey" focusBorderColor="orange" onChange={this.handleOnChange} value={this.state.pass}  />
          <br/>
          <button id="sign_up" type="submit">SIGN IN</button>
        </form>

        {this.props.showErrorStatus ? <p id="errorMessage">{this.props.errorMessage}</p> : null}
        {this.props.showCongratsStatus ? <p id="congratsMessage">{this.props.congratsMessage}</p> : null}

        <div id="btn">
          <Link to="/register"><button className="navigation-button">I want to create new account</button></Link>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    showErrorStatus: state.showError.status,
    errorMessage: state.showError.errorMessage,
    showCongratsStatus: state.showCongrats.status,
    congratsMessage: state.showCongrats.congratsMessage,
    userRegisteredStatus: state.userRegistered.isRegistered,
    userSignedInStatus: state.userAuthenticated.isAuthenticated,
    currentUser: state.userAuthenticated.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInUser: (email, pass) => {
      dispatch(SignInUser(email, pass))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInPage));