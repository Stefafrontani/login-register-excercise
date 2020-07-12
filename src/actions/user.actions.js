import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register
};

function login(username, password) {
    // return the promise using fetch which adds to localstorage on resolve
    return (dispatch) => {
        dispatch(request({ username, password }));
        userService.login(username, password)
        .then(user => {
            dispatch(success(user));
            dispatch(alertActions.success('Logged in'));
            setTimeout(() => {
                dispatch(alertActions.clear());
            }, 3000)
            localStorage.setItem('user', JSON.stringify({ username, password, aka: 'wolfram' }))
            history.push('/');
        })
        .catch(error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
            setTimeout(() => {
                dispatch(alertActions.clear());
            }, 3000)
        })
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    // complete this function
    localStorage.removeItem('user');
    return {
        type: userConstants.LOGOUT
    }
}

function register(user) {
    // return the promise using fetch which dispatches appropriately
    return (dispatch, getState) => {
        dispatch(request(user));
        userService.register(user)
        .then(() => {
            dispatch(success(user));
            setTimeout(() => {
                dispatch(alertActions.clear());
            }, 3000)
            dispatch(alertActions.success('Usuario created succesfuly. Don\'t worries be happy'));
            history.push('/login');
        })
        .catch(error => {
            dispatch(alertActions.error(error));
            setTimeout(() => {
                dispatch(alertActions.clear());
            }, 3000)
            dispatch(failure(error));
        })
    }

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
