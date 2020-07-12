import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from '../helpers';
import { userActions } from '../actions'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.cleanSession = this.cleanSession.bind(this);
    }
    cleanSession(event) {
        event.preventDefault();
        this.props.logout()
        history.push('/login');
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2 align="center">Welcome! You have successfully logged in.</h2>
                <p align="center">
                <a
                    onClick={this.cleanSession}
                    style={{
                        marginLeft: '10px',
                        backgroundColor:'transparent',
                        color: '#337ab7',
                        fontSize: '20px'
                    }}
                    className="btn"
                >
                    Logout
                </a>
                </p>
            </div>
        );
    }
}

const mapDispatchToProps = {
    logout: userActions.logout
}

const connectedHomePage = connect(null, mapDispatchToProps)(HomePage);

export { connectedHomePage as HomePage }