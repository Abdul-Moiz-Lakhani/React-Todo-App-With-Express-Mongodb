import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";

class Header extends Component {

    gotoHome = () => {
        !this.props.userAuthenticationStatus ? this.props.history.push('/') : null
    }

    render() {
        return (
            <div>
                <div id="header" onClick={this.gotoHome}>
                    <div id="opacBox">
                        <h1>To do App</h1>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userAuthenticationStatus: state.userAuthenticated.isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps, null)(Header));