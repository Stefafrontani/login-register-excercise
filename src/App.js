import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { PrivateRoute } from "./PrivateRoute.js";
import { history } from "./helpers";
import { alertActions } from "./actions";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { alertConstants } from "./constants/index.js";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectedToLogin: false,
    };

    const { dispatch } = this.props;

    history.listen((location, action) => {
      if (location.pathname === "/login" ||
        (location.state &&
          location.state.from &&
          location.state.from.pathname === "/")
      ) {
        this.setState({ redirectedToLogin: true });
      }

      if (this.props.authentication.user) {
        this.setState({ redirectedToLogin: false });
      }
    });
  }

  render() {
    const alert = this.props.alert || {};
    const registration = this.props.registration || {};
    const authentication = this.props.authentication || {};

    return (
      <Router history={history}>
        <div className="container">
          {
            <div className="alert-container--no-bootstrap">
              <div
                className={`alert
                  ${alert.message
                    ? "alert--show"
                    : null}
                  ${registration.error || authentication.error
                    ? "alert--error"
                    : "alert--success"}
                `}
              >
                <p className="alert__message">{alert.message}</p>
              </div>
            </div>
          }
          <div className="col-sm-8 col-sm-offset-2">
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            {!this.state.redirectedToLogin && (
              <PrivateRoute component={HomePage} exact />
            )}
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  const { registration } = state;
  const { authentication } = state;
  return {
    alert,
    registration,
    authentication,
  };
}

const connectedApp = connect(mapStateToProps)(App);

export { connectedApp as App };
