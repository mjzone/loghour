import { combineReducers } from 'redux';
import orgs from './orgsReducer';
import org from './orgReducer';
import user from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    orgs,
    org,
    user
});

export default rootReducer;
