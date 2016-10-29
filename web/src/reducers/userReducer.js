import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.SET_USER_LOGIN_STATE:
            return Object.assign({}, state, {isLoggedIn: action.state});
        case types.SET_USER_INFO_STATE:
            return Object.assign({}, state, {info: [...state.info, Object.assign({}, action.user)]});
        default:
            return state;            
    }
}