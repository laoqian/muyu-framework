
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/main.js';
import fetchMiddleware from '../middlewares/ajax.js';


const rootReducer = combineReducers(reducers);

if (__DEV__) {
    let DevTools = require('../../layouts/dev-tools')
    var createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        applyMiddleware(fetchMiddleware),
        DevTools.instrument()
    )(createStore);

} else {
    var createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        applyMiddleware(fetchMiddleware)
    )(createStore);
}

function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        store.replaceReducer(rootReducer)
    }

    return store;
}

const store = configureStore();

export default store;