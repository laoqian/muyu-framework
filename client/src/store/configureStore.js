/*
*
*
*
*
**/

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/reducer.js';
import config from '../config.js'

const rootReducer = combineReducers(reducers);


//异步ajax中间件
const fetchMiddleware = store => next => action => {

    if (action.ajax_type == undefined) {
        return next(action);
    }

    var url = config.base_url + '/' + action.uri;

    // console.log(action.ajax_type+'请求开始');

    if (action.ajax_type == 'post') {

        $.post(url,
            action.data,
            function (data, status) {
                action.data = data;
                console.log(action);
                next(action);
            });
    } else if (action.ajax_type == 'get') {
        $.get(url,
            function (data, status) {
                action.data = data;
                console.log(action);
                next(action);
            });
    }
}


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