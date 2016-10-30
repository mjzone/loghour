import * as types from './actionTypes';

export function selectOrgState(org) {
    return { type: types.SELECT_ORG_STATE, org };
}
