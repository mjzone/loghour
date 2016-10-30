import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function orgsReducer(state = initialState.org, action) {
    switch (action.type) {
        case types.SELECT_ORG_STATE:
            return Object.assign({}, state, action.org);
        default:
            return state;
    }
}
