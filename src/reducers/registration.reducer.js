import { userConstants } from '../constants';

export function registration(state = { defaultState: 'defaultState' }, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                registering: false,
                user: action.user
            };
        case userConstants.REGISTER_FAILURE:
            return {
                registering: false,
                error: action.error
            };
        default:
            return state
    }
}