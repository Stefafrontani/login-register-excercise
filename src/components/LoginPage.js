import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const inputName  = event.target.name;
        const inputValue = event.target.value;

        this.setState({
            [inputName]: inputValue,
        });
    }

    handleSubmit(event) {
        // handle button click and dispatch register
        event.preventDefault();

        const username = this.state.username;
        const password = this.state.password;

        this.setState({
            submitted: true
        });

        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} name="form">
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input onChange={this.handleChange} type="text" className="form-control username" name="username" />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleChange} type="password" className="form-control" name="password"/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        {this.props.authentication.loggingIn
                            ? <div className="loader"></div>
                            : <button type="submit" className="btn btn-primary">Login</button>
                        }
                        <Link to="/register"
                            style={{
                                marginLeft: '10px',
                                backgroundColor:'transparent',
                                color: '#337ab7'
                            }}
                            className="btn"
                        >
                                Register
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication
    }
}

const mapDispatchToProps = {
    login: userActions.login
}

const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export { ConnectedLoginPage as LoginPage } ;

export { LoginPage as TestLoginPage };
