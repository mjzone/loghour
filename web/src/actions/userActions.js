import * as types from './actionTypes';

export function setUserState(user) {
    return { type: types.SET_USER_STATE, user };
}
