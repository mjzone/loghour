import { createStore, applyMiddleware  } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    const middleware = process.env.IS_OFFLINE ?
    [require('redux-immutable-state-invariant')(), thunk] :
    [thunk];

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
}
