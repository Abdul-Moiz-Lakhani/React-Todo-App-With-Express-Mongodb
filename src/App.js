import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/navBar';
import LinearProgress from 'material-ui/LinearProgress';
import HomePage from './components/HomePage';
import RegistrationPage from './containers/RegistrationPage';
import SignInPage from './containers/SignInPage';
import AddWorkDiv from './containers/AddWorkDiv';
import TodoList from './containers/todoList';
import Header from './components/Header';
import {connect} from "react-redux";
import {userSignedIn } from "./Store/Actions/authActions"
import { firebaseApp } from './firebase';
import {showLoader, hideLoader} from "./Store/Actions/showLoader";
import { clearTodos, updateTodos } from './Store/Actions/todos';

const HomePageRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    !isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/home',
          state: { from: props.location }
        }} />
      )
  )} />
)

const RegistrationPageRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    !isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/home',
          state: { from: props.location }
        }} />
      )
  )} />
)

const SignInPageRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    !isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/home',
          state: { from: props.location }
        }} />
      )
  )} />
)

const HomeRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }} />
      )
  )} />
)

const TodoListRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }} />
      )
  )} />
)

class App extends Component {

  componentWillUpdate() {
    
    let that = this;
    
    firebaseApp.database().ref(`/Users/${this.props.currentUser.userUid}`).on("child_removed", snap => {
      that.props.clearTodos()
    })
  }

  componentDidMount() {

    let that = this;
    
    firebaseApp.auth().onAuthStateChanged(user => {
      if(user) {
        
        that.props.showLoader();
        
        firebaseApp.database().ref(`/Users/${user.uid}`).on("value", userData => {
          
          let currentUser = userData.val();
          
          that.props.userSignedIn(currentUser);

          firebaseApp.database().ref(`/Users/${user.uid}/todos`).once("value", todos => {
            
            let arr = [];

            todos.forEach(todo => {
              let thisTodo = todo.val()
              thisTodo.uID = todo.key
              arr.push(thisTodo);
              that.props.updateTodos(arr)
            })
            
            that.props.hideLoader();
          })
        })
      }
      else
      {
        console.log('user signed out')
      }
    })
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">

          {this.props.loaderStatus ? <LinearProgress mode="indeterminate" color="orange" /> : <div id="upper_line"></div>}

          <Header />
          <NavBar />

          <div id="line"></div>

          <div id="screen">

            <div id="opacBox2">

              <div id="renderPage">

                <Switch>
                  <HomePageRoute exact path="/" component={HomePage} isAuthenticated={this.props.userAuthenticationStatus} />
                  <RegistrationPageRoute path="/register" component={RegistrationPage} isAuthenticated={this.props.userAuthenticationStatus} />
                  <SignInPageRoute path="/signin" component={SignInPage} isAuthenticated={this.props.userAuthenticationStatus} />
                  <HomeRoute path="/home" component={AddWorkDiv} isAuthenticated={this.props.userAuthenticationStatus} />
                  <TodoListRoute path="/todolist" component={TodoList} isAuthenticated={this.props.userAuthenticationStatus} />
                </Switch>

              </div>

            </div>

          </div>

        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuthenticationStatus: state.userAuthenticated.isAuthenticated,
    currentUser: state.userAuthenticated.user,
    loaderStatus: state.showLoader.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userSignedIn: user => {
      dispatch(userSignedIn(user))
    },
    showLoader: () => {
      dispatch(showLoader())
    },
    hideLoader: () => {
      dispatch(hideLoader())
    },
    clearTodos: () => {
      dispatch(clearTodos())
    },
    updateTodos: (todos) => {
      dispatch(updateTodos(todos))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);