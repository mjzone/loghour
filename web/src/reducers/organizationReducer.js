import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function organizationReducer(state = initialState.orgs, action) {
    switch (action.type) {
        case types.SET_ORGS_STATE:
            return  (action.orgs) ? [].concat(state, action.orgs): state;
        default:
            return state;            
    }
}