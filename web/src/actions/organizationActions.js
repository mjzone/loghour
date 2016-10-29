import * as types from './actionTypes';

export function setOrgsState(orgs) {
    return { type: types.SET_ORGS_STATE, orgs };
}
