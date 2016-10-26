import * as types from '../actions/actionTypes';

export default function organizationReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_REPOS_SUCCESS:
            return action.organizations;
        default:
            return state;            
    }
}

// export default function organizationReducer(state = [], action) {
//     switch (action.type) {
//         case types.CREATE_ORGANIZATION:
//             return [...state, Object.assign({}, action.organization)];
//         default:
//             return state;            
//     }
// }