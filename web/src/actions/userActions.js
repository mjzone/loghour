import * as types from './actionTypes';

export function setUserLoginState(state) {
    return { type: types.SET_USER_LOGIN_STATE, state };
}

export function setUserInfoState(user) {
    return { type: types.SET_USER_INFO_STATE, user };
}
