
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/main-reducer.js';
import fetchMiddleware from '../middlewares/fetch-middleware.js';


const rootReducer = combineReducers(reducers);



if (__DEV__) {
    var DevTools = require('../components/DevTools')
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


export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        store.replaceReducer(rootReducer)
    }

    return store;
}