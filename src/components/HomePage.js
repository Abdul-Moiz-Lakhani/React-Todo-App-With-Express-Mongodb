import React, {Component} from 'react';

import {Link} from 'react-router-dom';

export default class HomePage extends Component {
    
    render() {
        return (
            <div id="home-page-div">
                <img src={require('./../images/logo-home.png')} alt="Check" />
                <Buttons wait={3000} />
            </div>
        )
    }
}

class Buttons extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            hidden : "hidden"
        }
    }
    
    componentDidMount() {
        var that = this;
        setTimeout(function() {
            that.show();
        }, that.props.wait);
    }

    show() {
        this.setState({
            hidden : ""
        });
    }

    render() {
        return (
            <div id="home-page-buttons" className={this.state.hidden}>
                <Link to="/register"><button id="signUpButton" className="buttonStyle">SIGN UP</button></Link>
                <Link to="/signin"><button id="signInButton" className="buttonStyle">SIGN IN</button></Link>
            </div>
        );
    }
}
