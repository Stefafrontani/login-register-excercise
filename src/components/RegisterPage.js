import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // handle input change and dispatch register
        const inputName  = event.target.name;
        const inputValue = event.target.value;

        this.setState({
            user: {
                ...this.state.user,
                [inputName]: inputValue
            },
            submitted: false,
        });
    }

    handleSubmit(event) {
        // handle button click and dispatch register
        event.preventDefault();

        const username = this.state.user.username;
        const password = this.state.user.password;

        this.setState({
            submitted: true
        });

        if (username && password) {
            this.props.register({ username, password });
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit} name="form">
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            className="form-control username"
                            name="username"
                        />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={this.handleChange}
                            type="password"
                            className="form-control"
                            name="password"
                        />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        {this.props.registration.registering
                            ?   <div className="loader"></div>
                            :   <button type='submit' className="btn btn-primary">Register</button>
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

// complete the below function
function mapStateToProps(state) {
    return {
        registration: state.registration
    }
}
const mapDispatchToProps = {
    register: userActions.register
}

const ConnectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export { ConnectedRegisterPage as RegisterPage } ;

export { RegisterPage as TestRegisterPage };
