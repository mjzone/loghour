import {combineReducers, createStore } from 'redux';
import { searchTextReducer, todosReducer } from 'reducers/reducers';

module.exports.configure = () => {
    var reducer = combineReducers({
        searchText: searchTextReducer,
        todos: todosReducer
    });
    var store = createStore(reducer);
}