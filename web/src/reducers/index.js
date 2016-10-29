import { combineReducers } from 'redux';
import organizations from './organizationReducer';
import user from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    organizations,
    user
});

export default rootReducer;