import React, { Component } from 'react';
import InputComponent from './../components/InputComponent';
import {withRouter} from "react-router"
import {connect} from "react-redux"
import {addTodo} from "./../Store/Actions/addTodo"

class AddWorkDiv extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      work: ""
    }

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(ev) {
    this.setState({
      work: ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault();
    
    this.props.addTodo(this.state.work);

    this.setState({
      work: ""
    })
  }
  
  render() {

    return (
      <div id="addWork_div">

        <h3 id="greet">Hello,</h3>
        <h2 id="greetName">{this.props.userName}</h2>
        <h2 id="welcome">Welcome to To Do App</h2>

        <form onSubmit={this.handleSubmit.bind(this)}>
            <div id="label">
                <label htmlFor="workName">ENTER WORK TO DO BELOW</label>
                <br />
                <InputComponent inputFieldClassName="inputStyle" divClassName="userInputBox" type="text" name="workName" id="getWork" initialBorderColor="darkgrey" focusBorderColor="orange" value={this.state.work} onChange={this.handleOnChange} />
            </div>

            <button id="addbtn" className="buttonStyle" type="submit">Add to List</button>
        </form>

        {this.props.showErrorStatus ? <p id="errorMessage">{this.props.errorMessage}</p> : null}
        {this.props.showCongratsStatus ? <p id="congratsMessage">{this.props.congratsMessage}</p> : null}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userAuthenticated.user.userName,
    userUid: state.userAuthenticated.user.userUid,
    showErrorStatus: state.showError.status,
    errorMessage: state.showError.errorMessage,
    showCongratsStatus: state.showCongrats.status,
    congratsMessage: state.showCongrats.congratsMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (todo) => {
      dispatch(addTodo(todo))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddWorkDiv));