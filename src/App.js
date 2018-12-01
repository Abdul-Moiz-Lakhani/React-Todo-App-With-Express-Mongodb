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
import { connect } from "react-redux";
import { userSignedIn } from "./Store/Actions/authActions"
import { firebaseApp } from './firebase';
import { showLoader, hideLoader } from "./Store/Actions/showLoader";
import { showError, hideError } from "./Store/Actions/showError";
import { showCongrats, hideCongrats } from "./Store/Actions/showCongrats";
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

    const token = localStorage.getItem('auth_token');

    this.props.showLoader();

    if (token) {
      try {
        let getuser = async () => {
          let response = await fetch('http://localhost:3000/user/getuser', {
            method: "GET",
            headers: {
              'Content-type': 'application/json',
              'authorization': 'Bearer ' + token
            }
          });

          let data = await response.json();

          return data;
        }

        getuser().then(result => {

          if (result.status) {
            this.props.userSignedIn(result.userData);
            this.props.showCongrats(result.message)
            setTimeout(() => {
              this.props.hideCongrats();
            }, 3000)
          } else {
            this.props.showError(result.message);
            setTimeout(() => {
              this.props.hideError();
            }, 3000)
          }

          this.props.hideLoader();
        }).catch(err => {
          this.props.showError('Authentication Failed!');
          
          setTimeout(() => {
            this.props.hideError();
          }, 3000)
        })
        
        this.props.hideLoader();
      }
      catch (err) {
        
        this.props.showError('Authentication Failed!');
        
        setTimeout(() => {
          this.props.hideError();
        }, 3000)

        this.props.hideLoader();
      }
    }
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
    showError: (err) => {
      dispatch(showError(err))
    },
    hideError: () => {
      dispatch(hideError())
    },
    showCongrats: (err) => {
      dispatch(showCongrats(err))
    },
    hideCongrats: () => {
      dispatch(hideCongrats())
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