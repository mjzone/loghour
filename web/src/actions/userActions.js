import * as types from './actionTypes';

export function setUserInfoState(user) {
    return { type: types.SET_USER_STATE, user };
}
